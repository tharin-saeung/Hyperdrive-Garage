import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

// Define the secret key for encryption
// In production, use a long, unique secret from environment variables
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'your_very_long_and_complex_secret_key_that_should_be_at_least_32_characters'
);

// Define the shape of the session data
interface SessionData extends JWTPayload {
  userId: string;
  expiresAt: number;
}

// Encrypt the session data
export async function encrypt(payload: Omit<SessionData, 'iat' | 'exp'>) {
  return await new SignJWT({ 
    userId: payload.userId 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

// Decrypt and verify the session data
export async function decrypt(session: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(session, SECRET_KEY);
    
    // Type guard and conversion
    if (payload && typeof payload === 'object' && 'userId' in payload) {
      return payload as SessionData;
    }
    
    return null;
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

// Create a new session
export async function createSession(userId: string) {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  
  // Encrypt the session data
  const session = await encrypt({ 
    userId, 
    expiresAt 
  });
  
  // Set the session cookie
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expiresAt),
    sameSite: 'lax',
    path: '/',
  });
}

// Get the current session
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  
  if (!session) return null;
  
  return await decrypt(session);
}

// Delete the current session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}