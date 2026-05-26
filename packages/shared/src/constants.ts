export const BLOOD_GROUPS = [
  'A+', 'B+', 'AB+', 'O+',
  'A-', 'B-', 'AB-', 'O-',
] as const;

export const AVAILABILITY_OPTIONS = [
  'available', 'recovery', 'busy', 'emergency_only', 'offline',
] as const;

export const URGENCY_LEVELS = [
  'normal', 'urgent', 'emergency',
] as const;

export const REQUEST_STATUSES = [
  'pending', 'active', 'fulfilled', 'expired', 'cancelled',
] as const;

export const CONTACT_REQUEST_STATUSES = [
  'pending', 'accepted', 'rejected',
] as const;

export const USER_ROLES = [
  'user', 'donor', 'admin',
] as const;

export const RANKINGS = [
  'new', 'bronze', 'silver', 'gold', 'hero', 'life_saver',
] as const;

export const GENDER_OPTIONS = [
  'male', 'female', 'other',
] as const;

export const REPORT_STATUSES = [
  'pending', 'resolved', 'dismissed',
] as const;

export const NOTIFICATION_TYPES = [
  'request_accepted', 'chat_message', 'recovery_complete',
  'emergency_alert', 'contact_accepted', 'contact_received',
  'new_review', 'system',
] as const;

export const RECOVERY_DAYS = 90;

export const RANKING_THRESHOLDS = {
  life_saver: 200,
  hero: 150,
  gold: 100,
  silver: 50,
  bronze: 20,
} as const;

export const DISTRICTS = [
  'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna',
  'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh',
] as const;
