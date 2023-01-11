import { Category, Course } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CategoryEntity implements Category {
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  @ApiProperty()
  parentCategoryId: number;
  @ApiProperty()
  parentCategory?: Category;

  @ApiProperty()
  courseCategory: Category[];

  @ApiProperty()
  mainCourses: Course[];

  @ApiProperty()
  subCourses: Course[];
}
