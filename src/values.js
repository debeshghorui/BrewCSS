const COLORS = {
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280",
    "gray-100": "#f3f4f6",
    "gray-900": "#111827",
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#f59e0b"
};

const LENGTH = /^(-?\d+(?:\.\d+)?)(px|rem|em|%|vh|vw|vmin|vmax|pt|pct)?$/;
const HEX = /^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/;

export function normalizeLength(value) {
    if (typeof value !== "string" || value.length === 0) {
        return null;
    }

    const match = LENGTH.exec(value.trim().toLowerCase());
    if (!match) {
        return null;
    }

    const unit = match[2];
    if (!unit) {
        return `${match[1]}px`;
    }

    if (unit === "pct") {
        return `${match[1]}%`;
    }

    return match[0];
}

export function resolveColor(value) {
    if (typeof value !== "string" || value.length === 0) {
        return null;
    }

    let token = value.trim().toLowerCase();
    if (token.endsWith("-500")) {
        token = token.slice(0, -4);
    }

    if (COLORS[token]) {
        return COLORS[token];
    }

    if (token.startsWith("hex-")) {
        token = `#${token.slice(4)}`;
    }

    return HEX.test(token) ? token : null;
}
