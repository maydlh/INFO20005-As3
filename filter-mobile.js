
  const filterBtn = document.getElementById("filterBtn");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("bottomPopup");
const applyFilter = document.getElementById("applyFilter");

const danielSmith = document.getElementById("danielSmith");
const mediumGrounds = document.getElementById("mediumGrounds");

const brandCount = document.getElementById("brandCount");
const typeCount = document.getElementById("typeCount");

const allProducts = document.querySelectorAll(".product-item");

function updateApplyButton() {
  
  applyFilter.disabled = false;
  
}

function closeFilter() {
  popup.classList.remove("active");
  overlay.classList.remove("active");
  filterBtn.classList.remove("active");
  document.body.classList.remove("noscroll");
}

// Toggle popup
filterBtn.addEventListener("click", () => {
  popup.classList.add("active");
  overlay.classList.add("active");
  filterBtn.classList.add("active");
  document.body.classList.add("noscroll");
});

// Close when clicking overlay
overlay.addEventListener("click", closeFilter);

// Checkbox changes
danielSmith.addEventListener("change", () => {
  brandCount.textContent = danielSmith.checked ? "(1)" : "";
  updateApplyButton();
});

mediumGrounds.addEventListener("change", () => {
  typeCount.textContent = mediumGrounds.checked ? "(1)" : "";
  updateApplyButton();
});

// Apply filter logic
applyFilter.addEventListener("click", () => {
  allProducts.forEach(product => {
    const isDS = product.classList.contains("ds");
    const isMedium = product.classList.contains("mg");

    let show = true;

    if (danielSmith.checked && mediumGrounds.checked) {
      // Show only products that are both ds and mg
      show = isDS && isMedium;
    } else if (danielSmith.checked) {
      // Show only Daniel Smith products
      show = isDS;
    } else if (mediumGrounds.checked) {
      // Show only Medium/Ground products
      show = isMedium;
    } else {
      // Neither checked: show all watercolour
      show = allProducts;
    }

    product.style.display = show ? "block" : "none";
  });

  closeFilter();
});




// Get both mobile and laptop checkboxes
const danielSmithMobile = document.querySelector(".danielSmithMobile");
const mediumGroundsMobile = document.querySelector(".mediumGroundsMobile");


// Synchronize Daniel Smith checkbox
if (danielSmithMobile && danielSmithLaptop) {
  danielSmithMobile.addEventListener("change", () => {
    danielSmithLaptop.checked = danielSmithMobile.checked;
    
  });
  danielSmithLaptop.addEventListener("change", () => {
    danielSmithMobile.checked = danielSmithLaptop.checked;
    
  });
}

// Synchronize Medium/Grounds checkbox
if (mediumGroundsMobile && mediumGroundsLaptop) {
  mediumGroundsMobile.addEventListener("change", () => {
    mediumGroundsLaptop.checked = mediumGroundsMobile.checked;
    
  });
  mediumGroundsLaptop.addEventListener("change", () => {
    mediumGroundsMobile.checked = mediumGroundsLaptop.checked;
    
  });
}

