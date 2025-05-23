// hamburger menu 

const hamburger = document.querySelector(".hamburger");
const menuItem = document.querySelector(".menu-item");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menuItem.classList.toggle("active");
    document.body.classList.toggle("noscroll");
})


//menu in shop in laptop
const shop = document.querySelector(".nav-item-shop-laptop");
const shopItem = document.querySelector(".shop-expanded");
shop.addEventListener("click",()=>{
    shopItem.classList.toggle("active");
})

//laptop: menu option sfter shop is clicked

