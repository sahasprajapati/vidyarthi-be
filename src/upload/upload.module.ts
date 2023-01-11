import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService, CloudinaryProvider],
  exports: [],
})
export class UploadModule {}
