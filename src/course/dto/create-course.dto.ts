import { Section } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Lecture {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty({ required: false })
  video?: string;
  @ApiProperty({ required: false })
  length?: string;
  @ApiProperty({ required: false })
  listOrder?: number;

  // Note DTO
  @ApiProperty({ required: false })
  noteId?: number;
  @ApiProperty({ required: false })
  noteDescription?: string;
  @ApiProperty({ required: false })
  noteFiles?: string[];
}

export class SectionDto {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  lectures?: Lecture[]
  @ApiProperty({ required: false })
  listOrder?: number;
}

export class CreateCourseDto {
  // First Page
  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  subCategoryId: number;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  language: Language;

  @ApiProperty({ required: false })
  subtitleLanguage?: Language;

  @ApiProperty()
  level: Level;

  //Duration
  @ApiProperty()
  time: string;

  // Second Page

  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  trailer?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  skills?: string[];

  @ApiProperty({ required: false })
  learnableContent?: string[];

  // Third Page
  @ApiProperty({ required: false })
  sections?: SectionDto[]

  // Fouth Page

  @ApiProperty({ required: false })
  welcomeMessage?: string;

  @ApiProperty({ required: false })
  congratulationMessage?: string;

  @ApiProperty({ required: false })
  instructorIds?: number[];
}




export enum Language {
  ENGLISH,
  NEPALI,
}

export enum Level {
  BEGINNER,
  INTERMEDIATE,
  PROFESSIONAL,
}
