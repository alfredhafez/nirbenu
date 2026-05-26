# Blood Donation Platform — Full Architecture Plan

## Project: Nirbenu — Modern Community Blood Donation Ecosystem

---

## 1. Monorepo Structure (Turborepo + pnpm)

```
nirbenu/
├── apps/
│   ├── web/                  # Next.js 15 App Router (Frontend)
│   └── api/                  # Hono.js on Cloudflare Workers (Backend)
├── packages/
│   ├── db/                   # Drizzle ORM schemas, migrations, seed
│   ├── ui/                   # Shadcn UI components, layouts, design system
│   └── shared/               # Zod schemas, TypeScript types, constants
├── tooling/
│   ├── eslint/               # Shared ESLint configs
│   └── typescript/           # Shared tsconfig bases
├── wrangler.toml             # Cloudflare Workers config
├── turbo.json                # Turborepo pipeline
├── pnpm-workspace.yaml
└── package.json
```

---

## 2. Database Schema (Drizzle ORM — Cloudflare D1)

### Users Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| email | text | Unique, not null |
| email_verified | integer (bool) | Default 0 |
| name | text | Not null |
| phone | text | Unique, nullable |
| password_hash | text | Nullable (OAuth users) |
| role | text | 'user' \| 'donor' \| 'admin', default 'user' |
| avatar_url | text | R2 URL, nullable |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

### Donors Table (extends user)
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK, FK → users.id |
| blood_group | text | A+, B+, AB+, O+, A-, B-, AB-, O- |
| district | text | e.g. "Dhaka" |
| area | text | e.g. "Mirpur" |
| gender | text | male, female, other |
| last_donation_date | text | ISO date, nullable |
| recovery_end_date | text | ISO date, nullable (last_donation + 90 days) |
| availability | text | 'available' \| 'recovery' \| 'busy' \| 'emergency_only' \| 'offline' |
| donation_count | integer | Default 0 |
| verified | integer (bool) | Default 0, admin controlled |
| ranking | text | 'new' \| 'bronze' \| 'silver' \| 'gold' \| 'hero' \| 'life_saver' |
| response_rate | real | 0-100 percentage |
| bio | text | Nullable |
| is_available_for_emergency | integer (bool) | Default 1 |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

### Blood Requests Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| requester_id | text | FK → users.id |
| blood_group | text | Required blood group |
| hospital_name | text | |
| location | text | Hospital location |
| urgency | text | 'normal' \| 'urgent' \| 'emergency' |
| required_date | text | ISO date, nullable |
| notes | text | Nullable |
| status | text | 'pending' \| 'active' \| 'fulfilled' \| 'expired' \| 'cancelled' |
| accepted_donor_id | text | FK → donors.id, nullable |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

### Conversations Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| user_id | text | FK → users.id |
| donor_id | text | FK → donors.id |
| contact_request_id | text | FK → contact_requests.id, nullable |
| last_message_at | text | ISO timestamp |
| created_at | text | ISO timestamp |

### Messages Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| conversation_id | text | FK → conversations.id |
| sender_id | text | FK → users.id |
| content | text | |
| seen | integer (bool) | Default 0 |
| created_at | text | ISO timestamp |

### Contact Requests Table (Number Unlock)
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| requester_id | text | FK → users.id |
| donor_id | text | FK → donors.id |
| message | text | Optional message |
| status | text | 'pending' \| 'accepted' \| 'rejected' |
| number_visible | integer (bool) | Default 0, true after acceptance |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

### Donor Reviews Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| donor_id | text | FK → donors.id |
| user_id | text | FK → users.id |
| rating | integer | 1-5 |
| comment | text | Nullable |
| created_at | text | ISO timestamp |

### Notifications Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| user_id | text | FK → users.id |
| type | text | 'request_accepted' \| 'chat_message' \| 'recovery_complete' \| 'emergency_alert' \| 'contact_accepted' \| 'new_review' |
| title | text | |
| message | text | |
| read | integer (bool) | Default 0 |
| metadata | text | JSON string for extra data |
| created_at | text | ISO timestamp |

### Blog Posts Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| author_id | text | FK → users.id (admin) |
| title | text | |
| slug | text | Unique |
| content | text | Markdown/HTML |
| excerpt | text | |
| featured_image | text | R2 URL, nullable |
| category_id | text | FK → blog_categories.id, nullable |
| tags | text | JSON array string |
| published | integer (bool) | Default 0 |
| published_at | text | ISO timestamp, nullable |
| created_at | text | ISO timestamp |
| updated_at | text | ISO timestamp |

### Blog Categories Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| name | text | |
| slug | text | Unique |

### Favorites Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| user_id | text | FK → users.id |
| donor_id | text | FK → donors.id |
| created_at | text | ISO timestamp |

### Reports Table
| Column | Type | Notes |
|--------|------|-------|
| id | text (UUID) | PK |
| reporter_id | text | FK → users.id |
| reported_donor_id | text | FK → donors.id |
| reason | text | |
| status | text | 'pending' \| 'resolved' \| 'dismissed' |
| admin_notes | text | Nullable |
| created_at | text | ISO timestamp |

---

## 3. API Routes (Hono.js on Cloudflare Workers)

```
/api
├── auth/*
│   └── Handled by Better Auth (all routes auto-generated)
│
├── /api/donors
│   ├── GET    /                    → List donors (public, with filters)
│   ├── GET    /:id                 → Get donor by ID
│   ├── GET    /:id/reviews         → Get donor reviews
│   ├── PATCH  /me/availability     → Update own availability (donor)
│   ├── GET    /me/stats            → Own dashboard stats (donor)
│   └── GET    /nearby              → Nearby donors
│
├── /api/requests
│   ├── GET    /                    → List requests (public)
│   ├── POST   /                    → Create blood request (auth)
│   ├── GET    /:id                 → Get request detail
│   ├── PATCH  /:id/status          → Update request status (owner/admin)
│   ├── POST   /:id/accept          → Donor accepts request (donor)
│   └── GET    /my                  → User's own requests (auth)
│
├── /api/contact
│   ├── POST   /                    → Send contact request (auth)
│   ├── GET    /pending             → Pending contact requests (donor)
│   ├── PATCH  /:id/accept          → Accept contact request (donor)
│   └── PATCH  /:id/reject          → Reject contact request (donor)
│
├── /api/chat
│   ├── GET    /conversations       → List user's conversations (auth)
│   ├── POST   /conversations       → Start new conversation (auth)
│   ├── GET    /:id/messages        → Get messages in conversation (auth)
│   ├── POST   /:id/messages        → Send message (auth)
│   └── POST   /pusher/auth         → Pusher auth endpoint (auth)
│
├── /api/reviews
│   ├── POST   /                    → Create review (auth)
│   └── GET    /donor/:id           → Reviews for donor
│
├── /api/notifications
│   ├── GET    /                    → User's notifications (auth)
│   ├── PATCH  /:id/read            → Mark as read (auth)
│   └── PATCH  /read-all            → Mark all as read (auth)
│
├── /api/blog
│   ├── GET    /                    → List published posts (public)
│   ├── GET    /:slug               → Get post by slug (public)
│   ├── GET    /categories          → List categories (public)
│   ├── POST   /                    → Create post (admin)
│   ├── PATCH  /:id                 → Update post (admin)
│   └── DELETE /:id                 → Delete post (admin)
│
├── /api/admin
│   ├── GET    /stats               → Dashboard analytics
│   ├── GET    /users               → All users (admin)
│   ├── PATCH  /users/:id/role      → Update user role (admin)
│   ├── PATCH  /donors/:id/verify   → Toggle donor verification (admin)
│   ├── GET    /chats               → All conversations (admin)
│   ├── GET    /chats/:id/messages  → Messages in any chat (admin)
│   ├── PATCH  /reports/:id         → Resolve/dismiss reports (admin)
│   └── GET    /reports             → All reports (admin)
│
└── /api/upload
    └── POST   /avatar              → Upload avatar to R2 (auth)
```

### Middleware Stack (per route)
- `authMiddleware` — Verifies Better Auth session token
- `donorMiddleware` — Requires role = 'donor'
- `adminMiddleware` — Requires role = 'admin'
- `rateLimiter` — Per-route rate limiting
- `validateBody` — Zod schema validation via Hono validator

---

## 4. Frontend Pages & Routes (Next.js 15 App Router)

```
/app (web)
├── layout.tsx                    → Root layout (providers, fonts, metadata)
├── page.tsx                      → Homepage
├── loading.tsx                   → Global loading skeleton
├── not-found.tsx                 → 404 page
├── error.tsx                     → Error boundary
│
├── /(public)
│   ├── /donors
│   │   ├── page.tsx              → Donor search & listing
│   │   └── /[id]
│   │       └── page.tsx          → Donor profile (public view)
│   ├── /emergency
│   │   └── page.tsx              → Emergency blood requests
│   ├── /blog
│   │   ├── page.tsx              → Blog listing with categories
│   │   └── /[slug]
│   │       └── page.tsx          → Single blog post
│   └── /ranking
│       └── page.tsx              → Donor ranking leaderboard
│
├── /(auth)
│   ├── /login
│   │   └── page.tsx              → Login (Google OAuth + Email/Password)
│   ├── /register
│   │   ├── page.tsx              → Choose role
│   │   ├── /user
│   │   │   └── page.tsx          → Register as receiver
│   │   └── /donor
│   │       └── page.tsx          → Register as donor (full form)
│   └── /verify-email
│       └── page.tsx              → Email verification page
│
├── /(dashboard)                  → Protected layout for logged-in users
│   ├── layout.tsx                → Dashboard shell (sidebar + header)
│   ├── /dashboard
│   │   ├── page.tsx              → User dashboard overview
│   │   ├── /requests
│   │   │   ├── page.tsx          → My blood requests
│   │   │   ├── /new
│   │   │   │   └── page.tsx      → Create new request
│   │   │   └── /[id]
│   │   │       └── page.tsx      → Request detail
│   │   ├── /messages
│   │   │   ├── page.tsx          → Conversation list
│   │   │   └── /[id]
│   │   │       └── page.tsx      → Chat view
│   │   ├── /favorites
│   │   │   └── page.tsx          → Saved donors
│   │   └── /settings
│   │       └── page.tsx          → Profile & account settings
│   │
│   ├── /donor                    → Donor-specific routes
│   │   ├── layout.tsx            → Donor dashboard shell
│   │   ├── /dashboard
│   │   │   └── page.tsx          → Donor dashboard overview
│   │   ├── /requests
│   │   │   └── page.tsx          → Incoming contact/request list
│   │   ├── /messages
│   │   │   ├── page.tsx          → Donor chat conversations
│   │   │   └── /[id]
│   │   │       └── page.tsx      → Chat view
│   │   ├── /history
│   │   │   └── page.tsx          → Donation history
│   │   ├── /settings
│   │   │   └── page.tsx          → Donor profile settings
│   │   └── /recovery
│   │       └── page.tsx          → Recovery mode status page
│   │
│   └── /admin                    → Admin routes
│       ├── layout.tsx            → Admin shell (sidebar navigation)
│       ├── /dashboard
│       │   └── page.tsx          → Admin overview with analytics
│       ├── /users
│       │   └── page.tsx          → User management
│       ├── /donors
│       │   └── page.tsx          → Donor moderation & verification
│       ├── /requests
│       │   └── page.tsx          → Blood request management
│       ├── /chats
│       │   ├── page.tsx          → All conversations overview
│       │   └── /[id]
│       │       └── page.tsx      → Chat monitoring view
│       ├── /blog
│       │   ├── page.tsx          → Blog post list
│       │   ├── /new
│       │   │   └── page.tsx      → Create blog post
│       │   └── /[id]/edit
│       │       └── page.tsx      → Edit blog post
│       ├── /reports
│       │   └── page.tsx          → Report management
│       └── /analytics
│           └── page.tsx          → Detailed analytics
│
└── /api/                         → Next.js API routes (proxies to Workers)
    └── [[...route]]
        └── route.ts              → Proxy all /api/* to Cloudflare Worker
```

---

## 5. Component Architecture (packages/ui)

```
packages/ui/src/
├── index.ts                        → Barrel exports
├── primitives/                     → Shadcn base components
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── select.tsx
│   ├── dialog.tsx
│   ├── sheet.tsx
│   ├── dropdown-menu.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── skeleton.tsx
│   ├── toast.tsx
│   ├── tooltip.tsx
│   ├── tabs.tsx
│   ├── separator.tsx
│   ├── calendar.tsx
│   └── command.tsx
│
├── layout/                         → Layout components
│   ├── container.tsx
│   ├── page-shell.tsx
│   ├── sidebar-nav.tsx
│   ├── header.tsx
│   ├── footer.tsx
│   └── mobile-nav.tsx
│
├── data-display/                   → Data display components
│   ├── donor-card.tsx
│   ├── donor-grid.tsx
│   ├── donor-row.tsx
│   ├── blood-request-card.tsx
│   ├── blog-card.tsx
│   ├── stats-card.tsx
│   ├── ranking-badge.tsx
│   ├── blood-group-tag.tsx
│   ├── availability-indicator.tsx
│   ├── recovery-progress.tsx
│   └── data-table.tsx
│
├── forms/                          → Form components
│   ├── blood-search-form.tsx
│   ├── donor-registration-form.tsx
│   ├── user-registration-form.tsx
│   ├── blood-request-form.tsx
│   ├── contact-request-form.tsx
│   ├── review-form.tsx
│   └── profile-form.tsx
│
├── feedback/                       → Feedback components
│   ├── empty-state.tsx
│   ├── error-state.tsx
│   ├── loading-spinner.tsx
│   └── connectivity-banner.tsx
│
├── chat/                           → Chat components
│   ├── chat-window.tsx
│   ├── message-bubble.tsx
│   ├── conversation-list.tsx
│   ├── chat-header.tsx
│   ├── typing-indicator.tsx
│   └── chat-input.tsx
│
├── auth/                           → Auth components
│   ├── login-form.tsx
│   ├── google-auth-button.tsx
│   ├── auth-guard.tsx
│   ├── role-guard.tsx
│   └── session-provider.tsx
│
├── notifications/                  → Notification components
│   ├── notification-bell.tsx
│   ├── notification-list.tsx
│   ├── notification-item.tsx
│   └── notification-provider.tsx
│
├── admin/                          → Admin-specific components
│   ├── admin-header.tsx
│   ├── admin-sidebar.tsx
│   ├── stats-grid.tsx
│   ├── user-table.tsx
│   ├── donor-table.tsx
│   ├── request-table.tsx
│   └── report-table.tsx
│
└── animations/                     → Animation wrappers
    ├── fade-in.tsx
    ├── slide-up.tsx
    ├── scale-in.tsx
    ├── stagger-container.tsx
    ├── page-transition.tsx
    └── float-element.tsx
```

---

## 6. Authentication Flow (Better Auth)

### Setup in `packages/db/src/auth.ts`:
- Google OAuth provider
- Email/Password with OTP verification
- D1 database adapter
- Session handling (cookies)
- Role-based access

### Protected Route Pattern (Next.js middleware):
- Public routes: /, /donors, /blog, /emergency → no auth
- Auth routes: /login, /register → redirect if already logged in
- Dashboard routes: /dashboard/*, /donor/* → require auth
- Admin routes: /admin/* → require admin role
- API routes: forwarded to Worker with auth context

### RLS-Like Access Control:
- `requireAuth()` — Must be logged in
- `requireDonor()` — Role must be 'donor'
- `requireAdmin()` — Role must be 'admin'
- `requireOwner(userId)` — Must be the record owner or admin

---

## 7. Realtime Chat Architecture (Pusher)

### Why Pusher:
- Cloudflare Workers compatible (HTTP-based, no persistent connections)
- Free tier: 200k messages/day, 100 concurrent connections
- Works perfectly with edge functions
- No WebSocket server needed

### Flow:
1. User clicks "Contact Donor" → POST /api/contact (creates contact_request)
2. Donor receives notification → Accepts/Rejects → Number unlocks
3. Once accepted → POST /api/chat/conversations (creates conversation)
4. Chat messages via POST /api/chat/:id/messages → Triggers Pusher event
5. Pusher event → Other user's client receives message in realtime
6. Client updates UI via Pusher client SDK

### Pusher Events:
- `private-conversation-{convId}` — New message in conversation
- `private-user-{userId}` — New notification, contact request
- `presence-donors` — Online donor status

### Implementation:
- Server: `POST /api/chat/:id/messages` saves to D1, then triggers Pusher
- Client: `pusher-js` subscribes to relevant channels
- Auth: `POST /api/chat/pusher/auth` validates session, returns Pusher token

---

## 8. Notification System

### Email Notifications (Resend):
| Event | Email Trigger |
|-------|--------------|
| Contact Request Received | Email to donor |
| Contact Request Accepted | Email to requester |
| New Chat Message | Email if offline (batched, 5 min delay) |
| Recovery Complete | Email to donor |
| Registration Verification | OTP email |

### In-App Notifications:
- Stored in `notifications` table
- Fetched via `GET /api/notifications`
- Real-time updates via Pusher `private-user-{userId}` channel
- Bell icon with unread count badge
- Toast notifications for instant feedback

---

## 9. Recovery Mode System

### Logic:
- On donation recorded → Set recovery_end_date = donation_date + 90 days
- Set availability = 'recovery'
- is_available_for_emergency stays true (can still be found for emergencies)
- Daily cron (Cloudflare Cron Trigger) checks all donors and reactivates those past recovery date
- Send notification "You're ready to donate again!"

### Frontend Display:
- Recovery countdown timer on donor profile
- Recovery progress bar (days elapsed / 90 days)
- Status badge: "Recovering — 45 days remaining"
- Option to toggle emergency availability

---

## 10. Privacy-Based Number Unlock

### Workflow:
```
GUEST → Views donor profile → Sees "Login to contact" button
LOGGED-IN USER → Clicks "Request Contact" → Sends message → Number HIDDEN
DONOR → Receives notification → Reviews request → Accepts/Rejects
IF ACCEPTED → Number becomes visible to requester → Chat enabled
IF REJECTED → Requester notified, number stays hidden
```

### Implementation:
- `ContactRequest` table tracks the flow
- Donor phone stored separately, never exposed in API responses to non-authorized users
- After acceptance: `number_visible = 1` for that specific requester
- `GET /api/donors/:id` response conditionally includes phone based on `ContactRequest` status

---

## 11. Ranking System Algorithm

```typescript
function calculateRanking(donor: Donor): Ranking {
  const score = (
    donor.donation_count * 10 +
    donor.response_rate * 2 +
    (donor.verified ? 50 : 0)
  );

  if (score >= 200) return 'life_saver';
  if (score >= 150) return 'hero';
  if (score >= 100) return 'gold';
  if (score >= 50)  return 'silver';
  if (score >= 20)  return 'bronze';
  return 'new';
}
```

### Badge Colors:
- New: Gray
- Bronze: Amber
- Silver: Slate
- Gold: Yellow
- Hero: Purple
- Life Saver: Red gradient

---

## 12. Search & Filter Architecture

### Donor Search Flow:
```
GET /api/donors?blood_group=O%2B&district=Dhaka&availability=available&page=1&limit=20

→ Hono.js handler:
  1. Parse & validate query params with Zod
  2. Build Drizzle query dynamically (where clauses)
  3. Execute with pagination (offset/limit)
  4. Strip phone numbers from response
  5. Return { data: DonorPublic[], total, page, totalPages }
```

### Instant Search:
- Debounced input (300ms)
- URL search params synced via `useSearchParams`
- Server component fetches with search params

---

## 13. Frontend State & Data Fetching

### Server Components (default):
- Public pages: Fetch directly in server components
- Static pages: Blog posts, homepage (ISR with `revalidate`)
- Dynamic pages: Donor search (URL search params → server fetch)

### Client Components (when needed):
- Chat: Fully client-side with Pusher
- Forms: React Hook Form + Zod
- Dashboards: TanStack Query for data fetching + cache

### State Management:
- Server state: TanStack Query
- UI state: React Context + useState
- Auth state: Better Auth session hook
- Realtime state: Zustand store
- Form state: React Hook Form + Zod

---

## 14. UI/UX Design System

### Theme Tokens (Tailwind config):
| Token | Value |
|-------|-------|
| primary | red-500 to rose-600 (used sparingly) |
| accent | rose-400 |
| background | slate-50 to white |
| surface | white |
| text | slate-900 |
| muted | slate-500 |
| border | slate-200 |
| success | emerald-500 |
| warning | amber-500 |
| danger | red-500 |

### Design Patterns:
- **Cards**: White bg, `rounded-2xl`, `shadow-sm`, `border border-slate-200/60`
- **Glassmorphism overlays**: `backdrop-blur-xl bg-white/80` for modals
- **Gradients**: Soft `from-rose-50 to-white` for hero sections
- **Typography**: Inter font, generous line-height
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Responsive Strategy:
- Mobile-first Tailwind breakpoints
- Bottom sheet navigation on mobile
- Donor grid: 1 col mobile, 2 col tablet, 3 col desktop
- Tables → Cards on mobile

---

## 15. Dependencies Summary

### Root:
`turbo`, `typescript`, `prettier`

### packages/db:
`drizzle-orm`, `drizzle-kit`, `better-auth`

### packages/shared:
`zod`

### packages/ui:
`@radix-ui/*`, `tailwindcss`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `react-hook-form`, `@hookform/resolvers`, `date-fns`, `sonner`

### apps/api:
`hono`, `@hono/zod-validator`, `drizzle-orm`, `better-auth`, `pusher`, `resend`

### apps/web:
`next`, `react`, `react-dom`, `@tanstack/react-query`, `pusher-js`, `zustand`, `react-hook-form`, `zod`, `framer-motion`, `date-fns`, `lucide-react`, `sonner`

---

## 16. Implementation Phases

1. **Phase 1 — Foundation**: Monorepo setup, Drizzle schema, Better Auth, Hono API base, Next.js + Shadcn init
2. **Phase 2 — Core API**: All CRUD endpoints with auth middleware
3. **Phase 3 — Public Website**: Homepage, donor search, profiles, blog, ranking
4. **Phase 4 — User Dashboard**: Sidebar layout, requests, favorites, settings
5. **Phase 5 — Donor Dashboard**: Donor-specific pages, recovery mode, history
6. **Phase 6 — Realtime Chat**: Pusher integration, chat UI, messaging
7. **Phase 7 — Notifications**: In-app + email notifications
8. **Phase 8 — Admin Dashboard**: Full admin panel with all management features
9. **Phase 9 — Polish**: Animations, loading states, error boundaries, SEO, deployment
