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