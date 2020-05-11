define([], function () {
    // 该类表示一个 JavaScript 执行的上下文。 Page 可能有许多执行上下文：
    //
    // 每个 frame 都有 "默认" 的执行上下文，它始终在将帧附加到 DOM 后创建。该上下文由 frame.executionContext() 方法返回。
    // Extensions 的内容脚本创建了其他执行上下文。
    class ExecutionContext {
        constructor() {

        }


        // const aHandle = await context.evaluateHandle(() => document.body);
        // const resultHandle = await context.evaluateHandle(body => body.innerHTML, aHandle);
        async evaluateHandle(pageFunction, ...args) {

            // const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;__puppeteer_evaluation_script__

            let functionText = pageFunction.toString();
            let callFunctionOnPromise;
            try {
                // 🌟🌟🌟🌟🌟🌟🌟🌟🌟
                callFunctionOnPromise = this._client.send('Runtime.callFunctionOn', {
                    functionDeclaration: functionText + '\n' + suffix + '\n',
                    executionContextId: this._contextId,
                    arguments: args.map(convertArgument.bind(this)),
                    returnByValue: false,
                    awaitPromise: true,
                    userGesture: true
                });
            }
            const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
            if (exceptionDetails)
                throw new Error('Evaluation failed: ' + helper.getExceptionMessage(exceptionDetails));
            return createJSHandle(this, remoteObject);

            /**
             * @param {*} arg
             * @return {*}
             * @this {ExecutionContext}
             */
            function convertArgument(arg) {
                if (typeof arg === 'bigint') // eslint-disable-line valid-typeof
                    return { unserializableValue: `${arg.toString()}n` };
                if (Object.is(arg, -0))
                    return { unserializableValue: '-0' };
                if (Object.is(arg, Infinity))
                    return { unserializableValue: 'Infinity' };
                if (Object.is(arg, -Infinity))
                    return { unserializableValue: '-Infinity' };
                if (Object.is(arg, NaN))
                    return { unserializableValue: 'NaN' };
                const objectHandle = arg && (arg instanceof JSHandle) ? arg : null;
                if (objectHandle) {
                    if (objectHandle._context !== this)
                        throw new Error('JSHandles can be evaluated only in the context they were created!');
                    if (objectHandle._disposed)
                        throw new Error('JSHandle is disposed!');
                    if (objectHandle._remoteObject.unserializableValue)
                        return { unserializableValue: objectHandle._remoteObject.unserializableValue };
                    if (!objectHandle._remoteObject.objectId)
                        return { value: objectHandle._remoteObject.value };
                    return { objectId: objectHandle._remoteObject.objectId };
                }
                return { value: arg };
            }

            /**
             * @param {!Error} error
             * @return {!Protocol.Runtime.evaluateReturnValue}
             */
            function rewriteError(error) {
                if (error.message.endsWith('Cannot find context with specified id'))
                    throw new Error('Execution context was destroyed, most likely because of a navigation.');
                throw error;
            }

        }
    }

    return ExecutionContext;
});
