import { TransactionModule } from './../transaction/transaction.module';
import { Module } from '@nestjs/common';
import { AchievementModule } from '@src/achievement/achievement.module';
import { AuthModule } from '@src/auth/auth.module';
import { CourseModule } from '@src/course/course.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CourseModule,
    AchievementModule,
    TransactionModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
