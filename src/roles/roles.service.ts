import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import {
  FindAllRoleWithSelect,
  FindAllPermissionWithSelect,
} from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    await verifyEntity({
      model: this.prisma.role,
      name: 'Role',
      findCondition: {
        name: createRoleDto.name,
      },
      throwExistError: true,
    });
    const role = await this.prisma.role.upsert({
      where: {
        name: createRoleDto.name,
      },
      update: {},
      create: {
        name: createRoleDto.name,
      },
    });
    const role_permission = createRoleDto.permissionIds.map(
      async (permissionId) => {
        await this.prisma.rolePermission.upsert({
          where: {
            roleId_permissionId:{
              roleId: role.id,
              permissionId: +permissionId,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: +permissionId,
          },
        });
      },
    );
    Promise.all(role_permission);

    return role;
  }

  // findAll() {
  //   // CRUD operations
  //   return this.prisma.role.findMany();
  // }
  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllRoleWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.role.findMany();
    const criteria: Prisma.RoleFindManyArgs = {
      where: {
        name: {
          ...(pageOptionsDto.filter ? { search: pageOptionsDto.filter } : {}),
        },
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        id: true,
        name: true,
        rolePermissions: {
          select: {
            permission: {
              select: {
                id: true,
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
      },
    };
    const roles = await paginate<
      FindAllRoleWithSelect,
      Prisma.RoleFindManyArgs
    >(this.prisma.role, criteria, pageOptionsDto);
    return roles;
  }

  async findAllPermissions(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllPermissionWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.role.findMany();
    const criteria: Prisma.PermissionFindManyArgs = {
      where: {
        action: {
          ...(pageOptionsDto.filter ? { search: pageOptionsDto.filter } : {}),
        },
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        id: true,
        action: true,
        condition: true,
        subject: {
          select: {
            name: true,
          },
        },
      },
    };
    const permissions = await paginate<
      FindAllPermissionWithSelect,
      Prisma.PermissionFindManyArgs
    >(this.prisma.permission, criteria, pageOptionsDto);
    return permissions;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.role,
      name: 'Role',
      id,
    });
    return this.prisma.role.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(name: string) {
    await verifyEntity({
      model: this.prisma.role,
      name: 'Role',
      findCondition: {
        name: name,
      },
    });
    return this.prisma.role.findFirst({
      where: {
        name: name,
      },
    });
  }

  async update(id: number, updateroleDto: UpdateRoleDto) {
    await verifyEntity({
      model: this.prisma.role,
      name: 'Role',
      id,
    });

    const role = await this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: updateroleDto.name,
      },
    });
    const role_permission = updateroleDto.permissionIds.map(
      async (permissionId) => {
        await this.prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: +permissionId,
            },
          },
          create: {
            roleId: role.id,
            permissionId: +permissionId,
          },
          update: {
            roleId: role.id,
            permissionId: +permissionId,
          },
        });
      },
    );

    return role;
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.role,
      name: 'Role',
      id,
    });
    return this.prisma.role.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    // await verifyEntity({
    //   model: this.prisma.role,
    //   name: 'Role',
    //   id,
    // });
    return this.prisma.role.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
