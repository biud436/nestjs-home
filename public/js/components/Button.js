import {EventEmitter} from "./EventEmitter.js";

const ID = `#refresh-ok`;

class RefreshButton extends EventEmitter {
    constructor(adapter) {
        super();

        this.initWithMembers(adapter);
    }

    /**
     * 멤버 초기화
     */
    initWithMembers(adapter) {

        if(!adapter) {
            throw new Error(`어댑터가 없습니다`);
        }

        /**
         * 버튼과 연결할 어댑터 클래스를 생성합니다.
         */
        this._adapter = adapter;

        /**
         * @type {HTMLLinkElement}
         */
        this._elem = document.querySelector(ID);
        this._elem.onclick = (ev) => this.onClick(ev);


    }

    onClick(ev) {
        if(this._adapter) {
            this._adapter.emit("refresh");
        }
    }

}