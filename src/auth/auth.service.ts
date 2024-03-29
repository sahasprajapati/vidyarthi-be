import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { SecurityConfig } from '@src/configs';
import { PrismaService } from '@src/prisma/prisma.service';
import { UsersService } from '@src/user/user.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { RegisterDto } from './dto/register.dto';
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
    private readonly configService: ConfigService,
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

  async validateUser(
    username: string,
    pass: string,
    isSocialLogin: boolean = false,
  ): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    const { password, ...result } = user ?? {};
    if ((isSocialLogin && user) || (user && user.password === pass)) {
      return result;
    }
    return null;
  }

  async login(user: any) {
    return {
      ...this.generateTokens({
        userId: user?.id,
      }),
      role: user?.role?.name,
    };
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

  validateJWTUser(userId: number) {
    return this.usersService.findOne(userId);
  }

  async register(registerDto: RegisterDto) {
    if (registerDto.role < 1) {
      return new BadRequestException('Something went wrongu');
    }
    if (registerDto.password !== registerDto.confirmPassword) {
      return new BadRequestException('Password do not match');
    }
    let user = await this.usersService.findOneByEmail(registerDto.email);
    if (user) {
      return new ConflictException('User already registered');
    }
    const newUser = await this.usersService.create({
      name: registerDto.firstName + ' ' + registerDto.lastName,
      email: registerDto.email,
      password: registerDto.password,
      passwordResetToken: null,
      roleId: registerDto?.role ?? 2, // student
    });
    return {
      ...this.generateTokens({
        userId: newUser?.id + '',
      }),
      role: newUser?.role?.name,
    };
  }

  async changePassword(id: number, passwordDto: ChangePasswordDto) {
    if (passwordDto.newPassword !== passwordDto.rePassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const user = await this.prisma.user.findUnique({ where: { id: +id } });

    if (!user) throw new BadRequestException('User does not exist');
    if (user?.password !== passwordDto.password) {
      throw new BadRequestException('Password does not match');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        password: passwordDto.newPassword,
      },
    });
    return updatedUser;
  }
}
