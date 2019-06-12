define([
    "../puppeteer/Event",
    "../puppeteer/Log",
], (EventEmitter, log) => {
    const timeout = 30000;

    class Mouse {
        constructor(page) {
            this.page = page;
        }

        down(){
            this.page.evaluate()
        }
        up(){}
    }
})



//test for move

// 自定义事件 / 触发事件
// https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events#%E8%A7%A6%E5%8F%91%E5%86%85%E7%BD%AE%E4%BA%8B%E4%BB%B6

// 时间类型一览表
// https://developer.mozilla.org/zh-CN/docs/Web/Events

function preventDef(event) {
    event.preventDefault();
}

function addHandler() {
    document.getElementById("checkbox").addEventListener("click",
        preventDef, false);
}

function removeHandler() {
    document.getElementById("checkbox").removeEventListener("click",
        preventDef, false);
}

function simulateClick() {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var cb = document.getElementById("checkbox");
    var canceled = !cb.dispatchEvent(evt);
    if(canceled) {
        // A handler called preventDefault
        alert("canceled");
    } else {
        // None of the handlers called preventDefault
        alert("not canceled");
    }
}




const mouseEventInit = {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    button: 0,
    buttons: 0,
    relatedTarget: null,
    region: null
}
const mouseEventInit = {}
let event = new MouseEvent("click", mouseEventInit);
let button = document.querySelector("#su");
button.dispatchEvent(event);


