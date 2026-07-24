import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';

export interface AuthRequest extends Request {
  user?: any;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  console.log('\n[AUTH] ===== MIDDLEWARE START =====');
  console.log('[AUTH] Method:', req.method);
  console.log('[AUTH] Path:', req.path);
  console.log('[AUTH] Headers:', {
    'content-type': req.headers['content-type'],
    'authorization': req.headers.authorization ? '***REDACTED***' : 'MISSING'
  });
  console.log('[AUTH] JWT_SECRET length:', JWT_SECRET.length);
  console.log('[AUTH] JWT_SECRET first 30 chars:', JWT_SECRET.substring(0, 30));
  
  const auth = req.headers.authorization;
  
  if (!auth) {
    console.warn('[AUTH] ❌ No authorization header provided');
    console.log('[AUTH] ===== MIDDLEWARE END (401) =====\n');
    return res.status(401).json({ message: 'No token provided' });
  }
  
  console.log('[AUTH] Authorization header found');
  const token = auth.split(' ')[1];
  
  if (!token) {
    console.warn('[AUTH] ❌ Token missing from format:', auth);
    console.log('[AUTH] ===== MIDDLEWARE END (401) =====\n');
    return res.status(401).json({ message: 'Invalid token format' });
  }
  
  console.log('[AUTH] Token found, verifying with JWT_SECRET length:', JWT_SECRET.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('[AUTH] ✅ Token verified for user:', (decoded as any).email);
    console.log('[AUTH] ✅ User role:', (decoded as any).role);
    req.user = decoded;
    console.log('[AUTH] ===== MIDDLEWARE END (PROCEED) =====\n');
    next();
  } catch (error: any) {
    console.error('[AUTH] ❌ TOKEN VERIFICATION FAILED:', error.message);
    console.log('[AUTH] ===== MIDDLEWARE END (401) =====\n');
    res.status(401).json({ message: 'Invalid token' });
  }
}