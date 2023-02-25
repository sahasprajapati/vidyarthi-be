import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { PageDto } from '@common/dtos/pagination/page.dto';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

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
    const courseExists = await this.prisma.rating.findMany({
      where: {
        courseId: +createCourseDto.courseId,
        userId: +createCourseDto.userId,
      },
    });
    if (courseExists?.length > 0) {
      return this.prisma.rating.update({
        where: {
          id: courseExists[0]?.id,
        },
        data: {
          message: createCourseDto.message,
          rate: +createCourseDto.rate,
          courseId: +createCourseDto.courseId,
          userId: +createCourseDto.userId,
        },
      });
    } else {
      return this.prisma.rating.create({
        data: {
          message: createCourseDto.message,
          rate: +createCourseDto.rate,
          courseId: +createCourseDto.courseId,
          userId: +createCourseDto.userId,
        },
      });
    }
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
