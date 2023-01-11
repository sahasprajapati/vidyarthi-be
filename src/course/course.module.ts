import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
