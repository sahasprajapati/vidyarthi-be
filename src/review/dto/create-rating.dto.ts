import { ApiProperty } from '@nestjs/swagger';

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
