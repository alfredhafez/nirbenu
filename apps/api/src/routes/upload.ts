import { Hono } from 'hono';
import { requireAuth, getUserId } from '../middleware/auth';
import type { Env } from '../index';

export const uploadRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// POST /api/upload/avatar
uploadRoutes.post('/avatar', requireAuth, async (c) => {
  const userId = getUserId(c);
  const formData = await c.req.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return c.json({ error: 'No file provided' }, 400);
  }

  const key = `avatars/${userId}/${Date.now()}-${file.name}`;
  await c.env.STORAGE.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  const url = `${c.env.BASE_URL}/storage/${key}`;

  // Update user avatar
  const db = (c as never as { get: (k: string) => { _: { schema: { users: { update: Function; id: any } } } } }).get('db');
  if (db) {
    await db._.schema.users.update({ avatarUrl: url }).where(db._.schema.users.id.eq(userId));
  }

  return c.json({ url });
});
