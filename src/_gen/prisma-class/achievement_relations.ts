import { CoursesOnStudents } from './courses_on_students';
import { ApiProperty } from '@nestjs/swagger';

export class AchievementRelations {
  @ApiProperty({ type: () => CoursesOnStudents })
  coursesOnStudents: CoursesOnStudents;
}
