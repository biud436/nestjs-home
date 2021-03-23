import {EventEmitter} from "./EventEmitter.js";
import {Vector2} from "./Vector2.js";

class Captcha extends EventEmitter {
    constructor() {
        super();

        this._isDirty = true;

        /**
         * @type {CanvasRenderingContext2D}
         */
        this._context = null;

        this.on("refresh", () => this.initWithMembers());
        this.initWithMembers();
        this.start();
    }

    async initWithMembers() {
        /**
         * @type {HTMLCanvasElement?}
         */
        this._canvas = null;

        /**
         * 새로운 캡챠 정보를 가져옵니다.
         */
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

    /**
     * 캔버스를 생성합니다.
     * 
     * @param {string[]}} data 
     */
    initWithCanvas(data) {

        const {text} = data;

        /**
         * @type {HTMLCanvasElement}
         */
        this._canvas = document.querySelector("#captcha-canvas");;

        // 캔버스의 크기를 설정합니다.
        // 더티 플래그가 설정되어있으면 위치를 고정으로 잡고,
        // 더티 플래그가 설정되어있지 않으면 자동으로 고정을 합니다.
        this._canvas.style.width = this._isDirty ? "300px" : `auto`;
        this._canvas.style.height = "150px";

        this._canvas.style.filter = "blur(1px) hue-rotate(90deg)";
        
        const ctx = this._canvas.getContext("2d");
        this._context = ctx;

        // 행렬 설정
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const canvasStyle = getComputedStyle(this._canvas);

        // 캔버스의 폭과 높이를 구합니다.
        const canvasWidth = parseInt(canvasStyle.width);
        const canvasHeight = parseInt(canvasStyle.height);

        if(this._isDirty) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            this._isDirty = false;
        }

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

            // 색상과 폰트를 설정합니다.
            ctx.fillStyle = `rgba(255,${128 + (Math.random() * 128) >> 0},255,${128 + (Math.random() * 128) >> 0})`;
            ctx.font = `16px Noto Sans KR`;
            ctx.textAlign = "center";

            // 텍스트의 크기를 측정합니다.
            const t = ctx.measureText(ch);

            // 이동 행렬을 설정합니다.
            const tx = (canvasWidth / 5) + (i * 32) + t.width;
            const ty = (canvasHeight / 2);

            /**
             * 회전 행렬을 설정합니다.
             */
            const rot = ((Math.random() * 360) >> 0) * Math.PI / 180.0;
            const scale = 1.0 + ((3.0 * Math.random()) >> 0);
            
            const c = Math.cos(rot);
            const s = Math.sin(rot);
            
            // 행렬을 설정합니다.
            ctx.setTransform(
                c * scale, -s * scale, 
                s * scale, c * scale, 
                tx, ty);

            ctx.fillText(ch, 0, 0);
            ctx.restore();   
        }

        const maxLineBezier = 1 + Math.floor(Math.random() * 5);

        for(let i = 0; i < maxLineBezier; i ++) {
            // 램덤한 베지어 곡선을 그립니다.
            this.drawRandomLines(this._context);     
        }                     

    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawRandomLines(ctx) {

        //  ==========================
        // ||  (O)     (O)      (O)  ||
        // ||  (O)     (O)      (O)  ||
        // ||  (O)     (O)      (O)  ||
        //  ==========================

        // 1. 화면에 노이즈를 뿌립니다.
        const lines = [];

        const canvasStyle = getComputedStyle(this._canvas);

        // 캔버스의 폭과 높이를 구합니다.
        const canvasWidth = parseInt(canvasStyle.width);
        const canvasHeight = parseInt(canvasStyle.height);

        const maxPoints = 20;
        for(let i = 0; i < maxPoints; i++) {

            const pt = Vector2.empty();
            pt.x = Math.floor(Math.random() * canvasWidth);
            pt.y = Math.floor(Math.random() * canvasHeight);

            lines.push(pt);
        }

        const selectItems = [];

        this.makeRandomPoint(selectItems, ctx, lines, maxPoints);
        
    }

    makeRandomPoint(selectItems, ctx, lines, maxPoints) {

        // 2. 벡터 4개를 선택합니다.
        for(let i = 0; i < 4; i++) {

            // 램덤한 인덱스 선택 (0 ~ 39)
            const selectedIndex = Math.floor(Math.random() * maxPoints);

            selectItems.push( lines[selectedIndex] );

        }

        this.makePoint(ctx, selectItems);

    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Vector2[]} selectItems 
     */
    makePoint(ctx, selectItems) {

        if(!(selectItems instanceof Array)) {
            throw new Error("selectItems is not Array");
        }

        if(selectItems.length == 0) {
            throw new Error("The selected item is empty!");
        }
        
        const v1 = selectItems[0];
        const v2 = selectItems[1];
        const v3 = selectItems[2];
        const s = selectItems[3];

        ctx = this._canvas.getContext("2d");

        ctx.save();       
    
        ctx.beginPath();

        const r = () => Math.floor(Math.random() * 255);

        ctx.fillStyle = `rgb(${r()}, ${r()}, ${r()}})`;
        ctx.strokeStyle = `rgb(${r()}, ${r()}, ${r()})`;   

        // 0.2 ~ 0.7 사이의 선 투명도 설정

        ctx.globalAlpha = 0.2 + (Math.random() * 0.5);         

        // 3 ~ 10 사이의 선 굵기 설정
        ctx.lineWidth = 3 + Math.floor(Math.random() * 7);        

        ctx.moveTo(s.x, s.y); 

        // 3차 베지어 곡선을 그린다.
        ctx.bezierCurveTo(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
        ctx.stroke();

        ctx.restore();
    }

    start() {  
        
    }

    update() {

    }
}

export {Captcha}