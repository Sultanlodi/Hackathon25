import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { HardwareFingerprintService } from './hardware-fingerprint.service';

export interface EncryptedBlockData {
  data: string;
  iv: string;
  salt: string;
  machineBinding: string;
  userKeyHash: string;
  algorithm: 'SHA256-AES256';
}

export interface MachineBinding {
  userMachineId: string;
  reviewerMachineId: string;
  timestamp: number;
}

export class EncryptionService {
  private static readonly MASTER_SECRET = process.env.ENCRYPTION_MASTER_SECRET || 'hackathon25-master-key-2025';
  private static readonly REVIEWER_MASTER_KEY = process.env.REVIEWER_MASTER_KEY || 'reviewer-access-key-2025';

  // Generate machine-bound SHA256 encryption key
  static generateMachineBoundKey(userId: string, purpose: string): string {
    return HardwareFingerprintService.generateMachineBoundKey(userId, purpose);
  }

  // Encrypt data that can only be decrypted on authorized machines
  static encryptForAuthorizedMachines(
    data: any, 
    userId: string, 
    reviewerUserId?: string
  ): EncryptedBlockData {
    const currentFingerprint = HardwareFingerprintService.generateMachineFingerprint();
    
    // Generate machine-bound encryption key using SHA256
    const userMachineKey = this.generateMachineBoundKey(userId, 'encryption');
    const reviewerMachineKey = reviewerUserId 
      ? this.generateMachineBoundKey(reviewerUserId, 'reviewer-encryption')
      : this.generateMachineBoundKey('reviewer@system', 'reviewer-encryption');

    // Create combined key using SHA256
    const combinedKeyData = `${userMachineKey}:${reviewerMachineKey}:${this.MASTER_SECRET}`;
    const combinedKey = crypto.createHash('sha256').update(combinedKeyData).digest('hex');

    const jsonData = JSON.stringify(data);
    
    // Use crypto module for more secure encryption
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(32);
    
    // Derive key using PBKDF2 with SHA256
    const derivedKey = crypto.pbkdf2Sync(combinedKey, salt, 10000, 32, 'sha256');
    
    // Encrypt using AES-256-CBC with IV
    const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
    cipher.setAutoPadding(true);
    
    let encrypted = cipher.update(jsonData, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Create machine binding information
    const machineBinding: MachineBinding = {
      userMachineId: currentFingerprint.machineId,
      reviewerMachineId: currentFingerprint.machineId, // Same machine for demo
      timestamp: Date.now()
    };

    return {
      data: encrypted,
      iv: iv.toString('hex'),
      salt: salt.toString('hex'),
      machineBinding: Buffer.from(JSON.stringify(machineBinding)).toString('base64'),
      userKeyHash: crypto.createHash('sha256').update(userMachineKey).digest('hex').substring(0, 16),
      algorithm: 'SHA256-AES256'
    };
  }

  // Decrypt data - only works on authorized machines
  static decryptOnAuthorizedMachine(
    encryptedData: EncryptedBlockData, 
    userId: string, 
    role: 'user' | 'reviewer'
  ): any {
    // Verify machine authorization
    if (!HardwareFingerprintService.isAuthorizedMachine(userId, role)) {
      throw new Error('Machine not authorized for decryption');
    }

    const currentFingerprint = HardwareFingerprintService.generateMachineFingerprint();
    
    try {
      // Parse machine binding
      const machineBinding: MachineBinding = JSON.parse(
        Buffer.from(encryptedData.machineBinding, 'base64').toString()
      );

      // Verify machine binding (for demo, we allow same machine)
      const isValidMachine = 
        machineBinding.userMachineId === currentFingerprint.machineId ||
        machineBinding.reviewerMachineId === currentFingerprint.machineId;

      if (!isValidMachine) {
        throw new Error('Machine fingerprint does not match authorized machines');
      }

      // Regenerate the same keys that were used for encryption
      const userMachineKey = this.generateMachineBoundKey(userId, 'encryption');
      const reviewerMachineKey = this.generateMachineBoundKey('reviewer@system', 'reviewer-encryption');
      
      const combinedKeyData = `${userMachineKey}:${reviewerMachineKey}:${this.MASTER_SECRET}`;
      const combinedKey = crypto.createHash('sha256').update(combinedKeyData).digest('hex');

      // Recreate derived key
      const salt = Buffer.from(encryptedData.salt, 'hex');
      const derivedKey = crypto.pbkdf2Sync(combinedKey, salt, 10000, 32, 'sha256');

      // Decrypt using IV
      const iv = Buffer.from(encryptedData.iv, 'hex');
      const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
      let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return JSON.parse(decrypted);
    } catch (error) {
      throw new Error(`Decryption failed: Machine authorization required. ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Legacy methods for backwards compatibility (now machine-bound)
  static encryptForUserAndReviewer(data: any, userId: string, userSecret?: string): any {
    // Convert to new machine-bound format
    return this.encryptForAuthorizedMachines(data, userId, 'reviewer@system');
  }

  static decryptAsUser(encryptedData: any, userId: string, userSecret?: string): any {
    // Handle both old and new formats
    if (encryptedData.algorithm === 'SHA256-AES256') {
      return this.decryptOnAuthorizedMachine(encryptedData as EncryptedBlockData, userId, 'user');
    }
    
    // Fallback to old method for backwards compatibility
    try {
      const keys = this.generateUserKeys(userId, userSecret);
      return this.performDecryption(encryptedData, keys.combinedHash);
    } catch (error) {
      throw new Error('Legacy decryption failed - machine authorization may be required');
    }
  }

  static decryptAsReviewer(encryptedData: any, userId: string): any {
    // Handle both old and new formats
    if (encryptedData.algorithm === 'SHA256-AES256') {
      return this.decryptOnAuthorizedMachine(encryptedData as EncryptedBlockData, 'reviewer@system', 'reviewer');
    }
    
    // Fallback to old method
    const keys = this.generateUserKeys(userId);
    const reviewerCombinedHash = CryptoJS.SHA256(keys.reviewerKey + keys.userKey).toString();
    return this.performDecryption(encryptedData, reviewerCombinedHash);
  }

  // Get machine security status
  static getMachineSecurityStatus(userId: string): {
    machineId: string;
    userAuthorized: boolean;
    reviewerAuthorized: boolean;
    fingerprint: any;
  } {
    const fingerprint = HardwareFingerprintService.generateMachineFingerprint();
    
    return {
      machineId: fingerprint.machineId,
      userAuthorized: HardwareFingerprintService.isAuthorizedMachine(userId, 'user'),
      reviewerAuthorized: HardwareFingerprintService.isAuthorizedMachine('reviewer@system', 'reviewer'),
      fingerprint
    };
  }

  // Legacy methods kept for backwards compatibility
  private static generateUserKeys(userId: string, userSecret?: string) {
    const userSalt = CryptoJS.SHA256(userId + this.MASTER_SECRET).toString();
    const userKey = userSecret 
      ? CryptoJS.PBKDF2(userSecret, userSalt, { keySize: 256/32 }).toString()
      : CryptoJS.SHA256(userId + userSalt).toString();
    
    const reviewerKey = CryptoJS.PBKDF2(this.REVIEWER_MASTER_KEY, userSalt, { keySize: 256/32 }).toString();
    const combinedHash = CryptoJS.SHA256(userKey + reviewerKey).toString();

    return { userKey, reviewerKey, combinedHash };
  }

  private static performDecryption(encryptedData: any, combinedHash: string): any {
    try {
      const salt = CryptoJS.enc.Hex.parse(encryptedData.salt);
      const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
      const encryptionKey = CryptoJS.PBKDF2(combinedHash, salt, { keySize: 256/32 });
      
      const decrypted = CryptoJS.AES.decrypt(encryptedData.data, encryptionKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText);
    } catch (error) {
      throw new Error('Decryption failed: Invalid credentials or corrupted data');
    }
  }

  // Token methods remain the same
  static generateAccessToken(userId: string, role: 'user' | 'reviewer'): string {
    const payload = {
      userId,
      role,
      machineId: HardwareFingerprintService.generateMachineFingerprint().machineId,
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000)
    };
    return jwt.sign(payload, this.MASTER_SECRET);
  }

  static verifyAccessToken(token: string): { userId: string; role: 'user' | 'reviewer'; machineId?: string } {
    try {
      const decoded = jwt.verify(token, this.MASTER_SECRET) as any;
      return { 
        userId: decoded.userId, 
        role: decoded.role,
        machineId: decoded.machineId
      };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}