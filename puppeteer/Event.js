define([
    "../puppeteer/Log"
], function (log) {
    class EventEmitter {
        constructor() {
            this.events = new Map();
        }

        addListener(label, callback) {
            this.events.has(label) || this.events.set(label, []);
            this.events.get(label).push(callback);
        }

        removeListener(label) {
            let events = this.events.get(label);
            let index;
            if (events && events.length) {
                //todo
                index = events.reduce((i, event, index) => {
                    return (_.isFunction(event)) ? i = index : i;
                }, -1);
            }
            if (index > -1) {
                events.splice(index, 1);
                this.events.set(label, events);
                return true;
            }
            return false;
        }

        on(label, callback) {
            this.addListener(label, callback)
        }

        emit(label, args) {
            let events = this.events.get(label);
            if (events && events.length) {
                events.forEach((event) => {
                    event(args);
                });
                return true;
            }
            return false;
        }
    }

    return EventEmitter;
})