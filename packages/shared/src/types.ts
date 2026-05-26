import type {
  BLOOD_GROUPS, AVAILABILITY_OPTIONS, URGENCY_LEVELS,
  REQUEST_STATUSES, CONTACT_REQUEST_STATUSES, USER_ROLES,
  RANKINGS, GENDER_OPTIONS, REPORT_STATUSES, NOTIFICATION_TYPES,
} from './constants';

export type BloodGroup = (typeof BLOOD_GROUPS)[number];
export type Availability = (typeof AVAILABILITY_OPTIONS)[number];
export type Urgency = (typeof URGENCY_LEVELS)[number];
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type ContactRequestStatus = (typeof CONTACT_REQUEST_STATUSES)[number];
export type UserRole = (typeof USER_ROLES)[number];
export type Ranking = (typeof RANKINGS)[number];
export type Gender = (typeof GENDER_OPTIONS)[number];
export type ReportStatus = (typeof REPORT_STATUSES)[number];
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  phone: string | null;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Donor {
  id: string;
  bloodGroup: BloodGroup;
  district: string;
  area: string;
  gender: Gender;
  lastDonationDate: string | null;
  recoveryEndDate: string | null;
  availability: Availability;
  donationCount: number;
  verified: boolean;
  ranking: Ranking;
  responseRate: number;
  bio: string | null;
  isAvailableForEmergency: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface DonorPublic extends Omit<Donor, 'user'> {
  user: Omit<User, 'email' | 'phone'>;
  phone?: string;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  bloodGroup: BloodGroup;
  hospitalName: string;
  location: string;
  urgency: Urgency;
  requiredDate: string | null;
  notes: string | null;
  status: RequestStatus;
  acceptedDonorId: string | null;
  createdAt: string;
  updatedAt: string;
  requester?: User;
  acceptedDonor?: Donor;
}

export interface Conversation {
  id: string;
  userId: string;
  donorId: string;
  contactRequestId: string | null;
  lastMessageAt: string;
  createdAt: string;
  user?: User;
  donor?: Donor;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  seen: boolean;
  createdAt: string;
  sender?: User;
}

export interface ContactRequest {
  id: string;
  requesterId: string;
  donorId: string;
  message: string | null;
  status: ContactRequestStatus;
  numberVisible: boolean;
  createdAt: string;
  updatedAt: string;
  requester?: User;
  donor?: Donor;
}

export interface DonorReview {
  id: string;
  donorId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user?: User;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  categoryId: string | null;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: User;
  category?: BlogCategory;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Favorite {
  id: string;
  userId: string;
  donorId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedDonorId: string;
  reason: string;
  status: ReportStatus;
  adminNotes: string | null;
  createdAt: string;
  reporter?: User;
  reportedDonor?: Donor;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
