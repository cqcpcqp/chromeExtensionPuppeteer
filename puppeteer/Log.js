define([], () => {
    const debug = true;
    const log = (...args) => {
        if (!debug) return;
        console.log(...args)
    };
    const noApi = () => {
        throw new Error("no such api");
    };
    return {
        log,
        noApi
    };
})