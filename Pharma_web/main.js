$(document).ready(function() {
    
    $('#heroSlider').carousel({
      interval: 5000
    });
    
   
    $('.product-carousel').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('#testimonialCarousel').carousel({
      interval: 8000
    });
    
   
    $('.search-box button').click(function(e) {
      e.preventDefault();
      var searchTerm = $('.search-box input').val();
      if(searchTerm.length > 2) {
        window.location.href = 'products.html?search=' + encodeURIComponent(searchTerm);
      }
    });
    
  
    $('.btn-add-to-cart').click(function(e) {
      e.preventDefault();
      var product = $(this).closest('.product-item').find('h3 a').text();
      var price = $(this).closest('.product-item').find('.price').text();
      
      
      alert(product + ' added to cart for ' + price);
      
    
      var count = parseInt($('.cart-count').text());
      $('.cart-count').text(count + 1);
    });
    
  
    $('.qty-plus').click(function(e) {
      e.preventDefault();
      var input = $(this).siblings('input');
      var value = parseInt(input.val());
      input.val(value + 1);
      updateCartTotal();
    });
    
    $('.qty-minus').click(function(e) {
      e.preventDefault();
      var input = $(this).siblings('input');
      var value = parseInt(input.val());
      if (value > 1) {
        input.val(value - 1);
        updateCartTotal();
      }
    });
    

    $('.btn-remove').click(function(e) {
      e.preventDefault();
      $(this).closest('tr').fadeOut(300, function() {
        $(this).remove();
        updateCartTotal();
      });
    });
    
    function updateCartTotal() {
      var total = 0;
      $('.cart-table tbody tr').each(function() {
        var price = parseFloat($(this).find('td:nth-child(2)').text().replace('$', ''));
        var qty = parseInt($(this).find('input').val());
        var rowTotal = price * qty;
        $(this).find('td:nth-child(4)').text('$' + rowTotal.toFixed(2));
        total += rowTotal;
      });
      
      $('.summary-row:nth-child(1) span:last-child').text('$' + total.toFixed(2));
      $('.summary-row.total span:last-child').text('$' + (total + 5).toFixed(2));
    }
    
    if($("#price-slider").length) {
      $("#price-slider").slider({
        range: true,
        min: 0,
        max: 500,
        values: [10, 500],
        slide: function(event, ui) {
          $("#price-min").text('$' + ui.values[0]);
          $("#price-max").text('$' + ui.values[1]);
          filterProducts();
        }
      });
      
      $("#price-min").text('$' + $("#price-slider").slider("values", 0));
      $("#price-max").text('$' + $("#price-slider").slider("values", 1));
    }
    
    function filterProducts() {
      var minPrice = $("#price-slider").slider("values", 0);
      var maxPrice = $("#price-slider").slider("values", 1);
      
      $('.product-grid .product-item').each(function() {
        var price = parseFloat($(this).find('.price').text().replace('$', ''));
        if(price >= minPrice && price <= maxPrice) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
    
  
    $('.animate-on-scroll').each(function() {
      $(this).appear(function() {
        $(this).addClass('animated fadeInUp');
      }, {accY: -100});
    });
    

    $('a[href*="#"]').on('click', function(e) {
      e.preventDefault();
      
      $('html, body').animate(
        {
          scrollTop: $($(this).attr('href')).offset().top - 80,
        },
        500,
        'linear'
      );
    });
    

    $('form').submit(function(e) {
      var valid = true;
      
      $(this).find('[required]').each(function() {
        if($(this).val() === '') {
          valid = false;
          $(this).addClass('is-invalid');
        } else {
          $(this).removeClass('is-invalid');
        }
      });
      
      if(!valid) {
        e.preventDefault();
        $(this).find('.is-invalid').first().focus();
      }
    });
  });
  // Check authentication before checkout
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in when trying to checkout
  const checkoutButtons = document.querySelectorAll('a[href="checkout.html"], button[href="checkout.html"]');
  
  checkoutButtons.forEach(button => {
      button.addEventListener('click', function(e) {
          const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
          
          if (!isLoggedIn) {
              e.preventDefault();
              // Store current URL to redirect back after login
              const currentUrl = window.location.href;
              // Redirect to login with checkout parameter
              window.location.href = `login.html?redirect=${encodeURIComponent(currentUrl)}&checkout=true`;
          }
      });
  });
  
  // Update UI based on login status
  updateAuthUI();
});

// Function to update UI based on authentication status
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));
  
  const authLinks = document.querySelectorAll('.auth-links');
  const userDropdown = document.getElementById('userDropdown');
  
  if (isLoggedIn && user) {
      // Show user dropdown if logged in
      authLinks.forEach(link => link.style.display = 'none');
      if (userDropdown) {
          userDropdown.style.display = 'block';
          document.querySelector('.user-name').textContent = `${user.firstName} ${user.lastName}`;
      }
  } else {
      // Show login/register links if not logged in
      authLinks.forEach(link => link.style.display = 'block');
      if (userDropdown) {
          userDropdown.style.display = 'none';
      }
  }
}

// Logout function
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  updateAuthUI();
  window.location.href = 'index.html';
}
// User authentication state management
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in (you would replace this with your actual auth check)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userDropdown = document.getElementById('userDropdown');
  
  if (isLoggedIn) {
      // User is logged in - show profile options
      const dropdownMenu = userDropdown.nextElementSibling;
      const loginItem = dropdownMenu.querySelector('a[href="login.html"]').parentElement;
      const registerItem = dropdownMenu.querySelector('a[href="register.html"]').parentElement;
      const profileItems = dropdownMenu.querySelectorAll('a[href^="my-"], a[href="orders.html"], a[href="prescriptions.html"], #logoutBtn');
      
      loginItem.style.display = 'none';
      registerItem.style.display = 'none';
      profileItems.forEach(item => item.style.display = 'block');
  } else {
      // User is not logged in - show login/register
      const dropdownMenu = userDropdown.nextElementSibling;
      const loginItem = dropdownMenu.querySelector('a[href="login.html"]').parentElement;
      const registerItem = dropdownMenu.querySelector('a[href="register.html"]').parentElement;
      const profileItems = dropdownMenu.querySelectorAll('a[href^="my-"], a[href="orders.html"], a[href="prescriptions.html"], #logoutBtn');
      
      loginItem.style.display = 'block';
      registerItem.style.display = 'block';
      profileItems.forEach(item => item.style.display = 'none');
  }
  
  // Logout functionality
  document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
  });
});