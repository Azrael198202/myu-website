// js/i18n.js
let I18N = null;

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const get = (obj, path) => path.split(".").reduce((o, k) => (o && o[k] != null) ? o[k] : undefined, obj);
const txt = (sel, v) => { const el = qs(sel); if (el && v != null) el.textContent = v; };

async function loadPack(lang) {
  const supported = ["zh","ja","en"];
  const L = supported.includes(lang) ? lang : "en";
  // 用根路径，避免子目录 404
  const res = await fetch(`/i18n/${L}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error("i18n load failed: " + res.status);
  I18N = await res.json();
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
  const urlLang = new URLSearchParams(location.search).get("lang");
  let saved = "en";
  try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch(e){}
  const lang = urlLang || saved || "en";

  document.documentElement.lang = lang;
  await loadPack(lang);

  // 先翻译模板（template.content），再把模板克隆到页面，再翻译整个页面
  translateAllTemplates();
  //mountAllSubmenus(); // 若你已有挂载逻辑，这行可删
  applyI18n();
  renderPrivacySections();

  const sel = document.getElementById("langSelect");
  if (sel) {
    sel.value = lang;
    sel.addEventListener("change", async (e) => {
      const l = e.target.value;
      const u = new URL(location.href);
      u.searchParams.set("lang", l);
      history.replaceState({}, "", u);
      try { localStorage.setItem(STORAGE_KEY, l); } catch(e){}
      document.documentElement.lang = l;
      await loadPack(l);
      translateAllTemplates();
      applyI18n();
      renderPrivacySections();
    });
  }
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
