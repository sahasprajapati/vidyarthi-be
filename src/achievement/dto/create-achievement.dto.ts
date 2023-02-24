import { ApiProperty } from '@nestjs/swagger';
import { PaymentMedium } from '@prisma/client';

export class CreateAchievementDto {
  @ApiProperty()
  courseId: number;
}
