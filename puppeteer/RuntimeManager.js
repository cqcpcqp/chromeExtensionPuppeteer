define([
    "../puppeteer/Event",
    "../puppeteer/Events",
    "../puppeteer/ChromeEvent"
], function (EventEmitter, Events, ChromeEvent) {
    class RuntimeManager extends EventEmitter {
        constructor() {
            super();
            chrome.runtime.onMessage.addListener(callBack[Events.runtime.onMessage]);
        }
    }

    const callBack = {
        onmessage: (request, sender, sendResponse) => {
            ChromeEvent.pagesData.get(sender.tab.id) && ChromeEvent.pagesData.get(sender.tab.id).emit("evaluateCallBack", sendResponse);
        }
    };

    return RuntimeManager;
});