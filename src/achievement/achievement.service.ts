import { Achievement } from './entities/achievement.entity';
import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { Prisma, User } from '@prisma/client';
import { paginate } from '@common/utils/paginate';
import path, { join } from 'path';
import util from 'util';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { UploadService } from '@src/upload/upload.service';
@Injectable()
export class AchievementService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(user: User, createAchievementDto: CreateAchievementDto) {
    await verifyEntity({
      model: this.prisma.course,
      name: 'Course',
      id: +createAchievementDto.courseId,
    });
    const course = await this.prisma.course.findUnique({
      where: {
        id: +createAchievementDto.courseId,
      },
    });
    const pdf = await this.generatePdf({
      name: user.name,
      courseName: course.title,
    });
    return this.prisma.achievement.create({
      data: {
        coursesOnStudents: {
          connect: {
            courseId_studentId: {
              studentId: user.id,
              courseId: course?.id,
            },
          },
        },
        image: pdf,
      },
    });
  }

  async findAll(
    id: number,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Achievement>> {
    const criteria: Prisma.AchievementFindManyArgs = {
      where: {
        coursesOnStudentsStudentId: id,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      select: {
        id: true,
        image: true,
        coursesOnStudents: {
          select: {
            course: true,
            student: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    };

    const achievement = await paginate<
      Achievement,
      Prisma.AchievementFindManyArgs
    >(this.prisma.achievement, criteria, pageOptionsDto);
    return achievement;
  }

  findOne(id: number) {
    return `This action returns a #${id} achievement`;
  }

  // async update(id: number, updateAchievementDto: UpdateAchievementDto) {
  //   await verifyEntity({
  //     model: this.prisma.achievement,
  //     name: 'Achievement',
  //     id,
  //   });
  //   return this.prisma.achievement.update({
  //     where: { id },

  //     data: updateAchievementDto,
  //   });
  // }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.achievement,
      name: 'Achievement',
      id,
    });
    return this.prisma.achievement.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.achievement.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async generatePdf({ name, courseName }) {
    //input is the fillable form created by converting the pdf given by clients to fillable pdf using acrobat or something
    const input = join(process.cwd(), `./template/certificate-design.pdf`);
    //output is the pdf that contains the data

    const readFile = util.promisify(fs.readFile);
    function getStuff() {
      return readFile(input);
    }
    const file = await getStuff();
    const pdfDoc = await PDFDocument.load(file);
    const form = pdfDoc.getForm();

    // Object.keys(data).forEach((element) => {
    //   const field = form.getTextField(element);
    //   field.setText(data[element]);
    // });

    const field = form.getTextField('name');
    field.setText(name);
    const field2 = form.getTextField('course');
    field2.setText(`"${courseName}"`);
    form.flatten();

    const pdfBytes = await pdfDoc.save();

    // const res = await this.uploadService.uploadCertificate(
    //   Buffer.from(pdfBytes),
    //   `${name}-${courseName}-certificate`,
    // );
    const route = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      '${name}-${courseName}-certificate.pdf',
    );
    fs.writeFile(route, pdfBytes, () => {
      console.log('Uploaded certificate');
    });
    return route;
  }
}
