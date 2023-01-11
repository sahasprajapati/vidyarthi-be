import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
enum SocialProvider {
  FACEBOOK,
  GOOGLE,
  NONE,
}
export class UserEntity implements User {
  @ApiProperty({required: false})
  studentProfileId: number;
  @ApiProperty({required: false})
  teacherProfileId: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  isSocialLogin: boolean;

  @ApiProperty()
  socialProvider: any;

  @ApiProperty()
  passwordResetToken: string;

  @ApiProperty()
  passwordResetAt: Date;
}
