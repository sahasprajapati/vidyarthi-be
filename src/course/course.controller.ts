import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { Course } from '@gen/prisma-class/course';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CaslAbilityFactory } from '@src/auth/casl-ability.factory/casl-ability.factory';
import { PermissionsGuard } from '@src/auth/decorator/permission.guard';
import { CheckPermissions } from '@src/auth/decorator/permissions.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PermissionAction } from '@src/common/enums/permission.enum';

import { generateRepsonseMessage } from './../roles/response';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';

@Controller('course')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiCustomResponse(Course)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Create, PermissionSubject.Course),
  )
  async create(@Body() createCourseDto: CreateCourseDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Course',
        message: ResponseMessage.Create,
      }),
      await this.courseService.create(createCourseDto),
    );
  }

  @Get()
  @ApiPaginatedResponse(Course, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.Course),
  )
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    // const ability = await this.abilityFactory.createForCourse(req.user)
    // ability.can()
    // if (ability.can(PermissionAction.READ, condition)) {
    //   throw new ForbiddenException("You dont have access to this resource!");
    // }
    return this.courseService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiCustomResponse(Course, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.Course),
  )
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Course',
        message: ResponseMessage.Read,
      }),
      await this.courseService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(Course, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Update, PermissionSubject.Course),
  )
  @ApiOkResponse({ type: CourseEntity })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Course',
        message: ResponseMessage.Update,
      }),
      await this.courseService.update(+id, updateCourseDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(Course, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.Course),
  )
  @ApiOkResponse({ type: CourseEntity })
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Course',
        message: ResponseMessage.Delete,
      }),
      await this.courseService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(Course, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Delete, PermissionSubject.Course),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Course',
        message: ResponseMessage.Delete,
      }),
      await this.courseService.removeMulti(ids),
    );
  }
}