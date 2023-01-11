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
  //   storage: diskStorage({
  //     destination: join(
  //       process.cwd(),
  //       './apps/realstate-jp-api/src/app/upload/uploads'
  //     ),
  //     filename: (req, file, callback) => {
  //       const uniqueSuffix =
  //         Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       const filename = `${uniqueSuffix}-${file.originalname}`;
  //       callback(null, filename);
  //     },
  // }),
  // })
  // )
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
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
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
}
