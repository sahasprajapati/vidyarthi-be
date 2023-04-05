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
  })
  occupation: string;

  @ApiProperty()
  phone: string;

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
