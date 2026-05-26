import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  name: text('name').notNull(),
  phone: text('phone').unique(),
  passwordHash: text('password_hash'),
  role: text('role', { enum: ['user', 'donor', 'admin'] }).notNull().default('user'),
  avatarUrl: text('avatar_url'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const donors = sqliteTable('donors', {
  id: text('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  bloodGroup: text('blood_group', {
    enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  }).notNull(),
  district: text('district').notNull(),
  area: text('area').notNull(),
  gender: text('gender', { enum: ['male', 'female', 'other'] }).notNull().default('male'),
  lastDonationDate: text('last_donation_date'),
  recoveryEndDate: text('recovery_end_date'),
  availability: text('availability', {
    enum: ['available', 'recovery', 'busy', 'emergency_only', 'offline'],
  }).notNull().default('available'),
  donationCount: integer('donation_count').notNull().default(0),
  verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
  ranking: text('ranking', {
    enum: ['new', 'bronze', 'silver', 'gold', 'hero', 'life_saver'],
  }).notNull().default('new'),
  responseRate: real('response_rate').notNull().default(100),
  bio: text('bio'),
  isAvailableForEmergency: integer('is_available_for_emergency', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const bloodRequests = sqliteTable('blood_requests', {
  id: text('id').primaryKey(),
  requesterId: text('requester_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bloodGroup: text('blood_group', {
    enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  }).notNull(),
  hospitalName: text('hospital_name').notNull(),
  location: text('location').notNull(),
  urgency: text('urgency', { enum: ['normal', 'urgent', 'emergency'] }).notNull().default('normal'),
  requiredDate: text('required_date'),
  notes: text('notes'),
  status: text('status', {
    enum: ['pending', 'active', 'fulfilled', 'expired', 'cancelled'],
  }).notNull().default('pending'),
  acceptedDonorId: text('accepted_donor_id').references(() => donors.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const contactRequests = sqliteTable('contact_requests', {
  id: text('id').primaryKey(),
  requesterId: text('requester_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  donorId: text('donor_id').notNull().references(() => donors.id, { onDelete: 'cascade' }),
  message: text('message'),
  status: text('status', { enum: ['pending', 'accepted', 'rejected'] }).notNull().default('pending'),
  numberVisible: integer('number_visible', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  donorId: text('donor_id').notNull().references(() => donors.id, { onDelete: 'cascade' }),
  contactRequestId: text('contact_request_id').references(() => contactRequests.id, { onDelete: 'set null' }),
  lastMessageAt: text('last_message_at').notNull().default(sql`(datetime('now'))`),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  seen: integer('seen', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export const donorReviews = sqliteTable('donor_reviews', {
  id: text('id').primaryKey(),
  donorId: text('donor_id').notNull().references(() => donors.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type', {
    enum: [
      'request_accepted', 'chat_message', 'recovery_complete',
      'emergency_alert', 'contact_accepted', 'contact_received',
      'new_review', 'system',
    ],
  }).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  read: integer('read', { mode: 'boolean' }).notNull().default(false),
  metadata: text('metadata'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export const blogPosts = sqliteTable('blog_posts', {
  id: text('id').primaryKey(),
  authorId: text('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt').notNull(),
  featuredImage: text('featured_image'),
  categoryId: text('category_id').references(() => blogCategories.id, { onDelete: 'set null' }),
  tags: text('tags').notNull().default('[]'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  publishedAt: text('published_at'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const blogCategories = sqliteTable('blog_categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const favorites = sqliteTable('favorites', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  donorId: text('donor_id').notNull().references(() => donors.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(),
  reporterId: text('reporter_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reportedDonorId: text('reported_donor_id').notNull().references(() => donors.id, { onDelete: 'cascade' }),
  reason: text('reason').notNull(),
  status: text('status', { enum: ['pending', 'resolved', 'dismissed'] }).notNull().default('pending'),
  adminNotes: text('admin_notes'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export const siteSettings = sqliteTable('site_settings', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});
