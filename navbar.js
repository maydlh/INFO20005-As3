// hamburger menu 

const hamburger = document.querySelector(".hamburger");
const menuItem = document.querySelector(".menu-item");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menuItem.classList.toggle("active");
    document.body.classList.toggle("noscroll");
})


//menu in shop in laptop

//all the clickable buttons
const shop = document.querySelector(".nav-item-shop-laptop");
const painting = document.querySelector(".nav-item-painting");
const watercolour = document.querySelector(".nav-item-watercolour");


//all the tabs that opens
const shopItem = document.querySelector(".shop-expanded");
const paintingItem = document.querySelector(".painting-expanded");
const watercolourItem = document.querySelector(".watercolour-expanded");

shop.addEventListener("click",()=>{
    shopItem.classList.toggle("active");
}) //display 1st list of subitem

painting.addEventListener("click",()=>{
    paintingItem.classList.toggle("active");
}) //display 2nd list of subitem

watercolour.addEventListener("click",()=>{
    watercolourItem.classList.toggle("active");
}) //display 3rdd list of subitem


