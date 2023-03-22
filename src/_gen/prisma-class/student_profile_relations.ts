import { User } from './user';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class StudentProfileRelations {
  @ApiPropertyOptional({ type: () => User })
  user?: User;
}
