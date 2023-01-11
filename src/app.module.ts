import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './configs/config';
import { GoogleOauthModule } from './google/google-oauth.module';
import { FacebookOauthModule } from './facebook/facebook-oauth.module';
import { UploadModule } from './upload/upload.module';
import { EmailModule } from './email/email.module';
import { PasswordModule } from './password/password.module';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
    AuthModule,
    GoogleOauthModule,
    FacebookOauthModule,
    UsersModule,
    RolesModule,
    TransactionModule,
    UploadModule,
    EmailModule,
    PasswordModule,
    CourseModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}