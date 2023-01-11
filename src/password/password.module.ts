import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SecurityConfig } from '@src/configs';
import { PrismaService } from '@src/prisma/prisma.service';
import { UsersModule } from '@src/user/user.module';
import { EmailModule } from '../email/email.module';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    EmailModule,
  ],
  providers: [PasswordController, PasswordService, PrismaService],
  exports: [PasswordService],
})
export class PasswordModule {}
