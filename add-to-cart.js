document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart-btn");
    const popup = document.querySelector(".quantity-popup");
    const popupImage = document.getElementById("popup-product-image");
    const closeBtn = document.getElementById("closePopup");
    const popupAddToCartBtn = document.querySelector(".item-add-to-cart-btn");
    const cartCountElem = document.getElementById("cart-item-number");
  
    // 1. Load cart count from localStorage on page load
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountElem.textContent = cartCount;
  
    // Function to reset popup button
    function resetPopupAddToCartBtn() {
      popupAddToCartBtn.disabled = false;
      popupAddToCartBtn.style.backgroundColor = "";
      popupAddToCartBtn.style.color = "";
      popupAddToCartBtn.style.border = "";
    }
  
    // When a visible "Add to Cart" button is clicked
    cartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const productCard = button.closest(".product-item");
        const productImage = productCard.querySelector(".product-image");
  
        if (!productImage) return;
  
        popupImage.src = productImage.src;
        popupImage.alt = productImage.alt;
  
        popup.classList.remove("hidden");
        resetPopupAddToCartBtn();
      });
    });
  
    // When close button is clicked
    closeBtn.addEventListener("click", function () {
      popup.classList.add("hidden");
    });
  
    // When popup "Add to Cart" button is clicked
    popupAddToCartBtn.addEventListener("click", () => {
      cartCount++;
      cartCountElem.textContent = cartCount;
  
      // 2. Save cart count to localStorage
      localStorage.setItem("cartCount", cartCount);
  
      popupAddToCartBtn.innerHTML = `
        <img src="./assets/tick.svg" alt="Added" class="btn-icon" style="width:16px; height:16px; vertical-align: middle; margin-right: 6px;">
        ADDED TO CART
      `;
      popupAddToCartBtn.style.backgroundColor = "white";
      popupAddToCartBtn.style.color = "#C31246";
      popupAddToCartBtn.style.border = "1px solid #C31246";
      popupAddToCartBtn.disabled = true;
    });
  });
  