import { Course } from './course';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionRelations {
  @ApiProperty({ type: () => Course })
  course: Course;

  @ApiProperty({ type: () => User })
  paidTo: User;

  @ApiProperty({ type: () => User })
  paidBy: User;
}
