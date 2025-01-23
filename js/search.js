const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");
const overlay = document.querySelector(".overlay");

searchButton.addEventListener("click", function () {
  searchBar.classList.toggle("show");
  overlay.classList.toggle("show");
  searchButton.style.display = "none";
});

overlay.addEventListener("click", function () {
  searchBar.classList.remove("show");
  overlay.classList.remove("show");
  searchButton.style.display = "block";
});
