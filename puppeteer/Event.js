define([
    "../puppeteer/Log"
], function (log) {
    //todo 既是once 又是on的那种没有解决冲突
    class EventEmitter {
        constructor() {
            this.events = new Map();
            this.onceEvents = new Map();
        }

        addListener(label, callback, once = false) {
            if (once) {
                this.onceEvents.has(label) || this.onceEvents.set(label, []);
                this.onceEvents.get(label).push(callback);
            } else {
                this.events.has(label) || this.events.set(label, []);
                this.events.get(label).push(callback);
            }
        }

        removeListener(label) {
            let events = this.events.get(label) || this.onceEvents.get(label);
            let index;
            if (events && events.length) {
                //todo
                index = events.reduce((i, event, index) => {
                    return (_.isFunction(event)) ? i = index : i;
                }, -1);
            }
            if (index > -1) {
                events.splice(index, 1);
                if (this.events.get(label)) {
                    this.events.set(label, events);
                } else {
                    this.onceEvents.set(label, events);
                }

                return true;
            }
            return false;
        }

        on(label, callback) {
            this.addListener(label, callback);
        }

        once(label, callback) {
            this.addListener(label, callback, true);
        }

        emit(label, args) {
            //todo
            let events = this.events.get(label) || this.onceEvents.get(label);
            if (events && events.length) {
                events.forEach((event) => {
                    event(args);
                });
                return true;
            } else {
                events = this.onceEvents.get(label);
                if (events && events.length) {
                    events.forEach((event) => {
                        event(args);
                    });

                }
            }
            return false;
        }
    }

    return EventEmitter;
})