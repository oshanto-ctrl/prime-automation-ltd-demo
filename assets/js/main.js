document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeCounters();
    initializeProgressBars();
    initializeProductFilters();
    initializeGalleryTabs();
    initializeUpdateTabs();
    initializeContactForm();
    initializeNewsletterForm();
    initializeScrollAnimations();
    initializeLazyLoading();
});

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Progress Bar Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Product Filter
function initializeProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-deep-sea-green', 'text-white');
                b.classList.add('bg-white', 'text-gray-700');
            });
            btn.classList.add('active', 'bg-deep-sea-green', 'text-white');
            btn.classList.remove('bg-white', 'text-gray-700');

            // Filter products
            const filter = btn.getAttribute('data-filter');
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gallery Tabs
function initializeGalleryTabs() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content
            const tabName = tab.getAttribute('data-tab');
            galleryContents.forEach(content => {
                if (content.getAttribute('data-content') === tabName) {
                    content.classList.remove('hidden');
                    content.classList.add('active');
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('active');
                }
            });
        });
    });

    // Gallery item click handler
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageUrl = item.getAttribute('data-image');
            const mainImage = item.closest('.gallery-content').querySelector('img');
            if (mainImage && imageUrl) {
                mainImage.src = imageUrl;
            }
        });
    });
}

// Update Tabs (News & Events)
function initializeUpdateTabs() {
    const updateTabs = document.querySelectorAll('.update-tab');
    const updateContents = document.querySelectorAll('.update-content');

    updateTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            updateTabs.forEach(t => {
                t.classList.remove('active', 'text-white', 'bg-gradient-to-r', 'from-deep-sea-green', 'to-green');
                t.classList.add('text-gray-700');
            });
            tab.classList.add('active', 'text-white', 'bg-gradient-to-r', 'from-deep-sea-green', 'to-green');
            tab.classList.remove('text-gray-700');

            // Update content
            const tabName = tab.getAttribute('data-tab');
            updateContents.forEach(content => {
                if (content.getAttribute('data-content') === tabName) {
                    content.classList.remove('hidden');
                    content.classList.add('active');
                } else {
                    content.classList.add('hidden');
                    content.classList.remove('active');
                }
            });
        });
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.classList.add('hidden');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }, 2000);
        });
    }
}

// Newsletter Form
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Subscribed!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .product-card, .news-card, .event-card').forEach(el => {
        observer.observe(el);
    });
}

// Lazy Loading
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});