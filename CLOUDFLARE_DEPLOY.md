# 🌩️ Nirbenu — Cloudflare Deployment

## Prerequisites

- Git installed (`git --version`)
- A GitHub or GitLab account
- Cloudflare account (https://dash.cloudflare.com)

---

## 1. Push to GitHub

```bash
cd "C:\Users\Uptix Lab\Desktop\Ai Project\nirbenu"
git init
git add .
git commit -m "Initial commit - Nirbenu Blood Donation Platform"
git remote add origin https://github.com/YOUR_USERNAME/nirbenu.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy API (Cloudflare Workers)

```bash
cd apps/api

# Generate D1 migrations first
pnpm db:generate

# Deploy the Worker
pnpx wrangler deploy
```

Or from Cloudflare dashboard:
```
Workers & Pages → Create Worker → Upload from Git
→ Connect your GitHub repo
→ Build command: (leave empty)
→ Build output directory: apps/api
→ Framework: None (just plain Worker)
```

---

## 3. Deploy Frontend (Cloudflare Pages)

```bash
# Install Wrangler if you haven't
pnpm add -g wrangler@4

# Log in
wrangler login

# Create Pages project from your repo
wrangler pages project create nirbenu --production-branch main
```

Or from **Cloudflare Dashboard** (recommended):
```
1. Go to https://dash.cloudflare.com → Pages → Create a project
2. Connect to Git → Select your nirbenu repo
3. Configure build settings:

   Framework preset:    Next.js
   Build command:        cd apps/web && pnpm build
   Build output:         apps/web/.next
   Root directory:       (leave empty)

4. Environment variables:

   NEXT_PUBLIC_API_URL = https://nirbenu-api.YOUR-SUBDOMAIN.workers.dev

5. Click "Save and Deploy"
```

---

## 4. Cloudflare Builds on Linux

Cloudflare Pages builds on their Linux servers, so it handles the Next.js build correctly — that's why git deployment is the standard path. The local `@cloudflare/next-on-pages` CLI requires Linux/bash and doesn't work on Windows.

---

## 5. After Deployment

| Service | URL |
|---------|-----|
| Frontend | `https://nirbenu.pages.dev` (or custom domain) |
| API | `https://nirbenu-api.USERNAME.workers.dev` |

---

## 6. Custom Domain

```
Cloudflare Dashboard → Pages → nirbenu → Custom Domains
→ Add yourdomain.com
→ DNS will auto-configure
```

For Workers (API):
```
→ Workers & Pages → nirbenu-api → Triggers → Custom Domains
→ Add api.yourdomain.com
```

---

## 7. Free Tier Limits

| Service | Limit |
|---------|-------|
| Pages | Unlimited sites, 500 builds/month, unlimited bandwidth |
| Workers | 100,000 requests/day |
| D1 | 5GB storage |
| R2 | 10GB storage |

---

## Quick Local Dev

```bash
pnpm dev
# → http://localhost:3000 (web)
# → http://localhost:8787 (api)
```
