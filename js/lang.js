// js/i18n.js
let I18N = null;

const STORAGE_KEY = "site.lang";

function getCurrentLang() {
  const urlLang = new URLSearchParams(location.search).get("lang");
  let saved = "en";
  try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) { }
  return urlLang || saved || "en";
}
function setCurrentLang(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { }
  const u = new URL(location.href);
  u.searchParams.set("lang", lang);
  history.replaceState({}, "", u);
  document.documentElement.lang = lang;
  return lang;
}
function isSameOrigin(url) {
  try { const u = new URL(url, location.href); return u.origin === location.origin; }
  catch { return false; }
}
function buildUrlWithLang(url, lang) {
  const u = new URL(url, location.href);
  // 忽略锚点/外链/特殊协议
  if (u.origin !== location.origin) return url;
  if (u.protocol === "mailto:" || u.protocol === "tel:" || u.protocol === "javascript:") return url;
  // 保留已有查询参数，强制写入/覆盖 lang
  u.searchParams.set("lang", lang);
  return u.toString();
}

// === 新增：改写所有站内链接 ===
function rewriteAllLinks(lang) {
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    if (a.dataset.keepLang === "false") return; // 可用 data-keep-lang="false" 跳过
    if (!isSameOrigin(href)) return;
    a.setAttribute('href', buildUrlWithLang(href, lang));
  });
}

// === 新增：改写所有表单（GET/POST 都携带 lang） ===
function rewriteAllForms(lang) {
  document.querySelectorAll('form').forEach(form => {
    const method = (form.getAttribute('method') || 'GET').toUpperCase();
    if (method === 'GET') {
      const action = form.getAttribute('action') || location.pathname;
      form.setAttribute('action', buildUrlWithLang(action, lang));
    } else {
      // POST: 用隐藏域提交 lang
      if (!form.querySelector('input[name="lang"]')) {
        const hid = document.createElement('input');
        hid.type = 'hidden';
        hid.name = 'lang';
        hid.value = lang;
        form.appendChild(hid);
      } else {
        form.querySelector('input[name="lang"]').value = lang;
      }
    }
  });
}

// === 新增：点击拦截兜底（处理运行时动态 href 变更/JS 导航等） ===
function attachClickInterceptor(getLang) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (a.target && a.target !== "_self") return; // 新窗口不拦截
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    if (!isSameOrigin(href)) return;
    if (a.dataset.keepLang === "false") return;
    const lang = getLang();
    const finalUrl = buildUrlWithLang(href, lang);
    if (finalUrl !== a.href) {
      e.preventDefault();
      window.location.href = finalUrl;
    }
  }, { capture: true });
}


const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const get = (obj, path) => path.split(".").reduce((o, k) => (o && o[k] != null) ? o[k] : undefined, obj);
const txt = (sel, v) => { const el = qs(sel); if (el && v != null) el.textContent = v; };

function deepMerge(target, src) {
  if (Array.isArray(target) && Array.isArray(src)) return src.slice(); // 以页面数组覆盖
  if (typeof target === 'object' && typeof src === 'object') {
    const out = { ...target };
    for (const k of Object.keys(src)) {
      out[k] = (k in target) ? deepMerge(target[k], src[k]) : src[k];
    }
    return out;
  }
  return src; // 以页面值覆盖
}

async function loadPack(lang) {
  const supported = ["zh", "ja", "en"];
  const L = supported.includes(lang) ? lang : "en";
  const page = getPageName();

  // 先全局
  const baseRes = await fetch(`/i18n/${L}.json`, { cache: "no-store" });
  if (!baseRes.ok) throw new Error("i18n base load failed: " + baseRes.status);
  const base = await baseRes.json();

  // 再页面（可不存在）
  let merged = base;
  try {
    const pageRes = await fetch(`/i18n/${page}/${L}.json`, { cache: "no-store" });
    if (pageRes.ok) {
      const pagePack = await pageRes.json();
      merged = deepMerge(base, pagePack); // 页面覆盖全局
    }
  } catch (_) { }

  I18N = merged;
  return L;
}



function applyI18n() {
  const L = I18N;
  if (!L) return;

  // 基本文案
  qsa("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = get(L, key);
    if (typeof val === "string") el.textContent = val;
  });

  // 列表渲染
  qsa("[data-i18n-list]").forEach(ul => {
    const key = ul.getAttribute("data-i18n-list");
    const arr = get(L, key) || [];
    ul.innerHTML = "";
    arr.forEach(v => {
      const li = document.createElement("li");
      li.textContent = v;
      ul.appendChild(li);
    });
  });

  // 团队卡片（按顺序覆盖）
  qsa("[data-i18n-team]").forEach((wrap, idx) => {
    const member = get(L, "teams.members." + idx);
    if (!member) return;
    const nameEl = qs(".member-name", wrap);
    const roleEl = qs(".member-role", wrap);
    const bioEl = qs(".member-bio", wrap);
    const linkEl = qs(".member-link", wrap);
    if (nameEl) nameEl.textContent = member.name;
    if (roleEl) roleEl.textContent = member.role;
    if (bioEl) bioEl.textContent = member.bio;
    if (linkEl) {
      if (member.link) {
        linkEl.href = member.link;
        const label = get(L, "ui.viewProfile") || "View";
        linkEl.textContent = label;
        linkEl.style.display = "";
      } else {
        linkEl.removeAttribute("href");
        linkEl.style.display = "none";
      }
    }
  });

  // Header/Footer
  txt("#site-name", get(L, "site.name"));
  txt("#site-motto", get(L, "site.motto"));
  txt("#footer-rights", get(L, "footer.rights"));

  // Index
  txt("#index-hero-title", get(L, "index.hero.title"));
  txt("#index-hero-sub", get(L, "index.hero.sub"));
  txt("#index-about-title", get(L, "index.about.title"));
  txt("#index-about-text", get(L, "index.about.text"));
  txt("#index-scope-title", get(L, "index.scope.title"));
  txt("#index-cta", get(L, "index.cta"));

  // Teams
  txt("#teams-hero-title", get(L, "teams.hero.title"));
  txt("#teams-hero-sub", get(L, "teams.hero.sub"));
  txt("#teams-title", get(L, "teams.title"));

  // Privacy（段落/列表用 renderPrivacySections 再补）
  txt("#privacy-hero-title", get(L, "privacy.hero.title"));
  txt("#privacy-hero-sub", get(L, "privacy.hero.sub"));
  txt("#privacy-updated", get(L, "privacy.updated"));

  // Services（副英雄 + CTA）
  txt(`[data-i18n="services.hero.title"]`, get(L, "services.hero.title"));
  txt(`[data-i18n="services.hero.sub"]`, get(L, "services.hero.sub"));
  txt(`[data-i18n="services.cta"]`, get(L, "services.cta"));

  // 导航文案
  ["about", "scope", "team", "privacy", "contact"].forEach(id => {
    qsa(`nav a[data-i18n="nav.${id}"]`).forEach(a => {
      a.textContent = get(L, `nav.${id}`);
    });
  });
}

function renderPrivacySections() {
  const S = (I18N && I18N.privacy && I18N.privacy.sections) || [];
  S.forEach((sec, i) => {
    const h = document.getElementById(`p-h-${i}`);
    if (h) h.textContent = sec.h || "";
    const p = document.getElementById(`p-p-${i}`);
    if (p) p.textContent = sec.p || "";
    const ul = document.getElementById(`p-l-${i}`);
    if (ul) {
      ul.innerHTML = "";
      (sec.list || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
    }
  });
}

async function initI18n() {
  // 1) 读取并固化到 <html lang> + URL + localStorage
  let lang = getCurrentLang();
  lang = setCurrentLang(lang);

  // 2) 加载包并渲染
  await loadPack(lang);
  translateAllTemplates();
  applyI18n();
  renderPrivacySections();

  // 3) 改写站内链接与表单
  rewriteAllLinks(lang);
  rewriteAllForms(lang);

  // 4) 监听语言下拉切换
  const sel = document.getElementById("langSelect");
  if (sel) {
    sel.value = lang;
    sel.addEventListener("change", async (e) => {
      const l = e.target.value;
      setCurrentLang(l);
      await loadPack(l);
      translateAllTemplates();
      applyI18n();
      renderPrivacySections();
      rewriteAllLinks(l);
      rewriteAllForms(l);
    });
  }

  // 5) 监听 DOM 变化（模板/异步插入的新链接/表单也带 lang）
  const mo = new MutationObserver(() => {
    const cur = getCurrentLang();
    rewriteAllLinks(cur);
    rewriteAllForms(cur);
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // 6) 安装点击拦截兜底
  attachClickInterceptor(getCurrentLang);
}

window.addEventListener("DOMContentLoaded", initI18n);


function translateNode(root) {
  if (!I18N) return;
  // 基本文案
  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = get(I18N, key);
    if (typeof val === "string") el.textContent = val;
  });
  // 列表（仅当你确实在模板里用到了 data-i18n-list）
  root.querySelectorAll("[data-i18n-list]").forEach(ul => {
    const key = ul.getAttribute("data-i18n-list");
    const arr = get(I18N, key) || [];
    ul.innerHTML = "";
    arr.forEach(v => {
      const li = document.createElement("li");
      li.textContent = v;
      ul.appendChild(li);
    });
  });
}

function translateAllTemplates() {
  // 把每个 <template> 的 content 先翻译好
  document.querySelectorAll("template").forEach(tpl => {
    const frag = tpl.content;    // DocumentFragment
    translateNode(frag);
  });
}


function getPageName() {
  // /a/b/services-ai.html -> "services-ai"
  // /index.html 或根路径 -> "index"
  let p = location.pathname;
  if (p.endsWith('/')) p = p.slice(0, -1);
  const base = p.split('/').pop() || 'index';
  return base.replace(/\.(html?|php|asp|aspx)$/, '') || 'index';
}