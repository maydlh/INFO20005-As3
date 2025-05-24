const toggleBtn = document.querySelectorAll(".toggle-icon");

toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });
