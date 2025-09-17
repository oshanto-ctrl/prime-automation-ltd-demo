/**
 * Partners Carousel Module
 * Handles the infinite scrolling carousel for partner logos
 * 
 * @version 1.0.0
 * @author Prime Automations Ltd
 */

class PartnersCarousel {
    constructor() {
        this.carousel = null;
        this.scrollSpeed = 1;
        this.isPaused = false;
        this.init();
    }

    /**
     * Initialize the carousel
     */
    init() {
        this.setupElements();
        this.startAnimation();
        this.bindEvents();
    }

    /**
     * Setup DOM elements
     */
    setupElements() {
        this.carousel = document.querySelector('.partners-carousel');
        if (!this.carousel) {
            console.warn('Partners carousel element not found');
            return;
        }
    }

    /**
     * Start the carousel animation
     */
    startAnimation() {
        if (!this.carousel) return;
        
        const animate = () => {
            if (!this.isPaused) {
                this.carousel.scrollLeft += this.scrollSpeed;
                
                // Reset scroll position when reaching the end
                if (this.carousel.scrollLeft >= this.carousel.scrollWidth / 2) {
                    this.carousel.scrollLeft = 0;
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        if (!this.carousel) return;
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.isPaused = true;
        });
        
        // Resume on mouse leave
        this.carousel.addEventListener('mouseleave', () => {
            this.isPaused = false;
        });
        
        // Pause when any logo is focused
        const partnerLogos = this.carousel.querySelectorAll('.partner-logo');
        partnerLogos.forEach(logo => {
            logo.addEventListener('focusin', () => {
                this.isPaused = true;
            });
            
            logo.addEventListener('focusout', () => {
                this.isPaused = false;
            });
        });
    }

    /**
     * Add a new partner logo to the carousel
     * @param {string} imageUrl - URL of the logo image
     * @param {string} altText - Alt text for the image
     */
    addPartner(imageUrl, altText = 'Partner Logo') {
        if (!this.carousel) return;
        
        // Get all partner logo containers
        const partnerSets = this.carousel.querySelectorAll('.flex.items-center.justify-center.space-x-12');
        
        // Add to both sets for seamless looping
        partnerSets.forEach(set => {
            const logoContainer = document.createElement('div');
            logoContainer.className = 'partner-logo flex-shrink-0 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 cursor-pointer';
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = altText;
            img.className = 'h-16 w-auto';
            
            logoContainer.appendChild(img);
            set.appendChild(logoContainer);
        });
    }

    /**
     * Remove a partner logo by index
     * @param {number} index - Index of the logo to remove
     */
    removePartner(index) {
        if (!this.carousel) return;
        
        const partnerLogos = this.carousel.querySelectorAll('.partner-logo');
        
        // Remove from both sets (original and duplicate)
        if (partnerLogos[index * 2]) {
            partnerLogos[index * 2].remove();
        }
        
        if (partnerLogos[index * 2 + 1]) {
            partnerLogos[index * 2 + 1].remove();
        }
    }

    /**
     * Adjust scroll speed
     * @param {number} speed - New scroll speed (default: 1)
     */
    setScrollSpeed(speed) {
        this.scrollSpeed = speed;
    }

    /**
     * Pause the carousel
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * Resume the carousel
     */
    resume() {
        this.isPaused = false;
    }

    /**
     * Destroy the carousel instance
     */
    destroy() {
        this.isPaused = true;
        this.carousel = null;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const partnersCarousel = new PartnersCarousel();
    
    // Make it globally accessible for debugging
    window.partnersCarousel = partnersCarousel;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PartnersCarousel;
}