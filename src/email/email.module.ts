import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { SendEmailConsumer } from './sendEmail-consumers';
import { UsersModule } from '@src/user/user.module';
import { PrismaService } from '@src/prisma/prisma.service';
import { EmailController } from './email.cotroller';

@Module({
  imports: [
    UsersModule,
    // BullModule.registerQueue({
    //   name: 'send-email',
    // }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          secure: false,
          auth: {
            user: config.get('SMTP_USERNAME'),
            pass: config.get('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: config.get('EMAIL_FROM'),
        },
        template: {
          dir: join(__dirname, './assets/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    EmailController,
    EmailService,
    PrismaService,
    // SendEmailConsumer
  ],
  exports: [EmailService],
})
export class EmailModule {}
