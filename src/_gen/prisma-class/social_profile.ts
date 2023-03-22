import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SocialProfile {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  website?: string;

  @ApiPropertyOptional({ type: String })
  facebook?: string;

  @ApiPropertyOptional({ type: String })
  instagram?: string;

  @ApiPropertyOptional({ type: String })
  linkedin?: string;

  @ApiPropertyOptional({ type: String })
  twitter?: string;

  @ApiPropertyOptional({ type: String })
  youtube?: string;

  @ApiPropertyOptional({ type: String })
  whatsapp?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  teacherProfileId: number;
}
