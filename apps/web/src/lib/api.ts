const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Donors
export async function searchDonors(params: Record<string, string>) {
  const qs = new URLSearchParams(params).toString();
  return apiFetch<{ data: unknown[]; total: number; page: number; totalPages: number }>(`/api/donors?${qs}`);
}

export async function getDonor(id: string) {
  return apiFetch<Record<string, unknown>>(`/api/donors/${id}`);
}

export async function getDonorReviews(id: string) {
  return apiFetch<{ data: unknown[]; avgRating: number; totalReviews: number }>(`/api/donors/${id}/reviews`);
}

export async function getNearbyDonors(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<{ data: unknown[] }>(`/api/donors/nearby${qs}`);
}

// Blood Requests
export async function getBloodRequests(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<{ data: unknown[]; total: number }>(`/api/requests${qs}`);
}

// Blog
export async function getBlogPosts(params?: Record<string, string>) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<{ data: unknown[] }>(`/api/blog${qs}`);
}

export async function getBlogPost(slug: string) {
  return apiFetch<Record<string, unknown>>(`/api/blog/${slug}`);
}

export async function getBlogCategories() {
  return apiFetch<{ data: unknown[] }>('/api/blog/categories');
}

// Settings
export async function getSiteSettings() {
  return apiFetch<Record<string, string>>('/api/settings');
}
