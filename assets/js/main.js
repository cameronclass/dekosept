window.addEventListener("DOMContentLoaded", (event) => {
  const headerCatalogBtn = document.querySelector(".js-open-catalog");

  if (headerCatalogBtn) {
    headerCatalogBtn.addEventListener("click", () => {
      const hamburger = document.querySelector(".js-hamburger");
      hamburger.classList.toggle("is-active");
    });
  }
});
