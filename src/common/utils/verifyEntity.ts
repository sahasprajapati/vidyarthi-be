import { ResponseMessage } from '@common/enums/response.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { generateRepsonseMessage } from '@src/roles/response';

export const verifyEntity = async <T>({
  model,
  id = 0,
  name = 'Model',
  throwExistError = false,
  findCondition,
}: {
  model: T;
  id?: number;
  name?: string;
  throwExistError?: boolean;
  findCondition?: any;
}) => {
  const user = await (model as any).findFirst({
    where: {
      ...(findCondition
        ? findCondition
        : {
            id: +id,
          }),
    },
    select: {
      id: true,
    },
  });
  if (!user && !throwExistError)
    throw new NotFoundException(
      generateRepsonseMessage({
        model: name,
        message: ResponseMessage.NotFound,
      }),
    );

  if (user && throwExistError)
    throw new BadRequestException(
      generateRepsonseMessage({
        model: name,
        message: ResponseMessage.NotUnique,
      }),
    );
};
