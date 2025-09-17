class ComponentLoader {
    constructor() {
        this.components = {};
        this.loadedComponents = new Set();
    }

    async loadComponent(id, url) {
        if (this.loadedComponents.has(id)) {
            return Promise.resolve();
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = html;
                this.loadedComponents.add(id);
                
                // Initialize component-specific functionality
                this.initializeComponent(id);
            }
        } catch (error) {
            console.error(`Error loading component ${id}:`, error);
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = `<div class="p-4 text-red-500">Error loading component: ${error.message}</div>`;
            }
        }
    }

    initializeComponent(id) {
        switch (id) {
            case 'navbar':
                this.initializeNavbar();
                break;
            case 'carousel':
                this.initializeCarousel();
                break;
            case 'contact-form':
                this.initializeContactForm();
                break;
            // Add more component initializers as needed
        }
    }

    initializeNavbar() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                
                if (menuIcon) {
                    if (mobileMenu.classList.contains('hidden')) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    } else {
                        menuIcon.classList.remove('fa-bars');
                        menuIcon.classList.add('fa-times');
                    }
                }
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
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
            }
        });
    }

    initializeCarousel() {
        // Carousel initialization logic
        console.log('Carousel initialized');
    }

    initializeContactForm() {
        // Contact form initialization logic
        console.log('Contact form initialized');
    }
}

// Global component loader instance
window.componentLoader = new ComponentLoader();

// Helper function for backward compatibility
window.loadComponent = function(id, url) {
    return window.componentLoader.loadComponent(id, url);
};