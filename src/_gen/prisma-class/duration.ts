import { ApiProperty } from '@nestjs/swagger';

export class Duration {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  time: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
