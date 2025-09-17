/**
 * Stats Animation Module
 * Handles animated counters and progress bars for the stats section
 * 
 * @version 1.0.0
 * @author Prime Automations Ltd
 */

class StatsAnimator {
    constructor() {
        this.animated = false;
        this.counters = [];
        this.progressBars = [];
        this.progressRings = [];
        this.intersectionObserver = null;
    }

    /**
     * Initialize the stats animator
     */
    init() {
        this.setupElements();
        this.setupIntersectionObserver();
        this.bindEvents();
    }

    /**
     * Setup DOM elements
     */
    setupElements() {
        // Get all counter elements
        this.counters = Array.from(document.querySelectorAll('.counter'));
        
        // Get all progress bar elements
        this.progressBars = Array.from(document.querySelectorAll('.progress-bar'));
        
        // Get all progress ring elements
        this.progressRings = [
            { element: document.getElementById('progress-ring-1'), target: 226 },
            { element: document.getElementById('progress-ring-2'), target: 221 },
            { element: document.getElementById('progress-ring-3'), target: 215 },
            { element: document.getElementById('progress-ring-4'), target: 224 }
        ].filter(ring => ring.element);
    }

    /**
     * Setup Intersection Observer for scroll-triggered animations
     */
    setupIntersectionObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.startAnimations();
                    this.animated = true;
                }
            });
        }, options);

        // Observe the stats section
        const statsSection = document.querySelector('#stats');
        if (statsSection) {
            this.intersectionObserver.observe(statsSection);
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Re-animate on window resize (optional)
        window.addEventListener('resize', () => {
            if (this.animated) {
                this.resetAnimations();
                setTimeout(() => this.startAnimations(), 300);
            }
        });
    }

    /**
     * Start all animations
     */
    startAnimations() {
        this.animateCounters();
        this.animateProgressBars();
        this.animateProgressRings();
    }

    /**
     * Animate counters with rolling effect
     */
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
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

            // Start animation with slight delay for staggered effect
            setTimeout(updateCounter, Math.random() * 200);
        });
    }

    /**
     * Animate progress bars
     */
    animateProgressBars() {
        this.progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 100); // Staggered animation
        });
    }

    /**
     * Animate progress rings
     */
    animateProgressRings() {
        this.progressRings.forEach((ring, index) => {
            const circumference = 2 * Math.PI * 36; // radius = 36
            const offset = circumference - (ring.target / 100) * circumference;
            
            setTimeout(() => {
                if (ring.element) {
                    ring.element.style.strokeDashoffset = offset;
                }
            }, index * 150); // Staggered animation
        });
    }

    /**
     * Reset animations for replay
     */
    resetAnimations() {
        // Reset counters
        this.counters.forEach(counter => {
            counter.textContent = '0';
        });

        // Reset progress bars
        this.progressBars.forEach(bar => {
            bar.style.width = '0%';
        });

        // Reset progress rings
        this.progressRings.forEach(ring => {
            if (ring.element) {
                ring.element.style.strokeDashoffset = '226';
            }
        });

        this.animated = false;
    }

    /**
     * Manual trigger for animations (useful for testing)
     */
    triggerAnimations() {
        if (!this.animated) {
            this.startAnimations();
            this.animated = true;
        }
    }

    /**
     * Destroy the animator and clean up
     */
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        this.counters = [];
        this.progressBars = [];
        this.progressRings = [];
        this.animated = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const statsAnimator = new StatsAnimator();
    statsAnimator.init();
    
    // Make it globally accessible for debugging
    window.statsAnimator = statsAnimator;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatsAnimator;
}