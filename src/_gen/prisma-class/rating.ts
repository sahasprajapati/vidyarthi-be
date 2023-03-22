import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Rating {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Number })
  rate: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Number })
  courseId?: number;
}
