# Deni Apps static site

Standalone HTML and CSS homepage: logo, headline, and contact link at the bottom. No menu, login, JavaScript, API, database, or build step. Contact opens the visitor's email app using the existing address, `contact@deniapps.com`.

Only `public/` is deployed. The archived Next.js and Feathers applications are not uploaded.

## Preview

From this folder, run `npm run dev` (Node.js and npm required). Wrangler prints the local preview URL. Alternatively, run `python3 -m http.server 8080 --directory public` and open http://localhost:8080.

## Cloudflare Pages: Git deployment

1. Push this repository to GitHub or GitLab.
2. In Cloudflare, open **Workers & Pages**, create a **Pages** project, and connect the repository.
3. Choose production branch `main` (or the branch you use).
4. Set **Root directory** to `static-site`, **Framework preset** to `None`, **Build command** to `exit 0`, and **Build output directory** to `public`.
5. Deploy. Cloudflare provides a `pages.dev` URL and rebuilds after future pushes.
6. In the Pages project's **Custom domains**, add `deniapps.com` and `www.deniapps.com`, then follow Cloudflare's DNS instructions. Verify the Pages URL before switching the existing domain.

## Cloudflare Pages: manual deployment

From this folder:

```sh
npx wrangler@4 login
npx wrangler@4 pages project create deniapps-static --production-branch main
npm run deploy
```

Create the project once; repeat only `npm run deploy` for updates. If the project already exists, skip creation. Change the project name in both `wrangler.toml` and `package.json` if needed. Choose Git integration or manual deployment when first creating the Pages project; Cloudflare does not let a Direct Upload project switch to Git integration later.

You can also create a Direct Upload Pages project in the dashboard and upload **the contents of `public/`**. Do not upload the repository root.

## Edit

- Page content and contact address: `public/index.html`.
- Appearance: `public/styles.css`.
- Logo and favicon: `public/assets/` (copied from the archived application).
- Update the copyright year in `public/index.html` when needed.
- If using another domain, update the canonical URL, Open Graph URLs, `robots.txt`, and `sitemap.xml`.
- Retired URLs return the static `404.html`; archived blog and application routes are not published.

Cloudflare docs: [Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Wrangler Pages commands](https://developers.cloudflare.com/workers/wrangler/commands/pages/).
