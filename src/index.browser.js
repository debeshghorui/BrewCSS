import { initBrew, initChai, stopBrewObserver, stopChaiObserver } from "./index.js";

const globalTarget =
    typeof window !== "undefined"
        ? window
        : typeof globalThis !== "undefined"
            ? globalThis
            : null;

if (globalTarget) {
    globalTarget.initBrew = initBrew;
    globalTarget.initbrew = initBrew;
    globalTarget.stopBrewObserver = stopBrewObserver;
    globalTarget.stopbrewobserver = stopBrewObserver;
    globalTarget.initChai = initChai;
    globalTarget.initchai = initChai;
    globalTarget.stopChaiObserver = stopChaiObserver;
    globalTarget.stopchaiobserver = stopChaiObserver;
}
