import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import {EventEmitter} from "events";
import { INestApplication } from '@nestjs/common';
import { join } from 'path';
import { fstat } from 'node:fs';
import * as fs from "fs";
import * as path from "path";

console.log("argv : %s", process.argv);

/**
 * @author 어진석
 * @class MyEventProcessor
 * @description 
 * 이벤트를 등록하고 처리하는 클래스입니다.
 */
class MyEventProcessor extends EventEmitter {

  app: NestExpressApplication;

  constructor(app: NestExpressApplication) {
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

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');    
     
  }

  onUpdate(event: any) {

  }

  onDispose(event: any) {

  }

}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const processor = new MyEventProcessor(app);

  processor.emit("ready");

  await app.listen(3000);
}

bootstrap();
