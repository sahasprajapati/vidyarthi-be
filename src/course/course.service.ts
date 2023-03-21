import { verifyEntity } from '@common/utils/verifyEntity';
import { Course } from '@gen/prisma-class/course';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { NumberDictionary, uniqueNamesGenerator } from 'unique-names-generator';
import { PageDto } from '../common/dtos/pagination/page.dto';
import { paginateFilter } from './../common/utils/paginate';
import { CreateCourseDto, Lecture, SectionDto } from './dto/create-course.dto';
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

    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
    const courseId: string = uniqueNamesGenerator({
      dictionaries: [[createCourseDto.title], numberDictionary],
      length: 2,
      separator: '#',
      style: 'capital',
    });
    return this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        subtitle: createCourseDto.subtitle,
        topic: createCourseDto.topic,
        courseId: courseId,
        subCategoryId: +createCourseDto.subCategoryId,
        categoryId: +createCourseDto.categoryId,
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<
    PageDto<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      }
    >
  > {
    // Get proper criteria using prisma findMany types
    // this.prisma.course.findMany();
    const criteria: Prisma.CourseFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        coursesOnStudents: true,
        ratings: true,
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
      },
    };
    if (pageOptionsDto.filter) {
      criteria.where = {
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
      };
    }
    const courses = await paginate<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      },
      Prisma.CourseFindManyArgs
    >(this.prisma.course, criteria, pageOptionsDto);

    const data = courses.data.map((course: any) => {
      const ratings = course.ratings;
      const ratingsUserCount = ratings.length;
      const ratingsAvg =
        ratings?.reduce((acc, rating) => acc + rating?.rate ?? 0, 0) /
        ratings?.length;

      const usersCount = new Set(ratings.map((rating) => rating.userId)).size;

      return {
        ...course,
        ratingsUserCount,
        usersCount,
        ratingsAvg: ratingsAvg ?? 0,
      };
    });

    return { ...courses, data: data };
  }

  async findAllMyCourse(
    id: number,
    pageOptionsDto: PageOptionsDto,
  ): Promise<
    PageDto<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      }
    >
  > {
    // Get proper criteria using prisma findMany types
    // this.prisma.course.findMany();
    const criteria: Prisma.CourseFindManyArgs = {
      where: {
        coursesOnStudents: {
          some: {
            studentId: +id,
          },
        },
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        coursesOnStudents: true,
        ratings: true,
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
      },
    };
    if (pageOptionsDto.filter) {
      criteria.where = {
        ...criteria.where,
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
      };
    }
    const courses = await paginate<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      },
      Prisma.CourseFindManyArgs
    >(this.prisma.course, criteria, pageOptionsDto);

    const data = courses.data.map((course: any) => {
      const ratings = course.ratings;
      const ratingsUserCount = ratings.length;
      const ratingsAvg =
        ratings?.reduce((acc, rating) => acc + rating?.rate ?? 0, 0) /
        ratings?.length;

      const usersCount = new Set(ratings.map((rating) => rating.userId)).size;

      return {
        ...course,
        ratingsUserCount,
        usersCount,
        ratingsAvg: ratingsAvg ?? 0,
      };
    });

    return { ...courses, data: data };
  }

  async findAllSuggested(
    courseId: number,
    pageOptionsDto: PageOptionsDto,
  ): Promise<
    PageDto<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      }
    >
  > {
    const currentCourse = await this.prisma.course.findUnique({
      where: { id: +courseId },
    });
    if (!currentCourse) {
      throw new Error('Course not found');
    }
    currentCourse.categoryId;
    // Get proper criteria using prisma findMany types
    // this.prisma.course.findMany();
    const criteria: Prisma.CourseFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take ?? 6,
      orderBy: {
        popularity: 'desc',
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        ratings: true,
        coursesOnStudents: true,
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
      },
    };
    criteria.where = {
      AND: [
        { categoryId: currentCourse.categoryId },
        { id: { not: courseId } },
      ],
      // OR: [
      //   {
      //     topic: {
      //       ...paginateFilter(pageOptionsDto.filter),
      //     },
      //     title: {
      //       ...paginateFilter(pageOptionsDto.filter),
      //     },
      //     subtitle: {
      //       ...paginateFilter(pageOptionsDto.filter),
      //     },
      //   },
      // ],
    };
    const courses = await paginate<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      },
      Prisma.CourseFindManyArgs
    >(this.prisma.course, criteria, pageOptionsDto);
    const data = courses.data.map((course: any) => {
      const ratings = course.ratings;
      const ratingsUserCount = ratings.length;
      const ratingsAvg =
        ratings?.reduce((acc, rating) => acc + rating?.rate ?? 0, 0) /
        ratings?.length;

      const usersCount = new Set(ratings.map((rating) => rating.userId)).size;

      return {
        ...course,
        ratingsUserCount,
        usersCount,
        ratingsAvg: ratingsAvg ?? 0,
      };
    });
    return { ...courses, data: data };
  }

  async findAllPopular(pageOptionsDto: PageOptionsDto): Promise<
    PageDto<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      }
    >
  > {
    // Get proper criteria using prisma findMany types
    // this.prisma.course.findMany();
    const criteria: Prisma.CourseFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        popularity: 'desc',
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        ratings: true,
        coursesOnStudents: true,
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
      },
    };
    if (pageOptionsDto.filter) {
      criteria.where = {
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
      };
    }
    const courses = await paginate<
      Course & {
        ratingsCount: number;
        ratingsUserCount: number;
        ratingsAvg: number;
      },
      Prisma.CourseFindManyArgs
    >(this.prisma.course, criteria, pageOptionsDto);
    const data = courses.data.map((course: any) => {
      const ratings = course.ratings;
      const ratingsUserCount = ratings.length;
      const ratingsAvg =
        ratings?.reduce((acc, rating) => acc + rating?.rate ?? 0, 0) /
        ratings?.length;

      const usersCount = new Set(ratings.map((rating) => rating.userId)).size;

      return {
        ...course,
        ratingsUserCount,
        usersCount,
        ratingsAvg: ratingsAvg ?? 0,
      };
    });

    return { ...courses, data: data };
  }

  async findOne(id: number) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id,
    });
    const course = await this.prisma.course.findFirst({
      where: {
        id: +id,
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        price: true,
        topic: true,
        level: true,
        // learnableContent: true,
        // skills: true,
        description: true,
        category: true,
        subCategory: true,
        instructors: true,
        ratings: {
          select: {
            createdAt: true,
            userId: true,
            rate: true,
            message: true,
            ratedBy: {
              select: {
                name: true,
              },
            },
          },
        },
        sections: {
          select: {
            listOrder: true,
            name: true,
            lectures: {
              select: {
                name: true,
                listOrder: true,
                description: true,
                length: true,
              },
            },
          },
        },
      },
    });

    const ratings = course.ratings;
    const ratingsUserCount = ratings.length;
    const ratingsAvg =
      ratings?.reduce((acc, rating) => acc + rating?.rate ?? 0, 0) /
      ratings?.length;

    const usersCount = new Set(ratings.map((rating) => rating.userId)).size;

    const groupedRatings = await this.prisma.rating.groupBy({
      by: ['rate'],
      where: {
        courseId: course?.id,
      },
      _count: {
        rate: true,
      },
    });
    await this.handleProductView(+id);
    return {
      ...course,
      ratingsUserCount: ratingsUserCount,
      ratingsAvg: ratingsAvg ?? 0,
      usersCount: usersCount,
      groupedRatings: groupedRatings,
    };
  }
  async findMyOne(id: number, userId: number) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id,
    });
    const course = await this.prisma.course.findFirst({
      where: {
        id: +id,
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        ratings: {
          include: {
            ratedBy: true,
          },
        },
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
      },
    });

    const myCourse = await this.prisma.coursesOnStudents.findUnique({
      where: {
        courseId_studentId: {
          courseId: id,
          studentId: userId,
        },
      },
      include: {
        progress: {
          include: {
            completedLectures: true,
          },
        },
      },
    });

    const ratings = course.ratings;
    const ratingsUserCount = ratings.length;
    const ratingsAvg =
      ratings?.reduce((acc, rating) => acc + rating?.rate ?? 0, 0) /
      ratings?.length;

    const usersCount = new Set(ratings.map((rating) => rating.userId)).size;

    const groupedRatings = await this.prisma.rating.groupBy({
      by: ['rate'],
      where: {
        courseId: course?.id,
      },
      _count: {
        rate: true,
      },
    });

    await this.handleProductView(+id);
    return {
      ...course,
      ratingsUserCount: ratingsUserCount,
      ratingsAvg: ratingsAvg ?? 0,
      usersCount: usersCount,
      groupedRatings: groupedRatings,
      myCourse: myCourse,
    };
  }

  async noteUpsert(note: {
    noteDescription?: string;
    noteFiles?: string[];
    noteId?: number;
  }) {
    let newNoteId = null;
    const noteData = {};
    if (note.noteDescription)
      noteData['noteDescription'] = note.noteDescription;
    if (note.noteFiles) noteData['noteFiles'] = note.noteFiles;
    if (note.noteId) {
      await this.prisma.note.update({
        where: {
          id: +note.noteId,
        },
        data: {
          ...noteData,
        },
      });
    } else {
      newNoteId = await this.prisma.note.create({
        data: {
          ...noteData,
        },
      });
    }
    return newNoteId;
  }

  async lectureUpsert(lecture: Lecture, sectionId: number) {
    const note = await this.noteUpsert({
      noteDescription: lecture.noteDescription,
      noteFiles: lecture.noteFiles,
      noteId: +lecture.noteId,
    });

    const data: any = {};

    if (note?.id) {
      data['note'] = {
        connect: {
          id: +note?.id,
        },
      };
    }
    if (lecture.name) data['name'] = lecture.name;
    if (lecture.description) data['description'] = lecture.description;
    if (lecture.video) data['video'] = lecture.video;
    if (lecture.listOrder) data['listOrder'] = lecture.listOrder;
    if (lecture.length) data['length'] = lecture.length;

    let newLectureId;
    if (lecture.id) {
      await this.prisma.lecture.update({
        where: {
          id: +lecture.id,
        },
        data: {
          ...data,
          section: {
            connect: {
              id: +sectionId,
            },
          },
        },
      });
    } else {
      newLectureId = await this.prisma.lecture.create({
        data: {
          ...data,
          section: {
            connect: {
              id: +sectionId,
            },
          },
        },
      });
    }
    return newLectureId;
  }
  async sectionUpsert(sections: SectionDto[], courseId: number) {
    await Promise.all(
      sections?.map(async (section) => {
        // Section
        const data: any = {};
        if (section.name) data['name'] = section.name;
        if (section.listOrder) data['listOrder'] = section.listOrder;
        if (section.id && courseId) {
          await this.prisma.section.update({
            where: {
              id: section.id,
            },
            data: {
              ...data,
              Course: {
                connect: {
                  id: +courseId,
                },
              },
            },
          });
          await Promise.all(
            section.lectures?.map(async (lecture) => {
              await this.lectureUpsert(lecture, section.id);
            }),
          );
        } else {
          const newSection = await this.prisma.section.create({
            data: {
              ...data,
              Course: {
                connect: {
                  id: +courseId,
                },
              },
            },
          });
          await Promise.all(
            section.lectures?.map(async (lecture) => {
              await this.lectureUpsert(lecture, newSection.id);
            }),
          );
        }
      }),
    );
  }
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id,
    });

    let data = {};

    if (updateCourseDto.title) data['title'] = updateCourseDto.title;
    if (updateCourseDto.subtitle) data['subtitle'] = updateCourseDto.subtitle;
    if (updateCourseDto.subCategoryId)
      data['subCategoryId'] = +updateCourseDto.subCategoryId;
    if (updateCourseDto.categoryId)
      data['categoryId'] = +updateCourseDto.categoryId;
    if (updateCourseDto.topic) data['topic'] = updateCourseDto.topic;
    if (updateCourseDto.language) data['language'] = updateCourseDto.language;
    if (updateCourseDto.subtitleLanguage)
      data['subtitleLanguage'] = updateCourseDto.subtitleLanguage;
    if (updateCourseDto.level) data['level'] = updateCourseDto.level;
    if (updateCourseDto.description)
      data['description'] = updateCourseDto.description;
    if (updateCourseDto.learnableContent)
      data['learnableContent'] = updateCourseDto.learnableContent;
    if (updateCourseDto.skills) data['skills'] = updateCourseDto.skills;
    if (updateCourseDto.trailer) data['trailer'] = updateCourseDto.trailer;
    if (updateCourseDto.thumbnail)
      data['thumbnail'] = updateCourseDto.thumbnail;
    if (updateCourseDto.price) data['price'] = +updateCourseDto.price;

    if (updateCourseDto.welcomeMessage)
      data['welcomeMessage'] = updateCourseDto.welcomeMessage;
    if (updateCourseDto.congratulationMessage)
      data['congratulationMessage'] = updateCourseDto.congratulationMessage;
    if (updateCourseDto.instructorIds)
      data['instructors'] = {
        connect: updateCourseDto.instructorIds?.map((id) => ({
          id: id,
        })),
      };

    // Lecture
    if (updateCourseDto.sections) {
      await this.sectionUpsert(updateCourseDto.sections, id);
    }

    return this.prisma.course.update({
      where: { id },
      data: {
        ...data,
      },
      include: {
        category: true,
        subCategory: true,
        instructors: true,
        sections: {
          include: {
            lectures: {
              include: {
                note: true,
              },
            },
          },
        },
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

  async increaseCoursePopularity(id: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new Error('Product not found');
    }
    const updatedProduct = await this.prisma.course.update({
      where: { id },
      data: { popularity: course.popularity + 1 },
    });
    return updatedProduct;
  }

  async handleProductView(id: number) {
    await this.increaseCoursePopularity(id);
  }
}
