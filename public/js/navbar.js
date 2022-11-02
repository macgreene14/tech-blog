// navbar hamburger mobile menu activater
const burgerIcon = document.getElementById("burger");
const navbarMenu = document.getElementById("navbarBasicExample");

burgerIcon.addEventListener("click", () => {
  navbarMenu.classList.toggle("is-active");
});
