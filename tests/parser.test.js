import { describe, expect, it } from "vitest";
import { extractChaiClasses, parseChaiClass } from "../src/parser.js";

describe("parser", () => {
    it("parses static utility", () => {
        expect(parseChaiClass("brew-flex")).toEqual({
            raw: "brew-flex",
            utility: "flex",
            value: null
        });
    });

    it("parses value utility", () => {
        expect(parseChaiClass("brew-p-10")).toEqual({
            raw: "brew-p-10",
            utility: "p",
            value: "10"
        });
    });

    it("returns null for invalid utility", () => {
        expect(parseChaiClass("brew-unknown-10")).toBeNull();
    });

    it("extracts only chai classes", () => {
        const classList = new Set(["brew-p-10", "btn", "brew-text-red"]);
        expect(extractChaiClasses(classList)).toEqual(["brew-p-10", "brew-text-red"]);
    });
});
