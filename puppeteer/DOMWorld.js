define([], function (EventEmitter, NetworkManager) {
    class DOMWorld {
        constructor() {
            this._documentPromise = null;
        }

        executionContext() {
            if (this._detached)
                throw new Error(`Execution Context is not available in detached frame "${this._frame.url()}" (are you trying to evaluate?)`);
            return this._contextPromise;
        }

        async $(selector) {
            const document = await this._document();
            return await document.$(selector);
        }

        async _document() {
            if (this._documentPromise)
                return this._documentPromise;
            this._documentPromise = this.executionContext().then(async context => {
                const document = await context.evaluateHandle('document');
                return document.asElement();
            });
            return this._documentPromise;
        }
    }

    return DOMWorld;
});