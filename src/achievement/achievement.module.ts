import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UploadModule } from '@src/upload/upload.module';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [AchievementController],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementModule {}
