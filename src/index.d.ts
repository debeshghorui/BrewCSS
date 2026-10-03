export interface BrewOptions {
    root?: Document | Element;
    observe?: boolean;
}

export function initBrew(options?: BrewOptions): void;
export function stopBrewObserver(): void;

export const initChai: typeof initBrew;
export const stopChaiObserver: typeof stopBrewObserver;
