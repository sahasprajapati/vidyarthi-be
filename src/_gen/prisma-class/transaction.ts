import { PaymentMedium, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ enum: PaymentMedium, enumName: 'PaymentMedium' })
  medium: PaymentMedium = PaymentMedium.ESEWA;

  @ApiProperty({ enum: Status, enumName: 'Status' })
  status: Status = Status.COMPLETED;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  courseId: number;

  @ApiProperty({ type: Number })
  paidToId: number;

  @ApiProperty({ type: Number })
  paidById: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
