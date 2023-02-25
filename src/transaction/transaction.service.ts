import { PageOptionsDto } from '@common/dtos/pagination/page-options.dto';
import { verifyEntity } from '@common/utils/verifyEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PageDto } from '@src/common/dtos/pagination/page.dto';
import { Prisma } from '@prisma/client';
import { FindAllTransactionWithSelect } from './dto/transaction.dto';
import { paginate } from '@common/utils/paginate';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await verifyEntity({
      model: this.prisma.transaction,
      name: 'Transaction',
      throwExistError: true,
    });

    return this.prisma.transaction.create({ data: createTransactionDto });
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllTransactionWithSelect>> {
    const criteria: Prisma.TransactionFindManyArgs = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      include: {
        paidBy: true,
        paidTo: true,
        course: true,
      },
    };

    const transactions = await paginate<
      FindAllTransactionWithSelect,
      Prisma.TransactionFindManyArgs
    >(this.prisma.transaction, criteria, pageOptionsDto);
    return transactions;
  }

  async findMyAll(
    id: number,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FindAllTransactionWithSelect>> {
    const criteria: Prisma.TransactionFindManyArgs = {
      where: {
        paidToId: id,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      orderBy: {
        createdAt: pageOptionsDto.order,
      },
      include: {
        paidBy: true,
        paidTo: true,
        course: true,
      },
    };

    const transactions = await paginate<
      FindAllTransactionWithSelect,
      Prisma.TransactionFindManyArgs
    >(this.prisma.transaction, criteria, pageOptionsDto);
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    await verifyEntity({
      model: this.prisma.transaction,
      name: 'Transaction',
      id,
    });
    return this.prisma.transaction.update({
      where: { id },

      data: updateTransactionDto,
    });
  }

  async remove(id: number) {
    await verifyEntity({
      model: this.prisma.transaction,
      name: 'Transaction',
      id,
    });
    return this.prisma.transaction.delete({ where: { id } });
  }

  async removeMulti(ids: number[]) {
    return this.prisma.transaction.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
