import { Note } from './note';
import { Section } from './section';
import { Progress } from './progress';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class LectureRelations {
  @ApiPropertyOptional({ type: () => Note })
  note?: Note;

  @ApiProperty({ type: () => Section })
  section: Section;

  @ApiProperty({ isArray: true, type: () => Progress })
  lecturesViewed: Progress[];
}
