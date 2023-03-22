import { ApiProperty } from '@nestjs/swagger';

export class SocialProfileDto {
  @ApiProperty({ nullable: true })
  website?: string;

  @ApiProperty({ nullable: true })
  facebook?: string;
  @ApiProperty({ nullable: true })
  instagram?: string;
  @ApiProperty({ nullable: true })
  linkedin?: string;
  @ApiProperty({ nullable: true })
  twitter?: string;
  @ApiProperty({ nullable: true })
  youtube?: string;
  @ApiProperty({ nullable: true })
  whatsapp?: string;
}
export class CreateStudentProfileDto {
  @ApiProperty()
  dob?: Date;

  @ApiProperty()
  occupation?: string;

  @ApiProperty({ nullable: true })
  phone?: string;

  @ApiProperty({ nullable: true })
  institution?: string;

  @ApiProperty({ nullable: true })
  currentQualification?: string;

  @ApiProperty({ nullable: true })
  highestQualification?: string;

  @ApiProperty({ nullable: true })
  isEmailUpdates?: boolean;
}

export class CreateTeacherProfileDto {
  // @ApiProperty()
  // teacherNotificationTypes: TEACHER_NOTIFICATION_TYPE[];

  @ApiProperty({ nullable: true })
  title?: string;

  @ApiProperty({ nullable: true })
  biography?: string;

  @ApiProperty({ nullable: true })
  phoneNumber?: string;

  @ApiProperty({ nullable: true })
  socialProfile?: SocialProfileDto;
}

export class CreateWishlistDto {
  @ApiProperty()
  courseIds: string[];
}

export class CreateOrderDto {
  @ApiProperty()
  courseIds: string[];
}

export class CreateCartDto {
  @ApiProperty()
  courseIds: string[];
}

export class UpdateProfileDto {
  @ApiProperty({ nullable: true })
  dob?: Date;

  @ApiProperty({ nullable: true })
  occupation?: string;

  @ApiProperty({ nullable: true })
  phone?: string;

  @ApiProperty({ nullable: true })
  institution?: string;

  @ApiProperty({ nullable: true })
  currentQualification?: string;

  @ApiProperty({ nullable: true })
  highestQualification?: string;

  @ApiProperty({ nullable: true })
  isEmailUpdates?: boolean;

  // @ApiProperty({ nullable: true })
  // teacherNotificationTypes?: TEACHER_NOTIFICATION_TYPE[];

  @ApiProperty({ nullable: true })
  title?: string;

  @ApiProperty({ nullable: true })
  biography?: string;

  @ApiProperty({ nullable: true })
  phoneNumber?: string;

  @ApiProperty({ nullable: true })
  socialProfile?: SocialProfileDto;
}
