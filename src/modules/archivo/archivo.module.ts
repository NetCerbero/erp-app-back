// storage.module.ts
import { Module } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/core';
import { AwsS3Storage } from './storage/aws-s3.storage';

@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new S3({
          credentials: {
            accessKeyId:
              configService.get<string>(Configuration.AWS_ACCESS_KEY_ID) || '',
            secretAccessKey:
              configService.get<string>(Configuration.AWS_SECRET_ACCESS_KEY) ||
              '',
          },
        });
      },
    },
    AwsS3Storage,
    {
      provide: 'STORAGE_CLIENT',
      inject: [ConfigService, AwsS3Storage],
      useFactory: (configService: ConfigService, awsS3: AwsS3Storage) => {
        const tipoStorage =
          configService.get(Configuration.STORAGE_CLIENT) || '';
        
        if(tipoStorage == "S3_CLIENT"){
            return awsS3
        }
        return 
      },
    },
  ],
  exports: ['S3_CLIENT', AwsS3Storage],
})
export class ArchivoModule {}
