import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      schema: {
        type: 'array',
        items: { $ref: getSchemaPath(model) },
      },
    }),
  );
};

class PaginatedDto<TData> {
  results: TData[];
}

export class FilmDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  releaseYear: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration: number;
}

export class Response {
  @ApiProperty()
  message: string;
}

export class LoginResponse {
  @ApiProperty()
  token: string;
}
