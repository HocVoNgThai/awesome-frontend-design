# Examples

Two landing pages built with the skill pack, as proof and as starting points. Both are Astro 7 static sites with plain CSS tokens,
light and dark themes, Vietnamese copy, and fictional companies. Prices, phone numbers and addresses are `TODO:` on purpose.

| Folder | Prompt | Preset | Live demo |
|---|---|---|---|
| [`web-agency-landing`](web-agency-landing) | `Use awesome-frontend-design: static, balanced, 2 themes. Landing page for a company that builds websites. Astro, no animation libraries, Vietnamese.` | `static-balanced` | https://thiscooking.site/samples/web-agency/ |
| [`company-website`](company-website) | company website landing page for a web design and development service (generated in a fresh project with the skills installed) | `static-calm` | https://thiscooking.site/samples/company-website/ |

## Run one

```bash
cd examples/web-agency-landing   # or company-website
npm install
npm run dev
```

## Hosted-demo build

`build-hosted.mjs` builds both under a sub-path so they can live inside another static site:

```bash
node examples/build-hosted.mjs ../MyWebsite/public/samples --site https://thiscooking.site --prefix /samples
```

Each example reads `SITE_URL`, `BASE_PATH` and `PUBLIC_DEMO_HOSTED` at build time. Hosted mode adds `noindex`, drops the sitemap,
robots and 404 files, and removes the contact `<form>`. Scripts are emitted as files (`assetsInlineLimit: 0`, external theme-init),
so the pages pass a strict CSP (`default-src 'none'`, `script-src 'self'`, Trusted Types) with no hashes.
