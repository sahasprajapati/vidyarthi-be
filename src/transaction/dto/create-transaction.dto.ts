import { ApiProperty } from '@nestjs/swagger';
import { PaymentMedium } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({ default: PaymentMedium.ESEWA })
  medium: PaymentMedium;

  @ApiProperty()
  paidById: number;

  @ApiProperty()
  paidToId: number;

  @ApiProperty()
  courseId: number;
}
