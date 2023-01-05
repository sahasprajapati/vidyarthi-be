import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaModel } from '@src/_gen/prisma-class';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS TypeORM Pagination')
    .setDescription('The Median API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [...PrismaModel.extraModels],
  });
  SwaggerModule.setup('api', app, document);
}
