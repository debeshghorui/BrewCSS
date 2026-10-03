# BrewCSS

BrewCSS is a lightweight utility-first CSS engine. It scans `brew-*` class names and inserts one shared stylesheet rule per unique class. Classes stay on the element. No build step.

## Install

```bash
npm install @debeshghorui/brewcss
```

## Local Development

```bash
npm install
npm test
npm run build
```

## Usage

```js
import { initBrew } from "@debeshghorui/brewcss";

initBrew();
```

`initBrew()` scans immediately and watches for new elements and `class` changes. Pass `{ observe: false }` for a single scan. `stopBrewObserver()` disconnects the watcher.

`initChai` and `stopChaiObserver` are aliases of `initBrew` and `stopBrewObserver`.

## CDN Usage

```html
<script src="https://cdn.jsdelivr.net/npm/@debeshghorui/brewcss@0.2.0/dist/index.browser.js"></script>
<script>
  window.initBrew();
</script>
```

`window.initbrew`, `window.initChai`, and `window.initchai` call the same function.

For local demo usage in this repository, build first, then:

```html
<script src="../dist/index.browser.js"></script>
<script>
  window.initBrew();
</script>
```

## Supported Utilities (v0.2)

- Spacing: brew-p-*, brew-m-*
- Colors: brew-bg-*, brew-text-*
- Typography: brew-fs-*, brew-center
- Borders: brew-border-*, brew-rounded-*
- Layout: brew-flex, brew-justify-center, brew-items-center

## Value Rules

- Numeric values auto-convert to px: brew-p-10 -> padding: 10px
- Explicit units are supported: px, rem, em, %, vh, vw, vmin, vmax, pt
- Percent shortcut is supported with pct suffix: brew-m-50pct -> margin: 50%
- Colors support common tokens (red, blue, gray-100, etc.) and hex formats (#fff, #ffffff, hex-ffffff)

One thousand elements with the same `brew-*` class share one CSS rule.

## License

MIT
