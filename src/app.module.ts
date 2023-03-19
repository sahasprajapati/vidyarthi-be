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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { RatingModule } from './review/rating.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api/*'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api/*', '/uploads/*'],
    }),
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
    ProfileModule,
    RatingModule,
    AchievementModule,
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
