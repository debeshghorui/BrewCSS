import { parseBrewClass } from "./parser.js";
import { toDeclaration } from "./registry.js";

const injected = new Set();
let styleEl = null;

export function ensureRule(className) {
    if (styleEl && !styleEl.isConnected) {
        injected.clear();
        styleEl = null;
    }

    if (injected.has(className)) {
        return;
    }

    const declaration = toDeclaration(parseBrewClass(className));
    injected.add(className);
    if (!declaration) {
        return;
    }

    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "brewcss";
        (document.head || document.documentElement).appendChild(styleEl);
    }

    const cssSheet = styleEl.sheet;
    cssSheet.insertRule(
        `.${globalThis.CSS.escape(className)}{${declaration}}`,
        cssSheet.cssRules.length
    );
}
