import { NestFactory } from '@nestjs/core';
import type { Express } from 'express';
import httpDevServer from 'vavite/http-dev-server';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

try {
  bootstrap();
} catch (error) {
  Logger.error(error);
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (import.meta.env.PROD) {
    const port = import.meta.env.VITE_PORT || 3000;
    app.listen(port);
  } else {
    await app.init();
    const expressApp = (await app.getHttpAdapter().getInstance()) as Express;
    httpDevServer!.on('request', expressApp);
  }
}
