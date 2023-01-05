import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDto } from '../dtos/pagination/page.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  isCustomModel: boolean = false,
) => {
  return applyDecorators(
    // foo.apply(this, (x == true ? [arg1, arg2, arg3] : [arg1 ,arg2, arg3]))

    ApiExtraModels.apply(this, isCustomModel ? [PageDto, model] : [PageDto]),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
