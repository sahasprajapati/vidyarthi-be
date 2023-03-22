import { ApiProperty } from '@nestjs/swagger';

export class CoursesOnStudents {
  @ApiProperty({ type: Number })
  courseId: number;

  @ApiProperty({ type: Number })
  studentId: number;

  @ApiProperty({ type: Date })
  assignedAt: Date;

  @ApiProperty({ type: Number })
  progressId: number;
}
