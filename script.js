// Dr. Gufran Khan - Modern Medical Website
console.log('Dr. Gufran Khan Website - Loaded Successfully');

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Appointment Form Submission
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        // Form will submit naturally to FormSubmit.co
        console.log('Form submitting to webocean2025@gmail.com');
    });
}

// Intersection Observer for animations
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

// Observe elements
document.querySelectorAll('.service-box, .expertise-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Track button clicks for analytics
document.querySelectorAll('.btn, .service-link, .nav-cta, .whatsapp-float').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim() || 'WhatsApp Float';
        console.log(`Button clicked: ${buttonText} at ${new Date().toLocaleString()}`);
        
        // Google Analytics tracking (if implemented)
        // gtag('event', 'button_click', {
        //     'event_category': 'engagement',
        //     'event_label': buttonText
        // });
    });
});

// Counter animation for stats
function animateCounter(element, target, suffix, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach((item, index) => {
                const text = item.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !item.classList.contains('animated')) {
                    item.classList.add('animated');
                    
                    // Determine suffix based on original text
                    let suffix = '+';
                    if (text.includes('%')) {
                        suffix = '%';
                    }
                    
                    item.textContent = '0' + suffix;
                    animateCounter(item, number, suffix);
                }
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

console.log('All features initialized successfully!');
