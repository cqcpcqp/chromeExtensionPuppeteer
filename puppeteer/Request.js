define([
    "../puppeteer/Log"
], function (log) {

    const errorReasons = {
        'aborted': 'Aborted',
        'accessdenied': 'AccessDenied',
        'addressunreachable': 'AddressUnreachable',
        'blockedbyclient': 'BlockedByClient',
        'blockedbyresponse': 'BlockedByResponse',
        'connectionaborted': 'ConnectionAborted',
        'connectionclosed': 'ConnectionClosed',
        'connectionfailed': 'ConnectionFailed',
        'connectionrefused': 'ConnectionRefused',
        'connectionreset': 'ConnectionReset',
        'internetdisconnected': 'InternetDisconnected',
        'namenotresolved': 'NameNotResolved',
        'timedout': 'TimedOut',
        'failed': 'Failed',
    };


    class Request {
        constructor() {

        }

        async abort(errorCode = 'failed') {
            const errorReason = errorReasons[errorCode];
            return;
        }
    }

    return Request;
})