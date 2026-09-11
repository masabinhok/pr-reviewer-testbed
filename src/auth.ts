import { createHmac, timingSafeEqual } from 'node:crypto';

export interface Session {
  userId: string;
  expiresAt: number;
}

const SESSION_TTL_MS = 60 * 60 * 1000;

export function createSession(userId: string, now = Date.now()): Session {
  return { userId, expiresAt: now + SESSION_TTL_MS };
}

export function isExpired(session: Session, now = Date.now()): boolean {
  return session.expiresAt < now;
}

export function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('hex');
}

export function verify(value: string, signature: string, secret: string): boolean {
  const expected = Buffer.from(sign(value, secret));
  const received = Buffer.from(signature);
  return timingSafeEqual(expected, received);
}

export function parseToken(token: string): { value: string; signature: string } | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  return { value: parts[0], signature: parts[1] };
}

export function describe(session: Session): string {
  return `session for ${session.userId}`;
}
