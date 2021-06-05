// Designed by:  Mauricio Bucardo
// Original image:
// https://dribbble.com/shots/5619509-Animated-Tab-Bar

"use strict"; 

const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {

    menu.style.removeProperty("--timeOut");

    console.log(activeItem);
    console.log(item);

    var home = document.getElementById('home')
    var transaction = document.getElementById('transaction')
    var about = document.getElementById('about')
    var map = document.getElementById('map')

    transaction.classList.add('hide')        
    about.classList.add('hide')        
    home.classList.add('hide')   
    map.classList.add('hide')   

    if (item.classList.contains("map")) {

        map.classList.remove('hide')        

    }else if(item.classList.contains("home")){

        home.classList.remove('hide') 

    }else if(item.classList.contains("transaction")){

        transaction.classList.remove('hide') 

    }else if(item.classList.contains("about")){
        
        about.classList.remove('hide') 
    } 

    if (activeItem == item) return;

    
    if (activeItem) {
        activeItem.classList.remove("active");
    }

    
    item.classList.add("active");
    body.style.backgroundColor = bgColorsBody[index];
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
    
    
}

function offsetMenuBorder(element, menuBorder) {

    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

    item.addEventListener("click", () => clickItem(item, index));
    
})

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});