import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { User } from '@gen/prisma-class/user';
import {
  Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UseInterceptors
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { CaslAbilityFactory } from '@src/auth/casl-ability.factory/casl-ability.factory';
import { PermissionsGuard } from '@src/auth/decorator/permission.guard';
import { CheckPermissions } from '@src/auth/decorator/permissions.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PermissionAction } from '@src/common/enums/permission.enum';
import {
  UserFindAllDto
} from '@src/user/dto/user.dto';
import { generateRepsonseMessage } from './../roles/response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './user.service';

@Controller('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiCustomResponse(User)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.User),
  )
  async create(@Body() createUserDto: CreateUserDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Create,
      }),
      await this.usersService.create(createUserDto),
    );
  }

  @Get()
  @ApiPaginatedResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForUser(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.usersService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Read,
      }),
      await this.usersService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Update,
      }),
      await this.usersService.update(+id, updateUserDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.User),
  )
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Delete,
      }),
      await this.usersService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(UserFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.User),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Delete,
      }),
      await this.usersService.removeMulti(ids),
    );
  }
}
