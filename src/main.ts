import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/utils/swagger';
import { AllExceptionsFilter } from './all-exception.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   app.useGlobalPipes(new ValidationPipe({ transform: true }));

//   setupSwagger(app)
//   await app.listen(3001);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// if (import.meta.env.PROD) {
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  setupSwagger(app);
  console.log(`Running server at: ${process.env.PORT ?? 3003}`)
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
// }

export const viteNodeApp = NestFactory.create(AppModule);
