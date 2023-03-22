import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Note {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  noteDescription?: string;

  @ApiPropertyOptional({ type: Object })
  noteFiles?: object;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
