import { Subject } from './subject';
import { RolePermission } from './role_permission';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class PermissionRelations {
  @ApiPropertyOptional({ type: () => Subject })
  subject?: Subject;

  @ApiProperty({ isArray: true, type: () => RolePermission })
  rolePermissions: RolePermission[];
}
