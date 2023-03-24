const form = document.querySelector("form");
const successWindow = document.getElementById("success-window");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  successWindow.classList.remove("hidden");
  window.addEventListener("click", () => {
    successWindow.classList.add("hidden");
  });
  form.reset();
});
