en: {
    site: { name: "MyuTech", motto: "Intelligence · Integration · Innovation · Connected Future" },
    nav: { about: "About", scope: "Services", team: "Team", privacy: "Privacy", contact: "Contact" },
    footer: { rights: "© 2025 MyuTech Co., Ltd. | All Rights Reserved" },
    ui: { viewProfile: "Contact / Profile" },

    index: {
      hero: { title: "Towards an Intelligent Future", sub: "Fusing AI · XR · IoT · Cloud into real-world innovation" },
      about: {
        title: "About Us",
        text: "MyuTech focuses on R&D across computer software/hardware, AI, VR/AR/MR, IoT and Cloud. We deliver leading digital-transformation solutions and intelligent services for global enterprises."
      },
      scope: {
        title: "Core Service Scope",
        items: [
          "💡 R&D, design, manufacturing, sales & technical services for software and hardware",
          "🤖 R&D and applications of AI, VR/AR/MR technologies",
          "☁️ IoT, Cloud, Big Data, Blockchain, Mobile Internet development & consulting",
          "🛰️ Network & information system integration; data processing & storage services",
          "🧩 Software outsourcing, ITO, and BPO services",
          "🏢 Enterprise IT consulting and DX solution design & implementation",
          "📱 Sales & maintenance of electronics, smart/wearable devices, computers & accessories",
          "🌐 Technology and goods import/export",
          "👩‍💻 Dispatch & management services for IT professionals and software engineers"
        ]
      },
      cta: "Learn More"
    },

    teams: {
      hero: { title: "Our Team", sub: "Interdisciplinary · Integrated · Future-Oriented" },
      title: "Core Members",
      members: [
        { name: "Alex Chen", role: "Chief Executive Officer · CEO", bio: "Serial entrepreneur focused on AI and digital transformation; expert in strategy and product growth.", link: "mailto:contact@myutech.com?subject=To%20Alex%20Chen" },
        { name: "Mei Nakamura", role: "Chief Technology Officer · CTO", bio: "Leads AI/XR/IoT integration; focuses on cloud-native HA and edge intelligence.", link: "mailto:contact@myutech.com?subject=To%20Mei%20Nakamura" },
        { name: "Ryo Suzuki", role: "Head of Product", bio: "Translates complex tech into usable experiences; passionate about data-driven design systems.", link: "mailto:contact@myutech.com?subject=To%20Ryo%20Suzuki" },
        { name: "Lily Wang", role: "Solution Architect", bio: "Specialized in enterprise digital transformation and solution architecture.", link: "mailto:contact@myutech.com?subject=To%20Lily%20Wang" }
      ]
    },

    privacy: {
      hero: { title: "Privacy Policy", sub: "We value and protect your personal data and security" },
      updated: "Effective: 2025-10-28",
      sections: [
        { h: "General", p: "We process personal data lawfully, fairly and transparently. This policy applies to our sites, products and services." },
        { h: "Information We Collect", list: [
          "Account data: name, contact, company, etc.",
          "Technical data: device, browser, IP, cookies/local storage",
          "Usage data: access logs, actions, errors, performance metrics",
          "Business data: data necessary to provide ITO/BPO/integration services"
        ]},
        { h: "How We Use Data", list: [
          "Provide, maintain and improve products and services",
          "Support, troubleshooting, security audits and risk control",
          "Contract performance and legal compliance",
          "Other purposes with your consent (subscriptions, event notices)"
        ]},
        { h: "Cookies & Similar Tech", p: "Used for sessions, preferences, analytics and security. You can manage/disable cookies in your browser; some features may be limited." },
        { h: "Sharing with Third Parties", p: "Shared only for legal compliance, contract performance, or with trusted vendors under proper safeguards." },
        { h: "Cross-border Transfer & Storage", p: "We adopt safeguards for cross-border transfers and retain data under minimization and retention principles." },
        { h: "Security Measures", p: "Encryption, access control, least privilege, auditing and backups to reduce risk." },
        { h: "Children’s Privacy", p: "We do not target minors or knowingly collect their data; we delete it if discovered." },
        { h: "Your Rights", list: [
          "Access, rectify, delete your data",
          "Withdraw consent, restrict processing or object",
          "Data portability (where permitted by law)"
        ]},
        { h: "Contact Us", p: "Questions: contact@myutech.com" }
      ]
    }
  }
};

// ---------- DOM helpers ----------
const qs  = (sel, root=document) => root.querySelector(sel);
const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const txt = (sel, v) => { const el = qs(sel); if (el && v != null) el.textContent = v; };
const get = (obj, path) => path.split(".").reduce((o, k) => (o && o[k] != null) ? o[k] : undefined, obj);

// ---------- Renderers ----------
function setLang(lang) {
  const L = I18N[lang] || I18N.zh;
  document.documentElement.lang = lang;
  try { localStorage.setItem("myutech_lang", lang); } catch(e){}

  // Basic text
  qsa("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = get(L, key);
    if (typeof val === "string") el.textContent = val;
  });

  // Lists
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

  // Team cards
  qsa("[data-i18n-team]").forEach((wrap, idx) => {
    const member = get(L, "teams.members." + idx);
    if (!member) return;
    const nameEl = qs(".member-name", wrap);
    const roleEl = qs(".member-role", wrap);
    const bioEl  = qs(".member-bio",  wrap);
    const linkEl = qs(".member-link", wrap);
    if (nameEl) nameEl.textContent = member.name;
    if (roleEl) roleEl.textContent = member.role;
    if (bioEl)  bioEl.textContent  = member.bio;
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
  txt("#site-name",  get(L, "site.name"));
  txt("#site-motto", get(L, "site.motto"));
  txt("#footer-rights", get(L, "footer.rights"));

  // Index
  txt("#index-hero-title", get(L, "index.hero.title"));
  txt("#index-hero-sub",   get(L, "index.hero.sub"));
  txt("#index-about-title",get(L, "index.about.title"));
  txt("#index-about-text", get(L, "index.about.text"));
  txt("#index-scope-title",get(L, "index.scope.title"));
  txt("#index-cta",        get(L, "index.cta"));

  // Teams
  txt("#teams-hero-title", get(L, "teams.hero.title"));
  txt("#teams-hero-sub",   get(L, "teams.hero.sub"));
  txt("#teams-title",      get(L, "teams.title"));

  // Privacy
  txt("#privacy-hero-title", get(L, "privacy.hero.title"));
  txt("#privacy-hero-sub",   get(L, "privacy.hero.sub"));
  txt("#privacy-updated",    get(L, "privacy.updated"));

  // Update select current value
  const sel = document.getElementById("langSelect");
  if (sel && sel.value !== lang) sel.value = lang;

  // Update nav labels if marked
  ["about","scope","team","privacy","contact"].forEach(id => {
    qsa(`nav a[data-i18n="nav.${id}"]`).forEach(a => {
      a.textContent = get(L, `nav.${id}`);
    });
  });
}

function renderPrivacySections() {
  const lang = document.documentElement.lang || "zh";
  const pack = I18N[lang] || I18N.zh;
  const S = (pack.privacy && pack.privacy.sections) || [];
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

// ---------- Init ----------
function initI18n(){
  const urlLang = new URLSearchParams(location.search).get("lang");
  let saved = "zh";
  try { saved = localStorage.getItem("myutech_lang") || "zh"; } catch(e){}
  const lang = urlLang || saved || "zh";
  setLang(lang);
  renderPrivacySections();

  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.addEventListener("change", e => {
      const l = e.target.value;
      const u = new URL(location.href);
      u.searchParams.set("lang", l);
      history.replaceState({}, "", u);
      setLang(l);
      renderPrivacySections();
    });
  }
}
