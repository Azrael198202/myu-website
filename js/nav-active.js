function setActiveNav() {
  const file = (location.pathname.split("/").pop() || "index.html").split("#")[0];
  document.querySelectorAll("nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("#")[0] || "index.html";
    a.classList.toggle("active", href === file);
  });
}

(function () {
  const nav = document.getElementById('topNav');
  const bar = document.getElementById('subBar');
  const inner = document.getElementById('subBarInner');
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
    }, 120); // 轻微延时，避免抖动
  }

  // 主菜单 hover / focus
  nav.querySelectorAll('.yt-nav-item').forEach(a => {
    a.addEventListener('mouseenter', () => showBy(a.dataset.sub));
    a.addEventListener('focus', () => showBy(a.dataset.sub));
  });

  // 鼠标离开主菜单或子栏则收起
  nav.addEventListener('mouseleave', scheduleHide);
  bar.addEventListener('mouseleave', scheduleHide);

  // 子栏获得焦点时保持
  bar.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
  });

  // ESC 关闭（可选）
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') scheduleHide();
  });
})();