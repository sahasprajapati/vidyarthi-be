import { Permission } from './permission';
import { Role } from './role';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RolePermissionRelations {
  @ApiPropertyOptional({ type: () => Permission })
  permission?: Permission;

  @ApiPropertyOptional({ type: () => Role })
  role?: Role;
}
