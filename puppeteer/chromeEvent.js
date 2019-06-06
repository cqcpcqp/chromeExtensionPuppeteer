define([
    "../puppeteer/event",
    "../puppeteer/log"
], function (EventEmitter, log) {
    class ChromeEvent extends EventEmitter {
        static pagesData = new Map();

        constructor() {
            super();
            let self = this;
            chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
                ChromeEvent.pagesData.get(tabId) && ChromeEvent.pagesData.get(tabId).emit("close");
            });

            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                // for (let page of self.pages()) {
                //     if (page.id === sender.tab.id) {
                //         log("收到我的sendResponse", sendResponse);
                //         log("收到我的sender为", sender);
                //         log("收到我的request为", request);
                //         if (request.false) {
                //             page.emit("executeResolveFail", request);
                //         } else {
                //             page.emit("executeResolveSuccess", request);
                //         }
                //         break;
                //     }
                // }
            })

            chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                // for (let page of self.pages()) {
                //     if (page.id === tabId && changeInfo.status == 'complete') {
                //         page.emit("gotoResolveSuccess");
                //     }
                // }
            })
        }

        static registerPage(page) {
            this.pagesData.set(page.id, page);
        }

        addChromeListener() {

        }

        static pages() {
            return new Promise((resolve, reject) => {
                chrome.tabs.query({}, (re) => {
                    resolve(re)
                });
            })
        }
    }

    return ChromeEvent
});