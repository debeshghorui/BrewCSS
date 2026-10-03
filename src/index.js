import { scanDOM, scanElement } from "./scanner.js";

let observer = null;

function watch(records) {
    for (let i = 0; i < records.length; i++) {
        const record = records[i];

        if (record.type === "attributes") {
            scanElement(record.target);
            continue;
        }

        if (record.type !== "childList") {
            continue;
        }

        const added = record.addedNodes;
        for (let j = 0; j < added.length; j++) {
            const node = added[j];
            if (node.nodeType === 1) {
                scanDOM(node);
            }
        }
    }
}

export function initBrew(options = {}) {
    const root = options.root || document;
    const observe = options.observe !== false;

    scanDOM(root);

    if (observer) {
        observer.disconnect();
        observer = null;
    }

    if (!observe || !root) {
        return;
    }

    observer = new MutationObserver(watch);
    observer.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
    });
}

export function stopBrewObserver() {
    if (!observer) {
        return;
    }

    observer.disconnect();
    observer = null;
}

export const initChai = initBrew;
export const stopChaiObserver = stopBrewObserver;
