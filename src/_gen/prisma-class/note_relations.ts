import { Lecture } from './lecture';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class NoteRelations {
  @ApiPropertyOptional({ type: () => Lecture })
  lecture?: Lecture;
}
