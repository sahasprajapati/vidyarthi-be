import { S3Client } from '@aws-sdk/client-s3';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import {
  BadRequestException,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { generateRepsonseMessage } from '@src/roles/response';
import multerS3 from 'multer-s3';
import path from 'path';
import { UploadDto } from './dto/upload.dto';
import { UploadService } from './upload.service';

const s3 = new S3Client({ region: process.env.AWS_REGION });

@Controller('upload')
@ApiBearerAuth()
@ApiTags('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          console.log('File', file);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file?.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
      // storage: diskStorage({
      //   destination: './uploads/',
      //   filename: function (req, file, cb) {
      //     console.log('File', file);
      //     const uniqueSuffix =
      //       Date.now() + '-' + Math.round(Math.random() * 1e9);
      //     cb(
      //       null,
      //       file?.fieldname +
      //         '-' +
      //         uniqueSuffix +
      //         path.extname(file.originalname),
      //     );
      //   },
      // }),
      //   fileFilter: imageFileFilter,
    }),
  )
  @ApiCustomResponse(UploadDto, true)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        // validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: any,
  ) {
    // const res = await this.uploadService
    //   .uploadFile(file)

    //   .catch((err) => {
    //     throw new BadRequestException('Here is where it went wrong');
    //   });
    const res = {
      url: file.location,
    };
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Upload',
        message: 'Upload success',
      }),
      { message: 'File upload successful', url: res?.url },
    );
  }

  @Post('/video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          console.log('File', file);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file?.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
      // storage: diskStorage({
      //   destination: './uploads/',
      //   filename: function (req, file, cb) {
      //     console.log('File', file);
      //     const uniqueSuffix =
      //       Date.now() + '-' + Math.round(Math.random() * 1e9);
      //     cb(
      //       null,
      //       file?.fieldname +
      //         '-' +
      //         uniqueSuffix +
      //         path.extname(file.originalname),
      //     );
      //   },
      // }),
      //   fileFilter: imageFileFilter,
    }),
  )
  @ApiCustomResponse(UploadDto, true)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadVideoFile(
    @UploadedFile(
      new ParseFilePipe({
        // validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: any,
  ) {
    // const res = await this.uploadService.uploadVideoFile(file).catch((err) => {
    //   throw new BadRequestException('Here is where it went wrong');
    // });
    const res = {
      url: file?.location,
    };
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Upload',
        message: 'Upload success',
      }),
      { message: 'File upload successful', url: res?.url },
    );
  }
}
