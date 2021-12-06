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

const p = build("div", {
  title: "title",
  innerText: "am a title",
  onclick: function () {
    console.log("i was clicked");
  },
}, build("span", { innerText: "am a span", title: "title" }));
