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
    }, 300);
  }
});

const linesHeaders = document.querySelectorAll(".lines .header");

linesHeaders.forEach((header) => {
  header.addEventListener("click", (e) => {
    e.target.parentElement.classList.toggle("active");
  });
});
