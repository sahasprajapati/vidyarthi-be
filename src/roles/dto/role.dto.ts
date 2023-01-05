import { Permission } from '@gen/prisma-class/permission';
import { PermissionRelations } from '@gen/prisma-class/permission_relations';
import { Role } from '@gen/prisma-class/role';
import { RolePermission } from '@gen/prisma-class/role_permission';
import { RolePermissionRelations } from '@gen/prisma-class/role_permission_relations';
import { RoleRelations } from '@gen/prisma-class/role_relations';
import { Subject } from '@gen/prisma-class/subject';
import { SubjectRelations } from '@gen/prisma-class/subject_relations';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Order } from '@src/common/enums/order.enum';

// Type for FindAll Role
const RoleSelect = Prisma.validator<Prisma.RoleSelect>()({
  id: true,
  name: true,
  rolePermissions: {
    select: {
      permission: {
        select: {
          action: true,
          condition: true,
          subject: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  },
});

export type FindAllRoleWithSelect = Prisma.RoleGetPayload<{
  select: typeof RoleSelect;
}>;

export class RoleFindAllDto extends IntersectionType(
  Role,
  PickType(RoleRelations, ['rolePermissions'] as const),
) {}


// Permission

const PermissionSelect = Prisma.validator<Prisma.PermissionSelect>()({
  action: true,
  id: true,
  condition: true,
  subject: {
    select: {
      name: true,
    },
  },
});

export type FindAllPermissionWithSelect = Prisma.PermissionGetPayload<{
  select: typeof PermissionSelect;
}>;


export class PermissionFindAllDto extends IntersectionType(
  Permission,
  PickType(PermissionRelations, ["subject"] as const),
) {}



export class PermissionRelationDto extends IntersectionType(
  RolePermission,
  PickType(RolePermissionRelations, ["permission"] as const),
) {}

