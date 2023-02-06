import { paginate, paginateFilter } from '@src/common/utils/paginate';
import { CreateRatingDto } from './dto/create-rating.dto';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Prisma, Rating } from '@prisma/client';
import { PageDto } from '@common/dtos/pagination/page.dto';
import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async updateRating(id: number, updateRatingDto: UpdateRatingDto) {
    await this.prisma.rating.findUnique({
      where: {
        id: id,
      },
    });

    const rating = await this.prisma.rating.update({
      where: { id: id },

      data: {
        ...updateRatingDto,
      },
    });

    return rating;
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.rating,
      name: 'Rating',
      id,
    });
    return this.prisma.rating.findFirst({
      where: {
        id: +id,
      },
    });
  }
  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.rating,
      name: 'Rating',
      id,
    });
    return this.prisma.rating.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.rating.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async create(createCourseDto: CreateRatingDto) {
    const courseExists = await verifyEntity({
      model: this.prisma.rating,
      name: 'Rating',
      findCondition: {
        courseId: createCourseDto.courseId,
        userId: createCourseDto.userId,
      },
      throwExistError: true,
    });

    return this.prisma.rating.create({
      data: {
        message: createCourseDto.message,
        rate: +createCourseDto.rate,
        courseId: +createCourseDto.courseId,
        userId: +createCourseDto.userId,
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Rating>> {
    // Get proper criteria using prisma findMany types
    // this.prisma.course.findMany();
    const criteria: Prisma.RatingFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
    };

    const ratings = await paginate<Rating, Prisma.RatingFindManyArgs>(
      this.prisma.rating,
      criteria,
      pageOptionsDto,
    );
    return ratings;
  }
}
