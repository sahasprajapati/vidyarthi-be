import { ApiProperty } from '@nestjs/swagger';

export class Achievement {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  image: string;

  @ApiProperty({ type: Number })
  coursesOnStudentsCourseId: number;

  @ApiProperty({ type: Number })
  coursesOnStudentsStudentId: number;
}
