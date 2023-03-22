import { Lecture } from './lecture';
import { Course } from './course';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SectionRelations {
  @ApiProperty({ isArray: true, type: () => Lecture })
  lectures: Lecture[];

  @ApiPropertyOptional({ type: () => Course })
  Course?: Course;
}
