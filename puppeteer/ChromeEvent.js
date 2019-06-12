define([
    "../puppeteer/Event",
    "../puppeteer/Log",
    "../puppeteer/Request",
    "../puppeteer/Events"
], function (EventEmitter, log, Request, Events) {

    class ChromeEvent extends EventEmitter {
        static pagesData = new Map();

        constructor() {
            super();
            let self = this;
            chrome.tabs.onRemoved.addListener(callBack[Events.tab.onRemoved]);
            chrome.tabs.onUpdated.addListener(callBack[Events.tab.onUpdated]);
            chrome.runtime.onMessage.addListener(callBack[Events.runtime.onMessage]);

        }

        static setRequestInterception(value) {
            // to single page
            chrome.webRequest.onBeforeRequest.removeListener(callBack[Events.webRequest.onBeforeRequest]);
            chrome.webRequest.onResponseStarted.removeListener(callBack[Events.webRequest.onResponseStarted]);
            let opt_extraInfoSpec = value ? ["blocking"] : [];
            chrome.webRequest.onBeforeRequest.addListener(callBack[Events.webRequest.onBeforeRequest], {urls: ["<all_urls>"]}, opt_extraInfoSpec);
            chrome.webRequest.onResponseStarted.addListener(callBack[Events.webRequest.onResponseStarted], {urls: ["<all_urls>"]}, opt_extraInfoSpec);
        }

        static registerPage(page) {
            this.pagesData.set(page.id, page);
        }

        static pages() {
            return new Promise((resolve, reject) => {
                chrome.tabs.query({}, (re) => {
                    resolve(re)
                });
            })
        }
    }


    const callBack = {
        onremove: (tabId, removeInfo) => {
            ChromeEvent.pagesData.get(tabId) && ChromeEvent.pagesData.get(tabId).emit("close");
        },
        onupdated: (tabId, changeInfo, tab) => {
            // for (let page of self.pages()) {
            //     if (page.id === tabId && changeInfo.status == 'complete') {
            //         page.emit("gotoResolveSuccess");
            //     }
            // }
        },
        onmessage: (request, sender, sendResponse) => {
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
        },
        onbeforerequest: (details) => {
            ChromeEvent.pagesData.get(details.tabId) && ChromeEvent.pagesData.get(details.tabId).emit("request", details);
        },
        onresponsestarted: (details) => {
            ChromeEvent.pagesData.get(details.tabId) && ChromeEvent.pagesData.get(details.tabId).emit("response", details);
        }
    };
    return ChromeEvent;
});