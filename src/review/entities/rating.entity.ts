import { ApiProperty } from '@nestjs/swagger';
import {
  Rating
} from '@prisma/client';

export class RatingEntity implements Rating {
  @ApiProperty()
  rate: number;
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  message: string;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  userId: number;
}
