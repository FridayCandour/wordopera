// importing my building materials
import {
  animate,
  build,
  buildTo,
  css,
  debounce,
  media,
  onKeys,
  rad,
  u,
} from "/home/uiedbook/projects/wordopera/uiedbook";

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

const header = build("div", { id: "header" });
const editor = build("div", { id: "editor" });
const sidebar = build("div", { id: "sidebar" });
const titleArea = build("div", { id: "titleArea" });
const titleInput = build("div", { id: "titleInput" });
const toolbar = build("div", { id: "toolbar" });
const tool = build("div", { id: "tool" });
const textArea = build("div", { id: "textArea" });
const buttons = build("button", { id: "buttons" });
const labelInput = build("div", { id: "labelInput" });
const searchDescription = build("div", { id: "searchDescription" });
const options = build("div", { id: "options" });
const preview = build("div", { id: "preview" });
const publish = build("div", { id: "publish" });
const logo = build("div", { id: "logo" });

/** the header */

u(header).style({
  // backgroundColor: "whitesmoke",
  backgroundColor: "red",
  width: "calc(100vw - 10px)",
  height: "calc(10vh - 10px)",
});

document.body.append(header);
