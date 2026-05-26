Go to Cloudflare Dashboard → Pages → nirbenu-site → Settings → Build & Deploy

Replace ALL settings with these:

| Setting | Value |
|---------|-------|
| **Root directory** | `apps/web` |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output** | `.vercel/output/static` |
| **Deploy command** | *(leave empty)* |

This way:
- Root is `apps/web` — the command runs in the directory that has `next` and `package.json`
- `@cloudflare/next-on-pages` builds Next.js + generates Cloudflare-compatible output
- Output goes to `.vercel/output/static` (inside `apps/web`)

Save and redeploy.
