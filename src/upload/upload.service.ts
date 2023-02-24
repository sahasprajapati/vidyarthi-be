import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadService {
    constructor(private cloudinaryService: CloudinaryService) {}
    async uploadFile(
      file: Express.Multer.File
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
      return new Promise(async(resolve, reject) => {
        try {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname.split('.')[0]}`;
          const res = await this.cloudinaryService.uploadFile(
              file.buffer,
              filename
            );
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
    }

    async uploadCertificate(
      file: Buffer,
      name:string
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
      return new Promise(async(resolve, reject) => {
        try {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${name}`;
          const res = await this.cloudinaryService.uploadFile(
              file,
              filename
            );
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
    }

    async uploadVideoFile(
      file: Express.Multer.File
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
      return new Promise(async(resolve, reject) => {
        try {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname.split('.')[0]}`;
          const res = await this.cloudinaryService.uploadVideoFile(
              file.buffer,
              filename
            );
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
    }
  }
  