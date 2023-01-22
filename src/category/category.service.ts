import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { PageDto } from '../common/dtos/pagination/page.dto';
import { paginateFilter } from './../common/utils/paginate';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategorysService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await verifyEntity({
      model: this.prisma.category,
      name: 'Category email',
      findCondition: {
        name: createCategoryDto.name,
      },
      throwExistError: true,
    });

    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        ...(createCategoryDto.description
          ? { description: createCategoryDto.description }
          : {}),
        ...(createCategoryDto.parentCategoryId
          ? { parentCategoryId: createCategoryDto.parentCategoryId }
          : {}),
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Category>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.category.findMany();
    const criteria: Prisma.CategoryFindManyArgs = {
      where: {
        parentCategoryId: null
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
    };

    if (pageOptionsDto.filter) {
      criteria.where = {
        ...criteria.where,
        OR: [
          {
            name: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },
          {
            description: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },
        ],
      };
    }
    const categorys = await paginate<Category, Prisma.CategoryFindManyArgs>(
      this.prisma.category,
      criteria,
      pageOptionsDto,
    );
    return categorys;
  }

  async findAllSubCategory(id: number, pageOptionsDto: PageOptionsDto): Promise<PageDto<Category>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.category.findMany();
    const criteria: Prisma.CategoryFindManyArgs = {
      where: {
        parentCategoryId: id,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
    };

    if (pageOptionsDto.filter) {
      criteria.where = {
        ...criteria.where,
        OR: [
          {
            name: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },
          {
            description: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },
        ],
      };
    }
    const categorys = await paginate<Category, Prisma.CategoryFindManyArgs>(
      this.prisma.category,
      criteria,
      pageOptionsDto,
    );
    return categorys;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.category,
      name: 'Category',
      id,
    });
    return this.prisma.category.findFirst({
      where: {
        id: +id,
      },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await verifyEntity({
      model: this.prisma.category,
      name: 'Category',
      id,
    });
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.category,
      name: 'Category',
      id,
    });
    return this.prisma.category.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    // await verifyEntity({
    //   model: this.prisma.role,
    //   name: 'Role',
    //   id,
    // });
    return this.prisma.category.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
