define([
    "../puppeteer/chromeEvent",
    "../puppeteer/log",
    "../puppeteer/page",
], (ChromeEvent, log, Page) => {
    const timeout = 30000;

    class Browser extends ChromeEvent {
        static async create() {
            let self = this;
            self.pages().then((pages) => {
                pages.forEach((page) => {
                    self.registerPage(new Page(page.id));
                })
            });
            return new Browser();
        }

        constructor() {
            super();
            let self = this;
        }

        browserContexts() {
            log.noApi();
        }

        close() {
            log.noApi();
        }

        createIncognitoBrowserContext() {
            log.noApi();
        }

        defaultBrowserContext() {
            log.noApi();
        }

        disconnect() {
            log.noApi();
        }

        async newPage() {
            // .then(client => Page.create(client, this, this._ignoreHTTPSErrors, this._defaultViewport, this._screenshotTaskQueue));
            let page = await Page.create();
            Browser.registerPage(page);
            return page;
        }

        pages() {
            return Browser.pages();
        }

        process() {
            log.noApi();
        }

        target() {
            log.noApi();
        }

        targets() {
            log.noApi();
        }

        userAgent() {
            log.noApi();
        }

        version() {
            log.noApi();
        }

        wsEndpoint() {
            log.noApi();
        }
    }

    class ElementHandle extends ChromeEvent {
        constructor() {
            super();
        }

        $(selector) {
            return new Promise(() => {

                return new ElementHandle();
            })
        }

        $$(selector) {
            return new Promise(() => {
                let arrays = [];
                arrays.push(new ElementHandle());
                return arrays;
            })
        }

        $eval(selector, pageFunction, args) {
            return new Promise((resolve, reject) => {

            })
        }

        $$eval(selector, pageFunction, args) {
            return new Promise((resolve, reject) => {

            })
        }

        click(options = {
            button: left,
            clickCount: 1,
            delay: 0
        }) {
            return new Promise((resolve, reject) => {

            })
        }

        type(text, options = {
            delay: 0
        }) {
            return new Promise((resolve, reject) => {

            })
        }

        press(key, options = {
            delay: 0
        }) {
            return new Promise((resolve, reject) => {

            })
        }

        uploadFile(filePath) {
            return new Promise((resolve, reject) => {

            })
        }
    }

    return Browser;
})