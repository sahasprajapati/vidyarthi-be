import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import {
  Body,
  ClassSerializerInterceptor,
  Controller, Put,
  Req,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { UserFindAllDto } from '@src/user/dto/user.dto';
import { UserEntity } from '@src/user/entities/user.entity';
import { generateRepsonseMessage } from './../roles/response';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingService } from './rating.service';


@Controller('rating')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('rating')
export class RatingController {
  constructor(
    private readonly ratingService: RatingService ,
  ) {}

  @Put('rating')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.Rating,
    ),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateSelfWishlist(
    @Body() updateRatingDto: UpdateRatingDto,
    @Req() req: any,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Rating',
        message: ResponseMessage.Update,
      }),
      await this.ratingService.updateRating(
        +req?.user?.id,
        updateRatingDto,
      ),
    );
  }
}
