define([
    "../puppeteer/Event",
    "../puppeteer/NetworkManager",
], function (EventEmitter, NetworkManager) {

    //this._frameManager = new FrameManager(client, this, ignoreHTTPSErrors, this._timeoutSettings);
    class FrameManager extends EventEmitter {
        constructor(tabId) {
            super();
            this._networkManager = new NetworkManager(tabId);
            this._frames = new Map();
        }

        networkManager() {
            return this._networkManager;
        }

        mainFrame() {
            return this._mainFrame();
        }
    }

    class Frame {
        constructor() {
        }

        $(selector) {

        }
    }

    return FrameManager;
});