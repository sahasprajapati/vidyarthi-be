import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Wishlist {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Number })
  userId?: number;
}
