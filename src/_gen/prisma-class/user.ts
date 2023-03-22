import { SocialProvider } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: Number })
  roleId?: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Boolean })
  isVerified: boolean;

  @ApiPropertyOptional({ type: String })
  passwordResetToken?: string;

  @ApiPropertyOptional({ type: Date })
  passwordResetAt?: Date;

  @ApiProperty({ type: Boolean })
  isSocialLogin: boolean;

  @ApiProperty({ enum: SocialProvider, enumName: 'SocialProvider' })
  socialProvider: SocialProvider = SocialProvider.NONE;
}
