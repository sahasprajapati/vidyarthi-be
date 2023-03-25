import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AchievementModule } from './achievement/achievement.module';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { config } from './configs/config';
import { CourseModule } from './course/course.module';
import { EmailModule } from './email/email.module';
import { FacebookOauthModule } from './facebook/facebook-oauth.module';
import { GoogleOauthModule } from './google/google-oauth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { RatingModule } from './review/rating.module';
import { RolesModule } from './roles/roles.module';
import { TransactionModule } from './transaction/transaction.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './user/user.module';

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
