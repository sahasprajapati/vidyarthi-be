import { Section } from './../_gen/prisma-class/section';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Course } from '@gen/prisma-class/course';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { paginate } from '@src/common/utils/paginate';
import { PrismaService } from '@src/prisma/prisma.service';
import { PageDto } from '../common/dtos/pagination/page.dto';
import { paginateFilter } from './../common/utils/paginate';
import { CreateCourseDto, Lecture, SectionDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator';

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
        courseId: courseId,
        subCategoryId: createCourseDto.subCategoryId,
        categoryId: createCourseDto.categoryId,
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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Course>> {
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
    const courses = await paginate<Course, Prisma.CourseFindManyArgs>(
      this.prisma.course,
      criteria,
      pageOptionsDto,
    );
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
        id: +id,
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
      this.prisma.note.update({
        where: {
          id: note.noteId,
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
    const noteId = await this.noteUpsert({
      noteDescription: lecture.noteDescription,
      noteFiles: lecture.noteFiles,
      noteId: lecture.noteId,
    });

    const data: any = {};

    if (noteId) {
      data['noteId'] = noteId?.id;
    }
    if (lecture.name) data['name'] = lecture.name;
    if (lecture.description) data['description'] = lecture.description;
    if (lecture.video) data['video'] = lecture.video;
    if (lecture.listOrder) data['listOrder'] = lecture.listOrder;

    let newLectureId;
    if (lecture.noteId) {
      this.prisma.lecture.update({
        where: {
          id: lecture.noteId,
        },
        data: {
          ...data,
        },
      });
    } else {
      newLectureId = await this.prisma.lecture.create({
        data: {
          ...data,
          sectionId: sectionId,
        },
      });
    }
    return newLectureId;
  }
  async sectionUpsert(sections: SectionDto[], courseId: number) {
    await Promise.all(
      sections?.map(async (section) => {
        // Lecture
        section.lectures?.map(async (lecture) => {
          await this.lectureUpsert(lecture, section.id);
        });

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
              courseId: courseId,
            },
          });
        } else {
          await this.prisma.section.create({
            data: {
              ...data,
              courseId: courseId as never,
            },
          });
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
      data['subCategoryId'] = updateCourseDto.subCategoryId;
    if (updateCourseDto.categoryId)
      data['categoryId'] = updateCourseDto.categoryId;
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
      this.sectionUpsert(updateCourseDto.sections, id);
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
}
