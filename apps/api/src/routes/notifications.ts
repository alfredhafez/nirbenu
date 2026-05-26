import { Hono } from 'hono';
import { createDb } from '@nirbenu/db';
import { notifications } from '@nirbenu/db';
import { eq, desc } from 'drizzle-orm';
import { requireAuth, getUserId } from '../middleware/auth';
import type { Env } from '../index';

export const notificationsRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// GET /api/notifications
notificationsRoutes.get('/', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId();

  const result = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(50);

  const unreadCount = result.filter((n) => !n.read).length;

  return c.json({ data: result, unreadCount });
});

// PATCH /api/notifications/:id/read
notificationsRoutes.patch('/:id/read', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const id = c.req.param('id');

  await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));

  return c.json({ success: true });
});

// PATCH /api/notifications/read-all
notificationsRoutes.patch('/read-all', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);

  await db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId));

  return c.json({ success: true });
});
