import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createDb } from '@nirbenu/db';
import { donors, users, contactRequests, donorReviews } from '@nirbenu/db';
import { donorSearchSchema } from '@nirbenu/shared';
import { eq, and, like, sql, gte, lte, or } from 'drizzle-orm';
import { requireAuth, getUserId, isAdmin } from '../middleware/auth';
import type { Env } from '../index';

type Variables = { db: ReturnType<typeof createDb>; userId?: string; userRole?: string };

export const donorsRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

donorsRoutes.get('/', zValidator('query', donorSearchSchema), async (c) => {
  const db = createDb(c.env.DB);
  const { bloodGroup, district, area, availability, gender, verified, ranking, search, page, limit } = c.req.valid('query');

  const conditions = [];
  if (bloodGroup) conditions.push(eq(donors.bloodGroup, bloodGroup));
  if (district) conditions.push(eq(donors.district, district));
  if (area) conditions.push(like(donors.area, `%${area}%`));
  if (availability) conditions.push(eq(donors.availability, availability));
  if (gender) conditions.push(eq(donors.gender, gender));
  if (verified !== undefined) conditions.push(eq(donors.verified, verified));
  if (ranking) conditions.push(eq(donors.ranking, ranking));

  let query = db.select().from(donors).leftJoin(users, eq(donors.id, users.id));

  if (search) {
    conditions.push(or(like(users.name, `%${search}%`), like(donors.area, `%${search}%`)));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const totalRow = await db.select({ count: sql<number>`count(*)` }).from(donors).where(
    conditions.length > 0 ? and(...conditions) : undefined,
  );
  const total = Number(totalRow[0]?.count ?? 0);

  const result = await query.limit(limit).offset((page - 1) * limit);

  const data = result.map((r) => ({
    ...r.donors,
    user: r.users ? {
      id: r.users.id,
      name: r.users.name,
      avatarUrl: r.users.avatarUrl,
      role: r.users.role,
    } : null,
  }));

  return c.json({ data, total, page, totalPages: Math.ceil(total / limit) });
});

donorsRoutes.get('/nearby', async (c) => {
  const db = createDb(c.env.DB);
  const district = c.req.query('district');
  const bloodGroup = c.req.query('bloodGroup');

  const conditions = [eq(donors.availability, 'available')];
  if (district) conditions.push(eq(donors.district, district));
  if (bloodGroup) conditions.push(eq(donors.bloodGroup, bloodGroup));

  const result = await db
    .select()
    .from(donors)
    .leftJoin(users, eq(donors.id, users.id))
    .where(and(...conditions))
    .orderBy(sql`${donors.donationCount} DESC`)
    .limit(10);

  const data = result.map((r) => ({
    ...r.donors,
    user: r.users ? {
      id: r.users.id,
      name: r.users.name,
      avatarUrl: r.users.avatarUrl,
      role: r.users.role,
    } : null,
  }));

  return c.json({ data });
});

donorsRoutes.get('/:id', async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');
  const currentUserId = getUserId(c);

  const result = await db
    .select()
    .from(donors)
    .leftJoin(users, eq(donors.id, users.id))
    .where(eq(donors.id, id))
    .limit(1);

  if (!result.length) return c.json({ error: 'Donor not found' }, 404);

  const donor = result[0];
  const isOwnProfile = currentUserId === id;
  const isAdminUser = isAdmin(c);

  let phone: string | null = null;
  if (isOwnProfile || isAdminUser) {
    phone = donor.users?.phone ?? null;
  } else if (currentUserId) {
    const cr = await db
      .select()
      .from(contactRequests)
      .where(
        and(
          eq(contactRequests.donorId, id),
          eq(contactRequests.requesterId, currentUserId),
          eq(contactRequests.status, 'accepted'),
          eq(contactRequests.numberVisible, true),
        ),
      )
      .limit(1);
    if (cr.length) phone = donor.users?.phone ?? null;
  }

  return c.json({
    ...donor.donors,
    user: {
      id: donor.users?.id,
      name: donor.users?.name,
      email: isOwnProfile || isAdminUser ? donor.users?.email : undefined,
      avatarUrl: donor.users?.avatarUrl,
      role: donor.users?.role,
      phone,
    },
  });
});

donorsRoutes.get('/:id/reviews', async (c) => {
  const db = createDb(c.env.DB);
  const donorId = c.req.param('id');

  const result = await db
    .select()
    .from(donorReviews)
    .leftJoin(users, eq(donorReviews.userId, users.id))
    .where(eq(donorReviews.donorId, donorId))
    .orderBy(sql`${donorReviews.createdAt} DESC`);

  const data = result.map((r) => ({
    ...r.donor_reviews,
    user: r.users ? { id: r.users.id, name: r.users.name, avatarUrl: r.users.avatarUrl } : null,
  }));

  return c.json({ data });
});

donorsRoutes.patch('/me/availability', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const { availability } = await c.req.json();

  await db
    .update(donors)
    .set({ availability, updatedAt: new Date().toISOString() })
    .where(eq(donors.id, userId));

  return c.json({ success: true, availability });
});

donorsRoutes.get('/me/stats', requireAuth, async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);

  const d = await db.select().from(donors).where(eq(donors.id, userId)).limit(1);
  if (!d.length) return c.json({ error: 'Not a donor' }, 404);

  const pending = await db
    .select({ count: sql<number>`count(*)` })
    .from(contactRequests)
    .where(and(eq(contactRequests.donorId, userId), eq(contactRequests.status, 'pending')));

  const totalReviews = await db
    .select({ count: sql<number>`count(*)` })
    .from(donorReviews)
    .where(eq(donorReviews.donorId, userId));

  const avgR = await db
    .select({ avg: sql<number>`AVG(${donorReviews.rating})` })
    .from(donorReviews)
    .where(eq(donorReviews.donorId, userId));

  return c.json({
    ...d[0],
    pendingRequests: Number(pending[0]?.count ?? 0),
    totalReviews: Number(totalReviews[0]?.count ?? 0),
    avgRating: Math.round((avgR[0]?.avg ?? 0) * 10) / 10,
  });
});
