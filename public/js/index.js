import {Captcha} from "./components/Captcha.js";
import {EventEmitter} from "./components/EventEmitter.js";
import {RefreshButton} from "./components/Button.js";

/**
 * @class App
 * @author 어진석
 */
class App extends EventEmitter {
    constructor() {
        super();
        this.initWithMembers();
    }

    initWithMembers() {
        
        // 캡챠를 설정합니다.
        this._captcha = new Captcha();

        // 새로 고침 버튼 추가
        this._refreshButton = new RefreshButton(this._captcha);

    }

    start() {

    }
}

// 앱 생성
const app = new App();

function loop(deltaTime) {
    app.emit("update", deltaTime);
    window.requestAnimationFrame(loop);
}

loop();