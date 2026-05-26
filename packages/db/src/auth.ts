import { betterAuth } from 'better-auth';
import type { DbClient } from './index';

interface AuthConfig {
  db: DbClient;
  baseURL: string;
  googleClientId?: string;
  googleClientSecret?: string;
  emailVerification?: {
    sendVerificationEmail: (params: { email: string; url: string; token: string }) => Promise<void>;
  };
}

export function createAuth(config: AuthConfig) {
  const providers: Record<string, unknown> = {};

  if (config.googleClientId && config.googleClientSecret) {
    providers.google = {
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    };
  }

  return betterAuth({
    database: {
      provider: 'sqlite',
      ...config.db,
      type: 'sqlite',
    } as never,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    socialProviders: providers as never,
    baseURL: config.baseURL,
    trustedOrigins: [config.baseURL],
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
    },
  });
}
