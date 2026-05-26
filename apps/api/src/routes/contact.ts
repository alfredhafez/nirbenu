import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createDb } from '@nirbenu/db';
import { contactRequests, users, donors } from '@nirbenu/db';
import { contactRequestSchema } from '@nirbenu/shared';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { requireAuth, getUserId } from '../middleware/auth';
import type { Env } from '../index';

export const contactRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// POST /api/contact — Send contact request to donor
contactRoutes.post('/', requireAuth, zValidator('json', contactRequestSchema), async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const { donorId, message } = c.req.valid('json');
  const id = uuid();
  const now = new Date().toISOString();

  // Check if already exists pending
  const existing = await db
    .select()
    .from(contactRequests)
    .where(
      and(
        eq(contactRequests.requesterId, userId),
        eq(contactRequests.donorId, donorId),
        eq(contactRequests.status, 'pending'),
      )
    )
    .limit(1);

  if (existing.length) {
    return c.json({ error: 'Contact request already sent' }, 409);
  }

  await db.insert(contactRequests).values({
    id,
    requesterId: userId,
    donorId,
    message: message || null,
    status: 'pending',
    numberVisible: false,
    createdAt: now,
    updatedAt: now,
  });

  // Notify donor
  await db.insert(db._.schema.notifications).values({
    id: uuid(),
    userId: donorId,
    type: 'contact_received',
    title: 'New Contact Request',
    message: 'Someone wants to contact you for blood donation.',
    read: false,
    createdAt: now,
  });

  return c.json({ id, status: 'pending', createdAt: now }, 201);
});

// GET /api/contact/pending — Donor's pending contact requests
contactRoutes.get('/pending', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);

  const result = await db
    .select()
    .from(contactRequests)
    .leftJoin(users, eq(contactRequests.requesterId, users.id))
    .where(
      and(
        eq(contactRequests.donorId, userId),
        eq(contactRequests.status, 'pending'),
      )
    )
    .orderBy(desc(contactRequests.createdAt));

  const data = result.map((r) => ({
    ...r.contact_requests,
    requester: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
  }));

  return c.json({ data });
});

// PATCH /api/contact/:id/accept
contactRoutes.patch('/:id/accept', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const id = c.req.param('id');
  const now = new Date().toISOString();

  const req = await db.select().from(contactRequests).where(eq(contactRequests.id, id)).limit(1);
  if (!req.length) return c.json({ error: 'Request not found' }, 404);
  if (req[0].donorId !== userId) return c.json({ error: 'Forbidden' }, 403);

  await db.update(contactRequests).set({
    status: 'accepted',
    numberVisible: true,
    updatedAt: now,
  }).where(eq(contactRequests.id, id));

  // Notify requester
  await db.insert(db._.schema.notifications).values({
    id: uuid(),
    userId: req[0].requesterId,
    type: 'contact_accepted',
    title: 'Contact Request Accepted',
    message: 'A donor has accepted your contact request. You can now see their phone number.',
    read: false,
    createdAt: now,
  });

  return c.json({ success: true, numberVisible: true });
});

// PATCH /api/contact/:id/reject
contactRoutes.patch('/:id/reject', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const id = c.req.param('id');
  const now = new Date().toISOString();

  const req = await db.select().from(contactRequests).where(eq(contactRequests.id, id)).limit(1);
  if (!req.length) return c.json({ error: 'Request not found' }, 404);
  if (req[0].donorId !== userId) return c.json({ error: 'Forbidden' }, 403);

  await db.update(contactRequests).set({
    status: 'rejected',
    updatedAt: now,
  }).where(eq(contactRequests.id, id));

  return c.json({ success: true });
});
