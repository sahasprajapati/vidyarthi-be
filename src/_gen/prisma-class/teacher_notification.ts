import { ApiProperty } from '@nestjs/swagger';

export class TeacherNotification {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;

  // @ApiProperty({
  //   isArray: true,
  //   enum: TEACHER_NOTIFICATION_TYPE,
  //   enumName: 'TEACHER_NOTIFICATION_TYPE',
  // })
  // notifications: TEACHER_NOTIFICATION_TYPE[] = undefined;
}
