import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createDb } from '@nirbenu/db';
import { blogPosts, blogCategories, users } from '@nirbenu/db';
import { blogPostSchema } from '@nirbenu/shared';
import { eq, desc, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { requireAuth, getUserId, adminMiddleware } from '../middleware/auth';
import type { Env } from '../index';

export const blogRoutes = new Hono<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>();

// GET /api/blog — Published posts
blogRoutes.get('/', async (c) => {
  const db = createDb(c.env.DB);
  const category = c.req.query('category');
  const page = Number(c.req.query('page') || 1);
  const limit = Number(c.req.query('limit') || 10);

  const conditions = [eq(blogPosts.published, true)];
  if (category) {
    conditions.push(eq(blogCategories.slug, category));
  }

  const result = await db
    .select()
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(sql`${blogPosts.published} = 1${category ? sql` AND ${blogCategories.slug} = ${category}` : sql``}`)
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
    .offset((page - 1) * limit);

  const data = result.map((r) => ({
    ...r.blog_posts,
    tags: JSON.parse(r.blog_posts.tags || '[]'),
    author: r.users ? { id: r.users.id, name: r.users.name } : null,
    category: r.blog_categories || null,
  }));

  return c.json({ data });
});

// GET /api/blog/categories
blogRoutes.get('/categories', async (c) => {
  const db = createDb(c.env.DB);
  const result = await db.select().from(blogCategories);
  return c.json({ data: result });
});

// GET /api/blog/:slug
blogRoutes.get('/:slug', async (c) => {
  const db = createDb(c.env.DB);
  const slug = c.req.param('slug');

  const result = await db
    .select()
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!result.length) return c.json({ error: 'Post not found' }, 404);

  const r = result[0];
  return c.json({
    ...r.blog_posts,
    tags: JSON.parse(r.blog_posts.tags || '[]'),
    author: r.users ? { id: r.users.id, name: r.users.name } : null,
    category: r.blog_categories || null,
  });
});

// POST /api/blog — Admin create post
blogRoutes.post('/', requireAuth, adminMiddleware, zValidator('json', blogPostSchema), async (c) => {
  const db = createDb(c.env.DB);
  const userId = getUserId(c);
  const body = c.req.valid('json');
  const id = uuid();
  const now = new Date().toISOString();

  await db.insert(blogPosts).values({
    id,
    authorId: userId,
    title: body.title,
    slug: body.slug,
    content: body.content,
    excerpt: body.excerpt,
    featuredImage: body.featuredImage || null,
    categoryId: body.categoryId || null,
    tags: JSON.stringify(body.tags || []),
    published: body.published,
    publishedAt: body.published ? now : null,
    createdAt: now,
    updatedAt: now,
  });

  return c.json({ id, slug: body.slug }, 201);
});

// PATCH /api/blog/:id — Admin update post
blogRoutes.patch('/:id', requireAuth, adminMiddleware, async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');
  const body = await c.req.json();
  const now = new Date().toISOString();

  const updateData: Record<string, unknown> = { updatedAt: now };
  if (body.title !== undefined) updateData.title = body.title;
  if (body.content !== undefined) updateData.content = body.content;
  if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
  if (body.featuredImage !== undefined) updateData.featuredImage = body.featuredImage;
  if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
  if (body.tags !== undefined) updateData.tags = JSON.stringify(body.tags);
  if (body.published !== undefined) {
    updateData.published = body.published;
    if (body.published) updateData.publishedAt = now;
  }

  await db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));

  return c.json({ success: true });
});

// DELETE /api/blog/:id
blogRoutes.delete('/:id', requireAuth, adminMiddleware, async (c) => {
  const db = createDb(c.env.DB);
  const id = c.req.param('id');
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return c.json({ success: true });
});
