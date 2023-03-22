import { TeacherProfile } from './teacher_profile';
import { ApiProperty } from '@nestjs/swagger';

export class SocialProfileRelations {
  @ApiProperty({ type: () => TeacherProfile })
  TeacherProfile: TeacherProfile;
}
