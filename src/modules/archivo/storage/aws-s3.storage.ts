import { Inject, Injectable } from '@nestjs/common';
import { IStorageProvider } from './base.storage';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Configuration } from 'src/core';

@Injectable()
export class AwsS3Storage implements IStorageProvider {
  constructor(
    @Inject('S3_CLIENT') private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async getUploadUrl(path: string, mimeType: string) {
    // genera presigned URL
    const command = new PutObjectCommand({
      Bucket: this.configService.get(Configuration.BUCKET_S3),
      Key: path,
      ContentType: mimeType,
    });

    return await getSignedUrl(this.s3, command, {
      expiresIn: 60 * 5, // 5 minutos
    });
  }

  async getDownloadUrl(path: string) {
    // presigned GET
    const command = new GetObjectCommand({
      Bucket: this.configService.get(Configuration.BUCKET_S3),
      Key: path,
    });

    return await getSignedUrl(this.s3, command, {
      expiresIn: 60 * 5, // 5 minutos
    });
  }

  async deleteFile(path: string) {
    // deleteObject

    const command = new DeleteObjectCommand({
      Bucket: this.configService.get(Configuration.BUCKET_S3),
      Key: path,
    });

    await this.s3.send(command);
  }
}
