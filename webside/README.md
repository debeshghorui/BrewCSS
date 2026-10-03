# BrewCSS Website

This folder contains a static website for showcasing the `@debeshghorui/brewcss` npm package.

## Run Locally

From the repository root, build the browser bundle and serve the repo. The playground loads `../dist/index.browser.js` first, then the jsDelivr `@0.2.0` bundle.

```bash
npm run build
npx serve .
```

Open `/webside/`.

## Deploy

Use any static host and set publish directory to `webside`.

- Netlify: drag-and-drop `webside` or set `Publish directory = webside`
- Vercel: framework preset `Other`, output directory `webside`
- GitHub Pages: deploy folder contents from `webside`
- Cloudflare Pages: project root + output directory `webside`

No build command is required.

## CDN Script (Copy-Paste)

Use this in any HTML page:

```html
<script type="module">
  import { initBrew } from "https://cdn.jsdelivr.net/npm/@debeshghorui/brewcss@0.2.0/dist/index.js/+esm";
  initBrew();
</script>
```

Then add utility classes like `brew-p-20`, `brew-bg-blue`, `brew-text-white` to your elements.
