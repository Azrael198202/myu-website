document.addEventListener('DOMContentLoaded', () => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const isFinePointer = matchMedia('(pointer:fine)').matches;
  const isDesktop = () => window.innerWidth > 900;

  console.log("[MyuTech] nav-active.js loaded.");

  /* ---------- 高亮当前导航 ---------- */
  function setActiveNav() {
    const file = (location.pathname.split("/").pop() || "index.html").split("#")[0];
    qsa("#topNav a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("#")[0] || "index.html";
      a.classList.toggle("active", href === file);
    });
  }
  setActiveNav();

  /* ---------- 桌面：悬停子菜单 ---------- */
  (() => {
    const nav = qs("#topNav");
    const bar = qs("#subBar");
    const inner = qs("#subBarInner");

    if (!nav || !bar || !inner) {
      console.warn("[MyuTech] 子菜单元素缺失，跳过 hover 子菜单功能。");
      return;
    }

    console.log("[MyuTech] 启用桌面 hover 子菜单。");

    let hideTimer = null;

    const showBy = (id) => {
      const tpl = qs(`#${id}`);
      if (!tpl) return;
      inner.innerHTML = tpl.innerHTML;
      bar.classList.add("show");
      bar.setAttribute("aria-hidden", "false");
      clearTimeout(hideTimer);
    };
    const scheduleHide = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        bar.classList.remove("show");
        bar.setAttribute("aria-hidden", "true");
        inner.innerHTML = "";
      }, 120);
    };

    if (isFinePointer) {
      qsa(".yt-nav-item", nav).forEach(a => {
        a.addEventListener("mouseenter", () => {
          if (isDesktop()) showBy(a.dataset.sub);
        });
        a.addEventListener("focus", () => showBy(a.dataset.sub));
      });
      nav.addEventListener("mouseleave", scheduleHide);
      bar.addEventListener("mouseleave", scheduleHide);
      bar.addEventListener("mouseenter", () => clearTimeout(hideTimer));
      document.addEventListener("keydown", e => { if (e.key === "Escape") scheduleHide(); });
    }
  })();

  /* ---------- 手机：抽屉 + 手风琴 ---------- */
  (() => {
    const drawer = qs("#mDrawer");
    const btn = qs("#mMenuBtn");
    const mask = qs("#mDrawerMask");
    const closeBtn = qs("#mCloseBtn");

    if (!drawer || !btn || !mask || !closeBtn) {
      console.warn("[MyuTech] 手机菜单元素缺失，跳过抽屉功能。");
      return;
    }

    console.log("[MyuTech] 启用手机抽屉菜单。");

    const openDrawer = () => {
      drawer.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      console.log("[MyuTech] 抽屉打开。");
    };
    const closeDrawer = () => {
      drawer.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      qsa(".m-acc-head[aria-expanded='true']", drawer)
        .forEach(h => h.setAttribute("aria-expanded", "false"));
      console.log("[MyuTech] 抽屉关闭。");
    };

    btn.addEventListener("click", openDrawer);
    mask.addEventListener("click", closeDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

    // 手风琴
    qsa(".m-acc-head", drawer).forEach(head => {
      head.addEventListener("click", () => {
        const expanded = head.getAttribute("aria-expanded") === "true";
        head.closest(".m-acc")
          .querySelectorAll(".m-acc-head[aria-expanded='true']")
          .forEach(h => { if (h !== head) h.setAttribute("aria-expanded", "false"); });
        head.setAttribute("aria-expanded", String(!expanded));
      });
    });
  })();
});
