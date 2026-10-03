const STATIC_UTILITIES = new Set([
    "center",
    "flex",
    "justify-center",
    "items-center"
]);

const VALUE_UTILITIES = new Set([
    "p",
    "m",
    "bg",
    "text",
    "fs",
    "border",
    "rounded"
]);

const cache = new Map();

function parseUncached(className) {
    if (!className || !className.startsWith("brew-")) {
        return null;
    }

    const payload = className.slice(5);
    if (!payload) {
        return null;
    }

    if (STATIC_UTILITIES.has(payload)) {
        return {
            raw: className,
            utility: payload,
            value: null
        };
    }

    const dash = payload.indexOf("-");
    if (dash <= 0) {
        return null;
    }

    const utility = payload.slice(0, dash);
    const value = payload.slice(dash + 1);
    if (!VALUE_UTILITIES.has(utility) || !value) {
        return null;
    }

    return {
        raw: className,
        utility,
        value
    };
}

export function parseBrewClass(className) {
    if (cache.has(className)) {
        return cache.get(className);
    }

    const parsed = parseUncached(className);
    cache.set(className, parsed);
    return parsed;
}

export function extractBrewClasses(classList) {
    const names = [];
    for (let i = 0; i < classList.length; i++) {
        const name = classList[i];
        if (name.startsWith("brew-")) {
            names.push(name);
        }
    }
    return names;
}
