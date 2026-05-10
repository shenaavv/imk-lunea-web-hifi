/* ============================================================
   LUNEA JEWELRY - ADVANCED INTERACTIVITY
   ============================================================ */

// Cart storage
let cart = JSON.parse(localStorage.getItem('luneaCart')) || [];

// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
const newsletterForm = document.getElementById('newsletterForm');
const toast = document.getElementById('toast');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-links a, footer a[href^="#"]');

// ========== MOBILE MENU TOGGLE ==========
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
}

// Close menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container') && !e.target.closest('.mobile-menu')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        }
    });
});

// ========== SEARCH FUNCTIONALITY ==========
const searchBtn = document.querySelector('.icon-btn:nth-child(1)');
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSearchModal();
    });
}

function showSearchModal() {
    const modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 80px;
        z-index: 2001;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
            <h2 style="margin-bottom: 20px; font-family: Cormorant Garamond; font-size: 1.75rem; color: #2C2C2C;">Search Products</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="searchInput" placeholder="Search bracelets, rings, necklaces..." style="flex: 1; padding: 12px; border: 1px solid #E8E8E8; border-radius: 4px; font-family: inherit;">
                <button id="searchGo" style="padding: 12px 24px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Search</button>
            </div>
            <button onclick="document.getElementById('searchModal').remove()" style="margin-top: 20px; width: 100%; padding: 10px; background: #F2D7D8; color: #D54F9A; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const searchInput = document.getElementById('searchInput');
    const searchGo = document.getElementById('searchGo');
    
    searchGo.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            showToast('Searching for: ' + query, 'info');
            setTimeout(() => {
                modal.remove();
                document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        } else {
            showToast('Please enter a search term', 'error');
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchGo.click();
    });
    
    searchInput.focus();
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ========== PROFILE FUNCTIONALITY ==========
const profileBtn = document.querySelector('.icon-btn:nth-child(2)');
if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showProfileModal();
    });
}

function showProfileModal() {
    let userAccount = JSON.parse(localStorage.getItem('luneaUser')) || null;
    
    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2001;
    `;
    
    if (userAccount) {
        // User is logged in - show profile
        modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 8px; width: 90%; max-width: 400px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; font-weight: bold;">${userAccount.name.charAt(0).toUpperCase()}</div>
                    <h2 style="font-family: Cormorant Garamond; font-size: 1.75rem; color: #2C2C2C; margin: 0;">My Profile</h2>
                </div>
                <div style="text-align: left; margin-bottom: 30px; padding: 20px; background: #FAF7F4; border-radius: 8px;">
                    <p style="margin: 12px 0; color: #2C2C2C;"><strong>Name:</strong> ${userAccount.name}</p>
                    <p style="margin: 12px 0; color: #2C2C2C;"><strong>Email:</strong> ${userAccount.email}</p>
                    <p style="margin: 12px 0; color: #2C2C2C;"><strong>Member Since:</strong> 2026</p>
                    <p style="margin: 12px 0; color: #2C2C2C;"><strong>Total Orders:</strong> 0</p>
                    <p style="margin: 12px 0; color: #2C2C2C;"><strong>Loyalty Points:</strong> 0</p>
                </div>
                <button onclick="logoutUser(); document.getElementById('profileModal').remove();" style="width: 100%; padding: 12px; margin-bottom: 10px; background: #F2D7D8; color: #D54F9A; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Logout</button>
                <button onclick="this.closest('#profileModal').remove()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        `;
    } else {
        // User not logged in - show login/register tabs
        modal.innerHTML = `
            <div style="background: white; padding: 0; border-radius: 8px; width: 90%; max-width: 420px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); overflow: hidden;">
                <div style="display: flex; background: #FAF7F4;">
                    <button id="loginTab" onclick="switchAuthTab('login')" style="flex: 1; padding: 15px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; font-weight: 600; cursor: pointer; font-size: 1rem;">Login</button>
                    <button id="registerTab" onclick="switchAuthTab('register')" style="flex: 1; padding: 15px; background: #E8E8E8; color: #2C2C2C; border: none; font-weight: 600; cursor: pointer; font-size: 1rem;">Register</button>
                </div>
                
                <div id="loginForm" style="padding: 30px; display: block;">
                    <h2 style="font-family: Cormorant Garamond; font-size: 1.5rem; color: #2C2C2C; margin-bottom: 20px;">Sign In</h2>
                    <input type="email" id="loginEmail" placeholder="Email Address" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #E8E8E8; border-radius: 4px; box-sizing: border-box; font-family: inherit;">
                    <input type="password" id="loginPassword" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 20px; border: 1px solid #E8E8E8; border-radius: 4px; box-sizing: border-box; font-family: inherit;">
                    <button onclick="loginUser()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; margin-bottom: 10px;">Sign In</button>
                    <p style="text-align: center; color: #9B9B9B; font-size: 0.9rem; margin: 0;">Demo: use any email/password</p>
                </div>
                
                <div id="registerForm" style="padding: 30px; display: none;">
                    <h2 style="font-family: Cormorant Garamond; font-size: 1.5rem; color: #2C2C2C; margin-bottom: 20px;">Create Account</h2>
                    <input type="text" id="registerName" placeholder="Full Name" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #E8E8E8; border-radius: 4px; box-sizing: border-box; font-family: inherit;">
                    <input type="email" id="registerEmail" placeholder="Email Address" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #E8E8E8; border-radius: 4px; box-sizing: border-box; font-family: inherit;">
                    <input type="password" id="registerPassword" placeholder="Password (min. 6 chars)" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #E8E8E8; border-radius: 4px; box-sizing: border-box; font-family: inherit;">
                    <input type="password" id="registerConfirm" placeholder="Confirm Password" style="width: 100%; padding: 12px; margin-bottom: 20px; border: 1px solid #E8E8E8; border-radius: 4px; box-sizing: border-box; font-family: inherit;">
                    <button onclick="registerUser()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Create Account</button>
                </div>
                
                <button onclick="this.closest('#profileModal').remove()" style="width: 100%; padding: 12px; background: #F2D7D8; color: #D54F9A; border: none; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        loginTab.style.background = 'linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%)';
        loginTab.style.color = 'white';
        registerTab.style.background = '#E8E8E8';
        registerTab.style.color = '#2C2C2C';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        registerTab.style.background = 'linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%)';
        registerTab.style.color = 'white';
        loginTab.style.background = '#E8E8E8';
        loginTab.style.color = '#2C2C2C';
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    }
}

function loginUser() {
    const email = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value.trim();
    
    if (email && password) {
        const user = { name: email.split('@')[0], email, password };
        localStorage.setItem('luneaUser', JSON.stringify(user));
        showToast('Login successful! Welcome back!', 'success');
        document.getElementById('profileModal').remove();
        setTimeout(() => showProfileModal(), 500);
    } else {
        showToast('Please enter email and password', 'error');
    }
}

function registerUser() {
    const name = document.getElementById('registerName')?.value.trim();
    const email = document.getElementById('registerEmail')?.value.trim();
    const password = document.getElementById('registerPassword')?.value.trim();
    const confirm = document.getElementById('registerConfirm')?.value.trim();
    
    if (!name || !email || !password || !confirm) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirm) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    const user = { name, email, password };
    localStorage.setItem('luneaUser', JSON.stringify(user));
    showToast('Account created! Welcome to LUNEA!', 'success');
    document.getElementById('profileModal').remove();
    setTimeout(() => showProfileModal(), 500);
}

function logoutUser() {
    localStorage.removeItem('luneaUser');
    showToast('Logged out successfully', 'info');
}

// ========== CART FUNCTIONALITY ==========
const cartBtn = document.querySelector('.icon-btn:nth-child(3)');
if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCartModal();
    });
}

function showCartModal() {
    const modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 400px;
        height: 100%;
        background: white;
        box-shadow: -2px 0 8px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        z-index: 2001;
        animation: slideIn 0.3s ease-out;
    `;
    
    const cartItemsHTML = cart.length > 0 
        ? cart.map((item, idx) => `
            <div style="padding: 15px; border-bottom: 1px solid #E8E8E8; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <p style="margin: 0; font-weight: 600; color: #2C2C2C;">${item.name}</p>
                    <p style="margin: 5px 0 0; color: #9B9B9B; font-size: 0.9rem;">$${item.price}</p>
                </div>
                <button onclick="removeFromCart(${idx})" style="padding: 5px 10px; background: #F2D7D8; color: #D54F9A; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Remove</button>
            </div>
        `).join('')
        : '<p style="padding: 30px; text-align: center; color: #9B9B9B;">Your bag is empty</p>';
    
    modal.innerHTML = `
        <div style="padding: 20px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; font-family: Cormorant Garamond; font-size: 1.5rem;">Your Bag</h2>
            <button onclick="document.getElementById('cartModal').remove()" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>
        <div style="flex: 1; overflow-y: auto;">
            ${cartItemsHTML}
        </div>
        <div style="padding: 20px; border-top: 2px solid #E8E8E8;">
            <p style="margin: 0 0 15px; color: #2C2C2C; font-weight: 600;">Total: $${cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}</p>
            <button style="width: 100%; padding: 12px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Checkout</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('luneaCart', JSON.stringify(cart));
    document.getElementById('cartModal').remove();
    showCartModal();
    showToast('Item removed from bag', 'info');
}

// ========== NEWSLETTER FORM HANDLING ==========
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (isValidEmail(email)) {
            showToast('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    });
}

// ========== EMAIL VALIDATION ==========
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'info') {
    if (toast) {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// ========== QUICK VIEW BUTTONS ==========
const quickViewButtons = document.querySelectorAll('.btn-overlay');
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;
        
        showQuickViewModal(productName, productPrice, productImage);
    });
});

function showQuickViewModal(name, price, image) {
    const modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2001;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
            <img src="${image}" alt="${name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="font-family: Cormorant Garamond; font-size: 1.75rem; color: #2C2C2C; margin-bottom: 10px;">${name}</h2>
            <p style="font-size: 1.25rem; color: #D54F9A; font-weight: 600; margin-bottom: 20px;">${price}</p>
            <button onclick="addToCart('${name}', '${price.replace('$', '')}'); document.getElementById('quickViewModal').remove();" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #D54F9A 0%, #B83D7D 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; margin-bottom: 10px;">Add to Bag</button>
            <button onclick="document.getElementById('quickViewModal').remove()" style="width: 100%; padding: 12px; background: #F2D7D8; color: #D54F9A; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ========== ADD TO BAG BUTTONS ==========
const addButtons = document.querySelectorAll('.btn-add');
addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent.replace('$', '');
        
        addToCart(productName, productPrice);
    });
});

function addToCart(name, price) {
    const item = { name, price };
    cart.push(item);
    localStorage.setItem('luneaCart', JSON.stringify(cart));
    showToast('Added to bag: ' + name, 'success');
}

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .testimonial, .category-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== BUTTON HOVER EFFECTS ==========
const buttons = document.querySelectorAll('.btn, .btn-overlay, .btn-add, .btn-newsletter, .btn-hero');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ========== FORM INPUT FOCUS ==========
const formInputs = document.querySelectorAll('.newsletter-form input');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = `0 0 0 2px #D54F9A`;
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });
});

// ========== DYNAMIC STYLES ==========
const style = document.createElement('style');
style.textContent = `
    .toast.success {
        background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
    }
    
    .toast.error {
        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    }
    
    .toast.info {
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ========== KEYBOARD SUPPORT ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
});

// ========== CONSOLE MESSAGE ==========
console.log('%c◆ Welcome to LUNEA Jewelry ◆', 'color: #D54F9A; font-size: 16px; font-weight: bold;');
console.log('%cShine In Your Story', 'color: #E6D4C8; font-size: 14px; font-style: italic;');
