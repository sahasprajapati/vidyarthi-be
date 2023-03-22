import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Lecture {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  listOrder: number;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Number })
  noteId?: number;

  @ApiProperty({ type: Number })
  sectionId: number;

  @ApiPropertyOptional({ type: String })
  length?: string;

  @ApiPropertyOptional({ type: String })
  video?: string;
}
