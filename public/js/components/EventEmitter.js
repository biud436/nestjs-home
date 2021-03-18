class EventEmitter {
    constructor() {
        this._events = {};
    }

    checkIfEmpty(name) {
        if(!this._events[name]) {
            this._events[name] = new Array();
        }
    }

    checkIfFuncType(func) {

        if(!(func instanceof Function)) {
            func = function() {

            };
        }

        return func;
    }

    on(name, func) {
        this.checkIfEmpty(name);
        func = this.checkIfFuncType(func);

        this._events[name].push(func);

        return this;
    }

    emit(name, ...args) {

        const items = this._events[name];

        if(items instanceof Array) {
            items.forEach(callbackFunc => {
                if(ev instanceof Function) {
                    callbackFunc(...args);
                }
            });
        }

        return this;
    }
}

export {EventEmitter};