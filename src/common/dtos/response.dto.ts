import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
    @ApiProperty()
    readonly data: T;
    
    @ApiProperty({type: String})
    readonly message: string;
  
    constructor(message: string, data?: T) {
      this.data = data;
      this.message = message;
    }
  }
  