window.addEventListener("DOMContentLoaded", (event) => {
  function initSwiper() {
    if (document.querySelector(".main-products__tags_slider")) {
      /* Slider */
      new Swiper(".main-products__tags_slider", {
        slidesPerView: "auto",
        spaceBetween: 24,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: ".main-products__tags .swiper-button-next",
          prevEl: ".main-products__tags .swiper-button-prev",
        },

        breakpoints: {
          0: {
            spaceBetween: 10,
          },
          768: {
            spaceBetween: 24,
          },
        },
      });
    }

    if (document.querySelector(".main-products__cards .swiper")) {
      var productsSlider = new Swiper(".main-products__cards .swiper", {
        slidesPerView: 4,
        spaceBetween: 24,
        centeredSlides: false,
        loop: false,
        observer: true,
        navigation: {
          nextEl: ".main-products__cards .swiper-button-next",
          prevEl: ".main-products__cards .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: "auto",
            centeredSlides: true,
          },
          768: {
            slidesPerView: "auto",
            centeredSlides: true,
            grid: {
              fill: "row",
              rows: 1,
            },
          },
          992: {
            slidesPerView: "auto",
            grid: {
              fill: "row",
              rows: 1,
            },
          },
          1200: {
            grid: {
              fill: "row",
              rows: 2,
            },
          },
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
        breakpoints: {
          0: {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            centeredSlides: true,
            slidesPerView: 2,
            spaceBetween: 35,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
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
        breakpoints: {
          0: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 35,
          },
        },
      });
    }

    if (document.querySelector(".company__slider")) {
      new Swiper(".company__slider", {
        slidesPerView: 3,
        spaceBetween: 48,
        loop: true,
        navigation: {
          nextEl: ".company__slider .swiper-button-next",
          prevEl: ".company__slider .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          576: {
            slidesPerView: 2.5,
            spaceBetween: 48,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 48,
          },
        },
      });
    }

    if (document.querySelector(".news-one__slider")) {
      new Swiper(".news-one__slider", {
        slidesPerView: 3,
        spaceBetween: 48,
        loop: true,
        navigation: {
          nextEl: ".news-one__slider .swiper-button-next",
          prevEl: ".news-one__slider .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          576: {
            slidesPerView: 2.5,
            spaceBetween: 48,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 48,
          },
        },
      });
    }

    if (document.querySelector(".card__slider")) {
      new Swiper(".card__slider", {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        navigation: {
          nextEl: ".card__sliders .swiper-button-next",
          prevEl: ".card__sliders .swiper-button-prev",
        },
        thumbs: {
          // Свайпер с мениатюрами
          swiper: {
            el: ".card__mini-slider",
            breakpoints: {
              0: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              300: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              350: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              392: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              470: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
              993: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1100: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            },
          },
        },
      });
    }

    if (document.querySelector(".not-found__slider ")) {
      new Swiper(".not-found__slider ", {
        slidesPerView: 3.5,
        spaceBetween: 40,
        loop: true,
        navigation: {
          nextEl: ".not-found__slider  .swiper-button-next",
          prevEl: ".not-found__slider  .swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          460: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 40,
          },
          973: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1070: {
            slidesPerView: 3.2,
            spaceBetween: 40,
          },
          1340: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
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
  }

  initSwiper();

  window.addEventListener("resize", initSwiper);
});
