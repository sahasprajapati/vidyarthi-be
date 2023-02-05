import { Role } from '@gen/prisma-class/role';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import {
  UpdateCartDto,
  UpdateOrderDto,
  UpdateStudentProfileDto,
  UpdateTeacherProfileDto,
  UpdateWishlistDto,
} from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async updateStudent(id: number, updateStudentDto: UpdateStudentProfileDto) {
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

  async updateTeacher(id: number, updateTeacherDto: UpdateTeacherProfileDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
        role: true,
      },
    });

    if (user.role?.name === 'instructor') {
      const profile = await this.prisma.teacherProfile.upsert({
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
        teacherProfile: true,
      },
    });
  }

  async updateCart(id: number, updateTeacherDto: UpdateCartDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
        role: true,
      },
    });

    const profile = await this.prisma.cart.upsert({
      where: { userId: id },

      update: {
        userId: user?.id,
      },
      create: {
        userId: user?.id,
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
      },
    });
  }

  async updateWishlist(id: number, updateTeacherDto: UpdateWishlistDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
        role: true,
      },
    });

    const profile = await this.prisma.wishlist.upsert({
      where: { userId: id },

      update: {
        userId: user?.id,
      },
      create: {
        userId: user?.id,
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
      },
    });
  }
  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
        role: true,
      },
    });

    const profile = await this.prisma.wishlist.upsert({
      where: { userId: id },

      update: {
        userId: user?.id,
      },
      create: {
        userId: user?.id,
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
      },
    });
  }
}
