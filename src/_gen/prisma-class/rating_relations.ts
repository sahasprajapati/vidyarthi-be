import { User } from './user';
import { Course } from './course';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RatingRelations {
  @ApiProperty({ type: () => User })
  ratedBy: User;

  @ApiPropertyOptional({ type: () => Course })
  course?: Course;
}
