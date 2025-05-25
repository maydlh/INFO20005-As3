

document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart-btn");
    const popup = document.querySelector(".quantity-popup");
    const popupImage = document.getElementById("popup-product-image");//the placeholder
    const closeBtn = document.getElementById("closePopup");
  
    cartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const productCard = button.closest(".product-item");
        const productImage = productCard.querySelector(".product-image");
  
        // Populate the popup with the product image
        popupImage.src = productImage.src;
        popupImage.alt = productImage.alt;
  
        // Show the popup
        popup.classList.remove("hidden");
      });
    });
  
    // Close only when close button is clicked
    closeBtn.addEventListener("click", function () {
      popup.classList.add("hidden");
    });
  });
  