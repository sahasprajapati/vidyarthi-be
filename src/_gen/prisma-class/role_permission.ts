import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RolePermission {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: Number })
  roleId?: number;

  @ApiPropertyOptional({ type: Number })
  permissionId?: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
