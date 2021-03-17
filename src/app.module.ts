import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileController } from './controllers/mobile.controller';
import { DataManager } from "./DataManager";
import { LoginController } from "./controllers/login.controllers";

// 매니저 컨트롤러 생성
const manager: DataManager = new DataManager();

@Module({
  imports: [],
  controllers: [AppController, MobileController, LoginController],
  providers: [AppService],
})
export class AppModule {}