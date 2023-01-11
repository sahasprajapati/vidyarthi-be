import { Course } from '@gen/prisma-class/course';
import { CourseRelations } from '@gen/prisma-class/course_relations';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Category,  Prisma, Rating, Section } from '@prisma/client';

export class CourseDto {
  @ApiProperty()
  topic: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  welcomeMessage: string;

  @ApiProperty()
  congratulationMessage: string;

  @ApiProperty()
  skills: string[];

  @ApiProperty()
  learnableContent: string[];

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  trailer: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  sections: Section[];

  @ApiProperty()
  instructors: Course[];

  @ApiProperty()
  students: Course[];

  @ApiProperty()
  ratings: Rating[];
}

// Type for FindAll Course
export const CourseSelect = Prisma.validator<Prisma.CourseSelect>()({
  id: true,
  courseId: true,

});

export type FindAllCourseWithSelect = Prisma.CourseGetPayload<{
  select: typeof CourseSelect;
}>;
