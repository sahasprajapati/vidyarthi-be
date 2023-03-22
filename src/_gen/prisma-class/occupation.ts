import { ApiProperty } from '@nestjs/swagger';

export class Occupation {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;

  @ApiProperty({ type: String })
  name: string = undefined;
}
