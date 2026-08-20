import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class IStorageProvider {
  getUploadUrl(path: string, mimeType: string): Promise<string> {
    throw new ConflictException('Sin implementacion');
  }
  getDownloadUrl(path: string): Promise<string> {
    throw new ConflictException('Sin implementacion');
  }
  deleteFile(path: string): Promise<void> {
    throw new ConflictException('Sin implementacion');
  }
}
