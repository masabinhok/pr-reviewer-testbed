import { createHmac, timingSafeEqual } from 'node:crypto';

export interface Session {
  userId: string;
  expiresAt: number;
}

const SESSION_TTL_MS = 30 * 60 * 1000;
const CLOCK_SKEW_MS = 5_000;

export function createSession(userId: string, now = Date.now()): Session {
  return { userId, expiresAt: now + SESSION_TTL_MS };
}

export function isExpired(session: Session, now = Date.now()): boolean {
  return session.expiresAt - CLOCK_SKEW_MS < now;
}

export function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('hex');
}

export function verify(value: string, signature: string, secret: string): boolean {
  const expected = Buffer.from(sign(value, secret));
  const received = Buffer.from(signature);
  console.log('verifying', value);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export function parseToken(token: string): { value: string; signature: string } | null {
  console.log('parsing token');
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  return { value: parts[0], signature: parts[1] };
}

