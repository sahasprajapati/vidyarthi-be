import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Permission, Prisma, User } from '@prisma/client';
import { SecurityConfig } from '@src/configs';
import { PrismaService } from '@src/prisma/prisma.service';
import { UsersService } from '@src/user/user.service';
import { Token } from './dto/token.dto';

export type PermissionWithSubject = Prisma.PermissionGetPayload<{
  include: {
    subject: true;
  };
}>;
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService

  ) {}

  async findAllPermissionsOfUser(user: User): Promise<PermissionWithSubject[]> {
    return await this.prisma.permission.findMany({
      where: {
        rolePermissions: {
          some: {
            roleId: user.roleId,
          },
        },
      },
      include: {
        subject: true,
      },
    });
  }

  async validateUser(username: string, pass: string, isSocialLogin: boolean = false): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    const { password, ...result } = user ?? {};
    if ((isSocialLogin && user) || (user && user.password === pass)) {
      return result;
    }
    return null;
  }

  async login(user: any) {
    return this.generateTokens({
      userId: user?.id,
    });
  }




  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  validateJWTUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }


}
