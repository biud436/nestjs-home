import * as fs from 'fs';
import * as path from "path";

const ROOT_DIR : string = process.cwd();
const MY_ROOT = path.join(ROOT_DIR, "src");

export class DataManager {

  _dirs: String[];

  /**
   * 생성자 호출
   */
  constructor() {
    this.initWithMembers();
    ["src", "src/controllers"].forEach( i => this.readDirs(path.join(ROOT_DIR, i)));
  }

  /**
   * 멤버 초기화
   */
  initWithMembers() {
    this._dirs = [];
  }

  /**
   * 폴더 읽기
   */
  readDirs(root: string = MY_ROOT) {
    const items = fs.readdirSync(root, {
      encoding: "utf-8"
    });

    console.log("현재 컨트롤러 목록 : ");
    console.log("===========================");
    items.forEach(subDir => {
      this.readSubDir(root, subDir);
    });
    console.log("===========================");
  }

  /**
   * 서브 디렉토리 읽기
   * 
   * @param MY_ROOT 
   * @param subDir 
   */
  readSubDir(MY_ROOT, subDir) {
      // 파일명을 추출합니다.
      const sub : string = path.resolve(MY_ROOT, subDir);

      // 파일이 존재하는 지 확인합니다.
      if(fs.existsSync(sub)) {
        
        const fileStat : fs.Stats = fs.lstatSync(sub);
        
        if(fileStat.isFile()) {
          if(path.extname(sub).includes(".ts")) {
            console.log("이것은 타입스크립트 파일입니다 ----> %s", sub);
          } else {
            console.log("file : %s", sub);
          }
        }

      }
      
      this._dirs.push(subDir);
  }

}

// 매니저 컨트롤러 생성
const manager: DataManager = new DataManager();