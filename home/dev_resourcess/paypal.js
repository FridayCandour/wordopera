const cars = ["car1jpg","car1.webp","car3.webp","car5.jpg","car6.webp","car7.jpeg","car8.jpg","car9.jpg","car10.webp","car11.jpg","car12.jpg","car13.jpg","car14.jpg"];

// delete cars variable

var index = 0;
show_slide = (i) => {
  index += i;
  var images = document.getElementsByClassName("image");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < images.length; i++) 
    images[i].style.display = "none";
  for (i = 0; i < dots.length; i++) 
    dots[i].className = dots[i].className.replace(" active", "");
  if (index > images.length - 1) 
    index = 0 ;
  if (index < 0)
    index = images.length - 1;
  images[index].style.display = "block";
  dots[index].className += " active";
}
window.addEventListener("onload", show_slide(index));
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
     show_slide(1)
       console.log('right swipe');     
       } else {     
       show_slide(-1)
        console.log('left swipe');    
         }  
     } else {     
       if (diffY >= 0) {     
         console.log('down swipe'); 
         show_slide(-1)    
       } else {       
       console.log('up swipe');    
       show_slide(1) 
       }   
       } 
       }
    
    u("body").on("touchstart",handleTouchStart)
    u("body").on("touchend",handleTouchEnd)
    setInterval(()=> show_slide(1), 4000)
    }
    swipe()


let tabs = document.querySelectorAll(".tab")
let iterator = 0
function tabsAnime() {
    if(iterator < (tabs.length -1)){     
        iterator++
        tabs[iterator].classList.toggle('tabsAnime')
    }
}
document.querySelector("#key").addEventListener('click',()=>{
        setInterval(tabsAnime, 100);
        iterator = 0
    })