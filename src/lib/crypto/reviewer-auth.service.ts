import { HardwareFingerprintService, AuthorizedMachine } from './hardware-fingerprint.service';
import { EncryptionService } from './encryption.service';

export interface ReviewerAccess {
  reviewerId: string;
  authorizedMachines: string[];
  permissions: string[];
  createdAt: number;
  expiresAt: number;
}

export interface AccessLog {
  userId: string;
  reviewerId: string;
  machineId: string;
  action: 'decrypt' | 'view' | 'audit';
  timestamp: number;
  success: boolean;
  reason?: string;
}

export class ReviewerAuthService {
  private static accessLogs: AccessLog[] = [];

  // Define authorized reviewers with their machine IDs
  static getAuthorizedReviewers(): ReviewerAccess[] {
    const currentFingerprint = HardwareFingerprintService.generateMachineFingerprint();
    
    return [
      {
        reviewerId: 'reviewer@system',
        authorizedMachines: [currentFingerprint.machineId], // Current machine for demo
        permissions: ['decrypt', 'view', 'audit'],
        createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
        expiresAt: Date.now() + (365 * 24 * 60 * 60 * 1000)  // 1 year from now
      },
      {
        reviewerId: 'auditor@system',
        authorizedMachines: [currentFingerprint.machineId], // Current machine for demo
        permissions: ['view', 'audit'],
        createdAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
        expiresAt: Date.now() + (90 * 24 * 60 * 60 * 1000)
      }
    ];
  }

  // Check if reviewer has access from current machine
  static isReviewerAuthorized(
    reviewerId: string, 
    action: 'decrypt' | 'view' | 'audit'
  ): { authorized: boolean; reason?: string } {
    const currentFingerprint = HardwareFingerprintService.generateMachineFingerprint();
    const reviewers = this.getAuthorizedReviewers();
    
    const reviewer = reviewers.find(r => r.reviewerId === reviewerId);
    
    if (!reviewer) {
      return { authorized: false, reason: 'Reviewer not found in authorized list' };
    }

    if (Date.now() > reviewer.expiresAt) {
      return { authorized: false, reason: 'Reviewer access expired' };
    }

    if (!reviewer.permissions.includes(action)) {
      return { authorized: false, reason: `Reviewer does not have '${action}' permission` };
    }

    if (!reviewer.authorizedMachines.includes(currentFingerprint.machineId)) {
      return { 
        authorized: false, 
        reason: `Machine ${currentFingerprint.machineId} not authorized for reviewer ${reviewerId}` 
      };
    }

    return { authorized: true };
  }

  // Attempt reviewer access with logging
  static attemptReviewerAccess(
    userId: string,
    reviewerId: string,
    action: 'decrypt' | 'view' | 'audit',
    encryptedData?: any
  ): { success: boolean; data?: any; reason?: string } {
    const currentFingerprint = HardwareFingerprintService.generateMachineFingerprint();
    
    // Check authorization
    const authResult = this.isReviewerAuthorized(reviewerId, action);
    
    const logEntry: AccessLog = {
      userId,
      reviewerId,
      machineId: currentFingerprint.machineId,
      action,
      timestamp: Date.now(),
      success: authResult.authorized,
      reason: authResult.reason
    };

    this.accessLogs.push(logEntry);

    if (!authResult.authorized) {
      return { success: false, reason: authResult.reason };
    }

    // If requesting decryption, attempt it
    if (action === 'decrypt' && encryptedData) {
      try {
        const decryptedData = EncryptionService.decryptOnAuthorizedMachine(
          encryptedData,
          reviewerId,
          'reviewer'
        );
        return { success: true, data: decryptedData };
      } catch (error) {
        const errorReason = `Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
        this.accessLogs[this.accessLogs.length - 1].reason = errorReason;
        this.accessLogs[this.accessLogs.length - 1].success = false;
        return { success: false, reason: errorReason };
      }
    }

    return { success: true };
  }

  // Get access logs for audit trail
  static getAccessLogs(reviewerId?: string): AccessLog[] {
    if (reviewerId) {
      return this.accessLogs.filter(log => log.reviewerId === reviewerId);
    }
    return this.accessLogs;
  }

  // Add new authorized machine for a reviewer
  static authorizeReviewerMachine(
    reviewerId: string,
    machineId: string,
    permissions: string[] = ['view', 'audit']
  ): { success: boolean; reason?: string } {
    // In a real implementation, this would update a database
    // For demo, we'll just validate the request
    
    if (!machineId || machineId.length < 16) {
      return { success: false, reason: 'Invalid machine ID format' };
    }

    const validPermissions = ['decrypt', 'view', 'audit'];
    const invalidPerms = permissions.filter(p => !validPermissions.includes(p));
    if (invalidPerms.length > 0) {
      return { success: false, reason: `Invalid permissions: ${invalidPerms.join(', ')}` };
    }

    console.log(`Authorized machine ${machineId} for reviewer ${reviewerId} with permissions: ${permissions.join(', ')}`);
    return { success: true };
  }

  // Revoke reviewer access
  static revokeReviewerAccess(reviewerId: string, machineId?: string): { success: boolean; reason?: string } {
    console.log(`Revoked access for reviewer ${reviewerId}${machineId ? ` on machine ${machineId}` : ' on all machines'}`);
    return { success: true };
  }

  // Get machine-specific reviewer status
  static getReviewerMachineStatus(): {
    machineId: string;
    authorizedReviewers: string[];
    currentPermissions: { [reviewerId: string]: string[] };
  } {
    const currentFingerprint = HardwareFingerprintService.generateMachineFingerprint();
    const reviewers = this.getAuthorizedReviewers();
    
    const authorizedReviewers = reviewers
      .filter(r => r.authorizedMachines.includes(currentFingerprint.machineId))
      .map(r => r.reviewerId);

    const currentPermissions: { [reviewerId: string]: string[] } = {};
    reviewers.forEach(reviewer => {
      if (reviewer.authorizedMachines.includes(currentFingerprint.machineId)) {
        currentPermissions[reviewer.reviewerId] = reviewer.permissions;
      }
    });

    return {
      machineId: currentFingerprint.machineId,
      authorizedReviewers,
      currentPermissions
    };
  }
}