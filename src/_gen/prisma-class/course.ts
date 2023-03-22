import { Language, Level } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Course {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  courseId: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  subtitle: string;

  @ApiPropertyOptional({ type: Number })
  price?: number;

  @ApiPropertyOptional({ type: Number })
  discountAmount?: number;

  @ApiPropertyOptional({ type: Number })
  discountPercent?: number;

  @ApiPropertyOptional({ type: String })
  topic?: string;

  @ApiProperty({ enum: Language, enumName: 'Language' })
  language: Language = Language.ENGLISH;

  @ApiProperty({ enum: Language, enumName: 'Language' })
  subtitleLanguage: Language = Language.ENGLISH;

  @ApiPropertyOptional({ enum: Level, enumName: 'Level' })
  level?: Level = Level.BEGINNER;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  categoryId: number;

  @ApiProperty({ type: Number })
  subCategoryId: number;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiPropertyOptional({ type: Object })
  learnableContent?: object;

  @ApiPropertyOptional({ type: Object })
  skills?: object;

  @ApiPropertyOptional({ type: String })
  welcomeMessage?: string;

  @ApiPropertyOptional({ type: String })
  congratulationMessage?: string;

  @ApiPropertyOptional({ type: String })
  thumbnail?: string;

  @ApiPropertyOptional({ type: String })
  trailer?: string;

  @ApiProperty({ type: Number })
  popularity: number;
}
