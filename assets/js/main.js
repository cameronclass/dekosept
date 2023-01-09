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

  if (document.querySelector(".main-products-slider__slider .swiper")) {
    new Swiper(".main-products-slider__slider .swiper", {
      slidesPerView: "auto",
      spaceBetween: 24,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: ".main-products-slider__slider .swiper-button-next",
        prevEl: ".main-products-slider__slider .swiper-button-prev",
      },
    });
  }

  if (document.querySelector(".main-reviews__slider .swiper")) {
    new Swiper(".main-reviews__slider .swiper", {
      slidesPerView: 3,
      spaceBetween: 35,
      loop: true,
      navigation: {
        nextEl: ".main-reviews__slider .swiper-button-next",
        prevEl: ".main-reviews__slider .swiper-button-prev",
      },
    });
  }

  if (document.querySelector(".partners__slider .swiper")) {
    new Swiper(".partners__slider .swiper", {
      slidesPerView: 6,
      spaceBetween: 35,
      loop: true,
      navigation: {
        nextEl: ".partners__slider .swiper-button-next",
        prevEl: ".partners__slider .swiper-button-prev",
      },
    });
  }

  if (document.querySelector(".main-card-slider")) {
    new Swiper(".main-card-slider", {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: ".main-card-slider .swiper-pagination",
        clickable: true,
      },
    });

    document
      .querySelectorAll(".main-card-slider .swiper-pagination-bullet")
      .forEach((el) =>
        el.addEventListener("mouseover", (event) => {
          el.click();
        })
      );
  }

  new Accordion(".accordion-container");

  Fancybox.bind("[data-fancybox]", {});
});
