define([
    "../puppeteer/Event",
    "../puppeteer/NetworkManager"
], function (EventEmitter, NetworkManager) {
    class FrameManager extends EventEmitter {
        constructor(tabId) {
            super();
            this._networkManager = new NetworkManager(tabId);
        }
        networkManager() {
            return this._networkManager;
        }
    }

    return FrameManager;
});