import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import {EventEmitter} from "events";
import { INestApplication } from '@nestjs/common';
import { join } from 'path';

console.log("argv : %s", process.argv);

/**
 * @author 어진석
 * @class MyEventProcessor
 * @description 
 * 이벤트를 등록하고 처리하는 클래스입니다.
 */
class MyEventProcessor extends EventEmitter {

  app: INestApplication;

  constructor(app: INestApplication) {
    super();

    this.app = app;

    this.on("ready", (e:any) => this.onReady(e));
    this.on("update", (e:any) => this.onUpdate(e));
    this.on("dispose", (e:any) => this.onDispose(e));
  }

  onReady(event: any) {

    const {app} = this;

    // 쿠키 처리
    app.use(cookieParser());

    // 세션 처리
    app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      }),
    );
     
  }

  onUpdate(event: any) {

  }

  onDispose(event: any) {

  }

}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 미들웨어 처리
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
