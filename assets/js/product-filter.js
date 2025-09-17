/**
 * Product Filter Module
 * Handles product filtering and interactions in the product section
 * 
 * @version 1.0.0
 * @author Prime Automations Ltd
 */

class ProductFilter {
    constructor() {
        this.filterButtons = [];
        this.productCards = [];
        this.activeFilter = 'all';
        this.init();
    }

    /**
     * Initialize the product filter
     */
    init() {
        this.setupElements();
        this.bindEvents();
        this.showAllProducts();
    }

    /**
     * Setup DOM elements
     */
    setupElements() {
        // Get all filter buttons
        this.filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
        
        // Get all product cards
        this.productCards = Array.from(document.querySelectorAll('.product-card'));
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Filter button click events
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(button);
            });
        });

        // Add keyboard navigation
        this.filterButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleFilterClick(button);
                }
            });
        });
    }

    /**
     * Handle filter button click
     * @param {HTMLElement} button - The clicked button
     */
    handleFilterClick(button) {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        this.updateActiveButton(button);
        
        // Filter products
        this.filterProducts(filter);
        
        // Update active filter
        this.activeFilter = filter;
        
        // Announce filter change for screen readers
        this.announceFilterChange(filter);
    }

    /**
     * Update the active filter button
     * @param {HTMLElement} activeButton - The button to make active
     */
    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            if (button === activeButton) {
                button.classList.add('active', 'bg-deep-sea-green', 'text-white');
                button.classList.remove('bg-white', 'text-gray-700');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active', 'bg-deep-sea-green', 'text-white');
                button.classList.add('bg-white', 'text-gray-700');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Filter products based on category
     * @param {string} category - The category to filter by
     */
    filterProducts(category) {
        this.productCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                this.showProduct(card, index);
            } else {
                this.hideProduct(card);
            }
        });
    }

    /**
     * Show a product card with animation
     * @param {HTMLElement} card - The product card to show
     * @param {number} index - The index of the card for staggered animation
     */
    showProduct(card, index) {
        // Reset styles first
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.display = 'block';
        
        // Force reflow
        card.offsetHeight;
        
        // Animate in with staggered delay
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.5s ease-out';
        }, index * 100);
        
        // Add animation class
        card.classList.add('animate-fade-in-up');
    }

    /**
     * Hide a product card with animation
     * @param {HTMLElement} card - The product card to hide
     */
    hideProduct(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease-in';
        
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
        
        // Remove animation class
        card.classList.remove('animate-fade-in-up');
    }

    /**
     * Show all products
     */
    showAllProducts() {
        this.productCards.forEach((card, index) => {
            this.showProduct(card, index);
        });
    }

    /**
     * Announce filter change for screen readers
     * @param {string} filter - The active filter
     */
    announceFilterChange(filter) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Showing ${filter === 'all' ? 'all' : filter} products`;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * Get the current active filter
     * @returns {string} The active filter
     */
    getActiveFilter() {
        return this.activeFilter;
    }

    /**
     * Set the active filter programmatically
     * @param {string} filter - The filter to set
     */
    setActiveFilter(filter) {
        const button = this.filterButtons.find(btn => btn.getAttribute('data-filter') === filter);
        if (button) {
            this.handleFilterClick(button);
        }
    }

    /**
     * Reset to show all products
     */
    reset() {
        const allButton = this.filterButtons.find(btn => btn.getAttribute('data-filter') === 'all');
        if (allButton) {
            this.handleFilterClick(allButton);
        }
    }

    /**
     * Destroy the filter instance
     */
    destroy() {
        // Remove event listeners
        this.filterButtons.forEach(button => {
            button.removeEventListener('click', this.handleFilterClick);
            button.removeEventListener('keydown', this.handleFilterClick);
        });
        
        // Reset arrays
        this.filterButtons = [];
        this.productCards = [];
        this.activeFilter = 'all';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const productFilter = new ProductFilter();
    
    // Make it globally accessible for debugging
    window.productFilter = productFilter;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductFilter;
}