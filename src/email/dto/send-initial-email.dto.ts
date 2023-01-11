import { ApiProperty } from '@nestjs/swagger';

export class SendInitialEmailDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class SendBulkInitialEmailDto {
  @ApiProperty()
  emails: string[];
}
