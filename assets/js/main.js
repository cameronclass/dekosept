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


  /* Modal */
  const modalOpen = document.querySelectorAll(".js-modal-open");
  const modalContent = document.querySelectorAll(".js-modal-content");

  if (modalOpen) {
    modalOpen.forEach((element) => {
      let currentBtn = element.dataset.modalBtn;

      element.addEventListener("click", () => {
        modalContent.forEach((element) => {
          let currentModal = element.dataset.modalContent;

          let overlay = element.querySelector(":scope .overlay");
          let modalClose = element.querySelector(":scope .btn-close");
          overlay.onclick = () => {
            element.classList.remove("active");
          };

          modalClose.onclick = () => {
            element.classList.remove("active");
          };

          if (currentBtn == currentModal) {
            element.classList.add("active");
          }
        });
      });
    });
  }
});
