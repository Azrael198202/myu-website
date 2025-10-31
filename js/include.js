// Inject partials from /partials via data-include="header/footer"
async function injectPartials() {
  const placeholders = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(placeholders.map(async (el) => {
    const name = el.getAttribute("data-include");
    const res = await fetch(`partials/${name}.html`, { cache: "no-store" });
    const html = await res.text();
    el.outerHTML = html;
  }));
}

(async function () {
  await injectPartials();
  if (typeof initI18n === "function") initI18n();
  if (typeof setActiveNav === "function") setActiveNav();
})();

// 返回顶部（用委托不需要等 footer 渲染完成）
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#footerBackToTop');
  if (!btn) return;
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 订阅表单：用 submit 事件 + 委托（Enter/点击按钮都可触发）
document.addEventListener('submit', (e) => {
  const form = e.target.closest('.footer-newsletter-form');
  if (!form) return;

  e.preventDefault();
  const input = form.querySelector('.footer-newsletter-input');
  const msgKey = 'footer.newsletter.success';
  const t = (window.i18n?.t) ? window.i18n.t.bind(window.i18n) : (k)=>({
    'footer.newsletter.success':'订阅成功，感谢关注！',
    'footer.newsletter.invalid':'请输入有效邮箱',
  }[k] || k);

  const email = (input?.value || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert(t('footer.newsletter.invalid'));
    return;
  }

  // TODO: 在这里发起你的订阅请求（fetch 到后端）
  // await fetch('/api/subscribe', {method:'POST', body: JSON.stringify({ email })})

  alert(t(msgKey));
  input.value = '';
});
