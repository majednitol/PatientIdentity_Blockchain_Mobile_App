// src/todo/utils/encryption.util.ts

import * as crypto from 'crypto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionUtil implements OnModuleInit {
  private ENCRYPTION_KEY: Buffer; // 32 bytes for AES-256
  private IV_LENGTH = 16; // AES block size

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const keyHex = this.configService.get<string>('ENCRYPTION_KEY');
    if (!keyHex) {
      throw new Error('Missing ENCRYPTION_KEY in environment variables.');
    }

    this.ENCRYPTION_KEY = Buffer.from(keyHex, 'hex');

    if (this.ENCRYPTION_KEY.length !== 32) {
      throw new Error('ENCRYPTION_KEY must be 32 bytes (64 hex characters).');
    }
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Return iv and encrypted data separated by ':'
    return iv.toString('hex') + ':' + encrypted;
  }

  decrypt(text: string): string {
    const textParts = text.split(':');
    if (textParts.length !== 2) {
      throw new Error('Invalid encrypted text format.');
    }
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedText = textParts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
