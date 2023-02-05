import { Occupation } from '@gen/prisma-class/occupation';
import { TeacherNotification } from '@gen/prisma-class/teacher_notification';
import { ApiProperty } from '@nestjs/swagger';
import { SocialProfile } from '@prisma/client';
import { UserEntity } from '@src/user/entities/user.entity';

export class StudentProfileDto {
  @ApiProperty()
  occupationId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  dob: Date;

  @ApiProperty({
    enum: Occupation,
  })
  occupation: Occupation;

  @ApiProperty()
  phone: bigint;

  @ApiProperty()
  institution: string;

  @ApiProperty()
  currentQualification: string;
  @ApiProperty()
  highestQualification: string;

  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  isEmailUpdates: boolean;
}

export class TeacherProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  teacherNotificationId: number;

  @ApiProperty()
  socialProfileId: number;
  @ApiProperty({
    enum: TeacherNotification,
  })
  occupation: TeacherNotification;

  @ApiProperty()
  title: string;

  @ApiProperty()
  biography: string;

  @ApiProperty()
  phoneNumber: bigint;

  @ApiProperty()
  socialProfile: SocialProfile;
}
