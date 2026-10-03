import { normalizeLength, resolveColor } from "./values.js";

function lengthDecl(property, value) {
    const length = normalizeLength(value);
    return length ? `${property}:${length}` : null;
}

const registry = {
    p: (value) => lengthDecl("padding", value),
    m: (value) => lengthDecl("margin", value),
    fs: (value) => lengthDecl("font-size", value),
    rounded: (value) => lengthDecl("border-radius", value),
    bg(value) {
        const color = resolveColor(value);
        return color ? `background-color:${color}` : null;
    },
    text(value) {
        const color = resolveColor(value);
        return color ? `color:${color}` : null;
    },
    border(value) {
        const width = normalizeLength(value);
        if (width) {
            return `border:${width} solid #000000`;
        }

        const color = resolveColor(value);
        return color ? `border:1px solid ${color}` : null;
    },
    center: () => "text-align:center",
    flex: () => "display:flex",
    "justify-center": () => "justify-content:center",
    "items-center": () => "align-items:center"
};

export function toDeclaration(parsed) {
    if (!parsed) {
        return null;
    }

    const compile = registry[parsed.utility];
    return compile ? compile(parsed.value) : null;
}
