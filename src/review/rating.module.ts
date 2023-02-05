import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
