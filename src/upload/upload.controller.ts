import { UploadDto } from './dto/upload.dto';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { ResponseDto } from '@common/dtos/response.dto';
import { generateRepsonseMessage } from '@src/roles/response';

@Controller('upload')
@ApiBearerAuth()
@ApiTags('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
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
    file: Express.Multer.File,
  ) {
    const res = await this.uploadService
      .uploadFile(file)

      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Here is where it went wrong');
      });
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Upload',
        message: 'Upload success',
      }),
      { message: 'File upload successful', url: res?.url },
    );
  }

  @Post('/video')
  @UseInterceptors(FileInterceptor('file'))
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
    file: Express.Multer.File,
  ) {
    const res = await this.uploadService
      .uploadVideoFile(file)
      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Here is where it went wrong');
      });
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Upload',
        message: 'Upload success',
      }),
      { message: 'File upload successful', url: res?.url },
    );
  }
}
