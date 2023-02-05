import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async updateRating(id: number, updateStudentDto: UpdateRatingDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        studentProfile: true,
      },
    });

    if (user.role?.name === 'student') {
      const profile = await this.prisma.studentProfile.upsert({
        where: { userId: id },

        update: {
          userId: user?.id,
        },
        create: {
          userId: user?.id,
        },
      });
    }

    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        studentProfile: true,
      },
    });
  }

}
