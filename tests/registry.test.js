import { describe, expect, it } from "vitest";
import { toDeclaration } from "../src/registry.js";

describe("registry", () => {
    it("maps spacing utility", () => {
        expect(toDeclaration({ utility: "p", value: "10" })).toBe("padding:10px");
    });

    it("maps color utility", () => {
        expect(toDeclaration({ utility: "bg", value: "red" })).toBe("background-color:#ef4444");
        expect(toDeclaration({ utility: "bg", value: "red-500" })).toBe("background-color:#ef4444");
        expect(toDeclaration({ utility: "text", value: "hex-fff" })).toBe("color:#fff");
    });

    it("maps layout utility", () => {
        expect(toDeclaration({ utility: "justify-center", value: null })).toBe("justify-content:center");
    });

    it("maps border width and border color", () => {
        expect(toDeclaration({ utility: "border", value: "2" })).toBe("border:2px solid #000000");
        expect(toDeclaration({ utility: "border", value: "red" })).toBe("border:1px solid #ef4444");
    });

    it("returns null for unsupported value", () => {
        expect(toDeclaration({ utility: "rounded", value: "banana" })).toBeNull();
    });
});
