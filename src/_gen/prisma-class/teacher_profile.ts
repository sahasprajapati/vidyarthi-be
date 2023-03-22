import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeacherProfile {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: String })
  image?: string;

  @ApiPropertyOptional({ type: String })
  title?: string;

  @ApiPropertyOptional({ type: String })
  biography?: string;

  @ApiPropertyOptional({ type: String })
  phoneNumber?: string;

  @ApiPropertyOptional({ type: Object })
  notifications?: object;

  @ApiPropertyOptional({ type: Number })
  userId?: number;
}
