import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { PageDto } from '../common/dtos/pagination/page.dto';
import { paginateFilter } from './../common/utils/paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserWithSelect } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await verifyEntity({
      model: this.prisma.user,
      name: 'User email',
      findCondition: {
        email: createUserDto.email,
      },
      throwExistError: true,
    });
    await verifyEntity({
      model: this.prisma.role,
      name: 'Role ',
      findCondition: {
        id: createUserDto.roleId,
      },
    });
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        roleId: createUserDto.roleId,
      },
    });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllUserWithSelect>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.user.findMany();
    const criteria: Prisma.UserFindManyArgs = {
      where: {
        OR: [
          {
            name: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },
          {
            email: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },
          {
            role: {
              name: {
                ...paginateFilter(pageOptionsDto.filter),
              },
            },
          },
        ],
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };
    const users = await paginate<
      FindAllUserWithSelect,
      Prisma.UserFindManyArgs
    >(this.prisma.user, criteria, pageOptionsDto);
    return users;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.user,
      name: 'User',
      id,
    });
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await verifyEntity({
      model: this.prisma.user,
      name: 'User',
      id,
    });
    return this.prisma.user.update({
      where: { id },

      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.user,
      name: 'User',
      id,
    });
    return this.prisma.user.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    // await verifyEntity({
    //   model: this.prisma.role,
    //   name: 'Role',
    //   id,
    // });
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
