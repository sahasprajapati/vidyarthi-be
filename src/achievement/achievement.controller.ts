import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { PermissionAction } from '@common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { ResponseDto } from '@common/dtos/response.dto';
import { generateRepsonseMessage } from '@src/roles/response';
import { ResponseMessage } from '@common/enums/response.enum';
import { Achievement } from '@gen/prisma-class/achievement';

@Controller('achievement')
@ApiBearerAuth()
@ApiTags('Achievements')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  @ApiCustomResponse(Achievement)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.StudentProfile,
    ),
  )
  async create(
    @Body() createAchievementDto: CreateAchievementDto,
    @Req() req: any,
  ) {
    return this.achievementService.create(req?.user, createAchievementDto);
  }

  @Get()
  async findAll(@Req() req, @Query() pageOptionsDto: PageOptionsDto) {
    return await this.achievementService.findAll(req?.user?.id, pageOptionsDto);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateAchievementDto: UpdateAchievementDto,
  // ) {
  //   return new ResponseDto(
  //     generateRepsonseMessage({
  //       model: 'Achievement',
  //       message: ResponseMessage.Update,
  //     }),
  //     await this.achievementService.update(+id, updateAchievementDto),
  //   );
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Achievement',
        message: ResponseMessage.Delete,
      }),
      await this.achievementService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(Achievement, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.StudentProfile,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    if (ids == undefined || ids.length <= 0) {
      throw new BadRequestException(
        generateRepsonseMessage({
          model: 'Achievement',
          message: ' Cannot perform this action',
        }),
      );
    }
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Achievement',
        message: ResponseMessage.Delete,
      }),
      await this.achievementService.removeMulti(ids),
    );
  }
}
