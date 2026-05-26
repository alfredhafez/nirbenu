import { Hono } from 'hono';
import { createDb } from '@nirbenu/db';
import { siteSettings } from '@nirbenu/db';
import { eq } from 'drizzle-orm';
import type { Env } from '../index';

export const settingsRoutes = new Hono<{ Bindings: Env }>();

// GET /api/settings — Public site settings
settingsRoutes.get('/', async (c) => {
  const db = createDb(c.env.DB);

  const result = await db.select().from(siteSettings);

  const settings: Record<string, string> = {};
  for (const row of result) {
    settings[row.key] = row.value;
  }

  return c.json(settings);
});
