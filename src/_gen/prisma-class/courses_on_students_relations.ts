import { Course } from './course';
import { User } from './user';
import { Progress } from './progress';
import { Achievement } from './achievement';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CoursesOnStudentsRelations {
  @ApiProperty({ type: () => Course })
  course: Course;

  @ApiProperty({ type: () => User })
  student: User;

  @ApiProperty({ type: () => Progress })
  progress: Progress;

  @ApiPropertyOptional({ type: () => Achievement })
  achievement?: Achievement;
}
