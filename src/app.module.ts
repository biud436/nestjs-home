import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileController } from './mobile.controller';
import { DataManager } from "./DataManager";
import { LoginController } from "./login.controllers";
import { CaptchaController } from './captcha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import config from "./config";

// 매니저 컨트롤러 생성
const manager: DataManager = new DataManager();

const dbConfig : any = Object.assign({
  type: 'mariadb',
  host: 'biud436.com',
  port: 9011,
  username: 'eo',
  database: 'nestjs',
  synchronize: true,
}, config);

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
  controllers: [AppController, MobileController, LoginController, CaptchaController],
  providers: [AppService],
})
export class AppModule {}