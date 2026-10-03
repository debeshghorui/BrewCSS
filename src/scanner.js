import { ensureRule } from "./sheet.js";

export function scanElement(element) {
    const classList = element && element.classList;
    if (!classList || classList.length === 0) {
        return;
    }

    for (let i = 0; i < classList.length; i++) {
        const name = classList[i];
        if (name.startsWith("brew-")) {
            ensureRule(name);
        }
    }
}

export function scanDOM(root = document) {
    if (!root) {
        return;
    }

    if (root.classList) {
        scanElement(root);
    }

    if (!root.querySelectorAll) {
        return;
    }

    const nodes = root.querySelectorAll('[class*="brew-"]');
    for (let i = 0; i < nodes.length; i++) {
        scanElement(nodes[i]);
    }
}
