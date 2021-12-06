"use strict";
exports.__esModule = true;
var uiedbook_1 = require("/home/uiedbook/projects/wordopera/uiedbook");
var p = (0, uiedbook_1.build)("div", {
    title: "title",
    innerText: "am a title",
    onclick: function () {
        console.log("i was clicked");
    }
}, (0, uiedbook_1.build)("span", { innerText: "am a span", title: "title" }));
