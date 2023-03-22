import { RolePermission } from './role_permission';
import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class RoleRelations {
  @ApiProperty({ isArray: true, type: () => RolePermission })
  rolePermissions: RolePermission[];

  @ApiProperty({ isArray: true, type: () => User })
  user: User[];
}
