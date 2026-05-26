import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createDb, createAuth } from '@nirbenu/db';
import { donorsRoutes } from './routes/donors';
import { requestsRoutes } from './routes/requests';
import { contactRoutes } from './routes/contact';
import { chatRoutes } from './routes/chat';
import { reviewsRoutes } from './routes/reviews';
import { notificationsRoutes } from './routes/notifications';
import { blogRoutes } from './routes/blog';
import { adminRoutes } from './routes/admin';
import { uploadRoutes } from './routes/upload';
import { settingsRoutes } from './routes/settings';
import { authMiddleware, donorMiddleware, adminMiddleware } from './middleware/auth';

export interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
  BASE_URL: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  PUSHER_APP_ID?: string;
  PUSHER_KEY?: string;
  PUSHER_SECRET?: string;
  PUSHER_CLUSTER?: string;
  RESEND_API_KEY?: string;
}

const app = new Hono<{ Bindings: Env; Variables: { userId: string; userRole: string } }>();

app.use('*', cors({
  origin: ['http://localhost:3000', 'https://nirbenu.pages.dev'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use('/api/*', async (c, next) => {
  const db = createDb(c.env.DB);
  c.set('db', db as never);
  await next();
});

// Auth middleware applies to most routes except public ones
app.use('/api/*', authMiddleware);

// Public routes (no auth required but middleware checks optionally)
app.route('/api/donors', donorsRoutes);
app.route('/api/requests', requestsRoutes);
app.route('/api/blog', blogRoutes);
app.route('/api/settings', settingsRoutes);

// Auth-required routes
app.route('/api/contact', contactRoutes);
app.route('/api/chat', chatRoutes);
app.route('/api/reviews', reviewsRoutes);
app.route('/api/notifications', notificationsRoutes);
app.route('/api/upload', uploadRoutes);

// Admin-only routes
app.route('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

export default app;
