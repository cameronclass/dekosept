  // == Smooth Navigation =============================================
  function pageNavigation() {
  	document.addEventListener("click", pageNavigationAction);
  	function pageNavigationAction(e) {
  		if (e.type === "click") {
  			const targetElement = e.target;
  			if (targetElement.closest('[data-goto]')) {
  				const gotoLink = targetElement.closest('[data-goto]');
  				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
  				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
  				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
  				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;

  				gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);

          e.preventDefault();
  			}
  		}
  	}
  }
  pageNavigation();

  // == Smooth Scrolling =============================================
  let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  	const targetBlockElement = document.querySelector(targetBlock);
  	if (targetBlockElement) {
  		let headerItemHeight = 0;
  		let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
  		targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
  		targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
  		window.scrollTo({
  			top: targetBlockElementPosition,
  			behavior: "smooth"
  		});
  	} 
  };


  // == Highlight active side-bar menu item ==========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const headerItem = document.querySelectorAll('.news-one__menu-link');
        headerItem.forEach((link) => {
          link.classList.toggle('_active-item', link.getAttribute('href').replace('#', '') === entry.target.id);
        });
      }
    });
  }, {
    threshold: 0.4,
  });

  const sections = document.querySelectorAll('.news-one__article');
  sections.forEach((section) => {
    observer.observe(section);
  });
