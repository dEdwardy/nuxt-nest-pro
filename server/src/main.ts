import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Juejin')
    .setDescription('APIs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    // origin:"http://localhost:8080",
    origin:"*",
    // origin:'http://47.112.172.255',
    preflightContinue:false,
    credentials:false
  });
  await app.listen(3000);
  // return app.getHttpAdapter().getInstance()
}
bootstrap();
export default bootstrap;
