import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createDb } from '@nirbenu/db';
import { bloodRequests, users, donors } from '@nirbenu/db';
import { bloodRequestSchema } from '@nirbenu/shared';
import { eq, and, desc, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { requireAuth, getUserId, isAdmin } from '../middleware/auth';
import type { Env } from '../index';

export const requestsRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// GET /api/requests — Public request list
requestsRoutes.get('/', async (c) => {
  const db = createDb(c.env.DB);
  const status = c.req.query('status');
  const urgency = c.req.query('urgency');
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 10);

  const conditions = [];
  if (status) conditions.push(eq(bloodRequests.status, status));
  if (urgency) conditions.push(eq(bloodRequests.urgency, urgency));

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(bloodRequests)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  const result = await db
    .select()
    .from(bloodRequests)
    .leftJoin(users, eq(bloodRequests.requesterId, users.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(bloodRequests.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const data = result.map((r) => ({
    ...r.blood_requests,
    requester: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
  }));

  return c.json({
    data,
    total: Number(total[0]?.count || 0),
    page,
    totalPages: Math.ceil(Number(total[0]?.count || 0) / limit),
  });
});

// POST /api/requests — Create blood request
requestsRoutes.post('/', requireAuth, zValidator('json', bloodRequestSchema), async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const body = c.req.valid('json');
  const id = uuid();
  const now = new Date().toISOString();

  await db.insert(bloodRequests).values({
    id,
    requesterId: userId,
    bloodGroup: body.bloodGroup,
    hospitalName: body.hospitalName,
    location: body.location,
    urgency: body.urgency,
    requiredDate: body.requiredDate || null,
    notes: body.notes || null,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  });

  return c.json({ id, ...body, status: 'pending', createdAt: now }, 201);
});

// GET /api/requests/my — User's own requests
requestsRoutes.get('/my', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);

  const result = await db
    .select()
    .from(bloodRequests)
    .where(eq(bloodRequests.requesterId, userId))
    .orderBy(desc(bloodRequests.createdAt));

  return c.json({ data: result });
});

// GET /api/requests/:id
requestsRoutes.get('/:id', async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');

  const result = await db
    .select()
    .from(bloodRequests)
    .leftJoin(users, eq(bloodRequests.requesterId, users.id))
    .leftJoin(donors, eq(bloodRequests.acceptedDonorId, donors.id))
    .where(eq(bloodRequests.id, id))
    .limit(1);

  if (!result.length) return c.json({ error: 'Request not found' }, 404);

  const r = result[0];
  return c.json({
    ...r.blood_requests,
    requester: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
    acceptedDonor: r.donors ? { id: r.donors.id, bloodGroup: r.donors.bloodGroup, area: r.donors.area } : null,
  });
});

// PATCH /api/requests/:id/status
requestsRoutes.patch('/:id/status', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const id = c.req.param('id');
  const { status } = await c.req.json();

  const req = await db.select().from(bloodRequests).where(eq(bloodRequests.id, id)).limit(1);
  if (!req.length) return c.json({ error: 'Request not found' }, 404);
  if (req[0].requesterId !== userId && !isAdmin(c)) return c.json({ error: 'Forbidden' }, 403);

  await db.update(bloodRequests).set({
    status,
    updatedAt: new Date().toISOString(),
  }).where(eq(bloodRequests.id, id));

  return c.json({ success: true, status });
});

// POST /api/requests/:id/accept — Donor accepts request
requestsRoutes.post('/:id/accept', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const id = c.req.param('id');

  const donor = await db.select().from(donors).where(eq(donors.id, userId)).limit(1);
  if (!donor.length) return c.json({ error: 'Not a donor' }, 403);

  const req = await db.select().from(bloodRequests).where(eq(bloodRequests.id, id)).limit(1);
  if (!req.length) return c.json({ error: 'Request not found' }, 404);

  await db.update(bloodRequests).set({
    status: 'fulfilled',
    acceptedDonorId: userId,
    updatedAt: new Date().toISOString(),
  }).where(eq(bloodRequests.id, id));

  // Update donor donation count and enter recovery mode
  const newCount = donor[0].donationCount + 1;
  const recoveryEnd = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

  await db.update(donors).set({
    donationCount: newCount,
    lastDonationDate: new Date().toISOString(),
    recoveryEndDate: recoveryEnd,
    availability: 'recovery',
    updatedAt: new Date().toISOString(),
  }).where(eq(donors.id, userId));

  return c.json({ success: true, donationCount: newCount, recoveryEndDate: recoveryEnd });
});
