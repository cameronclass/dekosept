window.addEventListener("DOMContentLoaded", (event) => {
  /* Header Catalog */
  const headerCatalogBtn = document.querySelector(".js-open-catalog");

  if (headerCatalogBtn) {
    headerCatalogBtn.addEventListener("click", () => {
      const hamburger = document.querySelector(".js-hamburger");
      hamburger.classList.toggle("is-active");
    });
  }

  /* Swiper */
  if (document.querySelector(".main-products__tags_slider")) {
    new Swiper(".main-products__tags_slider", {
      slidesPerView: "auto",
      spaceBetween: 24,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: ".main-products__tags .swiper-button-next",
        prevEl: ".main-products__tags .swiper-button-prev",
      },
    });
  }
});
