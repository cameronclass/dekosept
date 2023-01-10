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
		if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
			const valueElement = targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]');
			let value = parseInt(valueElement.value);
			if (targetElement.hasAttribute('data-quantity-plus')) {
				value++;
				if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) {
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
			targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]').value = value;
		}
	});
}
formQuantity();

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

  if (document.querySelector(".card__slider")) {
    new Swiper(".card__slider", {
      slidesPerView: 1,
      spaceBetween: 24,
      autoHeight: false,
      loop: true,
      navigation: {
        nextEl: ".card__sliders .swiper-button-next",
        prevEl: ".card__sliders .swiper-button-prev",
      },
     
      thumbs: {
        // Свайпер с мениатюрами
        // и его настройки
        swiper: {
          el: '.card__sliders .card__mini-slider',
          slidesPerView: 6,
          spaceBetween: 20,
           breakpoints: {
            320: {
              slidesPerView: 3,
              autoHeight: true,
            },
            500: {
              slidesPerView: 5,
            },
            578: {
              slidesPerView: 6,
            },
            993: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 6,
            }
          },
        }
      },
    });
  }

  new Accordion(".accordion-container");

  Fancybox.bind("[data-fancybox]", {});
});
