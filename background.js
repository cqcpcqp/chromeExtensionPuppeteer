require.config({
    "baseUrl": "../",
    "waitSeconds": 0
});
require([
    "./puppeteer/Browser",
    "./puppeteer/Log"
], (Browser, log) => {

    const sleep = (ms = 10000) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    (async () => {
        let browser = await Browser.create();

        log.log("browser.pages");
        log.log(await browser.pages());

        log.log("browser.newPage");
        let page = await browser.newPage();

        log.log("page.on(request)");
        page.on('request', (d) => {
            // log.log("get request")
            // log.log(d)
        })

        page.on('response', (d) => {
            log.log("get response")
            // log.log(d)
        })

        page.on('requestfinished', (d) => {
            log.log("get request")
            log.log(d)
        })

        log.log("page.goto");
        await page.goto("https://www.baidu.com/");


        await page.setRequestInterception(true);

        log.log("listen page close")
        page.on("close", () => {
            console.log("page closed");
        })


        page.on('requestfailed', () => {

        })

        // let button = await page.$("#su");
        // console.log(button);
        // document.querySelector(".face").click()
        //
        // let face = await page.$(".face");
        // await face.click();

    })()
})
