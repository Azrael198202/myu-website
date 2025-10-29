/* nav-active.js — robust init for included header */

(function () {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isFinePointer = matchMedia('(pointer:fine)').matches;
  const isDesktop = () => window.innerWidth > 900;

  // -------- 等待元素工具：支持 include 异步插入 --------
  function whenElementsReady(selectors, cb, { timeout = 8000, interval = 120 } = {}) {
    const needed = selectors.split(',').map(s => s.trim());
    const allPresent = () => needed.every(sel => !!qs(sel));

    // 如果此刻就齐了，直接回调
    if (allPresent()) return cb();

    // 1) MutationObserver 监听 DOM 变化
    const mo = new MutationObserver(() => {
      if (allPresent()) {
        mo.disconnect();
        clearInterval(timer);
        clearTimeout(kill);
        cb();
      }
    });
    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // 2) 轮询兜底
    const timer = setInterval(() => { if (allPresent()) { mo.disconnect(); clearInterval(timer); clearTimeout(kill); cb(); } }, interval);

    // 3) 超时兜底
    const kill = setTimeout(() => { mo.disconnect(); clearInterval(timer); console.warn('[MyuTech] 等待导航元素超时：', selectors); }, timeout);
  }

  // -------- 高亮当前页 --------
  function setActiveNav() {
    const file = (location.pathname.split('/').pop() || 'index.html').split('#')[0];
    qsa('#topNav a').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0] || 'index.html';
      a.classList.toggle('active', href === file);
    });
  }

  // -------- 初始化「桌面 hover 子菜单」--------
  function initDesktopSubbar() {
    const nav = qs('#topNav');
    const bar = qs('#subBar');
    const inner = qs('#subBarInner');

    if (!nav || !bar || !inner) {
      console.warn('[MyuTech] 子菜单元素缺失，跳过 hover 子菜单。', { nav, bar, inner });
      return;
    }

    let hideTimer = null;

    const showBy = (id) => {
      const tpl = qs(`#${id}`);
      if (!tpl) return;
      inner.innerHTML = tpl.innerHTML;
      bar.classList.add('show');
      bar.setAttribute('aria-hidden', 'false');
      clearTimeout(hideTimer);
    };

    const scheduleHide = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        bar.classList.remove('show');
        bar.setAttribute('aria-hidden', 'true');
        inner.innerHTML = '';
      }, 120);
    };

    if (isFinePointer) {
      qsa('.yt-nav-item', nav).forEach(a => {
        a.addEventListener('mouseenter', () => { if (isDesktop()) showBy(a.dataset.sub); });
        a.addEventListener('focus', () => showBy(a.dataset.sub));
      });
      nav.addEventListener('mouseleave', scheduleHide);
      bar.addEventListener('mouseleave', scheduleHide);
      bar.addEventListener('mouseenter', () => clearTimeout(hideTimer));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') scheduleHide(); });
    }

    console.log('[MyuTech] 桌面 hover 子菜单就绪');
  }

  // -------- 初始化「手机抽屉 + 手风琴」--------
  function initMobileDrawer() {
    const drawer = qs('#mDrawer');
    const mask = qs('#mDrawerMask');
    const btn = qs('#mMenuBtn');
    const closeBtn = qs('#mCloseBtn');

    if (!drawer || !mask || !closeBtn) {
      console.warn('[MyuTech] 手机菜单元素缺失，跳过抽屉。', { drawer, btn, mask, closeBtn });
      return;
    }

    const openDrawer = () => {
      drawer.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      qsa('.m-acc-head[aria-expanded="true"]', drawer).forEach(h => h.setAttribute('aria-expanded', 'false'));
    };

    btn.addEventListener('click', openDrawer);
    mask.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    // 手风琴
    qsa('.m-acc-head', drawer).forEach(head => {
      head.addEventListener('click', () => {
        const expanded = head.getAttribute('aria-expanded') === 'true';
        head.closest('.m-acc')
          .querySelectorAll('.m-acc-head[aria-expanded="true"]')
          .forEach(h => { if (h !== head) h.setAttribute('aria-expanded', 'false'); });
        head.setAttribute('aria-expanded', String(!expanded));
      });
    });

    console.log('[MyuTech] 手机抽屉就绪');
  }

  // -------- 一次性总初始化 --------
  function initAll() {
    setActiveNav();
    initDesktopSubbar();
    initMobileDrawer();
  }

  // 1) DOM 就绪后，等待 header 异步注入完成再 init
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[MyuTech] 等待导航元素注入…');
    whenElementsReady('#topNav,#subBar,#subBarInner,#mDrawer,#mMenuBtn,#mDrawerMask,#mCloseBtn', initAll);
  });

  // 2) 如果你的 include.js 在完成后会触发事件，可同时监听（可选）
  window.addEventListener('includes:ready', () => {
    console.log('[MyuTech] 收到 includes:ready 事件，尝试初始化导航…');
    whenElementsReady('#topNav,#subBar,#subBarInner,#mDrawer,#mMenuBtn,#mDrawerMask,#mCloseBtn', initAll);
  });
})();
