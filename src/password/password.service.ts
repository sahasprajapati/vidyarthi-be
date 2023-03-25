import { verifyEntity } from '@common/utils/verifyEntity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfig } from '@src/configs';
import { PrismaService } from '@src/prisma/prisma.service';
import { UsersService } from '@src/user/user.service';
import { PasswordResetRequestDto } from '../password/dto/password-reset.dto';
import { generateJwtForPasswordReset } from '../utils/generateJwt';

@Injectable()
export class PasswordService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
    private readonly prisma: PrismaService,
    // private emailService: EmailService,
  ) {}

  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRounds = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    // return compare(password, hashedPassword);
    return new Promise((resolve, reject) =>
      resolve(password === hashedPassword),
    );
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => resolve(password));
    // return hash(password, this.bcryptSaltRounds);``
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOneByEmail(email);
    await verifyEntity({
      model: this.prisma.user,
      name: 'User',
      findCondition: {
        email: email,
      },
      throwExistError: false,
    });
    const resetToken = await generateJwtForPasswordReset(
      email,
      user.id,
      process.env.JWT_EXPIRES_PASSWORD_RESET,
    );

    await this.userService.update(user.id, {
      passwordResetToken: resetToken,
    });

    // await this.emailService.sendMail(
    //   user,
    //   'forgotPassword',
    //   'Reset Password',
    //   resetToken,
    // );

    return `Password reset link sent to ${user.email} successfully. Please check your email.`;
  }

  async resetPassword(
    passwordResetDto: PasswordResetRequestDto,
    token: string,
  ) {
    const user = await this.userService.findOneByToken(token);
    if (!user) {
      throw new BadRequestException('Invalid token or token expired.');
    }
    const { id } = await this.jwtService.verify(token);

    if (user.id !== id) {
      throw new BadRequestException('Invalid token or token expired.');
    }

    if (passwordResetDto.newPassword !== passwordResetDto.confirmPassword) {
      throw new BadRequestException('Password donot match.');
    }

    let passwordValid;
    if (user.isVerified) {
      passwordValid = await this.validatePassword(
        passwordResetDto.oldPassword,
        user.password,
      );
    } else {
      passwordValid = user.password === passwordResetDto.oldPassword;
    }

    if (!passwordValid) {
      throw new BadRequestException('Invalid password.');
    }

    const hashedPassword = await this.hashPassword(
      passwordResetDto.newPassword,
    );

    await this.prisma.user.update({
      data: {
        password: hashedPassword,
        isVerified: true,
        passwordResetAt: new Date(),
        passwordResetToken: null,
      },
      where: { id: user.id },
    });

    return 'Password reset successfully.';
  }
}
