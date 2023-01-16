import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { ApiPaginatedResponse } from '@common/decorators/api-paginated-response.decorator';
import { ResponseDto } from '@common/dtos/response.dto';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { ResponseMessage } from '@common/enums/response.enum';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { Category } from '@gen/prisma-class/category';
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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CaslAbilityFactory } from '@src/auth/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { PageOptionsDto } from '@src/common/dtos/pagination/page-options.dto';
import { PermissionAction } from '@src/common/enums/permission.enum';

import { generateRepsonseMessage } from './../roles/response';
import { CategorysService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategorysService,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiCustomResponse(Category)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.Category,
    ),
  )
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Category',
        message: ResponseMessage.Create,
      }),
      await this.categoryService.create(createCategoryDto),
    );
  }

  @Get()
  @ApiPaginatedResponse(Category, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.Category),
  )
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.categoryService.findAll(pageOptionsDto);
  }

  @Get('sub/:id')
  @ApiPaginatedResponse(Category, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.Category),
  )
  async findAllSubCategory(@Query() pageOptionsDto: PageOptionsDto, @Param('id') id: number) {
    return this.categoryService.findAllSubCategory(id, pageOptionsDto);
  }


  @Get(':id')
  @ApiCustomResponse(Category, true)
  @CheckPolicies(
    new CustomPolicyHandler(PermissionAction.Read, PermissionSubject.Category),
  )
  async findOne(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Category',
        message: ResponseMessage.Read,
      }),
      await this.categoryService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiCustomResponse(Category, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Update,
      PermissionSubject.Category,
    ),
  )
  @ApiOkResponse({ type: CategoryEntity })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Category',
        message: ResponseMessage.Update,
      }),
      await this.categoryService.update(+id, updateCategoryDto),
    );
  }

  @Delete(':id')
  @ApiCustomResponse(CategoryEntity, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.Category,
    ),
  )
  @ApiOkResponse({ type: CategoryEntity })
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Category',
        message: ResponseMessage.Delete,
      }),
      await this.categoryService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(Category, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.Category,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Category',
        message: ResponseMessage.Delete,
      }),
      await this.categoryService.removeMulti(ids),
    );
  }
}
