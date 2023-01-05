import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { PermissionAction } from '@common/enums/permission.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { Role } from '@gen/prisma-class/role';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionFindAllDto, RoleFindAllDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { generateRepsonseMessage } from './response';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiBearerAuth()
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCustomResponse(Role)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.User),
  )
  async create(@Body() createUserDto: CreateRoleDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Create,
      }),
      await this.rolesService.create(createUserDto),
    );
  }

  @Get()
  @ApiPaginatedResponse(RoleFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.rolesService.findAll(pageOptionsDto);
  }

  @Get('/permissions')
  @ApiPaginatedResponse(PermissionFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findAllPermissions(@Query() pageOptionsDto: PageOptionsDto) {
    return this.rolesService.findAllPermissions(pageOptionsDto);
  }

  @Get(':id')
  @ApiCustomResponse(RoleFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.User),
  )
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Read,
      }),
      await this.rolesService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(RoleFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.User),
  )
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateRoleDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Update,
      }),
      await this.rolesService.update(+id, updateUserDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(RoleFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.User),
  )
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Delete,
      }),
      await this.rolesService.remove(+id),
    );
  }
  @Put('/delete')
  @ApiCustomResponse(RoleFindAllDto, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.User),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'User',
        message: ResponseMessage.Delete,
      }),
      await this.rolesService.removeMulti(ids),
    );
  }
}
