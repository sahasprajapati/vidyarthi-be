import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PasswordResetRequestDto } from './dto/password-reset.dto';
import { PasswordService } from './password.service';

@Controller('/password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Post('/reset')
  async resetPassword(
    @Body('passwordResetDto') passwordResetDto: PasswordResetRequestDto,
    @Body('token') token: string,
  ) {
    return await this.passwordService.resetPassword(passwordResetDto, token);
  }

  @Post('/forgot')
  async forgotPassword(@Body('email') email: string) {
    return await this.passwordService.forgotPassword(email);
  }
}
