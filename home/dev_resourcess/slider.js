function swipe(){


let startX = 0;
 let startY = 0;  
function handleTouchStart(e) { 
 startX = e.changedTouches[0].screenX;  
 startY = e.changedTouches[0].screenY;
 } 
 
function handleTouchEnd(e) { 
const diffX = e.changedTouches[0].screenX - startX;   
const diffY = e.changedTouches[0].screenY - startY;   
const ratioX = Math.abs(diffX / diffY);   
const ratioY = Math.abs(diffY / diffX);   
const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY); 
if (absDiff < 30) {     
return;   
}    
if (ratioX > ratioY) { 
 if (diffX >= 0) { 
   console.log('right swipe');     
   } else {      
    console.log('left swipe');    
     }  
 } else {     
   if (diffY >= 0) {     
     console.log('down swipe');     
   } else {       
   console.log('up swipe');     
   }   
   } 
   }

u("body").on("touchstart",handleTouchStart)
u("body").on("touchend",handleTouchEnd)
}
swipe()
const slide = function (){
this.slide = document.createElement("div");
this.slide.style.width = 100+"%";
this.slide.style.height = 100+"%";
this.slide.style.backgroundColor = "inherit";
this.slide.style.display = "flex";
this.slide.style.frexWrap = "wrap";
this.slide.style.margin = "0px";
this.slide.style.padding = "1px";
this.slide.style.alignItems = "center";
this.slide.style.justifyContent = "center";
this.slide.innerText = "am a slide";
this.slide.style.border = "1px red solid";
this.slide.style.borderRadius = "inherit";
return this.slide;
}

const slider = function (num = 0,mystyles){
this.parent = u("body").appendto("div",{id: "slider",});
u(this.parent).style({
height:"80vh",
width:"90vw",
fontSize: "26px",
fontFamily: "courier",
position: "fixed",
zIndex: "20",
color: "aqua",
textShadow: "0px 0px 6px white", 
boxShadow:"0px 0px 3px dimgrey,"
+" 0px 0px 86px grey inset,"
+" 0px 0px 16px  grey,"
+ "0px 0px 2px aqua inset",
borderRadius: "4% 4% 4% 4%",
border: "0px solid black",
backgroundColor: "transparent",
display: "flex",
flexDirection: "column",
textAlign: "center",
alignItems: "center",
justifyContent: "center",
padding: "0px",
top: "10vh",
left: "5vw",
});

let child;
const frag = document.createDocumentFragment();
for(let i = 0; i < num; i++){
child = new slide();
child.id = "slide"+i;
frag.append(child);
this.parent.append(child)
}
this.parent.append(frag)

let p = this.parent;
return {
get(index){
let child = document.querySelector("#slide"+index);
if(child === null){
throw new Error("slide not found");
}else{
return child;
}},
show(){
u(p).show()
},
hide(){
u(p).hide()
},};}


let books = new slider(4);
books.show()
let ano = new slider(12);
ano.hide()
books.get(2).innerText = "God is good";
