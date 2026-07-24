/**
 * JWT configuration - centralized to ensure consistent secret across login and verification
 */

console.log('[jwt.config] Loading JWT configuration...');
console.log('[jwt.config] process.env.JWT_SECRET is set:', !!process.env.JWT_SECRET);
console.log('[jwt.config] process.env.JWT_SECRET length:', process.env.JWT_SECRET?.length || 0);

export const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

console.log('[jwt.config] JWT_SECRET loaded, length:', JWT_SECRET.length);
console.log('[jwt.config] JWT_SECRET preview:', JWT_SECRET.substring(0, 30));
