define(["../puppeteer/JSHandle"], function (JSHandle) {
    // ElementHandle 表示一个页内的 DOM 元素。ElementHandles 可以通过 page.$ 方法创建。

    function createJSHandle(context, remoteObject) {
        const frame = context.frame();
        if (remoteObject.subtype === 'node' && frame) {
            const frameManager = frame._frameManager;
            return new ElementHandle(context, context._client, remoteObject, frameManager.page(), frameManager);
        }
        return new JSHandle(context, context._client, remoteObject);
    }

    class ElementHandle extends JSHandle {
        constructor() {
            super();
        }


        async $(selector) {
            const handle = await this.executionContext().evaluateHandle(
                (element, selector) => element.querySelector(selector),
                this, selector
            );
            const element = handle.asElement();
            if (element)
                return element;
            await handle.dispose();
            return null;
        }
    }

    return ElementHandle;
});