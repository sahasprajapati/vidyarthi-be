import { verifyEntity } from '@common/utils/verifyEntity';
import { Course } from '@gen/prisma-class/course';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { PageDto } from '../common/dtos/pagination/page.dto';
import { paginateFilter } from './../common/utils/paginate';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const courseExists = await verifyEntity({
      model: this.prisma.course,
      name: 'Course email',
      findCondition: {
        title: createCourseDto.title,
      },
      throwExistError: true,
    });

    return this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        subtitle: createCourseDto.subtitle,
        courseId: "a",
        subCategoryId: createCourseDto.subCategoryId,
        categoryId: createCourseDto.categoryId,
      },
    });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Course>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.course.findMany();
    const criteria: Prisma.CourseFindManyArgs = {
      where: {
        OR: [
          {
            topic: {
              ...paginateFilter(pageOptionsDto.filter),
            },
            title: {
              ...paginateFilter(pageOptionsDto.filter),
            },
            subtitle: {
              ...paginateFilter(pageOptionsDto.filter),
            },
          },

        ],
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
    };
    const courses = await paginate<
      Course,
      Prisma.CourseFindManyArgs
    >(this.prisma.course, criteria, pageOptionsDto);
    return courses;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id,
    });
    return this.prisma.course.findFirst({
      where: {
        id: id,
      }
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id,
    });
    return this.prisma.course.update({
      where: { id },
      data: {
        title: updateCourseDto.title,
        subtitle: updateCourseDto.subtitle,
        subCategoryId: updateCourseDto.subCategoryId,
        categoryId: updateCourseDto.categoryId,
      },
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id,
    });
    return this.prisma.course.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    // await verifyEntity({
    //   model: this.prisma.role,
    //   name: 'Role',
    //   id,
    // });
    return this.prisma.course.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
