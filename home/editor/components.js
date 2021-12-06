"use strict";
exports.__esModule = true;
// importing my building materials
var uiedbook_1 = require("/home/uiedbook/projects/wordopera/uiedbook");
/**
 * TODOs
 components for the content editor
**********************************
 1. title bar
 2. tools bar
 3. editing area
 4. side bar
 5. ....
*/
// console.log();
var header = (0, uiedbook_1.build)("div", { id: "header" });
var editor = (0, uiedbook_1.build)("div", { id: "editor" });
var sidebar = (0, uiedbook_1.build)("div", { id: "sidebar" });
var titleArea = (0, uiedbook_1.build)("div", { id: "titleArea" });
var titleInput = (0, uiedbook_1.build)("div", { id: "titleInput" });
var toolbar = (0, uiedbook_1.build)("div", { id: "toolbar" });
var tool = (0, uiedbook_1.build)("div", { id: "tool" });
var textArea = (0, uiedbook_1.build)("div", { id: "textArea" });
var buttons = (0, uiedbook_1.build)("button", { id: "buttons" });
var labelInput = (0, uiedbook_1.build)("div", { id: "labelInput" });
var searchDescription = (0, uiedbook_1.build)("div", { id: "searchDescription" });
var options = (0, uiedbook_1.build)("div", { id: "options" });
var preview = (0, uiedbook_1.build)("div", { id: "preview" });
var publish = (0, uiedbook_1.build)("div", { id: "publish" });
var logo = (0, uiedbook_1.build)("div", { id: "logo" });
/** the header */
(0, uiedbook_1.u)(header).style({
    // backgroundColor: "whitesmoke",
    backgroundColor: "red",
    width: "calc(100vw - 10px)",
    height: "calc(10vh - 10px)"
});
document.body.append(header);
