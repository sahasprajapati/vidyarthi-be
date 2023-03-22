import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentProfile {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: String })
  image?: string;

  @ApiPropertyOptional({ type: Date })
  dob?: Date;

  @ApiPropertyOptional({ type: String })
  occupation?: string;

  @ApiPropertyOptional({ type: String })
  phone?: string;

  @ApiPropertyOptional({ type: String })
  institution?: string;

  @ApiPropertyOptional({ type: String })
  currentQualification?: string;

  @ApiPropertyOptional({ type: String })
  highestQualification?: string;

  @ApiPropertyOptional({ type: Number })
  userId?: number;

  @ApiProperty({ type: Boolean })
  isEmailUpdates: boolean = true;
}
