<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project commands

- `npm run dev` — start dev server (Turbopack), then open http://localhost:3000
- `npm run build` — production build (also runs TypeScript type checking)
- `npm run lint` — ESLint
- `npm run start` — serve the production build (run after `npm run build`)

To stop a background dev server: `Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force`

Always run `npm run lint` and `npm run build` after non-trivial changes.

## Architecture notes

- **i18n**: native Next.js 16 routing via `src/app/[locale]` + `src/proxy.ts` (locale redirect) + dictionaries in `src/messages/{en,zh}.json`. Shared config/types live in `src/lib/i18n-config.ts` (no `server-only`, safe for client components); `src/lib/i18n.ts` holds `getDictionary` and is `server-only`.
- **MDX**: `@next/mdx` with `remark-gfm` + `remark-frontmatter`. Content lives in `src/content/{blog,docs}/{en,zh}/*.mdx`. Per-file frontmatter is parsed by `gray-matter` in `src/lib/content.ts`.
- **Contact form**: Web3Forms native HTML form (no JS `fetch`) in `src/components/sections/ContactForm.tsx`. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and `NEXT_PUBLIC_SITE_URL` in `.env.local` (copy from `.env.example`).
- **Analytics**: Vercel `@vercel/analytics` mounted in `src/app/[locale]/layout.tsx`.
- **Data**: products in `src/lib/products.ts`, pricing tiers in `src/lib/pricing.ts` (all bilingual).
