import { Injectable } from '@nestjs/common';
import toStream  from 'buffer-to-stream';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    buffer: Buffer,
    filename: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: 'vidyarthi',
          public_id: filename,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(buffer).pipe(upload);
    });
  }

  async uploadVideoFile(
    buffer: Buffer,
    filename: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: "video",
          folder: 'vidyarthi',
          public_id: filename,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(buffer).pipe(upload);
    });
  }
}
