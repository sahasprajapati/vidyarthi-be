import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  newPassword: string;


  @ApiProperty()
  rePassword: string;
}
