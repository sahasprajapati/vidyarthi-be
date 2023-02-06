import { User } from './../../_gen/prisma-class/user';
import { UserEntity } from './../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Rating,
  SocialProfile,
  StudentProfile,
  TeacherProfile,
} from '@prisma/client';
import { Occupation } from './../../_gen/prisma-class/occupation';
import { TeacherNotification } from './../../_gen/prisma-class/teacher_notification';

export class RatingEntity implements Rating {
  @ApiProperty()
  rate: number;
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  message: string;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  userId: number;
}
