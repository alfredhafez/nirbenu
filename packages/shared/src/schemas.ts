import { z } from 'zod';
import { BLOOD_GROUPS, AVAILABILITY_OPTIONS, URGENCY_LEVELS, GENDER_OPTIONS, DISTRICTS } from './constants';

export const donorSearchSchema = z.object({
  bloodGroup: z.enum(BLOOD_GROUPS).optional(),
  district: z.enum(DISTRICTS).optional(),
  area: z.string().min(1).optional(),
  availability: z.enum(AVAILABILITY_OPTIONS).optional(),
  gender: z.enum(GENDER_OPTIONS).optional(),
  verified: z.coerce.boolean().optional(),
  ranking: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export const donorRegistrationSchema = z.object({
  bloodGroup: z.enum(BLOOD_GROUPS),
  district: z.enum(DISTRICTS),
  area: z.string().min(2, 'Area is required'),
  gender: z.enum(GENDER_OPTIONS),
  lastDonationDate: z.string().optional(),
  bio: z.string().max(500).optional(),
});

export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10).max(15).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const bloodRequestSchema = z.object({
  bloodGroup: z.enum(BLOOD_GROUPS),
  hospitalName: z.string().min(2, 'Hospital name is required'),
  location: z.string().min(2, 'Location is required'),
  urgency: z.enum(URGENCY_LEVELS),
  requiredDate: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

export const contactRequestSchema = z.object({
  donorId: z.string().uuid(),
  message: z.string().max(500).optional(),
});

export const reviewSchema = z.object({
  donorId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1).max(2000),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).max(15).optional(),
  area: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  gender: z.enum(GENDER_OPTIONS).optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  content: z.string().min(10),
  excerpt: z.string().max(300),
  featuredImage: z.string().url().optional(),
  categoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
});

export const reportSchema = z.object({
  reportedDonorId: z.string().uuid(),
  reason: z.string().min(10).max(500),
});

export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

export const donorAvailabilitySchema = z.object({
  availability: z.enum(AVAILABILITY_OPTIONS),
});

export const reportResolveSchema = z.object({
  status: z.enum(['resolved', 'dismissed']),
  adminNotes: z.string().max(500).optional(),
});
