import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
