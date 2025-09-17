document.addEventListener("DOMContentLoaded", () => {
  const textOptions = document.querySelectorAll(".text-option");
  const showcaseImage = document.getElementById("showcase-image");

  textOptions.forEach(option => {
    option.addEventListener("click", () => {
      // Remove active class from all options
      textOptions.forEach(opt => opt.classList.remove("active"));

      // Add active class to clicked one
      option.classList.add("active");

      // Update showcase image with fade transition
      const newImage = option.getAttribute("data-image");
      showcaseImage.classList.add("fade-out");
      setTimeout(() => {
        showcaseImage.src = newImage;
        showcaseImage.classList.remove("fade-out");
        showcaseImage.classList.add("fade-in");
      }, 300);
      setTimeout(() => {
        showcaseImage.classList.remove("fade-in");
      }, 600);
    });
  });
});
