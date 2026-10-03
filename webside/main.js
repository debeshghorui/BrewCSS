const utilityData = [
    {
        name: "Padding",
        category: "Spacing",
        sample: "brew-p-24",
        output: "padding: 24px"
    },
    {
        name: "Margin",
        category: "Spacing",
        sample: "brew-m-16",
        output: "margin: 16px"
    },
    {
        name: "Background",
        category: "Colors",
        sample: "brew-bg-blue",
        output: "background-color: #3b82f6"
    },
    {
        name: "Text Color",
        category: "Colors",
        sample: "brew-text-white",
        output: "color: #ffffff"
    },
    {
        name: "Font Size",
        category: "Typography",
        sample: "brew-fs-20",
        output: "font-size: 20px"
    },
    {
        name: "Center Text",
        category: "Typography",
        sample: "brew-center",
        output: "text-align: center"
    },
    {
        name: "Border",
        category: "Border",
        sample: "brew-border-2",
        output: "border: 2px solid #000000"
    },
    {
        name: "Rounded",
        category: "Border",
        sample: "brew-rounded-16",
        output: "border-radius: 16px"
    },
    {
        name: "Border Color",
        category: "Border",
        sample: "brew-border-red",
        output: "border: 1px solid #ef4444"
    },
    {
        name: "Flex",
        category: "Layout",
        sample: "brew-flex",
        output: "display: flex"
    },
    {
        name: "Justify Center",
        category: "Layout",
        sample: "brew-justify-center",
        output: "justify-content: center"
    },
    {
        name: "Align Center",
        category: "Layout",
        sample: "brew-items-center",
        output: "align-items: center"
    }
];

const chipGroups = [
    {
        label: "Space",
        chips: ["brew-p-12", "brew-p-24", "brew-m-12"]
    },
    {
        label: "Color",
        chips: ["brew-bg-red", "brew-bg-blue", "brew-bg-green", "brew-bg-yellow", "brew-text-white", "brew-text-black"]
    },
    {
        label: "Type",
        chips: ["brew-fs-18", "brew-fs-24", "brew-fs-32", "brew-center"]
    },
    {
        label: "Box",
        chips: ["brew-border-2", "brew-border-red", "brew-rounded-8", "brew-rounded-24"]
    },
    {
        label: "Layout",
        chips: ["brew-flex", "brew-justify-center", "brew-items-center"]
    }
];

const presetData = [
    {
        name: "Card",
        classes: "brew-p-24 brew-bg-blue brew-text-white brew-rounded-16 brew-center"
    },
    {
        name: "Badge",
        classes: "brew-p-12 brew-bg-red brew-text-white brew-rounded-24 brew-fs-18 brew-center"
    },
    {
        name: "Outline",
        classes: "brew-p-20 brew-border-2 brew-rounded-16 brew-center"
    },
    {
        name: "Success",
        classes: "brew-p-16 brew-bg-green brew-text-white brew-rounded-8 brew-center brew-fs-18"
    },
    {
        name: "Warning",
        classes: "brew-p-16 brew-bg-yellow brew-text-black brew-rounded-8 brew-center brew-fs-18"
    },
    {
        name: "Flex row",
        classes: "brew-flex brew-justify-center brew-items-center brew-p-24 brew-bg-blue brew-text-white brew-rounded-16"
    }
];

const defaultPlaygroundClasses = presetData[0].classes;

const NPM_INSTALL = "npm install @debeshghorui/brewcss";
const NPM_USAGE = `import { initBrew } from "@debeshghorui/brewcss";

initBrew();`;

const CDN_SNIPPET = `<script src="https://cdn.jsdelivr.net/npm/@debeshghorui/brewcss@0.2.0/dist/index.browser.js"></script>
<script>
    window.initBrew();
</script>`;

const filters = ["All", ...new Set(utilityData.map((item) => item.category))];
let activeFilter = "All";

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    }[char]));
}

function swatchMarkup(output) {
    const match = String(output).match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/);
    if (!match) {
        return "";
    }
    return `<span class="swatch" style="background:${match[0]}"></span>`;
}

function renderUtilityGrid() {
    const grid = document.getElementById("utility-grid");
    if (!grid) {
        return;
    }

    const items = activeFilter === "All"
        ? utilityData
        : utilityData.filter((item) => item.category === activeFilter);

    grid.innerHTML = items
        .map(
            (item) => `<article class="utility-card" data-cat="${escapeHtml(item.category)}">
                <div class="card-top">
                    <p class="card-category">${escapeHtml(item.category)}</p>
                    ${swatchMarkup(item.output)}
                </div>
                <h3>${escapeHtml(item.name)}</h3>
                <code class="sample">${escapeHtml(item.sample)}</code>
                <p class="output">${escapeHtml(item.output)}</p>
            </article>`
        )
        .join("");
}

function renderFilters() {
    const bar = document.getElementById("utility-filters");
    if (!bar) {
        return;
    }

    bar.innerHTML = filters
        .map(
            (name) =>
                `<button class="filter-btn${name === activeFilter ? " is-active" : ""}" type="button" data-filter="${escapeHtml(name)}" aria-pressed="${name === activeFilter}">${escapeHtml(name)}</button>`
        )
        .join("");

    bar.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        const name = target.getAttribute("data-filter");
        if (!name) {
            return;
        }
        activeFilter = name;
        bar.querySelectorAll(".filter-btn").forEach((node) => {
            const selected = node.getAttribute("data-filter") === name;
            node.classList.toggle("is-active", selected);
            node.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        renderUtilityGrid();
    });
}

function renderChips() {
    const row = document.getElementById("chip-row");
    const input = document.getElementById("class-input");
    if (!row || !input) {
        return;
    }

    row.innerHTML = chipGroups
        .map(
            (group) => `<div class="chip-group">
                <p class="chip-label">${escapeHtml(group.label)}</p>
                <div class="chip-list">
                    ${group.chips
                        .map(
                            (chip) =>
                                `<button class="chip" type="button" data-chip="${escapeHtml(chip)}">${escapeHtml(chip.replace(/^brew-/, ""))}</button>`
                        )
                        .join("")}
                </div>
            </div>`
        )
        .join("");

    const getTokens = () =>
        input.value
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    const syncActiveChips = () => {
        const tokenSet = new Set(getTokens());
        row.querySelectorAll(".chip").forEach((node) => {
            const chip = node.getAttribute("data-chip");
            node.classList.toggle("is-active", Boolean(chip && tokenSet.has(chip)));
        });
    };

    row.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const chip = target.getAttribute("data-chip");
        if (!chip) {
            return;
        }

        const tokens = getTokens();
        const nextTokens = tokens.includes(chip)
            ? tokens.filter((token) => token !== chip)
            : [...tokens, chip];

        input.value = nextTokens.join(" ");
        input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    input.addEventListener("input", syncActiveChips);
    syncActiveChips();
}

function renderPresets() {
    const row = document.getElementById("preset-row");
    const input = document.getElementById("class-input");
    if (!row || !input) {
        return;
    }

    row.innerHTML = presetData
        .map(
            (preset) =>
                `<button class="preset-btn" type="button" data-preset="${escapeHtml(preset.name)}">${escapeHtml(preset.name)}</button>`
        )
        .join("");

    const syncActivePreset = () => {
        const current = input.value.trim().replace(/\s+/g, " ");
        row.querySelectorAll(".preset-btn").forEach((node) => {
            const name = node.getAttribute("data-preset");
            const found = presetData.find((item) => item.name === name);
            node.classList.toggle("is-active", Boolean(found && found.classes === current));
        });
    };

    row.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        const presetName = target.getAttribute("data-preset");
        if (!presetName) {
            return;
        }

        const found = presetData.find((item) => item.name === presetName);
        if (!found) {
            return;
        }

        input.value = found.classes;
        input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    input.addEventListener("input", syncActivePreset);
    syncActivePreset();
}

async function loadInitBrew() {
    const localBundleUrl = "../dist/index.browser.js";
    const cdnBundleUrl =
        "https://cdn.jsdelivr.net/npm/@debeshghorui/brewcss@0.2.0/dist/index.browser.js";

    const globalInit = window.initBrew || window.initbrew || window.initchai || window.initChai;
    if (typeof globalInit === "function") {
        return globalInit;
    }

    const urls = [localBundleUrl, cdnBundleUrl];

    for (const url of urls) {
        try {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = url;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load ${url}`));
                document.head.appendChild(script);
            });

            const loadedInit = window.initBrew || window.initbrew || window.initchai || window.initChai;
            if (typeof loadedInit === "function") {
                return loadedInit;
            }
        } catch (error) {
            console.warn(`Failed to load bundle from ${url}`, error);
        }
    }

    return null;
}

function setVersion(versionText) {
    const node = document.getElementById("pkg-version");
    if (node) {
        node.textContent = versionText;
    }
}

function setFooterYear() {
    const node = document.getElementById("footer-year");
    if (!node) {
        return;
    }
    node.textContent = String(new Date().getFullYear());
}

function wireNavbar() {
    const topbar = document.getElementById("site-topbar");
    const nav = document.getElementById("primary-nav");
    const toggle = document.getElementById("nav-toggle");
    const links = Array.from(document.querySelectorAll(".nav-link"));

    if (!topbar || !nav || !toggle || links.length === 0) {
        return;
    }

    const setActive = (id) => {
        links.forEach((link) => {
            const targetId = link.getAttribute("href")?.slice(1);
            const active = targetId === id;
            link.classList.toggle("is-active", active);
            if (active) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const closeMenu = () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
    };

    const openMenu = () => {
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
    };

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 860) {
                closeMenu();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target instanceof Node && !topbar.contains(event.target)) {
            closeMenu();
        }
    });

    const sectionTargets = [...new Set(
        links
            .map((link) => link.getAttribute("href")?.slice(1))
            .filter(Boolean)
    )]
        .map((id) => document.getElementById(id))
        .filter((node) => node instanceof HTMLElement);

    if (sectionTargets.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) {
                    setActive(visible.target.id);
                }
            },
            {
                rootMargin: "-20% 0px -55% 0px",
                threshold: [0.1, 0.25, 0.5]
            }
        );

        sectionTargets.forEach((section) => observer.observe(section));
    }

    const syncScrolledState = () => {
        topbar.classList.toggle("is-scrolled", window.scrollY > 6);
    };

    syncScrolledState();
    window.addEventListener("scroll", syncScrolledState, { passive: true });
}

function flashCopy(button) {
    if (button.dataset.copying === "1") {
        return;
    }

    const original = button.textContent;
    button.dataset.copying = "1";
    button.textContent = "Copied";
    button.classList.add("is-copied");
    window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove("is-copied");
        delete button.dataset.copying;
    }, 1200);
}

async function copyText(button, text) {
    try {
        await navigator.clipboard.writeText(text);
        flashCopy(button);
    } catch (error) {
        console.warn("Copy failed", error);
    }
}

function wirePlayground(initBrew) {
    const input = document.getElementById("class-input");
    const button = document.getElementById("apply-btn");
    const resetButton = document.getElementById("reset-btn");
    const autoApply = document.getElementById("auto-apply");
    const classCount = document.getElementById("class-count");
    const activeClasses = document.getElementById("active-classes");
    const stylesOutput = document.getElementById("styles-output");
    const preview = document.getElementById("preview");
    const copyClassesBtn = document.getElementById("copy-classes-btn");
    const copyStylesBtn = document.getElementById("copy-styles-btn");

    if (!input || !button || !resetButton || !autoApply || !classCount || !activeClasses || !preview || !initBrew) {
        return;
    }

    const getClassString = () => input.value.trim().replace(/\s+/g, " ");

    const updateMeta = (classes) => {
        const tokens = classes ? classes.split(" ") : [];
        classCount.textContent = String(tokens.length);
        activeClasses.textContent = classes || "-";
    };

    const updateGeneratedStyles = () => {
        if (!stylesOutput) {
            return;
        }

        const names = getClassString().split(" ").filter((name) => name.startsWith("brew-"));
        if (names.length === 0) {
            stylesOutput.textContent = "Add a brew-* class to generate CSS.";
            return;
        }

        const sheet = document.getElementById("brewcss")?.sheet;
        const blocks = [];

        names.forEach((name) => {
            const selector = `.${CSS.escape(name)}`;
            let found = false;

            if (sheet) {
                for (let i = 0; i < sheet.cssRules.length; i++) {
                    const rule = sheet.cssRules[i];
                    if (rule.selectorText !== selector || !rule.style) {
                        continue;
                    }
                    found = true;
                    const body = rule.style.cssText
                        .split(";")
                        .map((part) => part.trim())
                        .filter(Boolean)
                        .join(";\n  ");
                    blocks.push(`${selector} {\n  ${body};\n}`);
                }
            }

            if (!found) {
                blocks.push(`/* ${name} did not match a utility */`);
            }
        });

        stylesOutput.textContent = blocks.join("\n");
    };

    const apply = () => {
        const classes = getClassString();
        preview.className = classes ? `preview-box ${classes}` : "preview-box";
        updateMeta(classes);
        initBrew();
        updateGeneratedStyles();
    };

    button.addEventListener("click", apply);
    resetButton.addEventListener("click", () => {
        input.value = defaultPlaygroundClasses;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        apply();
    });

    input.addEventListener("input", () => {
        const classes = getClassString();
        updateMeta(classes);
        if (autoApply instanceof HTMLInputElement && autoApply.checked) {
            apply();
        }
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            apply();
        }
    });

    if (copyClassesBtn) {
        copyClassesBtn.addEventListener("click", () => {
            copyText(copyClassesBtn, getClassString());
        });
    }

    if (copyStylesBtn) {
        copyStylesBtn.addEventListener("click", () => {
            copyText(copyStylesBtn, stylesOutput ? stylesOutput.textContent || "" : "");
        });
    }

    apply();
}

function wireSnippetCopy() {
    const code = document.getElementById("cdn-code");
    const copyBtn = document.getElementById("copy-cdn-btn");
    const npmBtn = document.getElementById("copy-npm-btn");
    const usageBtn = document.getElementById("copy-usage-btn");

    if (code) {
        code.textContent = CDN_SNIPPET;
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => copyText(copyBtn, CDN_SNIPPET));
    }
    if (npmBtn) {
        npmBtn.addEventListener("click", () => copyText(npmBtn, NPM_INSTALL));
    }
    if (usageBtn) {
        usageBtn.addEventListener("click", () => copyText(usageBtn, NPM_USAGE));
    }
}

function showEngineError() {
    const preview = document.getElementById("preview");
    if (!preview) {
        return;
    }
    const note = document.createElement("p");
    note.className = "engine-error";
    note.textContent = "The BrewCSS bundle did not load. Run npm run build from the repo root, then reload.";
    preview.before(note);
}

async function initPage() {
    setFooterYear();
    wireNavbar();
    renderFilters();
    renderUtilityGrid();
    renderChips();
    renderPresets();
    wireSnippetCopy();

    const initBrew = await loadInitBrew();
    if (initBrew) {
        wirePlayground(initBrew);
    } else {
        setVersion("unavailable");
        showEngineError();
    }
}

initPage();
