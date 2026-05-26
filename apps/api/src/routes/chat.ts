import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createDb } from '@nirbenu/db';
import { conversations, messages, users, donors } from '@nirbenu/db';
import { messageSchema } from '@nirbenu/shared';
import { eq, and, or, desc, asc, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { requireAuth, getUserId } from '../middleware/auth';
import type { Env } from '../index';

export const chatRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// GET /api/chat/conversations
chatRoutes.get('/conversations', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);

  const result = await db
    .select()
    .from(conversations)
    .leftJoin(users, eq(conversations.userId, users.id))
    .leftJoin(donors, eq(conversations.donorId, donors.id))
    .where(
      or(eq(conversations.userId, userId), eq(conversations.donorId, userId))
    )
    .orderBy(desc(conversations.lastMessageAt));

  const data = result.map((r) => ({
    ...r.conversations,
    user: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
    donor: r.donors ? { id: r.donors.id, bloodGroup: r.donors.bloodGroup, area: r.donors.area } : null,
  }));

  return c.json({ data });
});

// POST /api/chat/conversations
chatRoutes.post('/conversations', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const { donorId, contactRequestId } = await c.req.json();
  const id = uuid();
  const now = new Date().toISOString();

  // Check if conversation exists
  const existing = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.userId, userId),
        eq(conversations.donorId, donorId),
      )
    )
    .limit(1);

  if (existing.length) {
    return c.json(existing[0]);
  }

  await db.insert(conversations).values({
    id,
    userId,
    donorId,
    contactRequestId: contactRequestId || null,
    lastMessageAt: now,
    createdAt: now,
  });

  return c.json({ id, userId, donorId, createdAt: now }, 201);
});

// GET /api/chat/:id/messages
chatRoutes.get('/:id/messages', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const convId = c.req.param('id');
  const userId = getUserId(c);
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 50);

  // Verify user is part of conversation
  const conv = await db.select().from(conversations).where(eq(conversations.id, convId)).limit(1);
  if (!conv.length) return c.json({ error: 'Conversation not found' }, 404);
  if (conv[0].userId !== userId && conv[0].donorId !== userId) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  const result = await db
    .select()
    .from(messages)
    .leftJoin(users, eq(messages.senderId, users.id))
    .where(eq(messages.conversationId, convId))
    .orderBy(asc(messages.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  // Mark messages as seen
  await db
    .update(messages)
    .set({ seen: true })
    .where(
      and(
        eq(messages.conversationId, convId),
        eq(messages.seen, false),
        sql`${messages.senderId} != ${userId}`,
      )
    );

  const data = result.map((r) => ({
    ...r.messages,
    sender: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
  }));

  return c.json({ data });
});

// POST /api/chat/:id/messages
chatRoutes.post('/:id/messages', requireAuth, zValidator('json', messageSchema), async (c) => {
  const db = createDb(c.env.DB);
  const convId = c.req.param('id');
  const userId = getUserId(c);
  const { content } = c.req.valid('json');
  const id = uuid();
  const now = new Date().toISOString();

  // Verify user is part of conversation
  const conv = await db.select().from(conversations).where(eq(conversations.id, convId)).limit(1);
  if (!conv.length) return c.json({ error: 'Conversation not found' }, 404);
  if (conv[0].userId !== userId && conv[0].donorId !== userId) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  await db.insert(messages).values({
    id,
    conversationId: convId,
    senderId: userId,
    content,
    seen: false,
    createdAt: now,
  });

  // Update conversation last message time
  await db.update(conversations).set({ lastMessageAt: now }).where(eq(conversations.id, convId));

  return c.json({ id, conversationId: convId, senderId: userId, content, seen: false, createdAt: now }, 201);
});
