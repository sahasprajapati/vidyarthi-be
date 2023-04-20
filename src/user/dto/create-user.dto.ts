import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;


  @ApiProperty()
  picture?: string;
  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordResetToken: string;

  @ApiProperty({
    required: false,
  })
  roleId?: number;
}
