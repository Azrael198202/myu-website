function setActiveNav() {
  const file = (location.pathname.split("/").pop() || "index.html").split("#")[0];
  document.querySelectorAll("nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("#")[0] || "index.html";
    a.classList.toggle("active", href === file);
  });
}