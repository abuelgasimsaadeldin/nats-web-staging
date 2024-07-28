// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

//service section owl carousel
$(".service_owl-carousel").owlCarousel({
    autoplay: true,
    center: true,
    nav: true,
    loop: true,
    margin: 0,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 3,
        },
        991: {
            items: 3
        }
    }
});

// owl carousel slider js
var owl = $('.portfolio_carousel').owlCarousel({
    loop: true,
    margin: 15,
    dots: false,
    center: true,
    autoplay: true,
    navText: [
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
    ],
    autoplayHoverPause: true,
    responsive: {
        0: {
            center: false,
            items: 1,
            margin: 0
        },
        576: {
            items: 2
        },
        991: {
            center: true,
            items: 3
        }
    }
})


// owl.owlcarousel2_filter

$('.owl-filter-bar').on('click', '.item', function (e) {
    var $items = $('.owl-filter-bar a')
    var $item = $(this);
    var filter = $item.data('owl-filter')
    $items.removeClass("active");
    $item.addClass("active");
    owl.owlcarousel2_filter(filter);

    e.preventDefault();
})
/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// nice select
$(document).ready(function () {
    $('select').niceSelect();
});


document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init();

  const itemsPerPage = 8;
  let currentPage = 1;
  let filteredItems = [];
  let portfolioIsotope;

  const portfolioContainer = document.querySelector('.portfolio-container');
  const portfolioItems = Array.from(portfolioContainer.querySelectorAll('.portfolio-item'));
  const portfolioFilters = document.querySelectorAll('#portfolio-flters li');

  // Function to show items for the current page
  function showItems(page) {
    portfolioItems.forEach((item) => {
      item.style.display = 'none';
    });

    filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage).forEach(item => {
      item.style.display = 'block';
    });

    portfolioIsotope.arrange();
  }

  // Function to create pagination controls
  function createPaginationControls() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination-controls') || document.createElement('div');
    paginationContainer.className = 'pagination-controls';
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i;
        showItems(currentPage);
        updatePaginationControls();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (i > 1) {
          setTimeout(() => {
            showItems(currentPage);
          }, 420); 
        }
      });
      paginationContainer.appendChild(pageButton);
    }

    if (!paginationContainer.parentNode) {
      portfolioContainer.parentNode.appendChild(paginationContainer);
    }
  }

  // Function to update pagination controls
  function updatePaginationControls() {
    const paginationButtons = document.querySelectorAll('.pagination-controls button');
    paginationButtons.forEach(button => {
      button.classList.remove('active');
    });
    paginationButtons[currentPage - 1].classList.add('active');
  }

  // Function to filter items
  function filterItems(filter) {
    filteredItems = portfolioItems.filter(item => filter === '*' || item.classList.contains(filter.substring(1)));
    currentPage = 1;
    showItems(currentPage);
    createPaginationControls();
  }

  // Ensure images are loaded before initializing Isotope
  imagesLoaded(portfolioContainer, function() {
    portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    // Initial filter
    filterItems('*');
  });

  portfolioFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      e.preventDefault();
      portfolioFilters.forEach(el => el.classList.remove('filter-active'));
      filter.classList.add('filter-active');
      const filterValue = filter.getAttribute('data-filter');
      filterItems(filterValue);
      if (filterValue === '*') {
        setTimeout(() => {
          filterItems(filterValue);
        }, 100); 
      }
    });
  });

  // Initialize GLightbox
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  // Initialize Swiper
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
});

