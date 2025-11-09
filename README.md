# akbarafriansyah.my.id

A minimalist, text-led digital home for Muhamad Akbar Afriansyah. The site is built with Next.js (App Router) and Tailwind CSS, and it renders MDX essays and project write-ups with a focus on clarity and accessibility.

## Local development

```bash
pnpm install
pnpm dev
```

### Environment variables

The application reads a single environment variable that should be configured in both local and hosted environments:

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL used for metadata, social previews, and sitemap generation. | `https://akbarafriansyah.my.id` |

> Tip: when running locally you can set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` to preview fully-qualified URLs in metadata.

## Production build

```bash
pnpm build
```

The command above runs the Next.js production build and validates MDX rendering, sitemap generation, and Open Graph image routes.

## Analytics & privacy

Plausible Analytics is loaded lazily via an inline loader that honours the browser’s “Do Not Track” preference. The tracker is only injected if DNT is not enabled, ensuring consent-friendly measurement without additional cookies.

## Deployment workflow

1. Create a new Vercel project and select “Import Git Repository”.
2. Point the project to this repository and keep the default build command (`pnpm build`) and output directory (`.vercel/output` handled automatically by Next.js).
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable in the Vercel project settings for all environments (e.g., `https://akbarafriansyah.my.id`).
4. Trigger a production deployment by pushing to the `main` branch. Vercel will install dependencies with `pnpm`, build the Next.js app, and run the Edge OG image route automatically.
5. Once the build succeeds, connect the custom domain `akbarafriansyah.my.id` (or `akbarafriansyah.me`) from the Vercel dashboard and verify DNS settings. Vercel issues the TLS certificate automatically.

After DNS propagation completes you can verify the deployment by loading the site over HTTPS, confirming that page metadata resolves correctly, and that `/sitemap.xml`, `/robots.txt`, and `/api/og` respond as expected.
