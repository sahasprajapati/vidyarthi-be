import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService, CloudinaryProvider],
  exports: [UploadService],
})
export class UploadModule {}
