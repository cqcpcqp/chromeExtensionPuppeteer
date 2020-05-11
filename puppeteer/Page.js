define([
    "../puppeteer/Event",
    "../puppeteer/ChromeEvent",
    "../puppeteer/FrameManager",
    "../puppeteer/Log",
    "../puppeteer/ElementHandle"
], (EventEmitter, ChromeEvent, FrameManager, log, ElementHandle) => {
    class Page extends EventEmitter {
        static create() {
            let self = this;
            return new Promise((resolve, reject) => {
                chrome.tabs.create({url: "about:blank"}, (tab) => {
                    resolve(new Page(tab.id));
                });
            })
        }

        constructor(id) {
            super();
            this.id = id;
            this._frameManager = new FrameManager(id);
        }

        mainFrame() {
            return this._frameManager.mainFrame();
        }

        async goto(url) {
            //todo 他这个回调不太准确 我还需要那几个参数 暂时用sleep顶了
            return new Promise((resolve, reject) => {
                chrome.tabs.update(this.id, {url: url}, function () {
                    resolve();
                });
            })
        }

        async setRequestInterception(value) {
            log.noApi();
            // to single page
            // return this._frameManager.networkManager().setRequestInterception(value)
        }

        async $(selector) {
            return this.mainFrame().$(selector);
        }

        async $before(selector) {

            // const {exceptionDetails, result: remoteObject} = await this._client.send('Runtime.evaluate', {
            //     expression: expressionWithSourceUrl,
            //     contextId,
            //     returnByValue: false,
            //     awaitPromise: true,
            //     userGesture: true
            // }).catch(rewriteError);
            console.log(selector)
            return new Promise((resolve, reject) => {
                let self = this;
                //todo
                let code = 'let re = document.querySelector("' + selector + '");' + "\n" +
                    'console.log(re);' +
                    'console.log("fuckyou");' +
                    'chrome.runtime.sendMessage(re);' + "\n" +
                    'console.log("end");';
                log.log("将要执行的代码为", code);
                // code = "console.log('a')";
                chrome.tabs.executeScript(self.id, {
                    code: code
                });
                log.log("finish")
                self.once("evaluateCallBack", function (req) {
                    // return new ElementHandle(req);
                    resolve(req);
                });
            })
        }

        //
        // $$(selector) {
        //     return new Promise((resolve, reject) => {
        //         let self = this;
        //         let code = 'let re = document.querySelectorAll("' + selector + '");' +
        //             'chrome.runtime.sendMessage(re);'
        //         chrome.tabs.executeScript(self.id, {
        //             code: code
        //         })
        //         self.on("executeResolveSuccess", function (req) {
        //             resolve(req);
        //             self.removeListener("executeResolveSuccess");
        //         })
        //
        //         self.on("executeResolveFail", function (req) {
        //             reject(req);
        //             self.removeListener("executeResolveSuccess");
        //         })
        //     })
        // }
        //
        // click(selector) {
        //     return new Promise((resolve, reject) => {
        //         let self = this;
        //         let code = 'let re = document.querySelector("' + selector + '");' +
        //             're.click()';
        //
        //         chrome.tabs.executeScript(self.id, {
        //             code: code
        //         }, () => {
        //             resolve();
        //         })
        //     })
        // }
        //
        // close() {
        //     return new Promise((resolve, reject) => {
        //         chrome.tabs.remove(this.id, function () {
        //             resolve();
        //         });
        //     })
        // }
        //
        // evaluate(code) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         let code = '(async () => {' +
        //             'let contextFunction = () => {' +
        //             code +
        //             '}' +
        //             'let re = await contextFunction();' +
        //             'chrome.runtime.sendMessage(re);' +
        //             '})()';
        //
        //         chrome.tabs.executeScript(self.id, {
        //             code: code
        //         })
        //         self.on("executeResolveSuccess", function (req) {
        //             resolve(req);
        //             self.removeListener("executeResolveSuccess");
        //         })
        //
        //         self.on("executeResolveFail", function (req) {
        //             reject(req);
        //             self.removeListener("executeResolveSuccess");
        //         })
        //     })
        // }
        //
        // evaluateWithOutReturn(code) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         chrome.tabs.executeScript(self.id, {
        //             code: code
        //         });
        //         self.on("executeNoReturnResolveSuccess", function (req) {
        //
        //         })
        //     })
        // }
        //
        // goto(url, options) {
        //     let self = this;
        //     return new Promise((resolve, reject) => {
        //         chrome.tabs.update(this.id, {
        //             url: url
        //         }, function (d) {
        //             self.on("gotoResolveSuccess", () => {
        //                 resolve();
        //             })
        //         })
        //     })
        // }
        //
        // async reload(options = {
        //     timeout: timeout,
        //     waitUntil: "load"
        // }) {
        //     await this.goto(self.tab.url)
        // }
        //
        // async waitForSelector(selector, options = {
        //     visible: false,
        //     hidden: false,
        //     timeout: timeout
        // }) {
        //     return new Promise((resolve, reject) => {
        //         let self = this;
        //
        //         let code = 'let contextInterval = setInterval(() => {' +
        //             'let re = document.querySelector("' + selector + '");' +
        //             'if(re){' +
        //             'clearInterval(contextInterval);' +
        //             'chrome.runtime.sendMessage(re);' +
        //             '}' +
        //             '},200)';
        //
        //         chrome.tabs.executeScript(self.id, {
        //             code: code
        //         })
        //         self.on("executeResolveSuccess", function (req) {
        //             resolve(req);
        //             self.removeListener("executeResolveSuccess");
        //         })
        //
        //         self.on("executeResolveFail", function (req) {
        //             reject(req);
        //             self.removeListener("executeResolveSuccess");
        //         })
        //     })
        // }
    }

    return Page;
})