import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
