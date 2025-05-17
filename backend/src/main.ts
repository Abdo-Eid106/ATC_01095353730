import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DelayMiddleWare } from './common/middlewares/delay.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api');
  app.use(morgan('dev'));

  app.use(new DelayMiddleWare().use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
