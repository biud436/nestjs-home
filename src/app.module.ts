import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileController } from './mobile.controller';
import { DataManager } from "./DataManager";
import { LoginController } from "./login.controllers";
import { CaptchaController } from './captcha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from "./config";

import "reflect-metadata";
import {ConnectionOptions, createConnection} from "typeorm";
import { User } from './entity/User';
import { create } from 'node:domain';

// 매니저 컨트롤러 생성
const manager: DataManager = new DataManager();

const options : ConnectionOptions = {
  type: "mariadb",
  username: "eo",
  password: "eo15028a!!",
  database: "nestjs",
  host: "biud436.com",
  port: 9011,
  logging: true,
  synchronize: true,
  entities: [User]
}

createConnection(options).then(async connection => {
  let user = new User();
  user.firstName = "eo";
  user.lastName = "jinseok";

  let userRepository = connection.getRepository(User);

  userRepository
    .save(user)
    .then(user => console.log("User has saved: ", user))
    .catch(error => console.warn("Cannot save. Error: " + error))

}, error => console.warn("Cannot connect: ", error));

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, MobileController, LoginController, CaptchaController],
  providers: [AppService],
})
export class AppModule {}