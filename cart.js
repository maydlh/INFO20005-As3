document.addEventListener("DOMContentLoaded", function () {
    // --- Cart Drawer Open/Close Logic (from cart.js) ---
    const cartIconActive = 'assets/cart-clicked.svg';
    const cartIcon = document.getElementById("bag-icon");
    const closeCartIcon = document.getElementById("cart-close-button");
    const cartContainer = document.querySelector(".cart-container");
    const cartIconDefault = 'assets/cart.svg';
    const overlayCart = document.getElementById("overlay-cart");
    const popupOverlay = document.getElementById("overlay"); // Get the specific overlay for the popup

    function resetCartIcon() {
        cartIcon.src = cartIconDefault; // reset to regular cart icon
    }
    window.openCart = function() {
        cartIcon.src = cartIconActive; // change to pink icon
        cartContainer.classList.add("active");
        document.body.classList.add("noscroll");
        overlayCart.classList.add("active");
    }
    window.closeCart = function() {
        cartContainer.classList.remove("active");
        document.body.classList.remove("noscroll");
        overlayCart.classList.remove("active");
        resetCartIcon();
    }
    if (cartIcon) cartIcon.onclick = openCart;
    if (closeCartIcon) closeCartIcon.onclick = closeCart;
    if (overlayCart) overlayCart.onclick = closeCart;

    // --- Add to Cart Popup Logic (from add-to-cart.js & trial-cart.js) ---
    const cartButtons = document.querySelectorAll(".add-to-cart-btn");
    const popup = document.querySelector(".quantity-popup");
    const popupImage = document.getElementById("popup-product-image");
    const closeBtn = document.getElementById("closePopup");
    const popupAddToCartBtn = document.querySelector(".item-add-to-cart-btn");
    const cartCountElem = document.getElementById("cart-item-number");

    // Cart structure: [{id, name, brand, price, image, qty, total}]
    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    function updateCartCount() {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      if (cartCountElem) cartCountElem.textContent = count;
      const cartCountElem2 = document.getElementById("cart-count");
      if (cartCountElem2) cartCountElem2.textContent = count;
      localStorage.setItem("cartCount", count);
    }

    // 1. Load cart count from localStorage on page load
    updateCartCount();

    // Function to reset popup button
    function resetPopupAddToCartBtn() {
      popupAddToCartBtn.disabled = false;
      popupAddToCartBtn.style.backgroundColor = "";
      popupAddToCartBtn.style.color = "";
      popupAddToCartBtn.style.border = "";
      popupAddToCartBtn.innerHTML = "ADD TO CART";
    }

    // Store product info for popup
    let popupProduct = null;
    let popupQty = 1; // Track quantity in popup

    // Elements for popup quantity controls
    const popupQtyInput = popup ? popup.querySelector('.number-input-field input[type="number"]') : null;
    const popupQtyMinus = popup ? popup.querySelector('.number-input-field .minus, .number-input-field .cart-qty-btn-minus') : null;
    const popupQtyPlus = popup ? popup.querySelector('.number-input-field .plus, .number-input-field .cart-qty-btn-add') : null;

    // When a visible "Add to Cart" button is clicked
    cartButtons.forEach(button => {
      button.addEventListener("click", function () {
        const productCard = button.closest(".product-item");
        const productImage = productCard.querySelector(".product-image");
        const id = productCard.dataset.id;
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);
        // Get brand name from .product-brand element
        const brandElem = productCard.querySelector(".product-brand");
        const brand = brandElem ? brandElem.textContent.trim() : "";

        if (!productImage) return;

        popupImage.src = productImage.src;
        popupImage.alt = productImage.alt;

        // Store product info for use in popup add
        popupProduct = {
          id,
          name,
          price,
          image: productImage.src,
          brand
        };

        popup.classList.remove("hidden");
        resetPopupAddToCartBtn();
        // Reset popup quantity to 1
        popupQty = 1;
        if (popupQtyInput) popupQtyInput.value = 1;

        // Show the overlay and prevent scrolling
        if (popupOverlay) {
            popupOverlay.classList.add('active');
        }
        document.body.classList.add("noscroll"); // Prevent scrolling
      });
    });

    // Popup plus/minus logic
    if (popupQtyInput) {
      popupQtyInput.value = 1;
      popupQtyInput.addEventListener('input', function() {
        let val = parseInt(popupQtyInput.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 3) val = 3;
        popupQty = val;
        popupQtyInput.value = val;
      });
    }
    if (popup) {
      const minusBtn = popup.querySelector('.number-input-field .minus, .number-input-field .cart-qty-btn-minus');
      const plusBtn = popup.querySelector('.number-input-field .plus, .number-input-field .cart-qty-btn-add');
      if (minusBtn) minusBtn.addEventListener('click', function() {
        if (popupQty > 1) {
          popupQty--;
          popupQtyInput.value = popupQty;
        }
      });
      if (plusBtn) plusBtn.addEventListener('click', function() {
        if (popupQty < 3) {
          popupQty++;
          popupQtyInput.value = popupQty;
        }
      });
    }

    // When close button is clicked
    if (closeBtn) closeBtn.addEventListener("click", function () {
      popup.classList.add("hidden");
      // Hide the overlay and re-enable scrolling
      if (popupOverlay) {
          popupOverlay.classList.remove('active');
      }
      document.body.classList.remove("noscroll"); // Re-enable scrolling
    });

    // When popup "Add to Cart" button is clicked
    if (popupAddToCartBtn) popupAddToCartBtn.addEventListener("click", () => {
      if (!popupProduct) return;
      let cart = getCart();
      let product = cart.find(item => item.id === popupProduct.id);
      let addQty = popupQty;
      let newQty = product ? product.qty + addQty : addQty;
      if (newQty > 3) {
        addQty = 3 - (product ? product.qty : 0);
        if (addQty <= 0) {
          alert('3 is the max number of this item you can add.');
          return;
        } else {
          alert('You can only add up to 3 of this item.');
        }
      }
      if (product) {
        product.qty += addQty;
        product.total = (product.qty * product.price).toFixed(2);
      } else {
        product = {
          ...popupProduct,
          qty: addQty,
          total: (addQty * popupProduct.price).toFixed(2)
        };
        cart.push(product);
      }
      saveCart(cart);
      updateCartCount();
      updateCartUI();
      popupAddToCartBtn.innerHTML = `
        <img src="./assets/tick.svg" alt="Added" class="btn-icon" style="width:16px; height:16px; vertical-align: middle; margin-right: 6px;">
        ADDED TO CART
      `;
      popupAddToCartBtn.style.backgroundColor = "white";
      popupAddToCartBtn.style.color = "#C31246";
      popupAddToCartBtn.style.border = "1px solid #C31246";
      popupAddToCartBtn.disabled = true;
    });

    // Add event listener to the checkout form for clearing the cart on submission
    const checkoutForm = document.querySelector('.checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function() {
            // Clear the cart from localStorage
            localStorage.removeItem("cart");
            // Reset the cart count display
            updateCartCount();
            // Note: The form will still submit and redirect to success.html
        });
    }

    // --- Cart Drawer UI Logic (from trial-cart.js) ---
    function updateCartUI() {
      console.log('updateCartUI called'); // Log when the function is called
      const cart = getCart();
      const cartList = document.getElementById('cart-product-list');
      const subtotalElem = document.querySelector('.cart-subtotal-value');
      const totalElem = document.querySelector('.cart-total-value');
      const freeShippingElem = document.getElementById('free-shipping-amount');
      const shippingSelect = document.querySelector('.cart-shipping-select'); // Get the shipping select element
      const flatRateOption = shippingSelect ? shippingSelect.querySelector('option[value="flat_rate"]') : null; // Get the flat rate option

      if (!cartList) return;

      cartList.innerHTML = '';

      let subtotal = 0;

      cart.forEach(product => {
        subtotal += product.qty * product.price;
        const item = document.createElement('div');
        item.className = 'cart-product';

        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="cart-product-image">
          <div class="cart-product-info">
            <span class="cart-product-brand">${product.brand || ''}</span>
            <span class="cart-product-name">${product.name}</span>
            <div class="number-input-field">
              <button class="cart-qty-btn-minus"><img src="./assets/minus-grey.svg" alt="-"></button>
              <input type="number" class="cart-qty-input" value="${product.qty}" min="1" max="3" data-id="${product.id}">
              <button class="cart-qty-btn-add"><img src="./assets/add-grey.svg" alt="+"></button>
            </div>
          </div>
          <div class="cart-product-right">
            <button class="cart-product-remove btn" aria-label="Remove" data-id="${product.id}"><img src="./assets/cross.svg"></button>
            <span class="cart-product-price">$${(product.qty * product.price).toFixed(2)}</span>
          </div>
        `;
        cartList.appendChild(item);

        // Divider
        const divider = document.createElement('hr');
        divider.className = 'cart-divider';
        cartList.appendChild(divider);
      });

      // Update subtotal
      if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
      console.log('Subtotal:', subtotal); // Log the calculated subtotal

      // Free shipping logic (example: $100 threshold)
      const freeShippingThreshold = 100;
      console.log('Free Shipping Threshold:', freeShippingThreshold); // Log the threshold
      const freeShippingMessageElem = document.getElementById('free-shipping-message'); // Get the paragraph element

      if (freeShippingMessageElem) {
        const remaining = Math.max(0, freeShippingThreshold - subtotal);
        if (remaining === 0) {
          freeShippingMessageElem.innerHTML = "You're qualified for free shipping!";
        } else {
          freeShippingMessageElem.innerHTML = `You have <i id="free-shipping-amount">$${remaining.toFixed(2)}</i> until you qualify for free shipping`;
        }
      }

      // Update shipping select and total
      let total = subtotal;
      console.log('Shipping Select Element:', shippingSelect); // Log the shipping select element
      console.log('Flat Rate Option Element:', flatRateOption); // Log the flat rate option element

      if (shippingSelect && flatRateOption) {
        if (subtotal >= freeShippingThreshold) {
          // Qualifies for free shipping
          console.log('Qualifies for free shipping'); // Log when free shipping is qualified
          flatRateOption.textContent = 'Free Shipping';
          flatRateOption.value = 'free';
          shippingSelect.value = 'free'; // Automatically select free shipping
          total = subtotal;
        } else {
          // Does not qualify
          console.log('Does not qualify for free shipping'); // Log when free shipping is not qualified
          // Reset option text and value if they were changed to Free Shipping
          if (flatRateOption.value === 'free') {
              flatRateOption.textContent = 'Flat rate $15.00';
              flatRateOption.value = 'flat_rate';
              // If Free Shipping was selected, reset to the default or flat rate option
              if (shippingSelect.value === 'free') {
                  shippingSelect.value = 'flat_rate'; 
              }
          }
          // If flat rate is selected, add shipping cost
          if (shippingSelect.value === 'flat_rate') {
            console.log('Flat rate selected, adding $15'); // Log when adding $15
            total += 15;
          }
        }
      }

      if (totalElem) totalElem.textContent = total > 0 ? `$${total.toFixed(2)}` : '------';
      console.log('Calculated Total:', total); // Log the final total

      // Enable/disable checkout button based on shipping selection
      const checkoutButton = document.querySelector('.cart-checkout-btn');
      if (checkoutButton) {
          if (shippingSelect && shippingSelect.value && shippingSelect.value !== 'select') {
              checkoutButton.disabled = false;
              checkoutButton.classList.remove('disabled'); 
          } else {
              checkoutButton.disabled = true;
              checkoutButton.classList.add('disabled'); 
          }
      }

      // Add event listeners for quantity and remove
      cartList.querySelectorAll('.cart-qty-btn-minus').forEach(btn => {
        btn.addEventListener('click', function() {
          const input = btn.parentElement.querySelector('.cart-qty-input');
          let cart = getCart();
          const id = input.dataset.id;
          let product = cart.find(item => item.id === id);
          if (product.qty > 1) {
            product.qty -= 1;
            product.total = (product.qty * product.price).toFixed(2);
            saveCart(cart);
            updateCartCount();
            updateCartUI();
          }
        });
      });

      cartList.querySelectorAll('.cart-qty-btn-add').forEach(btn => {
        btn.addEventListener('click', function() {
          const input = btn.parentElement.querySelector('.cart-qty-input');
          let cart = getCart();
          const id = input.dataset.id;
          let product = cart.find(item => item.id === id);
          if (product.qty < 3) {
            product.qty += 1;
            product.total = (product.qty * product.price).toFixed(2);
            saveCart(cart);
            updateCartCount();
            updateCartUI();
          } else {
            alert('3 is the max number of this item you can add.');
          }
        });
      });

      cartList.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('change', function() {
          let cart = getCart();
          const id = input.dataset.id;
          let product = cart.find(item => item.id === id);
          let newQty = parseInt(input.value, 10);

          if (newQty > 3) {
            alert('3 is the max number of this item you can add.');
            input.value = 3;
            newQty = 3;
          }
          if (newQty < 1) {
            newQty = 1;
            input.value = 1;
          }
          product.qty = newQty;
          product.total = (product.qty * product.price).toFixed(2);
          saveCart(cart);
          updateCartCount();
          updateCartUI();
        });
      });

      cartList.querySelectorAll('.cart-product-remove').forEach(btn => {
        btn.addEventListener('click', function() {
          let cart = getCart();
          const id = btn.dataset.id;
          cart = cart.filter(item => item.id !== id);
          saveCart(cart);
          updateCartCount();
          updateCartUI();
        });
      });
    }

    // Call this on page load to populate the cart
    document.addEventListener('DOMContentLoaded', updateCartUI);

    // Add event listener for shipping select changes
    const shippingSelectElement = document.querySelector('.cart-shipping-select');
    if (shippingSelectElement) {
        shippingSelectElement.addEventListener('change', updateCartUI); // Recalculate total when shipping changes
        console.log('Shipping select change listener added'); // Log when listener is added
    }


});