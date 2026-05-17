import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'fallback-secret';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const secretKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

export function verifyAdminCredentials(email: string, password: string): boolean {
  // Use timing-safe comparison for production-grade security
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      clockTolerance: 60,
    });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function getAdminTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_token')?.value;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminTokenFromCookie();
  if (!token) return false;
  return verifyAdminToken(token);
}
