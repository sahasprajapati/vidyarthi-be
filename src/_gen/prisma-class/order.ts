import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Order {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  total: number;

  @ApiPropertyOptional({ type: Number })
  userId?: number;
}
