import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  action: string;

  @ApiPropertyOptional({ type: Object })
  condition?: object;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Number })
  subjectId?: number;
}
