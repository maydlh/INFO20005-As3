/*clicked on the cancel button will hide the cart, and opening the cart will make the button turn pink, and 
a dark overlay outside of the cart popup*/
    const cartIconActive = 'assets/cart-clicked.svg';
    const cartIcon = document.getElementById("bag-icon");
    const closeCart = document.getElementById("cart-close-button");
    const cartContainer = document.querySelector(".cart-container")
    const cartIconDefault = 'assets/cart.svg';

    function resetCartIcon() {
        cartIcon.src = cartIconDefault; // reset to regular cart icon
      }
      
      function openCart() {
        cartIcon.src = cartIconActive; // change to pink icon
        cartContainer.classList.add("active");
        document.body.classList.add("noscroll");
      }
      
      function closeCart() {
        resetCartIcon();
        cartContainer.classList.remove("active");
        document.body.classList.remove("noscroll");
      }
    

    overlay.classList.remove("active");
    overlay.classList.add("active");