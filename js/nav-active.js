document.addEventListener('DOMContentLoaded', () => {
  /* ---------- helpers ---------- */
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isFinePointer = matchMedia('(pointer:fine)').matches; // 仅桌面启用 hover
  const isDesktop = () => window.innerWidth > 900;

  /* ---------- 高亮当前导航 ---------- */
  function setActiveNav() {
    const file = (location.pathname.split("/").pop() || "index.html").split("#")[0];
    qsa("nav a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("#")[0] || "index.html";
      a.classList.toggle("active", href === file);
    });
  }
  setActiveNav();

  /* ---------- 顶部悬停子菜单（桌面） ---------- */
  (function () {
    const nav = document.getElementById('topNav');
    const bar = document.getElementById('subBar');
    const inner = document.getElementById('subBarInner');

    // 任何一个不存在就直接返回，避免报错
    if (!nav || !bar || !inner) return;

    const isFinePointer = window.matchMedia('(pointer:fine)').matches;
    const isDesktop = () => window.innerWidth > 900;

    let hideTimer = null;

    function showBy(id) {
      const tpl = document.getElementById(id);
      if (!tpl) return;
      inner.innerHTML = tpl.innerHTML;
      bar.classList.add('show');
      bar.setAttribute('aria-hidden', 'false');
      clearTimeout(hideTimer);
    }
    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        bar.classList.remove('show');
        bar.setAttribute('aria-hidden', 'true');
        inner.innerHTML = '';
      }, 120);
    }

    if (isFinePointer) {
      nav.querySelectorAll('.yt-nav-item').forEach(a => {
        a.addEventListener('mouseenter', () => { if (isDesktop()) showBy(a.dataset.sub); });
        a.addEventListener('focus', () => showBy(a.dataset.sub));
      });
      nav.addEventListener('mouseleave', scheduleHide);
      bar.addEventListener('mouseleave', scheduleHide);
      bar.addEventListener('mouseenter', () => clearTimeout(hideTimer));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') scheduleHide(); });
      window.addEventListener('scroll', scheduleHide, { passive: true });
      window.addEventListener('resize', scheduleHide);
    }
  })();


  /* ---------- 手机抽屉 + 手风琴 ---------- */
  (function () {
    const drawer = qs('#mDrawer');
    const btn = qs('#mMenuBtn');
    const mask = qs('#mDrawerMask');
    const closeBtn = qs('#mCloseBtn');
    if (!drawer || !btn || !mask || !closeBtn) return;

    const openDrawer = () => {
      drawer.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      drawer.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // 抽屉关闭时收起所有手风琴（可选）
      qsa('.m-acc-head[aria-expanded="true"]', drawer).forEach(h => h.setAttribute('aria-expanded', 'false'));
    };

    btn.addEventListener('click', openDrawer);
    mask.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    // 手风琴（同级单开）
    qsa('.m-acc-head', drawer).forEach(head => {
      head.addEventListener('click', () => {
        const expanded = head.getAttribute('aria-expanded') === 'true';
        head.closest('.m-acc')
          .querySelectorAll('.m-acc-head[aria-expanded="true"]')
          .forEach(h => { if (h !== head) h.setAttribute('aria-expanded', 'false'); });
        head.setAttribute('aria-expanded', String(!expanded));
      });
    });
  })();

  /* ---------- 语言切换（与桌面/手机同步） ---------- */
  (function () {
    const selects = ['#langSelect', '#langSelectMobile', '#langSelectMobile2']
      .map(id => qs(id))
      .filter(Boolean);

    const applyLang = (l) => {
      try { localStorage.setItem('myutech_lang', l); } catch (e) { }
      // 同步下拉
      selects.forEach(s => s.value = l);
      // 可选：刷新 URL 的 ?lang
      const u = new URL(location.href);
      u.searchParams.set('lang', l);
      history.replaceState({}, '', u);
      // 如你项目里有 setLang() （多语言渲染函数），这里调用即可：
      if (typeof window.setLang === 'function') window.setLang(l);
    };

    selects.forEach(s => s.addEventListener('change', e => applyLang(e.target.value || 'zh')));

    // 初始化（URL > localStorage > zh）
    const initial = new URLSearchParams(location.search).get('lang')
      || (() => { try { return localStorage.getItem('myutech_lang'); } catch (e) { return null; } })()
      || 'zh';
    applyLang(initial);
  })();
});
