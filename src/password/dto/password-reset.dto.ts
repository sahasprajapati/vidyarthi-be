import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetRequestDto {
  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  newPassword: string;

  @ApiProperty()
  confirmPassword: string;
}
