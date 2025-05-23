// hamburger menu 

const hamburger = document.querySelector(".hamburger");
const menuItem = document.querySelector(".menu-item");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menuItem.classList.toggle("active");
    document.body.classList.toggle("noscroll");
})


//menu in shop in laptop

// All clickable buttons
const shop = document.querySelector(".nav-item-shop-laptop");
const painting = document.querySelector(".nav-item-painting");
const watercolour = document.querySelector(".nav-item-watercolour");

// All tabs that open
const shopItem = document.querySelector(".shop-expanded");
const paintingItem = document.querySelector(".painting-expanded");
const watercolourItem = document.querySelector(".watercolour-expanded");

// Toggle Shop Tab
shop.addEventListener("click", () => {
  if (
    shopItem.classList.contains("active") ||
    paintingItem.classList.contains("active") ||
    watercolourItem.classList.contains("active")
  ) {
    shopItem.classList.remove("active");
    paintingItem.classList.remove("active");
    watercolourItem.classList.remove("active");
  } else {
    shopItem.classList.add("active");
  }
});

// Toggle Painting Tab
painting.addEventListener("click", () => {
  paintingItem.classList.toggle("active");
});

// Toggle Watercolour Tab
watercolour.addEventListener("click", () => {
  watercolourItem.classList.toggle("active");
});

// Handle link clicks (subcategory items)
document.querySelectorAll('ul[class*="expanded__item"] > li > a').forEach(link => {
  link.addEventListener("click", function () {
    const currentUl = this.closest('ul');

    // Only remove .selected from links in the same UL group
    currentUl.querySelectorAll('a').forEach(el => el.classList.remove("selected"));

    // Add .selected to the clicked link
    this.classList.add("selected");
  });
});

