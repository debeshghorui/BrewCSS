# BrewCSS

BrewCSS is a lightweight utility-first CSS engine that scans brew-* class names and applies inline styles dynamically.

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
import { initChai } from "@debeshghorui/brewcss";

initChai();
```

## CDN Usage (Global)

```html
<script src="https://cdn.jsdelivr.net/npm/@debeshghorui/brewcss@0.1.3/dist/index.browser.js"></script>
<script>
  window.initchai();
  // Alias also available:
  // window.initChai();
</script>
```

For local demo usage in this repository:

```html
<script type="module">
  import { initChai } from "../src/index.js";
  initChai();
</script>
```

## Supported Utilities (v0.1)

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

## License

MIT
