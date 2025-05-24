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
  if (danielSmith.checked || mediumGrounds.checked) {
    applyFilter.disabled = false;
  } else {
    applyFilter.disabled = true;
  }
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

    const show =
      (!danielSmith.checked || isDS) &&
      (!mediumGrounds.checked || isMedium);

    product.style.display = show ? "block" : "none";
  });

  closeFilter();
});
