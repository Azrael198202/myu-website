// 顶部导航 & 语言联动 & 手机抽屉
document.addEventListener('DOMContentLoaded', () => {
  const qs  = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isFinePointer = matchMedia('(pointer:fine)').matches;
  const isDesktop = () => window.innerWidth > 900;

  /* 高亮当前导航 */
  function setActiveNav() {
    const file = (location.pathname.split('/').pop() || 'index.html').split('#')[0];
    qsa('#topNav a').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0] || 'index.html';
      a.classList.toggle('active', href === file);
    });
  }
  setActiveNav();

  /* 桌面：悬停子菜单横栏 */
  (() => {
    const nav   = qs('#topNav');
    const bar   = qs('#subBar');
    const inner = qs('#subBarInner');

    if (!nav || !bar || !inner) return; // 缺元素直接跳过（避免报错）

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
        a.addEventListener('focus',      () => showBy(a.dataset.sub));
      });
      nav.addEventListener('mouseleave', scheduleHide);
      bar.addEventListener('mouseleave', scheduleHide);
      bar.addEventListener('mouseenter', () => clearTimeout(hideTimer));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') scheduleHide(); });
      window.addEventListener('scroll', scheduleHide, { passive: true });
      window.addEventListener('resize', scheduleHide);
    }
  })();

  /* 手机：抽屉 + 手风琴 */
  (() => {
    const drawer  = qs('#mDrawer');
    const btn     = qs('#mMenuBtn');
    const mask    = qs('#mDrawerMask');
    const closeBtn= qs('#mCloseBtn');
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
      qsa('.m-acc-head[aria-expanded="true"]', drawer)
        .forEach(h => h.setAttribute('aria-expanded', 'false'));
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

  /* 语言选择：桌面与手机联动 */
  (() => {
    const selects = ['#langSelect', '#langSelectMobile2']
      .map(id => qs(id))
      .filter(Boolean);

    const applyLang = (l) => {
      // 同步 UI
      selects.forEach(s => (s.value = l));
      // 写入 localStorage & URL ?lang
      try { localStorage.setItem('myutech_lang', l); } catch {}
      const u = new URL(location.href);
      u.searchParams.set('lang', l);
      history.replaceState({}, '', u);
      // 如果你的项目里定义了 setLang()，这里自动调用
      if (typeof window.setLang === 'function') window.setLang(l);
    };

    selects.forEach(s => s.addEventListener('change', e => applyLang(e.target.value || 'zh')));

    const initial = new URLSearchParams(location.search).get('lang')
      || (() => { try { return localStorage.getItem('myutech_lang'); } catch { return null; } })()
      || 'zh';
    applyLang(initial);
  })();
});
