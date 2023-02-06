import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { Public } from '@src/auth/decorator/public.decorator';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { UserFindAllDto } from '@src/user/dto/user.dto';
import { UserEntity } from '@src/user/entities/user.entity';
import { generateRepsonseMessage } from './../roles/response';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingEntity } from './entities/rating.entity';
import { RatingService } from './rating.service';
import { Rating } from '@gen/prisma-class/rating';
import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';

@Controller('rating')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiCustomResponse(RatingEntity)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.Rating),
  )
  async create(@Body() createRatingDto: CreateRatingDto, @Req() req) {
    const user = req.user;
    if(user.id !== createRatingDto.userId) {
      throw new BadRequestException()
    }
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Rating',
        message: ResponseMessage.Create,
      }),
      await this.ratingService.create(createRatingDto),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.Rating),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateRating(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @Req() req
  ) {
    const user = req.user;
    if(user.id !== updateRatingDto.userId) {
      throw new BadRequestException()
    }
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Rating',
        message: ResponseMessage.Update,
      }),
      await this.ratingService.updateRating(+id, updateRatingDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(RatingEntity, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.Rating),
  )
  @ApiOkResponse({ type: RatingEntity })
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Rating',
        message: ResponseMessage.Delete,
      }),
      await this.ratingService.remove(+id),
    );
  }

  @Get()
  @Public()
  @ApiPaginatedResponse(RatingEntity, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.Rating),
  )
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForCourse(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.ratingService.findAll(pageOptionsDto);
  }
}
