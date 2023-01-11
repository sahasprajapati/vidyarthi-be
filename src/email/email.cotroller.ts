import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('/email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('/')
  async sendIntialEmail(@Body('email') email: string) {
    return await this.emailService.sendInitialEmail(email);
  }
}
