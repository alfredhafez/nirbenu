import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createDb } from '@nirbenu/db';
import { donorReviews, users } from '@nirbenu/db';
import { reviewSchema } from '@nirbenu/shared';
import { eq, desc, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { requireAuth, getUserId } from '../middleware/auth';
import type { Env } from '../index';

export const reviewsRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// POST /api/reviews
reviewsRoutes.post('/', requireAuth, zValidator('json', reviewSchema), async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const { donorId, rating, comment } = c.req.valid('json');
  const id = uuid();
  const now = new Date().toISOString();

  await db.insert(donorReviews).values({
    id,
    donorId,
    userId,
    rating,
    comment: comment || null,
    createdAt: now,
  });

  // Notify donor
  await db.insert(db._.schema.notifications).values({
    id: uuid(),
    userId: donorId,
    type: 'new_review',
    title: 'New Review',
    message: `You received a ${rating}-star review!`,
    read: false,
    createdAt: now,
  });

  // Update donor response rate
  await db.update(db._.schema.donors).set({
    updatedAt: now,
  }).where(eq(db._.schema.donors.id, donorId));

  return c.json({ id, donorId, rating, createdAt: now }, 201);
});

// GET /api/reviews/donor/:id
reviewsRoutes.get('/donor/:id', async (c) => {
  const db = createDb(c.env.DB);
  const donorId = c.req.param('id');

  const result = await db
    .select()
    .from(donorReviews)
    .leftJoin(users, eq(donorReviews.userId, users.id))
    .where(eq(donorReviews.donorId, donorId))
    .orderBy(desc(donorReviews.createdAt));

  const data = result.map((r) => ({
    ...r.donor_reviews,
    user: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
  }));

  const avg = await db
    .select({ avg: sql<number>`AVG(${donorReviews.rating})`, count: sql<number>`count(*)` })
    .from(donorReviews)
    .where(eq(donorReviews.donorId, donorId));

  return c.json({
    data,
    avgRating: Math.round((avg[0]?.avg || 0) * 10) / 10,
    totalReviews: Number(avg[0]?.count || 0),
  });
});
