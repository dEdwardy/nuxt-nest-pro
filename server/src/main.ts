import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression'
import { join } from 'path'

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Juejin')
    .setDescription('APIs')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  app.useStaticAssets(join(__dirname, '../uploads'), {
    prefix: '/static/', // 虚拟名称 http://localhost:3010/static/...png
  });
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    // origin:"http://localhost:8080",
    origin:"*",
    // origin:'http://47.112.172.255',
    preflightContinue:false,
    credentials:false
  });
  app.use(compression())
  await app.listen(4001);
  return app.getHttpAdapter().getInstance()
}
bootstrap();
export default bootstrap;
