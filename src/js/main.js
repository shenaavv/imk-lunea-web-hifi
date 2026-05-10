/* ============================================================
   LUNEA JEWELRY - MAIN JAVASCRIPT
   
   FUNCTIONALITY:
   - Mobile navigation toggle
   - Smooth scrolling
   - Form submissions
   - Interactive elements
   - Accessibility features
============================================================ */

// ========== DOM ELEMENTS ==========
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const newsletterForm = document.getElementById('newsletterForm');

// ========== MOBILE NAVIGATION ==========
/**
 * Toggle mobile menu visibility
 * Add/remove 'active' class to show/hide menu
 */
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Click handler for menu toggle button
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

/**
 * Close mobile menu when a link is clicked
 * Helps with user experience on mobile devices
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/**
 * Close menu when clicking outside
 * Improves UX by closing menu on body clicks
 */
document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('.navbar');
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== NEWSLETTER FORM ==========
/**
 * Handle newsletter form submission
 * Prevents default form behavior and shows success message
 */
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get email input
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Simple email validation
        if (isValidEmail(email)) {
            // Show success message (in production, would send to server)
            showSuccessMessage('Thank you for subscribing!');
            
            // Reset form
            newsletterForm.reset();
            
            // Log for demonstration
            console.log('Newsletter subscription:', email);
        } else {
            showErrorMessage('Please enter a valid email address');
        }
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show success message (Toast notification)
 * @param {string} message - Success message to display
 */
function showSuccessMessage(message) {
    showToast(message, 'success');
}

/**
 * Show error message (Toast notification)
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    showToast(message, 'error');
}

/**
 * Display a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast: 'success' or 'error'
 */
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        padding: 16px 24px;
        background: ${type === 'success' ? '#D54F9A' : '#E74C3C'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
        pointer-events: auto;
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ========== SCROLL ANIMATIONS ==========
/**
 * Observe elements for scroll animations
 * Uses Intersection Observer API for performance
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in potential
document.querySelectorAll('.product-card, .testimonial-card, .category-card').forEach(el => {
    observer.observe(el);
});

// ========== SMOOTH SCROLL BEHAVIOR ==========
/**
 * Add smooth scroll behavior for anchor links
 * Already handled by CSS scroll-behavior, but this enhances it
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            // Let the browser handle smooth scrolling via CSS
            // This is just for additional tracking if needed
        }
    });
});

// ========== PRODUCT INTERACTION ==========
/**
 * Add to cart functionality (placeholder)
 * In production, this would integrate with a cart system
 */
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking on a button
        if (e.target.closest('.btn')) return;
        
        // In production, this would show product details or add to cart
        console.log('Product clicked');
    });
});

// ========== CATEGORY CARD INTERACTION ==========
/**
 * Make category cards clickable and navigable
 */
document.querySelectorAll('.category-card').forEach(card => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', function() {
        // In production, navigate to category page
        console.log('Category clicked');
    });
});

// ========== FEEDBACK BUTTON ==========
/**
 * Handle feedback button click
 */
const feedbackBtn = document.querySelector('.feedback-btn');
if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
        // In production, this would open a feedback form
        showToast('Thank you for your interest! We\'d love your feedback.', 'success');
    });
}

// ========== RESPONSIVE NAV ICONS ==========
/**
 * Handle responsive behavior for navigation icons
 */
document.querySelectorAll('.icon-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const action = link.getAttribute('aria-label');
        console.log(`${action} clicked`);
    });
});

// ========== UTILITY: DETECT VIEWPORT SIZE ==========
/**
 * Get current viewport size
 * Useful for debugging responsive behavior
 */
function getViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
    };
}

// Log viewport size on resize
window.addEventListener('resize', () => {
    const viewport = getViewportSize();
    console.log('Viewport:', viewport);
});

// ========== INITIALIZATION ==========
/**
 * Initialize all components on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('LUNEA Website loaded successfully');
    console.log('Viewport:', getViewportSize());
    
    // In production, you could initialize:
    // - Analytics
    // - Third-party libraries
    // - Dynamic content loading
    // - User preferences
});

// ========== PERFORMANCE: LAZY LOADING IMAGES ==========
/**
 * Lazy load images for better performance
 * Uses Intersection Observer API
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== CONSOLE WELCOME MESSAGE ==========
/**
 * Fun welcome message in console
 */
console.log(
    '%c🌙 Welcome to LUNEA Jewelry 🌙',
    'font-size: 20px; color: #D54F9A; font-weight: bold;'
);
console.log(
    '%cShine In Your Story',
    'font-size: 14px; color: #D4AF9A; font-style: italic;'
);
