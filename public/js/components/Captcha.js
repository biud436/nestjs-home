import {EventEmitter} from "./EventEmitter.js";

class Captcha extends EventEmitter {
    constructor() {
        super();

        this.initWithMembers();
        this.start();
    }

    async initWithMembers() {
        /**
         * @type {HTMLCanvasElement?}
         */
        this._canvas = null;

        await this.loadJson("/captcha").then(data => {
            console.log(data);

            // 캡챠 정답 설정
            const code = document.querySelector("#captcha-code");
            code.value = data.text;

            // 캡챠 설정
            this.initWithCanvas(data);
        });

    }

    loadJson(url) {
        return new Promise((resolve, reject) => {
        
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function() {
                if(xhr.status === 200) {
                    // 재귀적으로 파싱하지 않음.
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            }
            xhr.onerror = function(err) {
                reject(err);
            }
            xhr.send();

        });
    }

    initWithCanvas(data) {

        const {text} = data;

        /**
         * @type {HTMLCanvasElement}
         */
        this._canvas = document.querySelector("#captcha-canvas");;
        this._canvas.style.width = "400px";
        this._canvas.style.height = "150px";

        this._canvas.style.filter = "blur(1px) hue-rotate(90deg)";
        
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

        /**
         * 
         */
        const textsMap = text;

        // Random Generator Text
        for(let i = 0; i < textsMap.length; i++) {
            ctx.save();
            
            // const ch = String.fromCharCode(i);
            const ch = textsMap[i];
            if(!ch) {
                continue;
            }

            ctx.fillStyle = `rgba(255,${128 + (Math.random() * 128) >> 0},255,${128 + (Math.random() * 128) >> 0})`;
            ctx.font = `16px Noto Sans KR`;
            ctx.textAlign = "center";

            const t = ctx.measureText(ch);
            const tx = (canvasWidth / 5) + (i * 32) + t.width;
            const ty = (canvasHeight / 2);

            const rot = ((Math.random() * 360) >> 0) * Math.PI / 180.0;
            const scale = 1.0 + ((3.0 * Math.random()) >> 0);
            
            const c = Math.cos(rot);
            const s = Math.sin(rot);
            
            ctx.setTransform(
                c * scale, -s * scale, 
                s * scale, c * scale, 
                tx, ty);

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