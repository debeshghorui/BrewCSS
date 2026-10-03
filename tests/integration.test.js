import { beforeEach, describe, expect, it } from "vitest";
import { initBrew, initChai, stopBrewObserver, stopChaiObserver } from "../src/index.js";

function ruleText() {
    const sheet = document.getElementById("brewcss")?.sheet;
    if (!sheet) {
        return "";
    }

    let text = "";
    for (let i = 0; i < sheet.cssRules.length; i++) {
        text += sheet.cssRules[i].cssText.replace(/\s+/g, "");
    }
    return text;
}

function ruleCount() {
    return document.getElementById("brewcss")?.sheet?.cssRules.length ?? 0;
}

async function flush() {
    await new Promise((resolve) => setTimeout(resolve, 0));
}

beforeEach(() => {
    stopBrewObserver();
    document.getElementById("brewcss")?.remove();
    document.body.innerHTML = "";
});

describe("stylesheet engine", () => {
    it("adds one rule per unique class and keeps the class", () => {
        document.body.innerHTML = `
      <div id="card" class="brew-p-16 brew-bg-blue brew-text-white brew-rounded-8 brew-center">Card</div>
      <div id="other" class="brew-p-16"></div>
    `;

        initBrew({ observe: false });

        const card = document.getElementById("card");
        expect(Array.from(card.classList)).toEqual([
            "brew-p-16",
            "brew-bg-blue",
            "brew-text-white",
            "brew-rounded-8",
            "brew-center"
        ]);
        expect(ruleCount()).toBe(5);

        const css = ruleText();
        expect(css).toContain(".brew-p-16{padding:16px");
        expect(css).toContain(".brew-bg-blue{background-color:#3b82f6");
        expect(css).toContain(".brew-text-white{color:#ffffff");
        expect(css).toContain(".brew-rounded-8{border-radius:8px");
        expect(css).toContain(".brew-center{text-align:center");
    });

    it("ignores invalid classes", () => {
        document.body.innerHTML = `<p id="msg" class="brew-unknown-100">Hello</p>`;
        initBrew({ observe: false });

        const msg = document.getElementById("msg");
        expect(msg.classList.contains("brew-unknown-100")).toBe(true);
        expect(ruleCount()).toBe(0);
    });

    it("does not duplicate rules on a second init", () => {
        document.body.innerHTML = `<div class="brew-m-12"></div>`;
        initBrew({ observe: false });
        initBrew({ observe: false });
        expect(ruleCount()).toBe(1);
    });
});

describe("observer", () => {
    it("picks up added nodes and class changes", async () => {
        initBrew();
        document.body.innerHTML = `<div id="box" class="brew-m-4"></div>`;
        await flush();

        expect(ruleText()).toContain(".brew-m-4{margin:4px");

        document.getElementById("box").className = "brew-m-8";
        await flush();

        expect(ruleText()).toContain(".brew-m-8{margin:8px");
        expect(ruleCount()).toBe(2);
    });

    it("stays idle when observe is false", async () => {
        initBrew({ observe: false });
        document.body.innerHTML = `<div class="brew-p-2"></div>`;
        await flush();
        expect(ruleCount()).toBe(0);
    });
});

describe("api aliases", () => {
    it("keeps the previous function names", () => {
        expect(initChai).toBe(initBrew);
        expect(stopChaiObserver).toBe(stopBrewObserver);
    });
});
