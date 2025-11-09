// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }
});

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
};

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const text = num.textContent;
                const target = parseInt(text.replace(/\D/g, ''));
                if (text.includes('%')) {
                    num.dataset.suffix = '%';
                } else if (text.includes('+')) {
                    num.dataset.suffix = '+';
                }
                animateCounter(num, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu toggle
const setupMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768) {
        // Make sure mobile menu button exists
        if (!menuBtn) {
            const newMenuBtn = document.createElement('button');
            newMenuBtn.className = 'mobile-menu-btn';
            newMenuBtn.setAttribute('aria-expanded', 'false');
            newMenuBtn.setAttribute('aria-controls', 'nav-links');
            newMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            newMenuBtn.innerHTML = '<span class="menu-icon" aria-hidden="true">☰</span>';
            newMenuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.75rem;
                cursor: pointer;
                color: var(--text-dark);
                display: block;
            `;
            navContainer.appendChild(newMenuBtn);
            
            // Set up event listener for the new button
            setupMenuButtonListener(newMenuBtn, nav);
        }
        
        // Make sure nav is initially hidden on mobile
        nav.style.display = 'none';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'white';
        nav.style.flexDirection = 'column';
        nav.style.padding = '1rem';
        nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        nav.style.zIndex = '1000';
    } else {
        // Reset nav styles for desktop
        nav.style.display = 'flex';
        nav.style.position = 'static';
        nav.style.flexDirection = '';
        nav.style.padding = '';
        nav.style.boxShadow = '';
    }
};

// Set up event listener for menu button
const setupMenuButtonListener = (menuBtn, nav) => {
    menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !expanded);
        
        if (!expanded) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
};

// Initialize mobile menu on load and resize
setupMobileMenu();
window.addEventListener('resize', setupMobileMenu);

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const faqAnswer = button.nextElementSibling;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            const itemButton = item.querySelector('.faq-question');
            const itemAnswer = item.querySelector('.faq-answer');
            
            item.classList.remove('active');
            itemButton.setAttribute('aria-expanded', 'false');
            itemAnswer.setAttribute('hidden', '');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
            faqAnswer.removeAttribute('hidden');
        }
    });
});

// Add smooth scroll behavior for WhatsApp button
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    // Optional: Add click analytics or tracking here
    whatsappBtn.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
    });
}

// Add visually-hidden style for screen readers
if (!document.getElementById('accessibility-styles')) {
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.textContent = `
        .visually-hidden {
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }
    `;
    document.head.appendChild(style);
}

console.log('🐉 Doha Wireless Warriors - Website Loaded Successfully!');
