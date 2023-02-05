import { Course, Language, Level } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CourseEntity implements Course {
  @ApiProperty()
  subtitleLanguage: Language;
  @ApiProperty()
  level: Level;
  
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  subtitle: string;
  @ApiProperty()
  price: number;

  @ApiProperty()
  discountAmount: number;
  @ApiProperty()
  discountPercent: number;
  @ApiProperty()
  topic: string;
  @ApiProperty()
  language: Language;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  subCategoryId: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  learnableContent: string[];
  @ApiProperty()
  skills: string[];
  @ApiProperty()
  welcomeMessage: string;
  @ApiProperty()
  congratulationMessage: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  trailer: string;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  popularity: number;
}
