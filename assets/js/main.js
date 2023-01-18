window.addEventListener("DOMContentLoaded", (event) => {
  /* Tabs */
  function tabs() {
    const tabs = document.querySelectorAll("[data-tabs]");
    let tabsActiveHash = [];

    if (tabs.length > 0) {
      tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add("_tab-init");
        tabsBlock.setAttribute("data-tabs-index", index);
        tabsBlock.addEventListener("click", setTabsAction);
        initTabs(tabsBlock);
      });
    }
    // Установка позиций заголовков
    function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach((tabsMediaItem) => {
        tabsMediaItem = tabsMediaItem.item;
        let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
        let tabsTitleItems =
          tabsMediaItem.querySelectorAll("[data-tabs-title]");
        let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
        let tabsContentItems =
          tabsMediaItem.querySelectorAll("[data-tabs-item]");
        tabsTitleItems = Array.from(tabsTitleItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems = Array.from(tabsContentItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems.forEach((tabsContentItem, index) => {
          if (matchMedia.matches) {
            tabsContent.append(tabsTitleItems[index]);
            tabsContent.append(tabsContentItem);
            tabsMediaItem.classList.add("_tab-spoller");
          } else {
            tabsTitles.append(tabsTitleItems[index]);
            tabsMediaItem.classList.remove("_tab-spoller");
          }
        });
      });
    }
    // Работа с контентом
    function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
        const tabsActiveTitle = tabsBlock.querySelector(
          "[data-tabs-titles]>._tab-active"
        );
        tabsActiveTitle
          ? tabsActiveTitle.classList.remove("_tab-active")
          : null;
      }
      if (tabsContent.length) {
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          tabsTitles[index].setAttribute("data-tabs-title", "");
          tabsContentItem.setAttribute("data-tabs-item", "");

          if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
            tabsTitles[index].classList.add("_tab-active");
          }
          tabsContentItem.hidden =
            !tabsTitles[index].classList.contains("_tab-active");
        });
      }
    }
    function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
        if (tabsBlock.hasAttribute("data-tabs-animate")) {
          return tabsBlock.dataset.tabsAnimate > 0
            ? Number(tabsBlock.dataset.tabsAnimate)
            : 500;
        }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
        // const isHash = tabsBlock.hasAttribute("data-tabs-hash");
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          if (tabsTitles[index].classList.contains("_tab-active")) {
            if (tabsBlockAnimate) {
              _slideDown(tabsContentItem, tabsBlockAnimate);
            } else {
              tabsContentItem.hidden = false;
            }
            // if (isHash && !tabsContentItem.closest(".popup")) {
            //   setHash(`tab-${tabsBlockIndex}-${index}`);
            // }
          } else {
            if (tabsBlockAnimate) {
              _slideUp(tabsContentItem, tabsBlockAnimate);
            } else {
              tabsContentItem.hidden = true;
            }
          }
        });
      }
    }
    function setTabsAction(e) {
      const el = e.target;
      if (el.closest("[data-tabs-title]")) {
        const tabTitle = el.closest("[data-tabs-title]");
        const tabsBlock = tabTitle.closest("[data-tabs]");
        if (
          !tabTitle.classList.contains("_tab-active") &&
          !tabsBlock.querySelector("._slide")
        ) {
          let tabActiveTitle = tabsBlock.querySelectorAll(
            "[data-tabs-title]._tab-active"
          );
          tabActiveTitle.length
            ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
                (item) => item.closest("[data-tabs]") === tabsBlock
              ))
            : null;
          tabActiveTitle.length
            ? tabActiveTitle[0].classList.remove("_tab-active")
            : null;
          tabTitle.classList.add("_tab-active");
          setTabsStatus(tabsBlock);
        }
        e.preventDefault();
      }
    }
  }
  tabs();

  // == QUANTITY =================================================
  function formQuantity() {
    document.addEventListener("click", function (e) {
      let targetElement = e.target;
      if (
        targetElement.closest("[data-quantity-plus]") ||
        targetElement.closest("[data-quantity-minus]")
      ) {
        const valueElement = targetElement
          .closest("[data-quantity]")
          .querySelector("[data-quantity-value]");
        let value = parseInt(valueElement.value);
        if (targetElement.hasAttribute("data-quantity-plus")) {
          value++;
          if (
            +valueElement.dataset.quantityMax &&
            +valueElement.dataset.quantityMax < value
          ) {
            value = valueElement.dataset.quantityMax;
          }
        } else {
          --value;
          if (+valueElement.dataset.quantityMin) {
            if (+valueElement.dataset.quantityMin > value) {
              value = valueElement.dataset.quantityMin;
            }
          } else if (value < 1) {
            value = 1;
          }
        }
        targetElement
          .closest("[data-quantity]")
          .querySelector("[data-quantity-value]").value = value;
      }
    });
  }
  formQuantity();

  /* Header Catalog */
  const headerCatalogBtn = document.querySelectorAll(".js-open-catalog");
  const jsHeaderCatalog = document.querySelector(".js-header-catalog");
  const jsHeaderSearch = document.querySelector(".js-header-search");
  const jsHeaderSearchContent = document.querySelector(
    ".js-header-search-content"
  );
  const jsOpenSearch = document.querySelector(".js-open-search");
  const jsSearchBlock = document.querySelector(".js-search-block");
  const mainBlock = document.querySelector(".main");
  const jsFilterOpen = document.querySelector(".js-filter-open");
  const jsFilterClose = document.querySelector(".js-filter-close");
  const jsFilterBlock = document.querySelector(".js-filter-block");

  if (headerCatalogBtn) {
    headerCatalogBtn.forEach((item) => {
      item.addEventListener("click", () => {
        const hamburger = document.querySelectorAll(".js-hamburger");
        hamburger.forEach((item) => {
          item.classList.toggle("is-active");
        });

        jsHeaderCatalog.classList.toggle("_active");
      });
    });
  }

  if (jsHeaderSearch) {
    jsHeaderSearch.addEventListener("focus", function () {
      jsHeaderSearchContent.classList.add("_active");
    });
    jsHeaderSearch.addEventListener("blur", function () {
      jsHeaderSearchContent.classList.remove("_active");
    });
  }

  if (jsOpenSearch) {
    jsOpenSearch.addEventListener("click", () => {
      if (jsSearchBlock) {
        jsSearchBlock.classList.toggle("_active");
      }
      mainBlock.classList.toggle("_active");
    });
  }

  if (jsFilterOpen) {
    jsFilterOpen.addEventListener("click", () => {
      jsFilterBlock.classList.add("_active");
      mainBlock.classList.add("_active");
    });
  }

  if (jsFilterClose) {
    jsFilterClose.addEventListener("click", () => {
      jsFilterBlock.classList.remove("_active");
      mainBlock.classList.remove("_active");
    });
  }

  if (mainBlock) {
    mainBlock.addEventListener("click", () => {
      if (mainBlock.classList.contains("_active")) {
        mainBlock.classList.remove("_active");
        if (jsSearchBlock) {
          jsSearchBlock.classList.remove("_active");
        }
      }
    });
  }

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

  if (document.querySelector(".accordion-container")) {
    new Accordion(".accordion-container");
  }
  if (document.querySelector(".accordion-container-second")) {
    new Accordion(".accordion-container-second");
  }
  if (document.querySelector(".termins-accordion")) {
    new Accordion(".termins-accordion");
  }
  if (document.querySelector(".filter-accordion")) {
    new Accordion(".filter-accordion", {
      showMultiple: true,
    });
  }

  Fancybox.bind("[data-fancybox]", {});
});
