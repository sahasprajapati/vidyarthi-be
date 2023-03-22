import { StudentProfile } from './student_profile';
import { ApiProperty } from '@nestjs/swagger';

export class OccupationRelations {
  @ApiProperty({ isArray: true, type: () => StudentProfile })
  StudentProfile: StudentProfile[] = undefined;
}
