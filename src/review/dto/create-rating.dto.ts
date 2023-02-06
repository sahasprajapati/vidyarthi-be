import { ApiProperty } from '@nestjs/swagger';
import { TEACHER_NOTIFICATION_TYPE } from '@prisma/client';

export class CreateRatingDto {
  @ApiProperty()
  message: string;
  
  @ApiProperty()
  rate: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  userId: number;
}
