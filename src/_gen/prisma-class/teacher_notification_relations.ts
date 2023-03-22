import { TeacherProfile } from './teacher_profile';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherNotificationRelations {
  @ApiProperty({ isArray: true, type: () => TeacherProfile })
  TeacherProfile: TeacherProfile[] = undefined;
}
