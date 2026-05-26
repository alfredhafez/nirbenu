# 🔑 Nirbenu — Demo Accounts & Test Data

## Admin Demo Account

| Field | Value |
|-------|-------|
| **Email** | `admin@nirbenu.com` |
| **Password** | `admin123` |
| **Role** | Admin |
| **Name** | Admin Nirbenu |
| **Phone** | 01710000001 |
| **Admin Access** | `/admin/dashboard` |

---

## Donor Demo Accounts

| # | Name | Email | Password | Blood | District | Rank | Donations |
|---|------|-------|----------|-------|----------|------|-----------|
| 1 | Rafiq Islam | `donor1@example.com` | `donor123` | O+ | Dhaka | Life Saver | 28 |
| 2 | Nusrat Jahan | `donorf1@example.com` | `donor123` | B+ | Dhaka | Life Saver | 22 |
| 3 | Tanvir Ahmed | `donor2@example.com` | `donor123` | A+ | Chattogram | Hero | 18 |
| 4 | Farzana Akter | `donorf2@example.com` | `donor123` | AB+ | Sylhet | Hero | 15 |
| 5 | Shakil Hasan | `donor3@example.com` | `donor123` | O- | Rajshahi | Hero | 14 |

---

## User/Receiver Demo Accounts

| # | Name | Email | Password | Phone |
|---|------|-------|----------|-------|
| 1 | User 100 | `user1@example.com` | `user123` | 0173X000001 |
| 2 | User 101 | `user2@example.com` | `user123` | 0173X000002 |
| 3 | User 102 | `user3@example.com` | `user123` | 0173X000003 |

---

## Quick Login URLs

| Role | URL |
|------|-----|
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Donor Dashboard | http://localhost:3000/donor/dashboard |
| User Dashboard | http://localhost:3000/dashboard |
| Public Homepage | http://localhost:3000 |

---

## Pre-Seeded Data Count

| Table | Count |
|-------|-------|
| Users | 41 (1 admin, 30 donors, 10 receivers) |
| Donors | 30 (across all 8 blood groups, 8 districts) |
| Blood Requests | 15 (mix of active/pending/fulfilled) |
| Reviews | ~50 (4-5 star ratings with comments) |
| Blog Posts | 8 (published + draft, 5 categories) |
| Site Settings | 22 configurable values |
| Favorites | 10 donor favorites |

---

## Test Flow (Privacy Unlock Demo)

```
1. Visit /donors → Search for "O+" in Dhaka
2. Click donor "Rafiq Islam" → See profile WITHOUT phone number
3. Login as user1@example.com / user123
4. Click "Request Contact" on Rafiq's profile → Send message
5. Login as donor1@example.com / donor123
6. Go to /donor/requests → See pending request → Click "Accept"
7. Login as user1 again → Visit donor profile → Phone number is NOW VISIBLE
```

---

## Test Flow (Recovery Mode Demo)

```
1. Login as donor1
2. Go to /donor/dashboard → See "Recovery Mode Active" (45 days left)
3. Go to /donor/recovery → See progress bar, tips, emergency toggle
4. Recovery auto-resets after 90 days (via Cloudflare Cron)
```

---

## Test Flow (Admin Features)

```
1. Login as admin@nirbenu.com / admin123 → /admin/dashboard
2. View analytics → Blood group distribution, activity feed
3. Manage donors → Verify/unverify any donor
4. Manage users → Change roles
5. Monitor chats → Read all conversations, send warnings
6. Blog → Create/Edit/Publish blog posts
7. Reports → Resolve or dismiss user reports
8. Settings → Change site name, logo URL, colors, contact info LIVE
```
