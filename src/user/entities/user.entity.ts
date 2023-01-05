import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
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

}
