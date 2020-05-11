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

        // test websocket

        // let browser = await puppeteer.connect({
        //     browserURL: "http://127.0.0.1:9877"
        // })
        //
        //
        // const connectionURL = await getWSEndpoint(browserURL);
        // const connectionTransport = await WebSocketTransport.create(connectionURL);
        // connection = new Connection(connectionURL, connectionTransport, slowMo);

        // 这里应该是用来测试websocket使用直接用Chrome devtools Protocol做这个东西的尝试
        // const url = "ws://127.0.0.1:9877/devtools/browser/157c5d26-b8b5-40f9-bf3d-8fc365a58c09";
        // const ws = new WebSocket(url, [], {perMessageDeflate: false});
        // await sleep(2000);
        // ws.send(JSON.stringify({"method": "Target.createTarget", "params": {"url": "about:blank"}, "id": 5}));
        // {"method":"Target.createTarget","params":{"url":"about:blank"},"id":3}


        // return;


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
            // log.log(d)
        })

        page.on('requestfinished', (d) => {
            log.log("get request")
            log.log(d)
        })

        log.log("page.goto");
        await page.goto("https://www.baidu.com/");

        // no api
        // await page.setRequestInterception(true);

        log.log("listen page close")
        page.on("close", () => {
            console.log("page closed");
        });

        page.on('requestfailed', () => {

        })

        await sleep(2000);
        let re = await page.$before("a")
        console.log(re, "re")

        // let button = await page.$("#su");
        // console.log(button);
        // document.querySelector(".face").click()
        //
        // let face = await page.$(".face");
        // await face.click();

    })()
})
