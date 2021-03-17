import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log("argv : %s", process.argv);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(3000);
}
bootstrap();
