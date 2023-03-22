import { Course } from './course';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Category } from './category';

export class CategoryRelations {
  @ApiPropertyOptional({ type: () => Category })
  parentCategory?: Category;

  @ApiProperty({ isArray: true, type: () => Category })
  courseCategory: Category[];

  @ApiProperty({ isArray: true, type: () => Course })
  mainCourses: Course[];

  @ApiProperty({ isArray: true, type: () => Course })
  subCourses: Course[];
}
