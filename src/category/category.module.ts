import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategorysService } from './category.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategorysService],
  exports: [CategorysService],
})
export class CategoryModule {}
