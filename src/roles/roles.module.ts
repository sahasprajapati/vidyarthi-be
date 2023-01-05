import { AuthModule } from '@src/auth/auth.module';
import { PrismaModule } from '@src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
