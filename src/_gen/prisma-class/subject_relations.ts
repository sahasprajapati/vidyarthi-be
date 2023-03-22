import { Permission } from './permission';
import { ApiProperty } from '@nestjs/swagger';

export class SubjectRelations {
  @ApiProperty({ isArray: true, type: () => Permission })
  permissions: Permission[];
}
