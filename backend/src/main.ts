import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //for validation in dto
  app.useGlobalPipes(
    new ValidationPipe({
      //error message
      forbidNonWhitelisted: true,
      //accept only dto
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('todo API')
    .setDescription('todo API description')
    .setVersion('1.0')
    .addTag('Todo API')
    .addBearerAuth(
      {
        description: `Please enter token in following format`,
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
