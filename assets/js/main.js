/**
* Template Name: UpConstruction
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  function createFooter() {
    const footerInfoSelector = document.querySelector("#footer > div.footer-content.position-relative > div > div > div.col-lg-4.col-md-6 > div");
    const footerInfoTextString = `สาขาวิชาฟิสิกส์  สำนักวิชาวิทยาศาสตร์ <br>
มหาวิทยาลัยเทคโนโลยีสุรนารี <br>
111  ถนนมหาวิทยาลัย <br>
ต. สุรนารี  อ. เมือง  จ. นครราชสีมา<br>
30000<br>
<strong>Phone:</strong> 044-223-000<br>
<strong>Fax:</strong> 044-224-070<br>`;

    const pFooterInfo = document.createElement("p");
    pFooterInfo.innerHTML = footerInfoTextString;
    
    const h3FooterInfo = document.createElement("h3");
    h3FooterInfo.appendChild(document.createTextNode("กลุ่มวิจัยดาราศาสตร์"));
    
    footerInfoSelector.textContent = "";
    footerInfoSelector.appendChild(h3FooterInfo);
    footerInfoSelector.appendChild(pFooterInfo);
  }
  
  function createLink(linkText, linkDestination) {
    const link = document.createElement("a");
    link.setAttribute("href", linkDestination);
    link.setAttribute("target", "_blank");
    link.appendChild(document.createTextNode(linkText));
    return link;
  }

  function createHeader() {
    const navbarSelector = document.querySelector("#navbar");
    navbarSelector.textContent = "";
    
    const projectList = [
    "project-1-Time-series", 
    "project-2-AGN-ODR",
    "project-3-brown-dwarf",
    ];
    
    const capitalProjects = projectList.map((i) => {
      // Split the string by hyphens
      const words = i.split('-');
      // Capitalize the first letter of each word and join them with spaces
      const capitalWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      return capitalWords;
    });
    
    const modulePath = window.location.pathname;
    const modulePage = modulePath.split("/").pop();
 
    const ulNav = document.createElement("ul");

    const homeDes = (modulePage.slice(0, 5) === "index" || modulePage.slice(0, 5) === "") ? "#" : "../index.html";
    const projectDes = (modulePage.slice(0, 5) === "index" || modulePage.slice(0, 5) === "") ? "#projects" : "../index.html#projects";
    
    const liHome = document.createElement("li");
    const aHome = createLink("Home", homeDes);
    liHome.appendChild(aHome);
    
    const liProject = document.createElement("li");
    const aProject = createLink("Projects", projectDes);
    liProject.appendChild(aProject);
    liProject.classList.add("dropdown");
    
    const aElement = (modulePage.slice(0, 5) === "index" || modulePage.slice(0, 5) === "") ? aHome : aProject;
    aElement.classList.add("active");
    
    const fragment = document.createDocumentFragment();
    const ulProject = document.createElement("ul");
    
    const rootURL = (modulePage.slice(0, 5) === "index" || modulePage.slice(0, 5) === "") ? "./" : "../";
    for (let i = 0; i < projectList.length; i++) {
      let linkURL = `${rootURL}${projectList[i]}/objective.html`;
      if (i === 0) {
        linkURL = "https://calm-pram-662.notion.site/Data-analysis-of-AGN-light-curves-c0080cfc3a8b4459a32b0a19250e187f";
      } else if (i === 1) {
        linkURL = "https://calm-pram-662.notion.site/LAB-2-e33b36ebacb94f3bab070dab53cc6616";        
      }
      const liSubProject = document.createElement("li");
      const aSubProject = createLink(capitalProjects[i], linkURL);
      liSubProject.appendChild(aSubProject);

      fragment.appendChild(liSubProject);
    }
    ulProject.appendChild(fragment);
    liProject.appendChild(ulProject);
    
    ulNav.appendChild(liHome);
    ulNav.appendChild(liProject);
    navbarSelector.appendChild(ulNav);
  }
  
  window.addEventListener('load', () => {
    createHeader(); // if it works, it works
    createFooter();
  });
});