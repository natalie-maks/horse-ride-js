const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  if (menuBtn.classList.contains("open")) {
    menu.classList.remove("hidden");
    setTimeout(() => {
      menu.classList.add("open");
    }, 50);
  } else {
    menu.classList.remove("open");
    setTimeout(() => {
      menu.classList.add("hidden");
    }, 3000);
  }
});
