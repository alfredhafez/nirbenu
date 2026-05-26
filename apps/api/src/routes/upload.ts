import { Hono } from 'hono';
import { requireAuth, getUserId } from '../middleware/auth';
import { createDb } from '@nirbenu/db';
import { users } from '@nirbenu/db';
import { eq } from 'drizzle-orm';
import type { Env } from '../index';

export const uploadRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

uploadRoutes.post('/avatar', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const formData = await c.req.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return c.json({ error: 'No file provided' }, 400);
  }

  const key = `avatars/${userId}/${Date.now()}-${file.name}`;
  await c.env.STORAGE.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
  const url = `${c.env.BASE_URL}/storage/${key}`;

  await db.update(users).set({ avatarUrl: url }).where(eq(users.id, userId));

  return c.json({ url });
});
