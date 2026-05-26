# 🌩️ Nirbenu — Cloudflare Deployment Guide

## 1. Cloudflare Account Setup

Sign up at https://dash.cloudflare.com/sign-up (Free tier works perfectly)

---

## 2. Create D1 Database

```bash
# Install Wrangler CLI globally if you haven't
pnpm add -g wrangler@4

# Login
wrangler login

# Create D1 database
wrangler d1 create nirbenu-db
```

Copy the `database_id` from the output. You'll need it next.

---

## 3. Create R2 Storage Bucket

```bash
wrangler r2 bucket create nirbenu-storage
```

---

## 4. Configure Environment Variables

Update `apps/api/wrangler.toml` with real values:

```toml
name = "nirbenu-api"
main = "src/index.ts"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "nirbenu-db"
database_id = "YOUR_DATABASE_ID_HERE"       # ← Replace

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "nirbenu-storage"

[vars]
BASE_URL = "https://nirbenu.pages.dev"       # ← Your Pages domain
GOOGLE_CLIENT_ID = ""                         # ← Google OAuth Client ID
GOOGLE_CLIENT_SECRET = ""                     # ← Google OAuth Client Secret
PUSHER_APP_ID = "your-pusher-app-id"          # ← From Pusher dashboard
PUSHER_KEY = "your-pusher-key"                # ← From Pusher dashboard
PUSHER_SECRET = "your-pusher-secret"          # ← From Pusher dashboard
PUSHER_CLUSTER = "ap2"
RESEND_API_KEY = "re_xxxxxxxxxx"              # ← From Resend dashboard
```

---

## 5. Push D1 Schema & Seed Data

```bash
cd apps/api

# Generate Drizzle migrations
pnpm db:generate

# Apply migrations to remote D1
wrangler d1 execute nirbenu-db --file=drizzle/migrations/0000_*.sql --remote

# Seed demo data
wrangler d1 execute nirbenu-db --remote < ../packages/db/src/seed.ts
# OR run: pnpm --filter @nirbenu/db db:seed
```

---

## 6. Deploy API Worker

```bash
cd apps/api

# Deploy
wrangler deploy

# Your API is now live at:
# https://nirbenu-api.YOUR-SUBDOMAIN.workers.dev
```

---

## 7. Deploy Frontend to Cloudflare Pages

```bash
cd apps/web

# Build
NEXT_PUBLIC_API_URL=https://nirbenu-api.YOUR-SUBDOMAIN.workers.dev pnpm build

# Option A: Deploy via Wrangler
wrangler pages deploy .next

# Option B: Connect Git repo on dash.cloudflare.com
# → Pages → Create Project → Connect GitHub
# Build settings:
#   Framework: Next.js
#   Build command: pnpm build
#   Build output: .next
#   Root directory: apps/web
```

---

## 8. Optional Services Setup

### Google OAuth (for Google login)
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add `https://nirbenu.pages.dev` to Authorized JavaScript origins
4. Add `https://nirbenu.pages.dev/api/auth/callback/google` to redirect URIs
5. Copy Client ID + Secret to `wrangler.toml`

### Pusher (for realtime chat)
1. Go to https://dashboard.pusher.com
2. Create a Channels app (ap2 region for Asia)
3. Enable "Enable client events" in App Settings
4. Copy App ID, Key, Secret to `wrangler.toml`

### Resend (for emails)
1. Go to https://resend.com
2. Get API key
3. Add to `wrangler.toml`

---

## 9. Custom Domain (Optional)

### For Pages (Frontend):
```
Cloudflare Dashboard → Pages → nirbenu → Custom Domains
→ Add nirbenu.com
```

### For Workers (API):
```
Cloudflare Dashboard → Workers → nirbenu-api → Triggers → Custom Domains
→ Add api.nirbenu.com
```

Update `wrangler.toml` vars:
```toml
BASE_URL = "https://nirbenu.com"
```

---

## 10. Local Development Quick Start

```bash
pnpm install
pnpm dev

# Creates:
#   http://localhost:3000  (Next.js frontend)
#   http://localhost:8787  (Hono.js API)
```

---

## Free Tier Limits (More Than Enough to Start)

| Service | Free Limit |
|---------|-----------|
| Workers | 100,000 req/day |
| D1 | 5GB storage, 5M reads/day |
| R2 | 10GB storage, 10M reads/month |
| Pages | Unlimited sites, 500 builds/month |
| Pusher | 200k messages/day, 100 concurrent |
| Resend | 100 emails/day |
