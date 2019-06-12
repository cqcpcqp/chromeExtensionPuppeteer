define([], function () {
    return {
        tab: {
            onRemoved: "onremove",
            onUpdated: "onupdated",
        },
        runtime: {
            onMessage: "onmessage",
        },
        webRequest: {
            onBeforeRequest: "onbeforerequest",
            onResponseStarted: "onresponsestarted"
        }
    };
})