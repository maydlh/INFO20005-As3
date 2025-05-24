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