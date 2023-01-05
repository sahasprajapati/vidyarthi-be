import { ApiProperty } from '@nestjs/swagger';
import { PaymentMedium } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({ default: PaymentMedium.ESEWA })
  medium: PaymentMedium;
  @ApiProperty()
  serviceId: number;
  @ApiProperty()
  customerId: number;
}
