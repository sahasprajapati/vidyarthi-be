import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  url: string;  

}
