import { verifyEntity } from '@common/utils/verifyEntity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
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
      updateData.dob = new Date(updateStudentDto.dob);
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
    if (updateStudentDto.picture) {
      updateData.image = updateStudentDto.picture;
      await this.prisma.user.update({
        where: { id: id },
        data: {
          image: updateStudentDto.picture,
        },
      });
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
    if (updateTeacherDto.picture) {
      updateData.image = updateTeacherDto.picture;
      await this.prisma.user.update({
        where: { id: id },
        data: {
          image: updateTeacherDto.picture,
        },
      });
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

  async getAdminDashboard(userId: number) {
    const user = await this.prisma.user.groupBy({
      by: ['roleId'],

      _count: {
        id: true,
      },
    });
    const roles = await this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const roledUsers = user.map((u) => {
      const role = roles.find((role) => role.id === u.roleId);
      return {
        name: role.name,
        count: u._count?.id,
      };
    });
    const transactions = await this.prisma.transaction.groupBy({
      by: ['status'],
      _sum: {
        total: true,
      },
    });

    const popularTeacher = await this.prisma.user?.findMany({
      where: {
        role: {
          name: 'instructor',
        },
      },
      include: {
        _count: {
          select: {
            teacherCourses: true,
          },
        },
        teacherCourses: {
          select: {
            _count: {
              select: {
                coursesOnStudents: true,
              },
            },
          },
        },
        role: true,
      },
      orderBy: {
        teacherCourses: {
          _count: Prisma.SortOrder.desc,
        },
      },
    });

    const courses = await this.prisma.coursesOnStudents.count();

    return {
      dashboard: {
        transactions,
        courses,
        roledUsers,
        popularTeacher,
      },
    };
  }
  async getUserDashboard(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        coursesOnStudents: {
          include: {
            progress: true,
            course: true,
          },
        },
      },
    });

    const achievements = await this.prisma.achievement.findMany({
      where: {
        coursesOnStudentsStudentId: +userId,
      },
      select: {
        id: true,
      },
    });

    let courseInProgress = 0,
      completedCourseCount = 0,
      ownedCourse = 0,
      totalAchievement = 0;
    const completedCourses = [];

    user?.coursesOnStudents?.map((coursesOnStudent) => {
      if (coursesOnStudent?.progress?.progressPercentage >= 1) {
        completedCourseCount += 1;
      } else {
        courseInProgress += 1;
      }
      if (coursesOnStudent?.course) {
        completedCourses.push(coursesOnStudent?.course);
      }

      ownedCourse += 1;
    });

    totalAchievement = achievements?.length ?? 0;

    return {
      dashboard: {
        courseInProgress,
        completedCourseCount,
        ownedCourse,
        totalAchievement,
      },
      completedCourses,
    };
  }

  async getTeacherTransactionReport(id: number): Promise<any[]> {
    const transactionReport: any[] = await this.prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "createdAt") AS "month",
             SUM("total") AS "totalAmount"
      FROM "Transaction"
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY "month" DESC
      -- WHERE paidToId = ${id}
    `;

    return transactionReport;
  }

  async getTopSellingCourse(id: number): Promise<any[]> {
    return this.prisma.course.findMany({
      orderBy: {
        coursesOnStudents: {
          _count: Prisma.SortOrder.desc,
        },
      },
      include: {
        coursesOnStudents: {
          include: {
            student: true,
          },
        },
      },
    });
  }
  async getInstructorDashboard(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        teacherCourses: {
          include: {
            _count: {
              select: { coursesOnStudents: true, ratings: true },
            },
          },
        },
      },
    });

    const transactions = await this.getTeacherTransactionReport(userId);
    const topSales = await this.getTopSellingCourse(userId);
    const coursesLevel = await this.prisma.course.groupBy({
      by: ['level'],
      _count: {
        id: true,
      },
    });
    const coursesContents = await this.prisma.course.findMany({
      where: {
        instructors: {
          some: {
            id: +userId,
          },
        },
      },
      select: {
        sections: {
          select: {
            _count: {
              select: {
                lectures: true,
              },
            },
          },
        },
        _count: {
          select: {
            ratings: true,
          },
        },
      },
    });
    const totalReviews = coursesContents.reduce((acc, data) => {
      return acc + (data?._count?.ratings ?? 0);
    }, 0);
    const totalContent = coursesContents.reduce((acc, data) => {
      return (
        acc +
        data?.sections?.reduce((acc2, section) => {
          return acc2 + (section?._count?.lectures ?? 0);
        }, 0)
      );
    }, 0);

    return {
      dashboard: {
        coursesLevel,
        topSales,
        totalContent,
        totalReviews,
        // transactions,
      },
    };
  }

  async getDashboardData(user: User & { role: { name: string } }) {
    if (user.role?.name === 'instructor') {
      return this.getInstructorDashboard(user.id);
    }
    if (user.role?.name === 'super') {
      return this.getAdminDashboard(user.id);
    }
    return this.getUserDashboard(user.id);
  }
}
