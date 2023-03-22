import { SocialProfile } from './social_profile';
import { User } from './user';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TeacherProfileRelations {
  @ApiPropertyOptional({ type: () => SocialProfile })
  socialProfile?: SocialProfile;

  @ApiPropertyOptional({ type: () => User })
  user?: User;
}
