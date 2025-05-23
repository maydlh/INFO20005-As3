// hamburger menu 

const hamburger = document.querySelector(".hamburger");
const menuItem = document.querySelector(".menu-item");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menuItem.classList.toggle("active");
    document.body.classList.toggle("noscroll");
})


//menu in shop
const shop = document.querySelector(".nav-item-shop");
shop.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menuItem.classList.toggle("active");
    document.body.classList.toggle("noscroll");
})