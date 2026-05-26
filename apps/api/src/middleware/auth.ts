import type { Context, Next } from 'hono';
import type { Env } from '../index';

export async function authMiddleware(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>, next: Next) {
  // In production, verify Better Auth session token from cookie/header
  // For development, allow mock auth via header
  const authHeader = c.req.header('Authorization');
  const mockUserId = c.req.header('X-Mock-User-Id');
  const mockUserRole = c.req.header('X-Mock-User-Role');

  if (mockUserId) {
    c.set('userId', mockUserId);
    c.set('userRole', mockUserRole || 'user');
    return next();
  }

  // TODO: Better Auth session verification
  // const session = await auth.api.getSession({ headers: c.req.raw.headers });
  // if (session) {
  //   c.set('userId', session.user.id);
  //   c.set('userRole', session.user.role);
  // }

  await next();
}

export async function requireAuth(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>, next: Next) {
  const userId = c.get('userId');
  if (!userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  await next();
}

export async function donorMiddleware(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>, next: Next) {
  const role = c.get('userRole');
  if (role !== 'donor' && role !== 'admin') {
    return c.json({ error: 'Donor access required' }, 403);
  }
  await next();
}

export async function adminMiddleware(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>, next: Next) {
  const role = c.get('userRole');
  if (role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }
  await next();
}

export function getUserId(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>): string {
  return c.get('userId') || '';
}

export function getUserRole(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>): string {
  return c.get('userRole') || 'user';
}

export function isAdmin(c: Context<{ Bindings: Env; Variables: { userId?: string; userRole?: string } }>): boolean {
  return c.get('userRole') === 'admin';
}
