define([
    "../puppeteer/Event",
    "../puppeteer/Events",
    "../puppeteer/ChromeEvent"
], function (EventEmitter, Events, ChromeEvent) {

    const sleep =() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 20000)
        })
    }
    class NetworkManager extends EventEmitter {
        constructor(tabId) {
            super();
            this.tabId = tabId;
            chrome.webRequest.onBeforeRequest.addListener(callBack[Events.webRequest.onBeforeRequest], {
                urls: ["<all_urls>"],
                tabId: tabId
            }, []);
            chrome.webRequest.onResponseStarted.addListener(callBack[Events.webRequest.onResponseStarted], {
                urls: ["<all_urls>"],
                tabId: tabId
            }, []);
        }

        setRequestInterception(value) {
            // todo 扩展里面的block 似乎回调里面是同步的 这咋写？
            // to single page
            let self = this;
            console.log(value, "blocking it");
            chrome.webRequest.onBeforeRequest.removeListener(callBack[Events.webRequest.onBeforeRequest]);
            // chrome.webRequest.onResponseStarted.removeListener(callBack[Events.webRequest.onResponseStarted]);
            chrome.webRequest.onBeforeRequest.addListener((details) => {
                return new Promise(() => {
                    setTimeout(() => {
                        resolve()
                    }, 20000)
                })
                console.log("do cancle", details.url);
                setTimeout(() => {

                })
                // return {cancel: true}
                // console.log("request23121");
                // ChromeEvent.pagesData.get(details.tabId) && ChromeEvent.pagesData.get(details.tabId).emit("request", details);
                // await sleep();
            }, {
                urls: ["<all_urls>"],
                tabId: self.tabId
            }, value ? ["blocking"] : []);
            // chrome.webRequest.onResponseStarted.addListener(callBack[Events.webRequest.onResponseStarted], {urls: ["<all_urls>"]}, );
        }
    }

    const callBack = {
        onbeforerequest: (details) => {
            console.log("request");
            ChromeEvent.pagesData.get(details.tabId) && ChromeEvent.pagesData.get(details.tabId).emit("request", details);
        },
        onresponsestarted: (details) => {
            ChromeEvent.pagesData.get(details.tabId) && ChromeEvent.pagesData.get(details.tabId).emit("response", details);
        }
    };

    return NetworkManager;
});