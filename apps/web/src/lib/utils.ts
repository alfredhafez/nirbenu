import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | null) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function getRecoveryDaysLeft(recoveryEndDate: string | null): number {
  if (!recoveryEndDate) return 0;
  const end = new Date(recoveryEndDate);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export function getRecoveryProgress(recoveryEndDate: string | null): number {
  if (!recoveryEndDate) return 100;
  const end = new Date(recoveryEndDate);
  const start = new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function getRankingColor(ranking: string): string {
  const colors: Record<string, string> = {
    new: 'bg-slate-100 text-slate-600',
    bronze: 'bg-amber-100 text-amber-700',
    silver: 'bg-slate-200 text-slate-700',
    gold: 'bg-yellow-100 text-yellow-700',
    hero: 'bg-purple-100 text-purple-700',
    life_saver: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700',
  };
  return colors[ranking] || colors.new;
}

export function getAvailabilityColor(status: string): string {
  const colors: Record<string, string> = {
    available: 'bg-emerald-100 text-emerald-700',
    recovery: 'bg-amber-100 text-amber-700',
    busy: 'bg-orange-100 text-orange-700',
    emergency_only: 'bg-red-100 text-red-700',
    offline: 'bg-slate-100 text-slate-500',
  };
  return colors[status] || colors.offline;
}

export function getAvailabilityLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Available',
    recovery: 'Recovering',
    busy: 'Busy',
    emergency_only: 'Emergency Only',
    offline: 'Offline',
  };
  return labels[status] || status;
}

export function getUrgencyColor(urgency: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-blue-100 text-blue-700',
    urgent: 'bg-amber-100 text-amber-700',
    emergency: 'bg-red-100 text-red-700',
  };
  return colors[urgency] || colors.normal;
}
