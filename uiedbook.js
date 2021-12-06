"use strict";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
 @publisher : friday candour;
 @project : uiedbook library;
 @copyright-lincense :  Apache;



                                  Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/


YOU SHOULD GET A COPY OF THE APACHE LICENSE V 2.0 IF IT DOESN'T ALREADY COME WITH THIS MODULE
*/
exports.__esModule = true;
exports.uiedbook = exports.renderer = exports.bgPainter = exports.audio = exports.speakerStop = exports.speaker = exports.spriteSheetPainter = exports.ImgPainter = exports.Entity = exports.game = exports.appendCanvas = exports.buildCanvas = exports.swipe = exports.continuesKeys = exports.onKeys = exports.clear = exports.getKey = exports.remove = exports.retrieve = exports.store = exports.log = exports.check = exports.keep = exports.debounce = exports.download = exports.create = exports.rad = exports.get = exports.error = exports.intersect = exports.isEmptyObject = exports.xhr = exports.route = exports.buildTo = exports.build = exports.animate = exports.media = exports.css = exports.u = exports.t = exports.lit = void 0;
var lit = function (type, label) {
    label = typeof label === "number" ? "line " + label : label;
    // let S_arrays = ["string"];
    // let N_arrays = ["number"];
    // let O_arrays = ["object"];
    // let A_arrays = ["array"];
    // let F_arrays = ["function"];
    return function (value) {
        if (Array.isArray(type) && Array.isArray(value)) {
            // typing for arrays
            value = value.sort();
            type = type.sort();
            for (var i = 0; i < type.length; i++) {
                if (typeof value[i] === type[i] || value[i] === type[i]) {
                    continue;
                }
                else {
                    console.warn("WARNING:-: type " + value + " is not assignable to type " + type + " at " + label);
                }
            }
        }
        else {
            // checking for objects
            for (var k in type) {
                if (typeof value[k] === type[k] || value[k] === type[k]) {
                    continue;
                }
                else {
                    console.warn("WARNING:-: the object types for type and value are not assignable at " + label);
                    break;
                }
            }
        }
        return value;
    };
};
exports.lit = lit;
// single values not objects
var t = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var label = args.pop();
    label = typeof label === "number" ? "line " + label : label;
    var type = args.length === 1 ? args.pop() : args;
    return function (value) {
        if (!Array.isArray(type)) {
            // for single types
            if (value === type || typeof value === type) {
                return value;
            }
            else {
                console.warn("WARNING:-: type " + typeof value + " is not assignable to type " + type + " at " + label);
            }
        }
        else {
            // for union types
            for (var i = 0; i < type.length; i++) {
                var typ = type[i];
                if (typeof value === typ || value === typ) {
                    return value;
                }
                else {
                    if (i === type.length - 1) {
                        console.warn("warning type " + typeof value + " is not assignable to types " + type[0] + ", " + type[1] + "...  at " + label);
                        return false;
                    }
                }
            }
        }
    };
};
exports.t = t;
/** the u function is a powerful selector function with added attributes to manipulate dom elements, it does it in a more fast and efficient manner. */
var u = function (el, ifAll_OrNum) {
    var e = (0, exports.get)(el, ifAll_OrNum);
    if (!e)
        throw new Error('element "' + String(el) + '" not found');
    var all = !(e instanceof HTMLElement);
    // the funny parts or extra methods that can be used
    // to manipulate dom  elements are below!
    return {
        each: function (fn) {
            if (all) {
                e.forEach(function (el, ind) {
                    fn.call(el, ind);
                });
            }
            else {
                fn.call(e, 0);
            }
        },
        // for styling
        style: function (obj) {
            var _loop_1 = function (k) {
                var v = obj[k];
                if (!v) {
                    return "continue";
                }
                if (!all) {
                    e.style[k] = v;
                }
                else {
                    e.forEach(function (_e) { return (_e.style[k] = v); });
                }
            };
            for (var k in obj) {
                _loop_1(k);
            }
            return e;
        },
        /*
     *** HOW TO USE ***
    
    u("#container").style({
        width: "100%",
        height: "100%",
        color: "black"
    })
    
        */
        /**  for manipulating objects
           *
           *
           * *** HOW TO USE ***
    
          *u(object).config({
           name: "object",
           powerof: (pow, n){ return Math.pow(pow, n)}
           })
    
          */
        config: function (obj) {
            if (obj instanceof Object) {
                Object.assign(e, obj);
            }
            else {
                throw new Error("the variable is not an object " + String(obj));
            }
        },
        /*
     *** HOW TO USE ***
    
    u(object).config({
        name: "object",
        powerof: (pow, n){ return Math.pow(pow, n)}
    })
    
        */
        /** for adding new elements more powerfully */
        appendTo: function (type, attribute, number) {
            if (attribute === void 0) { attribute = {}; }
            if (number === void 0) { number = 1; }
            // for adding new elements more powerfully
            if (typeof attribute === "undefined" || typeof type === "undefined") {
                throw new Error("type or attribute not given | not enough parameters to work with");
            }
            var frag = new DocumentFragment();
            var returned = null;
            var allElements = [];
            if (!all) {
                for (var i = 0; i < number; i++) {
                    var element = document.createElement(type);
                    for (var k in attribute) {
                        var v = attribute[k];
                        element.setAttribute(k, v);
                    }
                    returned = frag.childNodes[0];
                    frag.append(element);
                    allElements.push(element);
                }
                e.append(frag);
            }
            else {
                for (var i = 0; i < number; i++) {
                    var element = document.createElement(type);
                    for (var k in attribute) {
                        var v = attribute[k];
                        element.setAttribute(k, v);
                    }
                    frag.append(element);
                    allElements.push(element);
                }
                e.forEach(function (el) {
                    el.append(frag);
                });
            }
            if (allElements.length === 1) {
                returned = allElements[0];
            }
            else {
                returned = allElements;
            }
            return returned;
        },
        /*
     *** HOW TO USE ***
    
    u("#container").appendTo("div"{
        className: "newdiv",
        id: "newdiv"
    }, 5)
    
        */
        on: function (type, callback) {
            if (!all) {
                return e.removeEventListener(type, callback, true);
            }
            else {
                return e.forEach(function (element) {
                    element.removeEventListener(type, callback, true);
                });
            }
        },
        off: function (type, callback) {
            if (!all) {
                e.removeEventListener(type, callback, true);
            }
            else {
                e.forEach(function (element) {
                    element.removeEventListener(type, callback, true);
                });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").on("click", ()=>{
        console.log("clicked!")
    })
    
        */
        // for adding attributes to the dom elements
        attr: function (attribute_object) {
            if (typeof attribute_object !== "object")
                return;
            if (!all) {
                for (var prop in attribute_object) {
                    var attr = attribute_object[prop];
                    if (prop === null) {
                        return e.getAttribute(prop);
                    }
                    else {
                        e.setAttribute(prop, String(attr));
                    }
                }
            }
            else {
                var _loop_2 = function (prop) {
                    var attr = attribute_object[prop];
                    if (prop === null) {
                        return { value: Array.from(e).map(function (el) { return el.getAttribute(prop); }) };
                    }
                    else {
                        e.forEach(function (el) { return el.setAttribute(prop, String(attr)); });
                    }
                };
                for (var prop in attribute_object) {
                    var state_1 = _loop_2(prop);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").attr({
        className: "container",
        id: "container"
    })
    
        */
        // for removing attributes from dom elements
        removeAttr: function (attr) {
            if (!all) {
                e.removeAttribute(attr);
            }
            else {
                e.forEach(function (el) { return el.removeAttribute(attr); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").removeAttr("className")
    
        */
        // for adding inner html contents to the dom elements
        html: function (code) {
            if (!all) {
                e.innerHTML = code;
            }
            else {
                e.forEach(function (el) { return (el.innerHTML = code); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").html("<div> hello am a div </div>")
    
        */
        // for adding text to the dom elements
        text: function (text) {
            if (!all) {
                e.textContent = text;
            }
            else {
                e.forEach(function (el) { return (el.textContent = text); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").html("hello am text")
    
    
        */
        // for adding class to the dom elements
        addClass: function (clas) {
            if (!all) {
                e.classList.add(clas);
            }
            else {
                e.forEach(function (el) { return el.classList.add(clas); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").addClass(".class")
    
        */
        // for removing class from the dom elements
        removeClass: function (clas) {
            if (!all) {
                e.classList.remove(clas);
            }
            else {
                e.forEach(function (el) { return el.classList.remove(clas); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").removeClass(".class")
    
        */
        // for hiding the dom elements
        hide: function () {
            if (!all) {
                e.style.display = "none";
            }
            else {
                e.forEach(function (el) { return (el.style.display = "none"); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").hide()
    
        */
        // for toggling the display of elements
        toggleClass: function () {
            if (!all) {
                if (e.style.display === "none") {
                    e.style.display = "block";
                }
                else {
                    e.style.display = "none";
                }
            }
            else {
                if (e[0].style.display === "none") {
                    e.forEach(function (el) { return (el.style.display = "block"); });
                }
                else {
                    e.forEach(function (el) { return (el.style.display = "none"); });
                }
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").toggleClass(".class")
    
        */
        // for displaying the dom elements
        show: function () {
            if (!all) {
                e.style.display = "block";
            }
            else {
                e.forEach(function (el) { return (el.style.display = "block"); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").show()
    
        */
        // for resizing the dom elements
        box: function (w, h, c) {
            if (c === void 0) { c = "transparent"; }
            if (!all) {
                e.style.width = String(w);
                e.style.height = String(h);
                e.style.backgroundColor = c;
            }
            else {
                e.forEach(function (el) {
                    el.style.width = String(w);
                    el.style.height = String(h);
                    el.style.backgroundColor = c;
                });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").box("100px","100%","#ff9800")
    
        */
        // for scrollingthe dom elements into view
        scrollTo: function (s) {
            if (s === void 0) { s = true; }
            if (!all) {
                e.scrollIntoView(s);
            }
            else {
                e.forEach(function (el) { return el.scrollIntoView(s); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").scrollTo()
    
        */
        // for adding elements to the dom elements
        add: function (nod) {
            if (!all) {
                e.append(nod);
            }
            else {
                e.forEach(function (el) { return el.append(nod); });
            }
        },
        /*
     *** HOW TO USE ***
    let span = document.createElement("span");
    u("#container").add(span)
    
        */
        // for removing elements to the dom elements
        remove: function (ind) {
            if (!all && ind) {
                e.removeChild(e.childNodes[ind]);
            }
            else {
                if (ind) {
                    e.forEach(function (el) { return el.removeChild(el.childNodes[ind]); });
                }
            }
            if (!all && !ind) {
                e.parentElement.remove(e);
            }
            else {
                e.forEach(function (el) { return el.parentElement.remove(el); });
            }
        },
        /*
     *** HOW TO USE ***
    
    u("#container").remove(0)
    
        */
        /*
     *** HOW TO USE ***
    
    u("#container").fullscreen().toggle()
    u("#container").fullscreen().exist()
    u("#container").fullscreen().set()
    
        */
        fullScreen: function () {
            return {
                toggle: function () {
                    if (!document.fullscreenElement && !all) {
                        e.requestFullscreen()["catch"](function (err) {
                            alert("Error! failure attempting to enable full-screen mode: " + err.message + " (" + err.name + ")");
                        });
                    }
                    else {
                        void document.exitFullscreen();
                    }
                },
                set: function () {
                    if (all) {
                        return;
                    }
                    e.requestFullscreen()["catch"](function (err) {
                        alert("Error! failure attempting to enable\n full-screen mode: " + err.message + "\n (" + err.name + ")");
                    });
                },
                exist: function () {
                    void document.exitFullscreen();
                }
            };
        }
    };
};
exports.u = u;
/** This is for creating css styles using javascipt
 *
 * HOW TO USE
 *
 * css("#container",
{
  *
    height: "100%",
    *
    height: "100%",
    *
    background-color: "#ff9800"
    *
})
*/
var css = function (name, sel, properties) {
    if (typeof sel === "object") {
        properties = sel;
        sel = "";
    }
    var styS = "" + name + sel + "" + "{";
    var styE = "}";
    var style = "", totalStyle = "";
    if (properties) {
        for (var k in properties) {
            var v = properties[k];
            style += "" + k + ": " + v + ";";
        }
    }
    var styleTag = document.querySelector("style");
    if (styleTag === null) {
        styleTag = document.createElement("style");
    }
    totalStyle += styleTag.innerHTML;
    totalStyle += styS + style + styE;
    styleTag.innerHTML = totalStyle;
    document.head.append(styleTag);
};
exports.css = css;
/** This is for creating css @media styles using javascipt
 *
 * examples.
 *
 * media("min-width: 790px",
 * *
["#container",
{
  *
    width: "100%",
    *
    height: "100%",
    *
    background-color: "#0000"
    *
}]
)
["#header",
{
    width: "100%",
    *
    height: "20%",
    *
    background-color: "#fff"
    *
}]
*
)
 *
*/
var media = function (value) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    var styS = "@media only screen and (" + value + ") " + "{", styE = "}";
    var style = "  ", aniSty = " ";
    var proplen = properties.length;
    var totalAnimation, Animation = "  ";
    var animationStep = function (num) {
        for (var k in properties[num][1]) {
            var v = properties[num][1][k];
            style += "" + k + ": " + v + ";";
        }
        aniSty += "" + properties[num][0] + "{" + style + "}";
        return aniSty;
    };
    for (var i = 0; i < proplen; i++) {
        Animation += animationStep(i);
    }
    var aniStyleTag = document.querySelector("style");
    if (aniStyleTag === null) {
        aniStyleTag = document.createElement("style");
    }
    aniStyleTag.media = "screen";
    totalAnimation = aniStyleTag.innerHTML;
    totalAnimation += styS + Animation + styE;
    aniStyleTag.innerHTML = totalAnimation;
    document.head.append(aniStyleTag);
};
exports.media = media;
/** This is for creating css animations using javascipt
 *
 * example.
 *
 *
 * animate("popanimation",
 *  *
["from",
{
   *
    transform: "scale3D(2)" ,
     *
    height: "10%",
     *
    background-color: "#0000"
     *
}]
 *
)
 *
 *
["to",
{
   *
    transform: "scale3D(1)" ,
     *
    height: "100%",
     *
    background-color: "#ff9800"
     *
}]
)
 *
 *
 *
*/
var animate = function (name) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    var styS = "@keyframes " + name + " " + "{", styE = "}", proplen = properties.length;
    var style = " ", aniSty = " ", Animation = "  ", totalAnimation = null;
    var animationStep = function (num) {
        for (var k in properties[num][1]) {
            var v = properties[num][1][k];
            style += "" + k + ": " + v + ";";
        }
        aniSty += "" + properties[num][0] + "{" + style + "}";
        return aniSty;
    };
    for (var i = 0; i < proplen; i++) {
        Animation += animationStep(i);
    }
    var aniStyleTag = document.querySelector("style");
    if (aniStyleTag === null) {
        aniStyleTag = document.createElement("style");
    }
    aniStyleTag.media = "screen";
    totalAnimation = aniStyleTag.innerHTML;
    totalAnimation += styS + Animation + styE;
    aniStyleTag.innerHTML = totalAnimation;
    document.head.append(aniStyleTag);
};
exports.animate = animate;
/**
 * The build is a context used as a template engine for building layouts
 *
 * example.
 *
 * const p = build(
 * *
  "div",
  {
    *
    title: "title",
    *
    innerText: "am a title",
    *
    onclick: function () {
      *
      console.log("i was clicked");
      *
    }
    *
  },
  *
  build("span", { innerText: "am a span", title: "title" })
  *
);
 */
var build = function () {
    var layouts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        layouts[_i] = arguments[_i];
    }
    var i = 1;
    function createElement(type, op, chil) {
        if (type === void 0) { type = ""; }
        if (op === void 0) { op = {}; }
        var element = document.createElement(type);
        for (var _i = 0, _a = Object.entries(op); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            element[k] = v;
        }
        if (chil) {
            if (Array.isArray(chil)) {
                var frag = new DocumentFragment();
                // templating testing should be done here
                for (var i_1 = 0; i_1 < chil.length; i_1++) {
                    frag.append(chil[i_1]);
                }
                element.append(frag);
            }
            else {
                element.append(chil);
            }
        }
        // return the element after building the dom objects
        return element;
    }
    if (typeof layouts[0] === "object") {
        i = layouts.length;
        var frag = new DocumentFragment();
        while (i > 0) {
            // templating testing should be done here
            var ele = createElement(layouts[i][0], layouts[i][1], layouts[i][2]);
            frag.append(ele);
            i--;
        }
        return frag;
    }
    else {
        if (typeof layouts[0] === "string") {
            // templating testing should be done here
            var element = createElement(layouts[0], layouts[1], layouts[2]);
            return element;
        }
    }
};
exports.build = build;
/**
 * this context used for rendering built layout to a parent or the document body
 *
 * example
 *
 * const p =   build("span", { innerText: "am a span", title: "title" });
 *
buildTo(p, "body");
*/
var buildTo = function (child, parent) {
    if (typeof parent === "string") {
        document.querySelectorAll(parent).forEach(function (par) {
            if (Array.isArray(child)) {
                child.forEach(function (ch) {
                    par.append(ch);
                });
            }
        });
    }
    else {
        if (Array.isArray(child)) {
            child.forEach(function (ch) {
                parent.append(ch);
            });
        }
    }
};
exports.buildTo = buildTo;
var routes = {};
var route = function (path, templateId, controller) {
    if (path === void 0) { path = "/"; }
    var link = document.createElement("a");
    link.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
    routes[path] = { templateId: templateId, controller: controller };
    return link;
};
exports.route = route;
/** A basic router for uiedbook
 * example.
 *
 * route("/", "home", function () {
*
get("div").innerText = " welcome to the home page";
*
  console.log("we are at the home page");
*
});
*
*
const about = route("/about", "about", function () {
*
*   get("div").innerText = " welcome to the about page";
*
*   get("a").href = about;
*
  console.log("we are at the about page");
  *
});
 *
 *
 *
*/
var router = function (e) {
    e.preventDefault();
    var url = window.location.hash.slice(1) || "/";
    var route = routes[url];
    if (route) {
        route.controller();
    }
    // path = path ? path : "";
    //   if (this.mode === "history") {
    //     history.pushState(null, null, this.root + this.clearSlashes(path));
    //   } else {
    //     window.location.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
    //   }
};
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
/** in construction */
var xhr = function (type, url) {
    // for sending requests
    var xhrRequest = new XMLHttpRequest();
    var result = null;
    xhrRequest.open(type, url, true);
    result = xhrRequest.onload = function () {
        return xhrRequest.response;
    };
    xhrRequest.send();
    return result;
};
exports.xhr = xhr;
/** for checking for empty objects */
var isEmptyObject = function (obj) {
    return Boolean(typeof obj === "object" && obj && Object.keys(obj).length === 0);
};
exports.isEmptyObject = isEmptyObject;
/*
 *** HOW TO USE ***
let objA = { a: "kd" };
let objB = {};
console.log(isEmptyObject(objA));
// false
console.log(isEmptyObject(objB));
// true

*/
var intersect = function (target, opt, callback) {
    var root = opt.root, rootMargin = opt.rootMargin, threshold = opt.threshold, options = {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold
    }, observer = new IntersectionObserver(callback, options), child = document.querySelector(target);
    if (child) {
        observer.observe(child);
    }
};
exports.intersect = intersect;
/*
*** HOW TO USE ***

function call(){
console.log("intersect(targert,opt,callback)")
}
intersect("span",{
root: null,
    rootMargin: "0px",
    threshold: 0.6
},call)


*/
/** `error("there was an error!");` */
var error = function (msg) {
    throw new Error(msg);
};
exports.error = error;
/** the get function is the u function but without any sweet methods it is used if you want to enjoy the easiness of the u function but don't want to use it awesome methods */
var get = function (el, ifAll_OrNum) {
    return (typeof el === "string"
        ? typeof ifAll_OrNum !== "undefined"
            ? typeof ifAll_OrNum === "number"
                ? document.querySelectorAll(el)[ifAll_OrNum]
                : document.querySelectorAll(el)
            : document.querySelector(el)
        : el);
};
exports.get = get;
/** for getting more purer random number */
var rad = function (num) {
    return Math.floor(Math.random() * Math.floor(num));
};
exports.rad = rad;
/*
 *** HOW TO USE ***
rad(5);
// you will get random values from 0 to 5
*/
/** it's self explanatory some how */
var create = function (type, id) {
    if (type === void 0) { type = "div"; }
    if (id === void 0) { id = ""; }
    var element = document.createElement(type);
    element.setAttribute("id", id);
    document.body.appendChild(element);
    return element;
};
exports.create = create;
/*
 *** HOW TO USE ***
let div = create("div",{id:"newdiv"});
*/
/** an easy to use download function that returns the link element that should be clicked */
var download = function (type, source, name) {
    var file = new Blob([source.buffer], { type: type });
    var fileURL = URL.createObjectURL(file);
    var linkElement = document.createElement("a");
    linkElement.setAttribute("href", fileURL);
    linkElement.setAttribute("download", name);
    return linkElement;
};
exports.download = download;
var debounce = function (func, timeout) {
    if (timeout === void 0) { timeout = 600; }
    var timer = null;
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        func();
    }, timeout);
};
exports.debounce = debounce;
/*
 *** HOW TO USE ***
debounce(function , 1000);
*/
var callStack = [];
/** the grandmother algorith for managing ids of anything, don't use it if you don't understand it's power it looks simple. */
var keep = function (id, time) {
    var callObj = typeof id === "object" ? id : null;
    var runtime = typeof time === "number" ? time : 1;
    if (typeof id === "string" && typeof runtime === "number") {
        if (callStack.indexOf(id) > -1) {
            return;
        }
        for (; runtime > 0; runtime--) {
            callStack.push(id);
        }
    }
    else {
        if (callObj !== null) {
            // eslint-disable-next-line prefer-const
            for (var k in callObj) {
                var v = callObj[k];
                if (callStack.indexOf(k) > -1) {
                    callStack.splice(Number(id), 1);
                    return true;
                }
                else {
                    for (; v > 0; v--) {
                        callStack.push(k);
                    }
                }
            }
        }
    }
};
exports.keep = keep;
var check = function (id) {
    var ind = callStack.indexOf(id);
    if (ind > -1) {
        callStack.filter(function (key) { return !(id === key); });
        // callStack.splice(ind,1)
        return true;
    }
    else {
        return false;
    }
};
exports.check = check;
var log = function (message) {
    if (message) {
        console.log(message);
    }
    else {
        if (callStack.length > 0) {
            console.log(callStack);
            return callStack;
        }
    }
};
exports.log = log;
/** it's self explanatory some how */
var store = function (name, value) {
    localStorage.setItem(name, JSON.stringify(value));
};
exports.store = store;
var retrieve = function (name) {
    return localStorage.getItem(name);
};
exports.retrieve = retrieve;
var remove = function (name) {
    localStorage.removeItem(name);
};
exports.remove = remove;
var getKey = function (index) {
    return window.localStorage.key(index);
};
exports.getKey = getKey;
var clear = function () {
    localStorage.clear();
};
exports.clear = clear;
// rebuilt key event lister
var keyObject = function (keysArray, callBack) {
    return {
        keysArray: keysArray,
        callBack: callBack
    };
};
var keysStack = [];
var keepKeys = function (keys, callback) {
    var call = keyObject(keys, callback);
    keysStack.push(call);
};
var checkKeys = function (keys, e, delay) {
    function partOf(a, b) {
        var matches = 0;
        for (var i = 0; i < a.length; i++) {
            if (b.indexOf(a[i]) === -1) {
                matches++;
            }
        }
        return matches === a.length;
    }
    var _loop_3 = function (i) {
        if (!partOf(keysStack[i].keysArray, keys)) {
            (0, exports.debounce)(function () { return keysStack[i].callBack(e); }, delay);
        }
    };
    for (var i = 0; i < keysStack.length; i++) {
        _loop_3(i);
    }
    return keysStack.length;
};
/** for handling even more complicated key events, it's built with the grandmother algorimth or code */
var onKeys = function (keys, callback, object, delay, lock) {
    if (object === void 0) { object = document; }
    if (delay === void 0) { delay = 0; }
    if (lock === void 0) { lock = false; }
    // for handling even more complicated key events,
    if (!keys || !callback) {
        throw new Error("no keys or callbacks given");
    }
    var temporaryKeys = [];
    keepKeys(keys, callback);
    object.addEventListener("keydown", function (e) {
        if (lock) {
            e.preventDefault();
        }
        if (temporaryKeys.indexOf(e.key) !== 0) {
            temporaryKeys.push(e.key);
        }
    }, false);
    object.addEventListener("keyup", function (e) {
        checkKeys(temporaryKeys, e, delay);
        temporaryKeys = [];
    }, false);
};
exports.onKeys = onKeys;
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

onKeys(["arrowRight","control"],callback,container);

*/
var continuesKeys = function (keys, callback, delay, object, lock) {
    if (delay === void 0) { delay = 0; }
    if (object === void 0) { object = document; }
    if (lock === void 0) { lock = true; }
    // for handling even more complicated key events,
    if (!keys || !callback) {
        throw new Error("no keys or callbacks given");
    }
    keepKeys(keys, callback);
    var temporaryKeys = [];
    object.addEventListener("keyup", function (e) {
        for (var i = 0; i < temporaryKeys.length; i++) {
            if (temporaryKeys[i] === e.key) {
                temporaryKeys.splice(i, 1);
            }
        }
    }, true);
    object.addEventListener("keydown", function (e) {
        if (lock) {
            e.preventDefault();
        }
        if (temporaryKeys.indexOf(e.key) < 0) {
            temporaryKeys.push(e.key);
        }
        checkKeys(temporaryKeys, e, delay);
    }, true);
};
exports.continuesKeys = continuesKeys;
/*
 *** HOW TO USE ***

 let container = get("#container");

 let callback = ()=>{
    console.log("arrow right and the control keys was clicked together")
}

continuesKeys(["arrowRight","control"],callback,500,true,container);

*/
var swipe = function (item) {
    var caller = {};
    var startX = 0, startY = 0;
    if (typeof item === "object") {
        for (var k in item) {
            var v = item[k];
            caller[k] = v;
        }
    }
    else {
        throw new Error("no call given for the swipe handler");
    }
    function handleTouchStart(e) {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }
    function handleTouchEnd(e) {
        var diffX = e.changedTouches[0].screenX - startX;
        var diffY = e.changedTouches[0].screenY - startY;
        var ratioX = Math.abs(diffX / diffY);
        var ratioY = Math.abs(diffY / diffX);
        var absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);
        if (absDiff < 10) {
            if (caller.touch) {
                callback.touch(caller.touch);
            }
        }
        if (ratioX > ratioY) {
            // left and right
            if (diffX >= 0) {
                if (caller.right) {
                    callback.right(caller.right);
                }
            }
            else {
                if (caller.left) {
                    callback.left(caller.left);
                }
            }
            // up and down
        }
        else {
            if (diffY >= 0) {
                if (caller.down) {
                    callback.down(caller.down);
                }
            }
            else {
                if (caller.up) {
                    callback.up(caller.up);
                }
            }
        }
    }
    document.body.addEventListener("touchstart", handleTouchStart);
    document.body.addEventListener("touchend", handleTouchEnd);
    var callback = {
        touch: function (callback) {
            return callback();
        },
        right: function (callback) {
            return callback();
        },
        left: function (callback) {
            return callback();
        },
        down: function (callback) {
            return callback();
        },
        up: function (callback) {
            return callback();
        }
    };
};
exports.swipe = swipe;
/*
 *** HOW TO USE ***

    function touch(){
     console.log("touching")
    }



    function up(){
     console.log("swipe up")
    }


    function down(){
     console.log("swipe down")
    }


    function right(){
     console.log("swipe right")
    }


    function left(){
     console.log("swipe left")
    }



    let obj = {down: down,
               touch: touch,
               up: up,
               right: right,
               left: left
           }

    swipe(obj)



 */
/*
The next is system of the
uiedbook library it's canvas
related operations like motion
detection key map and all that
useful stuff in one single
bundle it's a game rendering engine library
called the RE engine
with minimal functionality
for 2D rendering */
/*
@ TODOs

 1. a widget systmen for adding widgets to the gameplay
 2. a movable background image
 3. ......
*/
/** this is used for creating pixel stable game views across all screen width with no pixelation problem try and see the magic */
var buildCanvas = function (id, w, h) {
    if (w === void 0) { w = window.innerWidth; }
    if (h === void 0) { h = window.innerHeight; }
    var canv = document.createElement("canvas"), context = canv.getContext("2d"), backingStores = [
        "webkitBackingStorePixelRatio",
        "mozBackingStorePixelRatio",
        "msBackingStorePixelRatio",
        "oBackingStorePixelRatio",
        "backingStorePixelRatio",
    ], deviceRatio = window.devicePixelRatio, backingRatio = backingStores.reduce(function (prev, curr) {
        // eslint-disable-next-line no-prototype-builtins
        return (context === null || context === void 0 ? void 0 : context.hasOwnProperty(curr))
            ? context[curr]
            : 1;
    }), ratio = deviceRatio / Number(backingRatio);
    canv.id = typeof id === "undefined" ? "canvas" : id;
    canv.width = Math.round(w * ratio);
    canv.height = Math.round(h * ratio);
    canv.style.width = String(w) + "px";
    canv.style.height = String(h) + "px";
    canv.style.backgroundColor = "black";
    context === null || context === void 0 ? void 0 : context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return canv;
};
exports.buildCanvas = buildCanvas;
var appendCanvas = function (id, h, w, parent) {
    var _a;
    /*same as above but with a
  parent to append directly */
    var cv = (0, exports.buildCanvas)(id, h, w);
    var par;
    if (typeof parent !== "string" && typeof parent !== "undefined") {
        par = parent;
    }
    else {
        if (typeof parent === "string") {
            par = (_a = document.querySelector(parent)) !== null && _a !== void 0 ? _a : undefined;
        }
        else {
            if (typeof parent === "undefined") {
                par = document.body;
            }
        }
    }
    if (par) {
        par.style.boxSizing = "border-box";
        par.append(cv);
    }
    return cv;
};
exports.appendCanvas = appendCanvas;
/** this is the RE game time line algorimth */
exports.game = (function () {
    /*game is an interface
   where game views (view) are
   sequenced on.*/
    var games = [];
    // the build function is for creating the game div
    // and allowing the dev to build upon it
    function build(viewID, callback) {
        var frame = document.createElement("div");
        if (viewID) {
            frame.setAttribute("id", viewID);
        }
        (0, exports.u)(frame).style({
            height: "100vh",
            width: "100vw",
            backgroundColor: "black"
        });
        mount(frame, callback);
    }
    // the mount function notifies the flow function
    // that the game should be started
    // and the callback can be used to run a function
    // perculiar to this effect.
    function mount(template, callback) {
        (0, exports.u)("body").appendTo("div", { id: "gameframe" });
        if (games.length === 1) {
            return;
        }
        else {
            games.push(template);
        }
        if (!callback)
            return;
        return callback.call(template);
    }
    // the start function starts the game
    // and manages the dom
    var start = function (canvas, fps) {
        if (fps === void 0) { fps = 0; }
        if (!canvas) {
            throw new Error("uiedbook: cannot start game without a canvas. EXP game.start(canvas)");
        }
        (0, exports.u)(document.body).style({
            margin: "0px",
            padding: "0px",
            boxSizing: "border-box",
            border: "none"
        });
        (0, exports.u)("#gameframe").style({
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0px",
            left: "0px",
            bottom: "0px",
            right: "0px",
            zIndex: "0",
            backgroundColor: "black",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px",
            padding: "0px",
            boxSizing: "border-box"
        });
        var gameframe = (0, exports.get)("#gameframe");
        gameframe.append(games[0]);
        exports.renderer.render(canvas, fps);
    };
    // this stops the game
    var cancel = function () {
        var fram = (0, exports.get)("#gameframe");
        fram.innerHTML = "";
        exports.renderer.toggleRendering();
        // fram.append(vsg())
    };
    function contentLoader(type, id, url) {
        if (type === "img") {
            var p = new Image();
            p.src = url;
            p.id = id;
            return p;
        }
        else {
            if (type === "aud") {
                var p = new Audio();
                p.src = url;
                p.id = id;
                return p;
            }
        }
    }
    var imagesArray = [], audioArray = [];
    function loadImage(img, id) {
        if (Array.isArray(img) && !id) {
            for (var i = 0; i < img.length; i++) {
                if (!img[i][0] || !img[i][1]) {
                    throw new Error("uiedbook: image url or id not specified correctly for the " + i + " image");
                }
                var p = contentLoader("img", img[i][1], img[i][0]);
                imagesArray.push(p);
            }
        }
        else {
            if (img && id) {
                var i = contentLoader("img", img, id);
                imagesArray.push(i);
            }
            else {
                throw new Error("uiedbook: image url or id not specified");
            }
        }
    }
    function loadAudio(img, id) {
        if (Array.isArray(img) && !id) {
            for (var i = 0; i < img.length; i++) {
                if (!img[i][0] || !img[i][1]) {
                    throw new Error("uiedbook: audio url or id not specified correctly for the " + i + " audio");
                }
                var p = contentLoader("aud", img[i][1], img[i][0]);
                audioArray.push(p);
            }
        }
        else {
            if (img && id) {
                var i = contentLoader("aud", img, id);
                audioArray.push(i);
            }
            else {
                throw new Error("uiedbook: audio url or id not specified");
            }
        }
    }
    /*
    async function contentLoader(type, id, url) {
      if (type === "img") {
        let img;
        const loaded = await new Promise((res, rej) => {
          const p = new Image();
          try {
          p.src = url;
          p.id = id;
          p.addEventListener("load", res.call(p), { once: true });
          img =  p;
          } catch (error) {
            rej(error)
          }
        })
        return img;
      } else {
        if (type === "aud") {
          let aud;
            const loaded = await new Promise((res, rej) => {
          try {
          const p = new Audio();
          p.src = url;
          p.id = id;
            p.addEventListener("load", res.call(p), { once: true });
            aud =  p;
          } catch (error) {
            rej(error)
          }
        })
        return aud;
        }
      }
    }
  
    const imagesArray = [],
      audioArray = [];
    async function loadImage(img, id) {
      if (Array.isArray(img) && !id) {
        for (let i = 0; i < img.length; i++) {
          if (!img[i][0] || !img[i][1]) {
            throw new Error(`uiedbook: image url or id not specified correctly for the ${i} image`);
          }
          const p = await contentLoader("img", img[i][1], img[i][0]);
          imagesArray.push(p);
        }
      } else {
        if (img && id) {
          const i = await contentLoader("img", img, id);
          imagesArray.push(i);
        } else {
          throw new Error(`uiedbook: image url or id not specified`);
        }
      }
    }
    async function loadAudio(img, id) {
      if (Array.isArray(img) && !id) {
        for (let i = 0; i < img.length; i++) {
           if (!img[i][0] || !img[i][1]) {
            throw new Error(`uiedbook: audio url or id not specified correctly for the ${i} audio`);
          }
          const p = await contentLoader("aud", img[i][1], img[i][0]);
          audioArray.push(p);
        }
      } else {
        if (img && id) {
          const i = await contentLoader("aud", img, id);
          audioArray.push(i);
        } else {
          throw new Error(`uiedbook: audio url or id not specified`);
        }
      }
    }
  
    */
    function getAud(id) {
        var p = audioArray.find(function (ent) { return ent.id === id; });
        if (p) {
            // console.log(p);
            return p;
        }
        else {
            throw new Error('uiedbook: audio of id "' + id + '" not found');
        }
    }
    function getImg(id) {
        var p = imagesArray.find(function (ent) { return ent.id === id; });
        if (p) {
            // console.log(p);
            return p;
        }
        else {
            throw new Error('uiedbook: image of id "' + id + '" not found');
        }
    }
    return {
        build: build,
        mount: mount,
        start: start,
        loadImage: loadImage,
        loadAudio: loadAudio,
        getImg: getImg,
        getAud: getAud,
        cancel: cancel
    };
})();
/** an entity is any object or thing that can be added to the game world */
var Entity = /** @class */ (function () {
    function Entity(
    /** this.id = name || "none" //name of the entity for identification can be used out side here */
    name, id, 
    /** callback for paint the entity     can be used out side here */
    painter, 
    /** this is a callback to add additional properties to the entity at runtime */
    behaviors) {
        this.name = name;
        this.id = id;
        this.painter = painter;
        this.behaviors = behaviors;
        /** width of entiity */
        this.width = 0;
        /** height of entity */
        this.height = 0;
        /** distance from the top of the canvas */
        this.top = 0;
        /** distance from the left of the canvas */
        this.left = 0;
        /** to check if the entity is displayed */
        this.visible = true;
        /** to delete an entity */
        this["delete"] = false;
        /** to make the entity observer sides or not */
        this.border = true;
        this.isHit = false;
        this.name || (this.name = "none");
    }
    // this algorimth is for calling the paint function
    // to make it functional when seen at runtime
    Entity.prototype.update = function (context, lastDeltalTime) {
        if (typeof this.painter.update !== "undefined" && this.visible) {
            this.painter.update(this, context, lastDeltalTime);
        }
        else {
            // throw new Error(`RE: entity with name of ${this.name} has no update function`);
        }
    };
    Entity.prototype.paint = function (context) {
        if (typeof this.painter.paint !== "undefined" && this.visible) {
            this.painter.paint(this, context);
        }
        else {
            throw new Error("uiedbook: entity with name of " + this.name + " has no paint function");
        }
    };
    Entity.prototype.observeBorder = function (w, h) {
        if (this.top <= 0) {
            this.top *= 0;
        }
        else {
            if (h && this.top + this.height >= h) {
                this.top = h - this.height;
            }
        }
        if (this.left <= 0) {
            this.left *= 0;
        }
        else {
            if (w && this.left + this.width >= w) {
                this.left = w - this.width;
            }
        }
    };
    Entity.prototype.run = function (context, lastDeltalTime) {
        // here the entity don't have to be visble
        if (typeof this.behaviors !== "undefined") {
            this.behaviors(this, context, lastDeltalTime);
        }
    };
    return Entity;
}());
exports.Entity = Entity;
var entityShader = function (name, img, map, behaviors, delay) {
    if (delay === void 0) { delay = 1; }
    /*
  just like an entity, this can also be
   added to the game world
  but these are stationary
    */
    if (!name || !img || !map) {
        throw new Error("cannot create entity shader without a map or image objects");
    }
    this.id = name || "none"; //name of the entity for identification can be used out side here******
    this.name = name || "none";
    this.positionMap = map; // let's the hit detector act on the mapper object passed
    this.width = 0; // width of entiity                              can be used out side here******
    this.height = 0; // height of entity                             can be used out side here******
    this.top = 0; // distance from the top of the canvas              can be used out side here******
    this.left = 0; // distance from the left of the canvas            can be used out side here******
    this.visible = true; // to check if the entity is displayed        can be used out side here******
    this.behavior = behaviors; // this is a callback to add additional properties to the entity at runtime
    this["delete"] = false; //  to delete an entity                        can be used out side here******
    this.isHit = false;
    this.image = img;
    this.delay = delay;
    this.range = 0;
    this.config = function (top, left, bottom, right) {
        if (!top || !left || !bottom || !right) {
            throw new Error("uiedbook: entityShader.config(top, left, bottom, right) on " + this.name + " is invalid");
        }
        this.left = left;
        this.top = top;
        this.height = bottom;
        this.width = right;
    };
};
entityShader.prototype = {
    paint: function (context) {
        this.range++;
        if (this.range % this.delay === 0) {
            context.drawImage(this.image, entity.left, entity.top, entity.width, entity.height);
        }
        if (this.range > 100) {
            this.range = 1;
        }
    },
    update: function (context, lastDeltalTime) {
        if (this.behaviors) {
            this.behaviors(this, context, lastDeltalTime);
        }
    },
    // well this has to be here for known reasons, yep it's empty but better to avoid a thousand if check ):
    run: function () { }
};
function ImgPainter(image, delay) {
    if (delay === void 0) { delay = 1; }
    this.image = image;
    this.delay = delay;
    this.range = 0;
    this.rotate = false;
}
exports.ImgPainter = ImgPainter;
ImgPainter.prototype = {
    paint: function (entity, context) {
        this.range++;
        if (this.range % this.delay === 0) {
            if (this.rotate) {
                context.translate(entity.left, entity.top);
                context.rotate((this.rotate * Math.PI) / 180);
                context.translate(-entity.left, -entity.top);
            }
            context.drawImage(this.image, entity.left, entity.top, entity.width, entity.height);
        }
        if (this.range > 100) {
            this.range = 1;
        }
    }
};
// this is a powerful sprite algorith for
// rendering the exact sprite from a
// spritesheet in successful orders
var spriteSheetPainter = function (img, horizontal, vertical, delay) {
    if (horizontal === void 0) { horizontal = 1; }
    if (vertical === void 0) { vertical = 1; }
    if (delay === void 0) { delay = 1; }
    this.image = img;
    this.framesWidth = Math.round(this.image.width / horizontal);
    this.framesHeight = Math.round(this.image.height / vertical);
    this.horizontalPictures = horizontal;
    this.verticalPictures = vertical;
    this.frameHeightCount = 0;
    this.frameWidthCount = 0;
    this.range = 0;
    this.delay = delay;
    this.isLastImage = false;
    this.animateAllFrames = horizontal === 1 && vertical === 1 ? false : true;
    this.animate = true;
    this.rotate = false;
    this.changeSheet = function (img, horizontal, vertical, delay) {
        if (horizontal === void 0) { horizontal = 0; }
        if (vertical === void 0) { vertical = 0; }
        if (delay === void 0) { delay = 1; }
        this.image = img;
        this.framesWidth = Math.round(this.image.width / horizontal);
        this.framesHeight = Math.round(this.image.height / vertical);
        this.horizontalPictures = horizontal;
        this.verticalPictures = vertical;
        this.delay = delay;
        this.animateAllFrames = horizontal === 1 && vertical === 1 ? false : true;
    };
    this.animateFrameOf = function (frameY) {
        if (frameY === void 0) { frameY = 0; }
        this.frameHeightCount = frameY;
    };
    this.shouldPaint = false;
};
exports.spriteSheetPainter = spriteSheetPainter;
exports.spriteSheetPainter.prototype = {
    update: function () {
        this.range++;
        if (this.range % this.delay === 0 && this.animate) {
            this.shouldPaint = true;
            if (this.animateAllFrames) {
                // animating all frames from the fisrt image to last in an infinite loop
                if (this.frameHeightCount < this.verticalPictures - 1) {
                    if (this.frameWidthCount <= this.horizontalPictures - 2) {
                        this.frameWidthCount++;
                    }
                    else {
                        this.frameWidthCount = 0;
                        this.frameHeightCount++;
                    }
                }
                else {
                    this.isLastImage = true;
                    this.frameHeightCount = 0;
                }
                if (this.frameHeightCount === this.verticalPictures - 1) {
                    this.isLastImage = false;
                }
            }
            if (this.frameY) {
                this.frameHeightCount = this.frameY;
                if (this.frameWidthCount < this.horizontalPictures - 1) {
                    this.frameWidthCount++;
                }
                else {
                    this.frameWidthCount = 0;
                }
            }
        }
        if (this.range > 100) {
            this.range = 1;
        }
    },
    paint: function (entity, context) {
        if (this.shouldPaint) {
            context.save();
            if (this.rotate) {
                context.translate(entity.left, entity.top);
                context.rotate((this.rotate * Math.PI) / 180);
                context.translate(-entity.left, -entity.top);
            }
            context.drawImage(this.image, this.framesWidth * this.frameWidthCount, this.framesHeight * this.frameHeightCount, this.framesWidth, this.framesHeight, entity.left, entity.top, entity.width, entity.height);
            context.restore();
            this.shouldPaint = false;
        }
    }
};
var speaker = function (text, language, volume, rate, pitch) {
    // common languages (not supported by all browsers)
    // en - english,  it - italian, fr - french,  de - german, es - spanish
    // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean
    if (language === void 0) { language = ""; }
    if (volume === void 0) { volume = 1; }
    if (rate === void 0) { rate = 1; }
    if (pitch === void 0) { pitch = 1; }
    // build utterance and speak
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    speechSynthesis.speak(utterance);
};
exports.speaker = speaker;
var speakerStop = function () {
    return speechSynthesis && speechSynthesis.cancel();
};
exports.speakerStop = speakerStop;
/** play mp3 or wav audio from a local file or url  */
var audio = function (audio, loop, volumeScale) {
    if (loop === void 0) { loop = false; }
    if (volumeScale === void 0) { volumeScale = 1; }
    this.audio = audio;
    this.audio.loop = loop;
    this.audio.volume = volumeScale;
};
exports.audio = audio;
exports.audio.prototype = {
    play: function () {
        return this.audio.play();
    },
    pause: function () {
        this.audio.pause();
    },
    toggle: function () {
        if (this.audio.paused) {
            return this.audio.play();
        }
        else {
            this.audio.pause();
        }
    }
};
var physics = (function () {
    function detectCollision(ent, entityArray, reduce, freeMan) {
        if (reduce === void 0) { reduce = 0; }
        if (typeof entityArray === "string") {
            entityArray = exports.renderer.getAllEtities(entityArray);
        }
        if (!ent.positionMap) {
            for (var j = 0; j < entityArray.length; j++) {
                if (entityArray[j].name === ent.name) {
                    continue;
                }
                else {
                    if (ent.left - reduce > entityArray[j].left + entityArray[j].width ||
                        ent.left + ent.width < entityArray[j].left - reduce ||
                        ent.top + reduce > entityArray[j].top + entityArray[j].height ||
                        ent.top + ent.height < entityArray[j].top - reduce) {
                        continue;
                    }
                    else {
                        entityArray[j].isHit = true;
                        ent.isHit = true;
                        if (entityArray[j].name !== freeMan) {
                            entityArray.splice(j, 1);
                            --j;
                            continue;
                        }
                        // console.log(entityArray[j].name,j);
                    }
                }
            }
            return entityArray;
        }
        else {
            // collision detector for shaders
            for (var j = 0; j < entityArray.length; j++) {
                var map = ent.positionMap;
                var detected = function (j) {
                    entityArray[j].isHit = true;
                    ent.isHit = true;
                    if (entityArray[j].name !== freeMan) {
                        entityArray.splice(j, 1);
                        --j;
                    }
                    // console.log(entityArray[j].name,j);
                };
                /*
              A has 4 parts like
        
              {
              top:  [top1 , top2 , top3 , top4 , ...],
              down: [down1 , down2 , down3 , down4 , ...],
              left: [left1 , left2 , left3 , left4 , ...],
              right:[right , right2 , right3 , right4 , ...]
            }
        
              */
                for (var j_1 = 0; j_1 < entityArray.length; j_1++) {
                    if (entityArray[j_1].name === ent.name) {
                        continue;
                    }
                    else {
                        // for top position
                        for (var i = 0; i < map.top.length; i++) {
                            if (!(map.top[i] + reduce >
                                entityArray[j_1].top + entityArray[j_1].height)) {
                                // set the bomb here dev
                                detected(j_1);
                                break;
                            }
                        }
                        // for bottom position
                        for (var i = 0; i < map.top.length; i++) {
                            if (!(map.top[i] + ent.height < entityArray[j_1].top - reduce)) {
                                // set the bomb here dev
                                detected(j_1);
                                break;
                            }
                        }
                        // for left position
                        for (var i = 0; i < map.top.length; i++) {
                            if (!(map.left[i] - reduce >
                                entityArray[j_1].left + entityArray[j_1].width)) {
                                // set the bomb here dev
                                detected(j_1);
                                break;
                            }
                        }
                        // for right position
                        for (var i = 0; i < map.top.length; i++) {
                            if (!(map.left[i] + ent.width < entityArray[j_1].left - reduce)) {
                                // set the bomb here dev
                                detected(j_1);
                                break;
                            }
                        }
                    }
                }
                return entityArray;
            }
        }
    }
    return {
        detectCollision: detectCollision
    };
})();
var bgPainter = function (img, speed, up, left, t, l, delay) {
    if (speed === void 0) { speed = 10; }
    if (delay === void 0) { delay = 0; }
    this.image = img;
    this.speed = speed;
    this.range = 0;
    this.width = this.image.width;
    this.height = this.image.height;
    this.GoesUp = up;
    this.GoesLeft = left;
    this.top = t || 0;
    this.left = l || 0;
    this.delay = delay;
    this.shouldPaint = false;
};
exports.bgPainter = bgPainter;
exports.bgPainter.prototype = {
    update: function () {
        this.range++;
        if (this.delay % this.range === 0) {
            this.shouldPaint = true;
            if (this.GoesLeft) {
                if (this.left <= -this.width) {
                    this.left = 0;
                }
                this.left -= this.speed;
            }
            if (this.GoesUp) {
                if (this.top >= this.height) {
                    this.top = 0;
                }
                this.top += this.speed;
            }
        }
    },
    paint: function (context, w, h) {
        if (this.shouldPaint === true) {
            if (this.GoesLeft) {
                context.drawImage(this.image, this.left, this.top, w, h);
                context.drawImage(this.image, this.left + this.width, this.top, this.width, h);
            }
            else {
                context.drawImage(this.image, this.left, this.top, w, h);
                context.drawImage(this.image, this.left, this.top - this.height, w, this.height);
            }
            this.shouldPaint = false;
        }
    }
};
/** game rendering algorithm */
exports.renderer = (function () {
    var canvas, id, // for pausing or playing the game
    context, 
    // variables for the timing
    fps, fpso, 
    // background varible
    lastdt = 0, pause = false, deltaTime, started = false, useBg = false;
    var bg = [], 
    // entity storage array
    entitysArray = [], screen = (0, exports.buildCanvas)("uiedbook_game_canvas"), painter = screen.getContext("2d");
    function bgPaint(img, speed, up, left, t, l, delay) {
        var bgImg = new exports.bgPainter(img, speed, up, left, t, l, delay);
        bg.push(bgImg);
        useBg = true;
    }
    function _assemble() {
        var players = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            players[_i] = arguments[_i];
        }
        if (!players)
            throw new Error("uiedbook: No players assembled");
        players.forEach(function (player) {
            entitysArray.push(player);
        });
    }
    return entitysArray;
    function getAllEtities(name) {
        if (name === "all") {
            return entitysArray;
        }
        else {
            var these = [];
            for (var i = 0; i < entitysArray.length; i++) {
                if (entitysArray[i].name === name || entitysArray[i].id === name) {
                    these.push(entitysArray[i]);
                }
            }
            return these;
        }
    }
    function copyCanvasTo(c, opacity, border) {
        if (!c) {
            throw new Error("uiedbook: the main game canvas cannot be copied to a null element");
        }
        var cx = c.getContext("2d");
        cx.drawImage(canvas, 0, 0, c.width, c.height);
        c.style.opacity = "" + opacity;
        c.style.borderRadius = "" + border;
        return c;
    }
    function toggleRendering() {
        if (!started) {
            throw new Error("uiedbook: game.start() has not been called");
        }
        if (pause) {
            window.requestAnimationFrame(animate);
            pause = false;
        }
        else {
            window.cancelAnimationFrame(id);
            pause = true;
        }
    }
    function currentFPS() {
        console.log("current fps is " + fpso);
        return fpso;
    }
    var seconds = 1000;
    function calcFPS(dt) {
        deltaTime = Math.round(dt - lastdt);
        lastdt = dt;
        seconds = seconds - deltaTime;
        fpso++;
        if (seconds < 1) {
            console.log("current fps is " + fpso);
            fpso = 0;
            seconds = 1000;
        }
        if (deltaTime > fps) {
            return true;
        }
        else {
            return false;
        }
    }
    function animate(dt) {
        id = window.requestAnimationFrame(animate);
        if (calcFPS(dt)) {
            try {
                if (useBg) {
                    bg.forEach(function (b) {
                        b.paint(painter, screen.width, screen.height);
                        b.update();
                    });
                }
                // screen.width = screen.height = 0;
                // screen.width = canvas.width;
                // screen.height = canvas.height;
                entitysArray.forEach(function (ent, i) {
                    if (ent["delete"]) {
                        entitysArray.splice(i, 1);
                        --i;
                    }
                    if (ent.border) {
                        ent.observeBorder(screen.width, screen.height);
                    }
                    ent.update(painter, dt);
                    ent.run(painter, dt);
                    ent.paint(painter);
                });
                // drawing the on-screen canvas
                context.clearRect(0, 0, screen.width, screen.height);
                context.drawImage(screen, 0, 0, canvas.width, canvas.height);
                painter.clearRect(0, 0, screen.width, screen.height);
            }
            catch (error) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw new Error("the canvas cannot be animated due to some errors | " + error);
            }
        }
    }
    function _render(canv, fpso) {
        if (fpso === void 0) { fpso = 0; }
        canvas = canv;
        context = canv.getContext("2d");
        screen.height = canvas.height;
        screen.width = canvas.width;
        fps = fpso;
        started = true;
        id = window.requestAnimationFrame(animate);
    }
    return {
        render: _render,
        assemble: _assemble,
        toggleRendering: toggleRendering,
        backgroundImage: bgPaint,
        copyCanvasTo: copyCanvasTo,
        currentFPS: currentFPS,
        getAllEtities: getAllEtities
    };
})();
exports.uiedbook = {
    css: exports.css,
    media: exports.media,
    animate: exports.animate,
    build: exports.build,
    buildTo: exports.buildTo,
    xhr: exports.xhr,
    u: exports.u,
    isEmptyObject: exports.isEmptyObject,
    intersect: exports.intersect,
    error: exports.error,
    get: exports.get,
    rad: exports.rad,
    create: exports.create,
    download: exports.download,
    debounce: exports.debounce,
    keep: exports.keep,
    check: exports.check,
    log: exports.log,
    store: exports.store,
    retrieve: exports.retrieve,
    remove: exports.remove,
    getKey: exports.getKey,
    clear: exports.clear,
    onKeys: exports.onKeys,
    continuesKeys: exports.continuesKeys,
    swipe: exports.swipe,
    buildCanvas: exports.buildCanvas,
    appendCanvas: exports.appendCanvas,
    game: exports.game,
    Entity: Entity,
    ImgPainter: ImgPainter,
    spriteSheetPainter: exports.spriteSheetPainter,
    audio: exports.audio,
    bgPainter: exports.bgPainter,
    renderer: exports.renderer,
    speaker: exports.speaker,
    speakerStop: exports.speakerStop,
    physics: physics,
    route: exports.route,
    t: exports.t,
    lit: exports.lit
};
// 40 apis contexts
if (typeof window !== "undefined") {
    window.uiedbook = exports.uiedbook;
}
