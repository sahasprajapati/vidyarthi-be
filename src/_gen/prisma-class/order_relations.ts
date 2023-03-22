import { Course } from './course';
import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderRelations {
  @ApiProperty({ isArray: true, type: () => Course })
  course: Course[];

  @ApiPropertyOptional({ type: () => User })
  user?: User;
}