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
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '@common/decorators/api-custom-response.decorator';
import { CheckPolicies } from '@src/auth/decorator/policy.decorator';
import { CustomPolicyHandler } from '@common/handlers/policy.handler';
import { PermissionAction } from '@common/enums/permission.enum';
import { PermissionSubject } from '@common/enums/permission-subject.enum';
import { Transaction } from '@gen/prisma-class/transaction';
import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { ResponseDto } from '@common/dtos/response.dto';
import { generateRepsonseMessage } from '@src/roles/response';
import { ResponseMessage } from '@common/enums/response.enum';

@Controller('transaction')
@ApiBearerAuth()
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiCustomResponse(Transaction)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Create,
      PermissionSubject.Transaction,
    ),
  )
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.transactionService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Transaction',
        message: ResponseMessage.Update,
      }),
      await this.transactionService.update(+id, updateTransactionDto),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Transaction',
        message: ResponseMessage.Delete,
      }),
      await this.transactionService.remove(+id),
    );
  }

  @Put('/delete')
  @ApiCustomResponse(Transaction, true)
  @CheckPolicies(
    new CustomPolicyHandler(
      PermissionAction.Delete,
      PermissionSubject.Transaction,
    ),
  )
  async removeMulti(@Body('ids') ids: number[]) {
    if (ids == undefined || ids.length <= 0) {
      throw new BadRequestException(
        generateRepsonseMessage({
          model: 'Transaction',
          message: ' Cannot perform this action',
        }),
      );
    }
    return new ResponseDto(
      generateRepsonseMessage({
        model: 'Transaction',
        message: ResponseMessage.Delete,
      }),
      await this.transactionService.removeMulti(ids),
    );
  }
}
