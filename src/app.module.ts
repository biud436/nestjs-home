import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileController } from './controllers/mobile.controller';
import * as fs from 'fs';
import * as path from "path";

const ROOT_DIR : string = process.cwd();

console.log(ROOT_DIR)

class DataManager {

  _dirs: String[];

  constructor() {
    this.initWithMembers();
    this.readDirs();
  }

  initWithMembers() {
    this._dirs = [];
  }

  readDirs() {
    const MY_ROOT = path.join(ROOT_DIR, "src");

    const items = fs.readdirSync(MY_ROOT, {
      encoding: "utf-8"
    });

    console.log("현재 컨트롤러 목록 : ");
    console.log("===========================");
    items.forEach(subDir => {


      console.log(subDir);

      // 파일명을 추출합니다.
      const sub : string = path.resolve(MY_ROOT, subDir);

      // 파일이 존재하는 지 확인합니다.
      if(fs.existsSync(sub)) {
        
        const fileStat : fs.Stats = fs.statSync(sub);
        
        if(fileStat.isDirectory) {
          console.log("dir : %s", sub);
        } else if(fileStat.isFile) {
          // ts 파일인가?
          if(path.extname(sub).includes(".ts")) {
            console.log("이것은 타입스크립트 파일입니다 ----> %s", sub);
          } else {
            console.log("file : %s", sub);
          }
        }

      }
      console.log(sub);
      
      this._dirs.push(subDir);

    });
    console.log("===========================");
  }
}

const manager: DataManager = new DataManager();

@Module({
  imports: [],
  controllers: [AppController, MobileController],
  providers: [AppService],
})
export class AppModule {}
