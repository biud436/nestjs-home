import {EventEmitter} from "./EventEmitter.js";

class Captcha extends EventEmitter {
    constructor() {
        super();

        this.initWithMembers();
        this.initWithCanvas();
        this.start();
    }

    initWithMembers() {
        /**
         * @type {HTMLCanvasElement?}
         */
        this._canvas = null;
    }

    initWithCanvas() {
        /**
         * @type {HTMLCanvasElement}
         */
        this._canvas = document.querySelector("#captcha-canvas");;
        this._canvas.style.width = "400px";
        this._canvas.style.height = "150px";
        
        const ctx = this._canvas.getContext("2d");

        // 행렬 설정
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const canvasStyle = getComputedStyle(this._canvas);

        const canvasWidth = parseInt(canvasStyle.width);
        const canvasHeight = parseInt(canvasStyle.height);

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.fill();

        // Random Generator Text

        for(let i = 97; i < 122; i++) {
            ctx.save();
            
            const ch = String.fromCharCode(i);

            ctx.fillStyle = "white";
            ctx.font = `16px Arial`;
            ctx.textAlign = "center";
            const pad = (i - 97) * (121 - 97);
            
            const tx = canvasWidth - pad;
            const ty = (canvasHeight / 2);

            const rot = ((Math.random() * 360) >> 0) * Math.PI / 180.0;
            const scale = 1.0 + ((3.0 * Math.random()) >> 0);
            
            const c = Math.cos(rot);
            const s = Math.sin(rot);
            
            ctx.setTransform(
                c * scale, -s * scale, 
                s * scale, c * scale, 
                tx, ty);

            const t = ctx.measureText(ch);
            ctx.fillText(ch, 0, 0);
            ctx.restore();
        }
    }

    start() {  
        
    }

    update() {

    }
}

export {Captcha}