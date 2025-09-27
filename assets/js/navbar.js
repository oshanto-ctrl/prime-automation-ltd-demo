document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
});

function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    // Mobile menu toggle
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        // Toggle the slide animation
        mobileMenu.classList.toggle('-translate-x-full');
        
        // Animate menu icon
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
            menuIcon.classList.toggle('rotate');
            
            // Add animation class
            menuIcon.classList.add('menu-icon-animate');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                menuIcon.classList.remove('menu-icon-animate');
            }, 300);
        }
        
        // Add stagger animation to mobile menu items
        if (!mobileMenu.classList.contains('-translate-x-full')) {
            const mobileItems = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.style.animation = 'slideInLeft 0.4s ease-out forwards';
            });
        }
    });
}

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled', 'navbar-bg-animate');
            } else {
                navbar.classList.remove('navbar-scrolled', 'navbar-bg-animate');
            }
        }
    });

    // Active navigation link
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentLocation.split('/').pop() || 
            (currentLocation === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
            
            // Add pulse animation to active item
            if (link.classList.contains('nav-cta') || link.classList.contains('mobile-nav-cta')) {
                link.classList.add('nav-pulse');
            }
        }
    });

    // Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navbar && mobileMenu && !mobileMenu.classList.contains('-translate-x-full')) {
        // Check if the click is outside the navbar and mobile menu
        if (!navbar.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('-translate-x-full');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.remove('rotate');
            }
        }
    }
});

    // Add hover effect enhancement
    const navItems = document.querySelectorAll('.nav-link, .dropdown-btn, .nav-cta');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('nav-glow');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('nav-glow');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (menuIcon) {
                        menuIcon.classList.add('fa-bars');
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.remove('rotate');
                    }
                }
            }
        });
    });

   // Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('-translate-x-full')) {
        mobileMenu.classList.add('-translate-x-full');
        if (menuIcon) {
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.remove('rotate');
        }
    }
});


    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu if switching to desktop view
            if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.remove('rotate');
                }
            }
        }, 250);
    });
}

// Export for component loader
window.initializeNavbar = initializeNavbar;