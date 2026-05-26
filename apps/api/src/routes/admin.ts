import { Hono } from 'hono';
import { createDb } from '@nirbenu/db';
import { users, donors, bloodRequests, conversations, messages as msgTable, reports, siteSettings, donorReviews } from '@nirbenu/db';
import { eq, desc, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { requireAuth, adminMiddleware } from '../middleware/auth';
import type { Env } from '../index';

export const adminRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

adminRoutes.use('*', requireAuth, adminMiddleware);

// GET /api/admin/stats
adminRoutes.get('/stats', async (c) => {
  const db = createDb(c.env.DB);

  const totalUsers = await db.select({ count: sql<number>`count(*)` }).from(users);
  const totalDonors = await db.select({ count: sql<number>`count(*)` }).from(donors);
  const activeRequests = await db
    .select({ count: sql<number>`count(*)` })
    .from(bloodRequests)
    .where(sql`${bloodRequests.status} IN ('pending', 'active')`);
  const totalDonations = await db
    .select({ total: sql<number>`SUM(${donors.donationCount})` })
    .from(donors);
  const pendingReports = await db
    .select({ count: sql<number>`count(*)` })
    .from(reports)
    .where(eq(reports.status, 'pending'));
  const verifiedDonors = await db
    .select({ count: sql<number>`count(*)` })
    .from(donors)
    .where(eq(donors.verified, true));

  const bloodGroupDist = await db
    .select({
      bloodGroup: donors.bloodGroup,
      count: sql<number>`count(*)`,
    })
    .from(donors)
    .groupBy(donors.bloodGroup);

  const districtDist = await db
    .select({
      district: donors.district,
      count: sql<number>`count(*)`,
    })
    .from(donors)
    .groupBy(donors.district);

  return c.json({
    totalUsers: Number(totalUsers[0]?.count || 0),
    totalDonors: Number(totalDonors[0]?.count || 0),
    activeRequests: Number(activeRequests[0]?.count || 0),
    totalDonations: Number(totalDonations[0]?.total || 0),
    pendingReports: Number(pendingReports[0]?.count || 0),
    verifiedDonors: Number(verifiedDonors[0]?.count || 0),
    bloodGroupDistribution: bloodGroupDist,
    districtDistribution: districtDist,
  });
});

// GET /api/admin/users
adminRoutes.get('/users', async (c) => {
  const db = createDb(c.env.DB);
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 20);

  const result = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const total = await db.select({ count: sql<number>`count(*)` }).from(users);

  return c.json({
    data: result,
    total: Number(total[0]?.count || 0),
    page,
    totalPages: Math.ceil(Number(total[0]?.count || 0) / limit),
  });
});

// PATCH /api/admin/users/:id/role
adminRoutes.patch('/users/:id/role', async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');
  const { role } = await c.req.json();

  await db.update(users).set({ role, updatedAt: new Date().toISOString() }).where(eq(users.id, id));
  return c.json({ success: true });
});

// PATCH /api/admin/donors/:id/verify
adminRoutes.patch('/donors/:id/verify', async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');

  const donor = await db.select().from(donors).where(eq(donors.id, id)).limit(1);
  if (!donor.length) return c.json({ error: 'Donor not found' }, 404);

  const newVerified = !donor[0].verified;
  await db.update(donors).set({
    verified: newVerified,
    updatedAt: new Date().toISOString(),
  }).where(eq(donors.id, id));

  return c.json({ success: true, verified: newVerified });
});

// GET /api/admin/chats
adminRoutes.get('/chats', async (c) => {
  const db = createDb(c.env.DB);

  const result = await db
    .select()
    .from(conversations)
    .leftJoin(users, eq(conversations.userId, users.id))
    .leftJoin(donors, eq(conversations.donorId, donors.id))
    .orderBy(desc(conversations.lastMessageAt))
    .limit(100);

  const data = result.map((r) => ({
    ...r.conversations,
    user: r.users ? { id: r.users.id, name: r.users.name } : null,
    donor: r.donors ? { id: r.donors.id, bloodGroup: r.donors.bloodGroup } : null,
  }));

  return c.json({ data });
});

// GET /api/admin/chats/:id/messages
adminRoutes.get('/chats/:id/messages', async (c) => {
  const db = createDb(c.env.DB);
  const convId = c.req.param('id');

  const result = await db
    .select()
    .from(msgTable)
    .leftJoin(users, eq(msgTable.senderId, users.id))
    .where(eq(msgTable.conversationId, convId))
    .orderBy(sql`${msgTable.createdAt} ASC`)
    .limit(200);

  const data = result.map((r) => ({
    ...r.messages,
    sender: r.users ? { id: r.users.id, name: r.users.name } : null,
  }));

  return c.json({ data });
});

// GET /api/admin/reports
adminRoutes.get('/reports', async (c) => {
  const db = createDb(c.env.DB);

  const result = await db
    .select()
    .from(reports)
    .leftJoin(users, eq(reports.reporterId, users.id))
    .leftJoin(donors, eq(reports.reportedDonorId, donors.id))
    .orderBy(desc(reports.createdAt));

  const data = result.map((r) => ({
    ...r.reports,
    reporter: r.users ? { id: r.users.id, name: r.users.name } : null,
    reportedDonor: r.donors ? { id: r.donors.id, bloodGroup: r.donors.bloodGroup, area: r.donors.area } : null,
  }));

  return c.json({ data });
});

// PATCH /api/admin/reports/:id
adminRoutes.patch('/reports/:id', async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');
  const { status, adminNotes } = await c.req.json();
  const now = new Date().toISOString();

  await db.update(reports).set({
    status,
    adminNotes: adminNotes || null,
  }).where(eq(reports.id, id));

  return c.json({ success: true });
});

// Site Settings management
adminRoutes.get('/settings', async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(siteSettings);
  return c.json({ data: result });
});

adminRoutes.post('/settings', async (c) => {
  const db = createDb(c.env.DB);
  const { key, value } = await c.req.json();
  const id = uuid();
  const now = new Date().toISOString();

  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  if (existing.length) {
    await db.update(siteSettings).set({ value, updatedAt: now }).where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ id, key, value, updatedAt: now });
  }

  return c.json({ success: true, key, value });
});

adminRoutes.delete('/settings/:key', async (c) => {
  const db = createDb(c.env.DB);
  const key = c.req.param('key');
  await db.delete(siteSettings).where(eq(siteSettings.key, key));
  return c.json({ success: true });
});

// Admin donor management
adminRoutes.get('/donors', async (c) => {
  const db = createDb(c.env.DB);
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 20);

  const result = await db
    .select()
    .from(donors)
    .leftJoin(users, eq(donors.id, users.id))
    .orderBy(desc(donors.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const total = await db.select({ count: sql<number>`count(*)` }).from(donors);

  const data = result.map((r) => ({
    ...r.donors,
    user: r.users ? { id: r.users.id, name: r.users.name, email: r.users.email, phone: r.users.phone } : null,
  }));

  return c.json({
    data,
    total: Number(total[0]?.count || 0),
    page,
    totalPages: Math.ceil(Number(total[0]?.count || 0) / limit),
  });
});

// Admin request management
adminRoutes.get('/requests', async (c) => {
  const db = createDb(c.env.DB);
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 20);

  const result = await db
    .select()
    .from(bloodRequests)
    .leftJoin(users, eq(bloodRequests.requesterId, users.id))
    .orderBy(desc(bloodRequests.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const total = await db.select({ count: sql<number>`count(*)` }).from(bloodRequests);

  const data = result.map((r) => ({
    ...r.blood_requests,
    requester: r.users ? { id: r.users.id, name: r.users.name } : null,
  }));

  return c.json({
    data,
    total: Number(total[0]?.count || 0),
    page,
    totalPages: Math.ceil(Number(total[0]?.count || 0) / limit),
  });
});

adminRoutes.patch('/requests/:id', async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');
  const { status } = await c.req.json();

  await db.update(bloodRequests).set({
    status,
    updatedAt: new Date().toISOString(),
  }).where(eq(bloodRequests.id, id));

  return c.json({ success: true });
});
