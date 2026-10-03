import { describe, expect, it } from "vitest";
import { extractBrewClasses, parseBrewClass } from "../src/parser.js";

describe("parser", () => {
    it("parses static utility", () => {
        expect(parseBrewClass("brew-flex")).toEqual({
            raw: "brew-flex",
            utility: "flex",
            value: null
        });
    });

    it("parses value utility", () => {
        expect(parseBrewClass("brew-p-10")).toEqual({
            raw: "brew-p-10",
            utility: "p",
            value: "10"
        });
    });

    it("returns null for invalid utility", () => {
        expect(parseBrewClass("brew-unknown-10")).toBeNull();
    });

    it("reuses the cached parse result", () => {
        expect(parseBrewClass("brew-m-4")).toBe(parseBrewClass("brew-m-4"));
    });

    it("extracts only brew classes", () => {
        const classList = ["brew-p-10", "btn", "brew-text-red"];
        expect(extractBrewClasses(classList)).toEqual(["brew-p-10", "brew-text-red"]);
    });
});
