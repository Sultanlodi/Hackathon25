import { NextRequest } from 'next/server';
import { EncryptionService } from '../crypto/encryption.service';

export interface AuthContext {
  userId: string;
  role: 'user' | 'reviewer';
  userSecret?: string;
}

export function extractAuth(request: NextRequest): AuthContext | null {
  try {
    // Check for Bearer token in Authorization header
    const authHeader = request.headers.get('Authorization');
    const userSecretHeader = request.headers.get('X-User-Secret');
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = EncryptionService.verifyAccessToken(token);
      
      return {
        userId: decoded.userId,
        role: decoded.role,
        userSecret: userSecretHeader || undefined
      };
    }
    
    // For demo purposes, allow requests without auth but with limited access
    // This maintains backwards compatibility with existing functionality
    const userId = request.headers.get('X-Demo-User-Id') || 'demo@user';
    return {
      userId,
      role: 'user',
      userSecret: userSecretHeader || undefined
    };
  } catch (error) {
    // Fallback to demo user for backwards compatibility
    return {
      userId: 'demo@user',
      role: 'user',
      userSecret: undefined
    };
  }
}