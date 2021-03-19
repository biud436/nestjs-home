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

// 매니저 컨트롤러 생성
const manager: DataManager = new DataManager();

// TypeOrmModule.forRoot(), 

@Module({
  imports: [TypeOrmModule.forRoot(config as any), AuthModule, UsersModule],
  controllers: [AppController, MobileController, LoginController, CaptchaController],
  providers: [AppService],
})
export class AppModule {}