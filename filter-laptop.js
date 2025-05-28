const filterToggles = document.querySelectorAll(".filter-toggle");


filterToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const parent = toggle.closest(".filter__group");
    const options = parent.querySelector(".filter-options");
    const icon = toggle.querySelector(".toggle-icon");

    // Toggle active classes
    options.classList.toggle("active");
    icon.classList.toggle("active");  
  });
});

//click on daniel smith to remove all sennelier product

const checkboxBrand = document.getElementById("daniel-smith");
const sennelier = document.querySelectorAll("div.sen");

checkboxBrand.addEventListener("change", function () {
    sennelier.forEach(item => {
      if (checkboxBrand.checked) {
        item.style.display = "none";
      } else {
        item.style.display = "block"; 
      }
    });
  });


  const checkboxType = document.getElementById("mg");
const mediumAndGround = document.querySelectorAll("div.product-item:not(.mg)");

checkboxType.addEventListener("change", function () {
    mediumAndGround.forEach(item => {
      if (checkboxType.checked) {
        item.style.display = "none";
      } else {
        item.style.display = "block"; 
      }
    });
  });


  //new
// Get both mobile and laptop checkboxes

const danielSmithLaptop = document.querySelector(".danielSmithLaptop");
const mediumGroundsLaptop = document.querySelector(".mediumGroundsLaptop");

// Synchronize Daniel Smith checkbox
if (danielSmithMobile && danielSmithLaptop) {
  danielSmithMobile.addEventListener("change", () => {
    danielSmithLaptop.checked = danielSmithMobile.checked;
    // Optionally, call your filter logic here
    // applyFilterLogic();
  });
  danielSmithLaptop.addEventListener("change", () => {
    danielSmithMobile.checked = danielSmithLaptop.checked;
    // Optionally, call your filter logic here
    // applyFilterLogic();
  });
}

// Synchronize Medium/Grounds checkbox
if (mediumGroundsMobile && mediumGroundsLaptop) {
  mediumGroundsMobile.addEventListener("change", () => {
    mediumGroundsLaptop.checked = mediumGroundsMobile.checked;
    // Optionally, call your filter logic here
    // applyFilterLogic();
  });
  mediumGroundsLaptop.addEventListener("change", () => {
    mediumGroundsMobile.checked = mediumGroundsLaptop.checked;
    // Optionally, call your filter logic here
    // applyFilterLogic();
  });
}
  //new