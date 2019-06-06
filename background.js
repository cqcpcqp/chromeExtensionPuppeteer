require.config({
    "baseUrl": "../",
    "waitSeconds": 0
});
require([
    "./puppeteer/browser",
    "./puppeteer/log"
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

        log.log("page.goto");
        await page.goto("https://www.baidu.com/");

        log.log("listen page close")
        page.on("close", () => {
            console.log("page closed");
        })
        // let button = await page.$("#su");
        // console.log(button);
        // document.querySelector(".face").click()
        //
        // let face = await page.$(".face");
        // await face.click();

    })()
})
