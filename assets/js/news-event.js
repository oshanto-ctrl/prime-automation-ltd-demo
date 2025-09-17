document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for cards
    initializeCardAnimations();
    
    // Initialize newsletter form
    initializeNewsletterForm();
    
    // Add scroll animations
    initializeScrollAnimations();
});

// Card hover animations
function initializeCardAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    const newsCards = document.querySelectorAll('.news-card');
    
    // Add hover effects to event cards
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.event-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.event-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add hover effects to news cards
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.news-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.news-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded-lg';
                successMessage.textContent = 'Thank you for subscribing! You will receive updates at: ' + email;
                
                // Replace form with success message
                this.parentNode.replaceChild(successMessage, this);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    successMessage.parentNode.replaceChild(newsletterForm, successMessage);
                    newsletterForm.reset();
                }, 5000);
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.event-card, .news-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add smooth scrolling for anchor links
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