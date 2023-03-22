import { Lecture } from './lecture';
import { CoursesOnStudents } from './courses_on_students';
import { ApiProperty } from '@nestjs/swagger';

export class ProgressRelations {
  @ApiProperty({ isArray: true, type: () => Lecture })
  completedLectures: Lecture[];

  @ApiProperty({ isArray: true, type: () => CoursesOnStudents })
  coursesOnStudents: CoursesOnStudents[];
}
