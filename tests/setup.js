if (!globalThis.CSS || !globalThis.CSS.escape) {
    const nativeEscape = globalThis.window && globalThis.window.CSS && globalThis.window.CSS.escape;
    globalThis.CSS = {
        escape: nativeEscape || function escape(value) {
            return String(value).replace(/[^a-zA-Z0-9_-]/g, (char) => `\\${char}`);
        }
    };
}
