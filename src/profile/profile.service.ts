import { verifyEntity } from '@common/utils/verifyEntity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AchievementService } from '@src/achievement/achievement.service';
import { CourseService } from '@src/course/course.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { TransactionService } from '@src/transaction/transaction.service';
import {
  UpdateCartDto,
  UpdateStudentProfileDto,
  UpdateTeacherProfileDto,
  UpdateWishlistDto,
} from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private courseService: CourseService,
    private achievementService: AchievementService,
    private transactionService: TransactionService,
  ) {}

  async updateProfile(
    id: number,
    updateProfileDto: UpdateStudentProfileDto | UpdateTeacherProfileDto,
  ) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        role: true,
      },
    });

    if (user.role?.name === 'student') {
      return this.updateStudent(
        id,
        updateProfileDto as UpdateStudentProfileDto,
      );
    }

    if (user.role?.name === 'instructor') {
      return this.updateTeacher(
        id,
        updateProfileDto as UpdateTeacherProfileDto,
      );
    }
  }
  async updateStudent(id: number, updateStudentDto: UpdateStudentProfileDto) {
    const updateData: any = {};

    if (updateStudentDto.dob) {
      updateData.dob = updateStudentDto.dob;
    }
    if (updateStudentDto.occupation) {
      updateData.occupation = updateStudentDto.occupation;
    }
    if (updateStudentDto.phone) {
      updateData.phone = updateStudentDto.phone;
    }
    if (updateStudentDto.dob) {
      updateData.dob = updateStudentDto.dob;
    }
    if (updateStudentDto.institution) {
      updateData.institution = updateStudentDto.institution;
    }
    if (updateStudentDto.currentQualification) {
      updateData.currentQualification = updateStudentDto.currentQualification;
    }
    if (updateStudentDto.highestQualification) {
      updateData.highestQualification = updateStudentDto.highestQualification;
    }
    if (updateStudentDto.isEmailUpdates) {
      updateData.isEmailUpdates = updateStudentDto.isEmailUpdates;
    }
    const profile = await this.prisma.studentProfile.upsert({
      where: { userId: id },

      update: {
        userId: id,
        ...updateData,
      },
      create: {
        userId: id,
      },
    });

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
    const updateData: any = {};

    // @ApiProperty({ nullable: true })
    // socialProfile?: SocialProfileDto;
    if (updateTeacherDto.phoneNumber) {
      updateData.phoneNumber = updateTeacherDto.phoneNumber;
    }
    if (updateTeacherDto.title) {
      updateData.title = updateTeacherDto.title;
    }
    if (updateTeacherDto.biography) {
      updateData.biography = updateTeacherDto.biography;
    }
    if (updateTeacherDto.teacherNotificationTypes?.length > 0) {
      updateData.teacherNotificationTypes =
        updateTeacherDto.teacherNotificationTypes;
    }
    const profile = await this.prisma.teacherProfile.upsert({
      where: { userId: id },

      update: {
        userId: id,
        ...updateData,
      },
      create: {
        userId: id,
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

  async updateCart(id: number, updateCartDto: UpdateCartDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
        role: true,
      },
    });

    const courses = updateCartDto.courseIds?.map((courseId) => {
      return { id: +courseId };
    });

    const profile = await this.prisma.cart.upsert({
      where: { userId: id },

      update: {
        userId: user?.id,
        course: {
          set: courses,
        },
      },
      create: {
        userId: user?.id,
        course: {
          connect: courses,
        },
      },
      include: {
        course: true,
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        cart: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  async updateWishlist(id: number, updateWishlistDto: UpdateWishlistDto) {
    const user: any = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        teacherProfile: true,
        role: true,
      },
    });

    const courses = updateWishlistDto.courseIds?.map((courseId) => {
      return { id: +courseId };
    });

    const profile = await this.prisma.wishlist.upsert({
      where: { userId: id },

      update: {
        userId: user?.id,
        course: {
          set: courses,
        },
      },
      create: {
        userId: user?.id,
        course: {
          connect: courses,
        },
      },
      include: {
        course: true,
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        wishlist: {
          include: {
            course: true,
          },
        },
      },
    });
  }
  async updateOrder(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        cart: {
          include: {
            course: {
              include: {
                instructors: true,
              },
            },
          },
        },
        wishlist: true,
      },
    });

    if (!user.cart) {
      throw new BadRequestException('Cart not found');
    }

    let totalPrice = 0;
    user?.cart?.course?.map((course) => {
      totalPrice += course?.price ?? 0;
    });

    const order = await this.prisma.order.create({
      data: {
        userId: +userId,

        course: {
          connect: user?.cart?.course.map((course) => {
            return { id: +course?.id };
          }),
        },
      },
      include: {
        course: true,
      },
    });
    await Promise.all(
      user?.cart?.course.map(async (course: any) => {
        if (course?.id && course?.instructors?.length > 0) {
          await this.prisma.coursesOnStudents.upsert({
            where: {
              courseId_studentId: {
                courseId: +course?.id,
                studentId: +userId,
              },
            },
            create: {
              course: {
                connect: {
                  id: +course?.id,
                },
              },
              student: {
                connect: {
                  id: +userId,
                },
              },
              progress: {
                create: {
                  progressPercentage: 0,
                },
              },
            },
            update: {
              courseId: +course?.id,
              studentId: +userId,
            },
          });

          await this.prisma.transaction.create({
            data: {
              paidById: +userId,
              paidToId: course?.instructors[0].id,
              courseId: course?.id,
              total: course?.price,
            },
          });
        }
      }),
    );
    await this.prisma.cart.delete({
      where: {
        userId: +userId,
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        orders: true,
        cart: true,
        wishlist: true,
      },
    });
  }

  async getCart(userId: number) {
    await verifyEntity({
      model: this.prisma.user,
      name: 'User',
      id: userId,
    });
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: +userId,
      },
      include: {
        course: {
          include: {
            ratings: true,
            instructors: true,
          },
        },
      },
    });

    return cart;
  }

  async updateMyLecture(
    user: User,
    updateLectureDto: { lectureId: number; courseId: number },
  ) {
    await verifyEntity({
      model: this.prisma.lecture,
      name: 'User',
      id: +updateLectureDto.lectureId,
    });

    let myCourse = await this.prisma.coursesOnStudents.findFirst({
      where: {
        courseId: updateLectureDto.courseId,
        studentId: user?.id,
      },
      include: {
        progress: {
          include: {
            completedLectures: true,
          },
        },
        course: {
          include: {
            sections: {
              include: {
                lectures: true,
              },
            },
          },
        },
      },
    });

    await this.prisma.progress.update({
      where: {
        id: myCourse.progressId,
      },
      data: {
        completedLectures: {
          connect: {
            id: updateLectureDto.lectureId,
          },
        },
      },
    });

    myCourse = await this.prisma.coursesOnStudents.findFirst({
      where: {
        courseId: updateLectureDto.courseId,
        studentId: user?.id,
      },
      include: {
        progress: {
          include: {
            completedLectures: true,
          },
        },
        course: {
          include: {
            sections: {
              include: {
                lectures: true,
              },
            },
          },
        },
      },
    });

    const totalLength = myCourse?.course?.sections?.reduce((acc, section) => {
      return acc + section?.lectures?.length;
    }, 0);

    const totalCompleted = myCourse?.progress?.completedLectures?.length;

    const percentage = Math.min((totalCompleted ?? 0) / (totalLength ?? 1), 1);
    await this.prisma.progress.update({
      where: {
        id: myCourse.progressId,
      },
      data: {
        completedLectures: {
          connect: {
            id: updateLectureDto.lectureId,
          },
        },
        progressPercentage: percentage,
      },
    });

    if (percentage >= 1) {
      const achievement = await this.prisma.achievement.findUnique({
        where: {
          coursesOnStudentsCourseId_coursesOnStudentsStudentId: {
            coursesOnStudentsCourseId: updateLectureDto.courseId,
            coursesOnStudentsStudentId: +user.id,
          },
        },
      });
      if (!achievement) {
        this.achievementService.create(user, {
          courseId: updateLectureDto.courseId,
        });
      }
    }
    return this.courseService.findMyOne(updateLectureDto?.courseId, user.id);
  }
}
