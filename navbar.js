// hamburger menu 

/*const hamburger = document.querySelector(".hamburger");
const menuItem = document.querySelector(".menu-item");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    menuItem.classList.toggle("active");
    document.body.classList.toggle("noscroll");
})*/


//menu in shop in laptop

// All clickable buttons
const shop = document.querySelector(".nav-item-shop-laptop");
const painting = document.querySelector(".nav-item-painting");
const watercolour = document.querySelector(".nav-item-watercolour");

// All tabs that open
const shopItem = document.querySelector(".shop-expanded");
const paintingItem = document.querySelector(".painting-expanded");
const watercolourItem = document.querySelector(".watercolour-expanded");

// Helper: remove .selected from all links inside a container
function clearSelectedLinks(container) {
  container.querySelectorAll('a.selected').forEach(link => {
    link.classList.remove("selected");
  });
}

// Toggle Shop Tab
shop.addEventListener("click", () => {
  const isAnyTabOpen =
    shopItem.classList.contains("active") ||
    paintingItem.classList.contains("active") ||
    watercolourItem.classList.contains("active");

  if (isAnyTabOpen) {
    // Close all tabs
    if (shopItem.classList.contains("active")) {
      clearSelectedLinks(shopItem); // Remove link styles from closed tab
    }
    if (paintingItem.classList.contains("active")) {
      clearSelectedLinks(paintingItem);
    }
    if (watercolourItem.classList.contains("active")) {
      clearSelectedLinks(watercolourItem);
    }

    shopItem.classList.remove("active");
    paintingItem.classList.remove("active");
    watercolourItem.classList.remove("active");
  } else {
    shopItem.classList.add("active");
  }
});

// Toggle Painting Tab
painting.addEventListener("click", () => {
  const isActive = paintingItem.classList.contains("active");

  if (isActive) {
    paintingItem.classList.remove("active");
    clearSelectedLinks(paintingItem); // Deselect painting links
  } else {
    paintingItem.classList.add("active");
  }
});

// Toggle Watercolour Tab
watercolour.addEventListener("click", () => {
  const isActive = watercolourItem.classList.contains("active");

  if (isActive) {
    watercolourItem.classList.remove("active");
    clearSelectedLinks(watercolourItem); // Deselect watercolour links
  } else {
    watercolourItem.classList.add("active");
  }
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

//when screen resize the whole sub category disappears
function handleResize() {
    const container = document.getElementById("shop-expanded-container-laptop");
    if (window.innerWidth < 820) {
      container.style.display = "none";
    } else {
      container.style.display = "flex";
    }
  }
  
  // Run once on load
  handleResize();
  
  // Run on window resize
  window.addEventListener("resize", handleResize);







//menu for mobile

  
// Hamburger and top-level menu
const hamburger = document.querySelector(".hamburger");
const menuItem = document.querySelector(".menu-item"); // <ul class="menu-item">

// Submenu triggers
const shopM = document.querySelector(".nav-item-shop-mobile a");
const paintingM = document.querySelector(".nav-item-painting-m a");
const watercolourM = document.querySelector(".nav-item-watercolour-m a");

// Submenu containers
const shopItemM = document.querySelector(".shop-menu-mobile");
const paintingItemM = document.querySelector(".painting-menu-mobile");
const watercolourItemM = document.querySelector(".watercolour-menu-mobile");

// Body for scroll locking
const body = document.body;

// Utility: Hide all menus and deactivate hamburger
function hideAllMenus() {
  menuItem.classList.remove("active");
  shopItemM.classList.remove("active");
  paintingItemM.classList.remove("active");
  watercolourItemM.classList.remove("active");
  hamburger.classList.remove("active");
  body.classList.remove("noscroll");
}

// Utility: Show one menu only
function showMenu(menu) {
  hideAllMenus(); // hide everything first
  menu.classList.add("active");
  hamburger.classList.add("active");
  body.classList.add("noscroll");
}

// Hamburger click — toggles top-level nav only
hamburger.addEventListener("click", () => {
  const isOpen = menuItem.classList.contains("active");

  if (isOpen) {
    hideAllMenus();
  } else {
    showMenu(menuItem);
  }
});

// Click: Shop (from mobile menu)
shopM.addEventListener("click", (e) => {
  e.preventDefault();
  showMenu(shopItemM);
});

// Click: Painting (from Shop submenu)
paintingM.addEventListener("click", (e) => {
  e.preventDefault();
  showMenu(paintingItemM);
});

// Click: Watercolour (from Painting submenu)
watercolourM.addEventListener("click", (e) => {
  e.preventDefault();
  showMenu(watercolourItemM);
});



