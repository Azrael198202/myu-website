// ---------- I18N 语言包 ----------
const I18N = {
    zh: {
        site: { name: "迈域科技 MyuTech", motto: "智能 · 融合 · 创新 · 连接未来" },
        nav: { about: "公司介绍", scope: "业务范围", team: "团队", privacy: "隐私政策", contact: "联系我们" },
        footer: { rights: "© 2025 迈域科技有限公司 | All Rights Reserved" },
        ui: { viewProfile: "联系/档案" },

        index: {
            hero: { title: "迈向未来的智能世界", sub: "专注 AI · XR · IoT · 云计算 等前沿技术的融合与创新" },
            about: {
                title: "公司简介",
                text: "迈域科技（MyuTech）是一家面向未来的高科技企业，专注于计算机软硬件、人工智能、虚拟现实（VR）、增强现实（AR）、混合现实（MR）、物联网及云计算等领域的创新研发。我们致力于为全球企业提供领先的数字化解决方案与智能化服务。"
            },
            scope: {
                title: "主要业务范围",
                items: [
                    "💡 计算机软硬件的研发、设计、生产、销售及技术服务",
                    "🤖 人工智能、VR/AR/MR 技术的研发与应用",
                    "☁️ 物联网、云计算、大数据、区块链、移动互联网技术开发与咨询",
                    "🛰️ 网络系统集成、信息系统集成服务、数据处理与存储服务",
                    "🧩 软件外包、信息技术外包（ITO）、业务流程外包（BPO）",
                    "🏢 企业信息化建设咨询、数字化转型解决方案设计与实施",
                    "📱 电子产品、智能设备、可穿戴设备、计算机及配件的销售与维护",
                    "🌐 技术进出口、货物进出口业务",
                    "👩‍💻 信息技术人员与软件工程师的派遣与管理服务"
                ]
            },
            cta: "了解更多"
        },

        teams: {
            hero: { title: "我们的团队", sub: "跨学科 · 融合创新 · 面向未来" },
            title: "核心成员",
            members: [
                { name: "Alex Chen", role: "首席执行官 · CEO", bio: "连续创业者，专注 AI 与产业数字化落地，擅长战略规划与产品增长。", link: "mailto:contact@myutech.com?subject=To%20Alex%20Chen" },
                { name: "Mei Nakamura", role: "首席技术官 · CTO", bio: "主导 AI、XR、IoT 融合架构，关注高可用云原生与边缘智能。", link: "mailto:contact@myutech.com?subject=To%20Mei%20Nakamura" },
                { name: "Ryo Suzuki", role: "产品总监 · Head of Product", bio: "将复杂技术转译为可用产品体验，热衷数据驱动与设计系统。", link: "mailto:contact@myutech.com?subject=To%20Ryo%20Suzuki" },
                { name: "Lily Wang", role: "解决方案架构师", bio: "专注企业信息化与数字化转型方案设计与实施。", link: "mailto:contact@myutech.com?subject=To%20Lily%20Wang" }
            ]
        },

        privacy: {
            hero: { title: "隐私政策", sub: "我们重视并保护您的个人信息与数据安全" },
            updated: "生效日期：2025-10-28",
            sections: [
                { h: "总则", p: "我们承诺依法、合规、透明地处理您的个人信息。本政策适用于我们的网站、产品与服务。" },
                {
                    h: "我们收集的信息", list: [
                        "账户信息：姓名、联系方式、公司名称等；",
                        "技术信息：设备信息、浏览器类型、IP 地址、Cookie/本地存储；",
                        "使用数据：访问日志、操作记录、错误日志、性能指标；",
                        "业务数据：为提供 ITO/BPO/外包/系统集成等服务所必需的数据。"
                    ]
                },
                {
                    h: "信息的使用", list: [
                        "提供、维护与改进我们的产品与服务；",
                        "客户支持、故障排查、安全审计与风控；",
                        "履行合同、遵守法律与监管要求；",
                        "经您授权的其他用途（例如订阅、活动通知）。"
                    ]
                },
                { h: "Cookie 与同类技术", p: "用于会话保持、偏好设置、统计分析与安全防护。您可在浏览器中管理或拒绝 Cookie，但部分功能可能受限。" },
                { h: "信息的共享与第三方", p: "仅在依法依规、履行合同必要、或与受信任供应商合作时共享，并监督第三方遵守数据保护义务。" },
                { h: "数据跨境与存储", p: "如涉及跨境传输，我们将依据适用法律采取必要的安全措施，并按最小化和期限原则保存数据。" },
                { h: "安全措施", p: "采用加密、访问控制、最小权限、日志审计、备份容灾等措施降低风险。" },
                { h: "未成年人保护", p: "我们不会主动针对未成年人提供服务或收集其个人信息；若被发现将及时删除。" },
                {
                    h: "您的权利", list: [
                        "访问、更正、删除您的个人信息；",
                        "撤回授权、限制处理或提出异议；",
                        "数据可携权（在法律允许范围内）。"
                    ]
                },
                { h: "联系我们", p: "如有疑问，请联系：contact@myutech.com" }
            ]
        }
    },

    ja: {
        site: { name: "迈域科技 MyuTech", motto: "インテリジェンス・融合・イノベーション・未来へ接続" },
        nav: { about: "会社紹介", scope: "事業範囲", team: "チーム", privacy: "プライバシー", contact: "お問い合わせ" },
        footer: { rights: "© 2025 MyuTech Co., Ltd. | All Rights Reserved" },
        ui: { viewProfile: "連絡/プロフィール" },

        index: {
            hero: { title: "未来のインテリジェント世界へ", sub: "AI・XR・IoT・クラウドの先端融合に注力" },
            about: {
                title: "会社概要",
                text: "MyuTech は、コンピュータのソフト・ハード、AI、VR/AR/MR、IoT、クラウド分野の研究開発に注力し、企業のデジタル変革を支援します。"
            },
            scope: {
                title: "主な事業範囲",
                items: [
                    "💡 コンピュータ ソフト/ハードの研究開発・設計・製造・販売・技術サービス",
                    "🤖 AI、VR/AR/MR 技術の研究開発と応用",
                    "☁️ IoT、クラウド、ビッグデータ、ブロックチェーン、モバイルインターネットの開発・コンサル",
                    "🛰️ ネットワーク/情報システム統合、データ処理・ストレージサービス",
                    "🧩 ソフトウェア開発外注、ITO、BPO",
                    "🏢 企業情報化コンサル、DX ソリューション設計・実装",
                    "📱 電子製品・スマート/ウェアラブルデバイス・PC/周辺機器の販売と保守",
                    "🌐 技術/貨物の輸出入業務",
                    "👩‍💻 IT 人材・ソフトウェアエンジニアの派遣・管理"
                ]
            },
            cta: "もっと見る"
        },

        teams: {
            hero: { title: "私たちのチーム", sub: "学際的・融合型・未来志向" },
            title: "コアメンバー",
            members: [
                { name: "Alex Chen", role: "最高経営責任者 · CEO", bio: "連続起業家。AI と産業 DX の実装に注力し、戦略設計と製品成長に精通。", link: "mailto:contact@myutech.com?subject=To%20Alex%20Chen" },
                { name: "Mei Nakamura", role: "最高技術責任者 · CTO", bio: "AI・XR・IoT の統合アーキテクチャを主導。クラウドネイティブ/エッジに注力。", link: "mailto:contact@myutech.com?subject=To%20Mei%20Nakamura" },
                { name: "Ryo Suzuki", role: "プロダクト責任者 · Head of Product", bio: "複雑な技術を体験へ転換。データドリブンとデザインシステムを重視。", link: "mailto:contact@myutech.com?subject=To%20Ryo%20Suzuki" },
                { name: "Lily Wang", role: "ソリューションアーキテクト", bio: "企業情報化と DX ソリューションの設計・実装を担当。", link: "mailto:contact@myutech.com?subject=To%20Lily%20Wang" }
            ]
        },

        privacy: {
            hero: { title: "プライバシーポリシー", sub: "個人情報とデータの安全を重視します" },
            updated: "施行日：2025-10-28",
            sections: [
                { h: "総則", p: "当社は法令に基づき、透明性をもって個人情報を取り扱います。本ポリシーは当社のサイト・製品・サービスに適用されます。" },
                {
                    h: "収集情報", list: [
                        "アカウント情報：氏名、連絡先、会社名 等",
                        "技術情報：デバイス、ブラウザ種別、IP、Cookie/ローカルストレージ 等",
                        "利用データ：アクセスログ、操作記録、エラーログ、パフォーマンス指標",
                        "業務データ：ITO/BPO/統合サービス提供に必要なデータ"
                    ]
                },
                {
                    h: "利用目的", list: [
                        "製品・サービスの提供/維持/改善",
                        "サポート、障害対応、セキュリティ監査、リスク管理",
                        "契約履行、法令順守",
                        "同意に基づく用途（購読、イベント通知 等）"
                    ]
                },
                { h: "Cookie 等", p: "セッション維持、設定、統計、セキュリティのために使用。ブラウザで管理/拒否可能ですが、一部機能が制限される場合があります。" },
                { h: "第三者提供", p: "法令順守、契約履行、信頼できる委託先との協業時のみ共有し、適切に監督します。" },
                { h: "越境移転と保存", p: "越境移転がある場合は適用法に基づく安全措置を講じ、最小限・保存期間の原則で取り扱います。" },
                { h: "安全対策", p: "暗号化、アクセス制御、最小権限、監査、バックアップ等でリスク低減。" },
                { h: "未成年者保護", p: "未成年者を対象としたサービスや情報収集は行いません。判明した場合は削除します。" },
                {
                    h: "ユーザーの権利", list: [
                        "個人情報へのアクセス、訂正、削除",
                        "同意撤回、処理の制限/異議",
                        "データポータビリティ（法の範囲内）"
                    ]
                },
                { h: "お問い合わせ", p: "ご質問は：contact@myutech.com まで" }
            ]
        }
    },

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
                {
                    h: "Information We Collect", list: [
                        "Account data: name, contact, company, etc.",
                        "Technical data: device, browser, IP, cookies/local storage",
                        "Usage data: access logs, actions, errors, performance metrics",
                        "Business data: data necessary to provide ITO/BPO/integration services"
                    ]
                },
                {
                    h: "How We Use Data", list: [
                        "Provide, maintain and improve products and services",
                        "Support, troubleshooting, security audits and risk control",
                        "Contract performance and legal compliance",
                        "Other purposes with your consent (subscriptions, event notices)"
                    ]
                },
                { h: "Cookies & Similar Tech", p: "Used for sessions, preferences, analytics and security. You can manage/disable cookies in your browser; some features may be limited." },
                { h: "Sharing with Third Parties", p: "Shared only for legal compliance, contract performance, or with trusted vendors under proper safeguards." },
                { h: "Cross-border Transfer & Storage", p: "We adopt safeguards for cross-border transfers and retain data under minimization and retention principles." },
                { h: "Security Measures", p: "Encryption, access control, least privilege, auditing and backups to reduce risk." },
                { h: "Children’s Privacy", p: "We do not target minors or knowingly collect their data; we delete it if discovered." },
                {
                    h: "Your Rights", list: [
                        "Access, rectify, delete your data",
                        "Withdraw consent, restrict processing or object",
                        "Data portability (where permitted by law)"
                    ]
                },
                { h: "Contact Us", p: "Questions: contact@myutech.com" }
            ]
        }
    }
};

// ---------- DOM 工具 ----------
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const txt = (sel, v) => { const el = qs(sel); if (el && v != null) el.textContent = v; };
const get = (obj, path) => path.split(".").reduce((o, k) => (o && o[k] != null) ? o[k] : undefined, obj);

// ---------- 渲染 ----------
function setLang(lang) {
    const L = I18N[lang] || I18N.zh;
    document.documentElement.lang = lang;
    try { localStorage.setItem("myutech_lang", lang); } catch (e) { }

    // 基本文字
    qsa("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const val = get(L, key);
        if (typeof val === "string") el.textContent = val;
    });

    // 列表
    qsa("[data-i18n-list]").forEach(ul => {
        const key = ul.getAttribute("data-i18n-list");
        const arr = get(L, key) || [];
        ul.innerHTML = "";
        arr.forEach(txtVal => {
            const li = document.createElement("li");
            li.textContent = txtVal;
            ul.appendChild(li);
        });
    });

    // 团队
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
                linkEl.textContent = get(L, "ui.viewProfile") || "View";
                linkEl.style.display = "";
            } else {
                linkEl.removeAttribute("href");
                linkEl.style.display = "none";
            }
        }
    });

    // 页眉/页脚
    txt("#site-name", get(L, "site.name"));
    txt("#site-motto", get(L, "site.motto"));
    txt("#footer-rights", get(L, "footer.rights"));

    // 首页标题
    txt("#index-hero-title", get(L, "index.hero.title"));
    txt("#index-hero-sub", get(L, "index.hero.sub"));
    txt("#index-about-title", get(L, "index.about.title"));
    txt("#index-about-text", get(L, "index.about.text"));
    txt("#index-scope-title", get(L, "index.scope.title"));
    txt("#index-cta", get(L, "index.cta"));

    // 团队页标题
    txt("#teams-hero-title", get(L, "teams.hero.title"));
    txt("#teams-hero-sub", get(L, "teams.hero.sub"));
    txt("#teams-title", get(L, "teams.title"));

    // 隐私页
    txt("#privacy-hero-title", get(L, "privacy.hero.title"));
    txt("#privacy-hero-sub", get(L, "privacy.hero.sub"));
    txt("#privacy-updated", get(L, "privacy.updated"));

    // 导航文字（如果你的 nav 链接上也标了 data-i18n）
    ["about", "scope", "team", "privacy", "contact"].forEach(id => {
        qsa(`nav a[data-i18n="nav.${id}"]`).forEach(a => {
            a.textContent = get(L, `nav.${id}`);
        });
    });

    // 语言按钮高亮
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

function renderPrivacySections() {
    // 在 privacy.html 才会找到这些占位 id，其他页面不会报错
    const lang = document.documentElement.lang || "zh";
    const pack = I18N[lang] || I18N.zh;
    const S = (pack.privacy && pack.privacy.sections) || [];
    S.forEach((sec, i) => {
        const h = document.getElementById(`p-h-${i}`);
        if (h) h.textContent = sec.h || "";
        const p = document.getElementById(`p-p-${i}`);
        if (p && sec.p) p.textContent = sec.p;
        const ul = document.getElementById(`p-l-${i}`);
        if (ul && sec.list) {
            ul.innerHTML = "";
            sec.list.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                ul.appendChild(li);
            });
        }
    });
}

function initI18n() {
    const urlLang = new URLSearchParams(location.search).get("lang");
    let saved = "zh";
    try { saved = localStorage.getItem("myutech_lang") || "zh"; } catch (e) { }
    const lang = urlLang || saved || "zh";
    setLang(lang);
    renderPrivacySections();

    qsa(".lang-switch button").forEach(b => {
        b.addEventListener("click", () => {
            const l = b.dataset.lang;
            const u = new URL(location.href);
            u.searchParams.set("lang", l);
            history.replaceState({}, "", u);
            setLang(l);
            renderPrivacySections();
        });
    });
}

document.addEventListener("DOMContentLoaded", initI18n);
