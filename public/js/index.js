import {Captcha} from "./components/Captcha.js";
import {EventEmitter} from "./components/EventEmitter.js";

class App extends EventEmitter {
    constructor() {
        super();
        this.initWithMembers();
    }

    initWithMembers() {
        this._captcha = new Captcha();
    }

    start() {

    }
}

const app = new App();

function loop(deltaTime) {
    app.emit("update", deltaTime);
    window.requestAnimationFrame(loop);
}

loop();