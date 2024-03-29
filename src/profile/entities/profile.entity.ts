import { ApiProperty } from '@nestjs/swagger';
import {
  SocialProfile,
  StudentProfile,
  TeacherProfile,
  TEACHER_NOTIFICATION_TYPE
} from '@prisma/client';

export class StudentProfileEntity implements StudentProfile {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  id: number;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  occupation: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  institution: string;

  @ApiProperty()
  currentQualification: string;
  @ApiProperty()
  highestQualification: string;

  @ApiProperty()
  isEmailUpdates: boolean;
}

export class TeacherProfileEntity implements TeacherProfile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  image: string;

  @ApiProperty({
    enum: TEACHER_NOTIFICATION_TYPE,
    isArray: true,
  })
  notifications: TEACHER_NOTIFICATION_TYPE[];
  
  @ApiProperty()
  socialProfileId: number;
  @ApiProperty({
  })
  occupation: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  biography: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  socialProfile: SocialProfile;
}
