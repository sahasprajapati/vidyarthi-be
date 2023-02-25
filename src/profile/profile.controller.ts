import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CaslAbilityFactory } from '@src/auth/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PermissionAction } from '@src/common/enums/permission.enum';
import { UserFindAllDto } from '@src/user/dto/user.dto';
import { UserEntity } from '@src/user/entities/user.entity';
import { generateRepsonseMessage } from './../roles/response';
import { UpdateProfileDto } from './dto/create-profile.dto';
import {
  UpdateCartDto,
  UpdateTeacherProfileDto,
  UpdateWishlistDto,
} from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private abilityFactory: CaslAbilityFactory,
  ) {}


  @Patch('lecture')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateMyLecture(
    @Body() updateLectureDto: { lectureId: number; courseId: number },

    @Req() req: any,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Lecture',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateMyLecture(req.user, updateLectureDto),
    );
  }
  @Patch('/:id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateStudent(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateProfileDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Profile',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateProfile(+id, updateUserDto),
    );
  }

  // @Patch('teacher/:id')
  // @ApiCustomResponse(UserFindAllDto, true)
  // @CheckPolicies(
  //   new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  // )
  // @ApiOkResponse({ type: UserEntity })
  // async updateTeacher(
  //   @Param('id') id: string,
  //   @Body() updateTeacherDto: UpdateTeacherProfileDto,
  // ) {
  //   return new ResponseDto(
  //     generateRepsonseMessage({
  //       model: 'Profile',
  //       message: ResponseMessage.Update,
  //     }),
  //     await this.profileService.updateTeacher(+id, updateTeacherDto),
  //   );
  // }

  @Patch('cart/:id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateCart(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherProfileDto,
    @Req() req: any,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Profile',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateTeacher(+id, updateTeacherDto),
    );
  }

  @Patch('wishlist/:id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateWishlist(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherProfileDto,
    @Req() req: any,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Profile',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateTeacher(+id, updateTeacherDto),
    );
  }

  @Patch('order/:id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherProfileDto,
    @Req() req: any,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Profile',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateTeacher(+id, updateTeacherDto),
    );
  }

  @Put('order')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.Order),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateSelfOrder(@Req() req: any) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Order',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateOrder(+req?.user?.id),
    );
  }
  @Put('cart')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.Cart),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateSelfCart(@Body() updateCartDto: UpdateCartDto, @Req() req: any) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Cart',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateCart(+req?.user?.id, updateCartDto),
    );
  }
  @Put('wishlist')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.Wishlist,
    ),
  )
  @ApiOkResponse({ type: UserEntity })
  async updateSelfWishlist(
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: any,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Wishlist',
        message: ResponseMessage.Update,
      }),
      await this.profileService.updateWishlist(
        +req?.user?.id,
        updateWishlistDto,
      ),
    );
  }

  @Get('cart')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async fetchCart(@Req() req: any) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Cart',
        message: ResponseMessage.Read,
      }),
      await this.profileService.getCart(+req?.user?.id),
    );
  }
}
