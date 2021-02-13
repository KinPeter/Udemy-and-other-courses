import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig: any = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // enable all CORS requests

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log('Application is listening on port ' + port);
}
bootstrap();
