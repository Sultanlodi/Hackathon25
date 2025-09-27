import crypto from 'crypto';
import os from 'os';

export interface MachineFingerprint {
  machineId: string;
  userContext: string;
  timestamp: number;
  verified: boolean;
}

export interface AuthorizedMachine {
  machineId: string;
  userId: string;
  role: 'user' | 'reviewer';
  authorized: boolean;
  label: string;
}

export class HardwareFingerprintService {
  private static readonly SALT = process.env.MACHINE_FINGERPRINT_SALT || 'hackathon25-machine-salt-2025';

  // Generate unique machine fingerprint based on hardware characteristics
  static generateMachineFingerprint(): MachineFingerprint {
    try {
      // Collect system information that's unique but stable
      const systemInfo = {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        cpus: os.cpus().length,
        totalMemory: os.totalmem(),
        networkInterfaces: this.getNetworkFingerprint(),
        userInfo: os.userInfo().username,
        homeDir: os.homedir(),
        // Add some browser/environment specific data if available
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: typeof navigator !== 'undefined' ? navigator.language : 'en-US'
      };

      // Create a stable hash from system information
      const fingerprintData = JSON.stringify(systemInfo);
      const machineId = crypto
        .createHash('sha256')
        .update(fingerprintData + this.SALT)
        .digest('hex');

      // Create user context (combines user and machine)
      const userContext = crypto
        .createHash('sha256')
        .update(systemInfo.userInfo + systemInfo.hostname + machineId)
        .digest('hex');

      return {
        machineId: machineId.substring(0, 32), // First 32 chars for readability
        userContext: userContext.substring(0, 32),
        timestamp: Date.now(),
        verified: true
      };
    } catch (error) {
      console.error('Failed to generate machine fingerprint:', error);
      // Fallback to a less secure but functional fingerprint
      const fallbackId = crypto
        .createHash('sha256')
        .update(os.hostname() + os.userInfo().username + Date.now().toString())
        .digest('hex')
        .substring(0, 32);

      return {
        machineId: fallbackId,
        userContext: fallbackId,
        timestamp: Date.now(),
        verified: false
      };
    }
  }

  // Get network interface fingerprint (MAC addresses, etc.)
  private static getNetworkFingerprint(): string {
    try {
      const interfaces = os.networkInterfaces();
      const macAddresses: string[] = [];
      
      Object.keys(interfaces).forEach(name => {
        const nets = interfaces[name];
        if (nets) {
          nets.forEach(net => {
            if (net.mac && net.mac !== '00:00:00:00:00:00') {
              macAddresses.push(net.mac);
            }
          });
        }
      });

      return crypto
        .createHash('sha256')
        .update(macAddresses.sort().join(''))
        .digest('hex')
        .substring(0, 16);
    } catch {
      return 'unknown';
    }
  }

  // Verify if current machine matches a stored fingerprint
  static verifyMachineIdentity(storedFingerprint: MachineFingerprint): boolean {
    const currentFingerprint = this.generateMachineFingerprint();
    return (
      currentFingerprint.machineId === storedFingerprint.machineId &&
      currentFingerprint.userContext === storedFingerprint.userContext
    );
  }

  // Get authorized machines from environment/config
  static getAuthorizedMachines(): AuthorizedMachine[] {
    try {
      const configString = process.env.AUTHORIZED_MACHINES || '[]';
      return JSON.parse(configString) as AuthorizedMachine[];
    } catch {
      // Default authorized machines (for demo)
      const currentFingerprint = this.generateMachineFingerprint();
      return [
        {
          machineId: currentFingerprint.machineId,
          userId: 'demo@user',
          role: 'user',
          authorized: true,
          label: 'Demo User Machine'
        },
        {
          machineId: currentFingerprint.machineId,
          userId: 'reviewer@system',
          role: 'reviewer',
          authorized: true,
          label: 'Demo Reviewer Machine'
        }
      ];
    }
  }

  // Check if current machine is authorized for a specific user and role
  static isAuthorizedMachine(userId: string, role: 'user' | 'reviewer'): boolean {
    const currentFingerprint = this.generateMachineFingerprint();
    const authorizedMachines = this.getAuthorizedMachines();
    
    return authorizedMachines.some(machine => 
      machine.machineId === currentFingerprint.machineId &&
      machine.userId === userId &&
      machine.role === role &&
      machine.authorized
    );
  }

  // Generate machine-bound encryption key
  static generateMachineBoundKey(userId: string, purpose: string): string {
    const fingerprint = this.generateMachineFingerprint();
    const keyData = `${fingerprint.machineId}:${fingerprint.userContext}:${userId}:${purpose}:${this.SALT}`;
    
    return crypto
      .createHash('sha256')
      .update(keyData)
      .digest('hex');
  }

  // Create a machine binding token for verification
  static createMachineBindingToken(userId: string, role: 'user' | 'reviewer'): string {
    const fingerprint = this.generateMachineFingerprint();
    const tokenData = {
      machineId: fingerprint.machineId,
      userContext: fingerprint.userContext,
      userId,
      role,
      timestamp: Date.now()
    };

    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    const signature = crypto
      .createHmac('sha256', this.SALT)
      .update(token)
      .digest('hex');

    return `${token}.${signature}`;
  }

  // Verify machine binding token
  static verifyMachineBindingToken(token: string): { valid: boolean; data?: any } {
    try {
      const [tokenData, signature] = token.split('.');
      
      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', this.SALT)
        .update(tokenData)
        .digest('hex');

      if (signature !== expectedSignature) {
        return { valid: false };
      }

      const data = JSON.parse(Buffer.from(tokenData, 'base64').toString());
      const currentFingerprint = this.generateMachineFingerprint();

      // Verify machine identity matches current machine
      if (
        data.machineId === currentFingerprint.machineId &&
        data.userContext === currentFingerprint.userContext
      ) {
        return { valid: true, data };
      }

      return { valid: false };
    } catch {
      return { valid: false };
    }
  }
}