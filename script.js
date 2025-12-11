// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--secondary-color);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s;
`;

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Form handling for contact page
if (window.location.pathname.includes('contact.html')) {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        });
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// 3D Card Tilt Effect - WORKING VERSION
function init3DEffects() {
    console.log('Initializing 3D effects...');
    
    document.querySelectorAll('.project-card, .skill-category').forEach((card, index) => {
        console.log(`Setting up 3D effect for card ${index + 1}`);
        
        // Clear any existing styles that might conflict
        card.style.transform = '';
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.2s ease-out';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
            card.style.boxShadow = '0 30px 70px rgba(99, 102, 241, 0.5), 0 0 0 4px rgba(139, 92, 246, 0.4)';
            card.style.zIndex = '100';
            
            console.log(`3D effect applied: rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
            card.style.boxShadow = '';
            card.style.zIndex = '';
            
            console.log('3D effect reset');
        });
    });
}

// Initialize 3D effects when DOM is ready
document.addEventListener('DOMContentLoaded', init3DEffects);
window.addEventListener('load', init3DEffects);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animated gradient background
const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140']
];

let colorIndex = 0;
setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.background = `linear-gradient(135deg, ${colors[colorIndex][0]} 0%, ${colors[colorIndex][1]} 100%)`;
    document.body.style.transition = 'background 3s ease';
}, 8000);

// Floating animation for skill tags
document.querySelectorAll('.skill-tags span').forEach((tag, index) => {
    tag.style.animation = `float 3s ease-in-out ${index * 0.1}s infinite`;
});

// Profile Image Loading Fix
function fixProfileImage() {
    console.log('Fixing profile image...');
    
    const profileImg = document.querySelector('.hero-image img');
    const fallbackIcon = document.querySelector('.hero-image i');
    
    if (profileImg) {
        console.log('Profile image element found');
        
        // Show fallback icon initially
        if (fallbackIcon) {
            fallbackIcon.style.display = 'block';
            fallbackIcon.style.opacity = '1';
        }
        
        // Check current image source
        console.log('Image source:', profileImg.src);
        console.log('Image complete:', profileImg.complete);
        console.log('Image natural height:', profileImg.naturalHeight);
        
        // Try to load the image
        profileImg.onload = function() {
            console.log('Profile image loaded successfully!');
            this.style.opacity = '1';
            this.style.display = 'block';
            if (fallbackIcon) {
                fallbackIcon.style.display = 'none';
            }
        };
        
        profileImg.onerror = function() {
            console.log('Profile image failed to load, showing fallback');
            this.style.display = 'none';
            if (fallbackIcon) {
                fallbackIcon.style.display = 'block';
                fallbackIcon.style.opacity = '1';
            }
        };
        
        // Test if image exists by trying to fetch it
        fetch(profileImg.src)
            .then(response => {
                if (response.ok) {
                    console.log('Image file exists and is accessible');
                    // Force reload if needed
                    if (profileImg.complete && profileImg.naturalHeight === 0) {
                        console.log('Forcing image reload...');
                        profileImg.src = profileImg.src + '?t=' + Date.now();
                    } else if (profileImg.complete && profileImg.naturalHeight > 0) {
                        console.log('Image already loaded');
                        profileImg.style.opacity = '1';
                        profileImg.style.display = 'block';
                        if (fallbackIcon) {
                            fallbackIcon.style.display = 'none';
                        }
                    }
                } else {
                    console.log('Image file not found, showing fallback');
                    profileImg.style.display = 'none';
                    if (fallbackIcon) {
                        fallbackIcon.style.display = 'block';
                        fallbackIcon.style.opacity = '1';
                    }
                }
            })
            .catch(error => {
                console.log('Error checking image:', error);
                console.log('Showing fallback icon');
                if (fallbackIcon) {
                    fallbackIcon.style.display = 'block';
                    fallbackIcon.style.opacity = '1';
                }
            });
    } else {
        console.log('Profile image element not found!');
    }
}

// Initialize profile image fix
document.addEventListener('DOMContentLoaded', fixProfileImage);
window.addEventListener('load', fixProfileImage);

// Advanced Cursor Glow Effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
}
animateGlow();

// Glow effect on hover for interactive elements
const glowElements = document.querySelectorAll('.btn, .project-card, .skill-category, .nav-links a, .social-links a, .skill-tags span');

glowElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(99, 102, 241, 0.6)';
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
        this.style.transform = '';
    });
});

// Magnetic effect for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Enhanced particle effect on mouse move
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    const colors = ['rgba(139, 92, 246, 0.8)', 'rgba(99, 102, 241, 0.8)', 'rgba(79, 172, 254, 0.8)', 'rgba(67, 233, 123, 0.8)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, ${randomColor} 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        z-index: 9999;
        animation: particleFade 1.5s ease-out forwards;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1500);
};

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
    
    .cursor-glow {
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0.8);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

let particleTimer;
document.addEventListener('mousemove', (e) => {
    clearTimeout(particleTimer);
    particleTimer = setTimeout(() => {
        if (Math.random() > 0.85) {
            createParticle(e.clientX, e.clientY);
        }
    }, 30);
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});


// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loader"></div>
        <div class="loading-text">Loading Portfolio...</div>
    `;
    document.body.prepend(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 1500);
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
});

document.body.appendChild(darkModeToggle);

// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    console.log('Animating counter to:', target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate Performance Metrics
function animateMetrics() {
    document.querySelectorAll('.metric-circle').forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        circle.style.setProperty('--progress', percent);
    });
}

// Intersection Observer for Animations
const mainObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters in hero stats
            if (entry.target.classList.contains('hero-stats')) {
                const numbers = entry.target.querySelectorAll('.number');
                numbers.forEach(num => {
                    animateCounter(num);
                });
            }
            
            // Animate metrics
            if (entry.target.classList.contains('metrics-grid')) {
                animateMetrics();
            }
        }
    });
}, mainObserverOptions);

// Observe elements
document.querySelectorAll('.project-card, .skill-category, .metrics-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    mainObserver.observe(el);
});

// Simple counter animation - no observer needed
function initHeroCounters() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const numbers = heroStats.querySelectorAll('.number');
        console.log('Found', numbers.length, 'counters');
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            console.log('Animating counter with target:', target);
            
            // Simple counter animation
            let count = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    num.textContent = target;
                    clearInterval(timer);
                } else {
                    num.textContent = Math.floor(count);
                }
            }, 30);
        });
    } else {
        console.log('Hero stats not found');
    }
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initHeroCounters, 500);
});

window.addEventListener('load', function() {
    setTimeout(initHeroCounters, 100);
});

// Enhanced Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth Scroll with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 80;
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Analytics Tracking (Simple)
const portfolioAnalytics = {
    trackVisit() {
        const visits = parseInt(localStorage.getItem('portfolioVisits') || '0');
        localStorage.setItem('portfolioVisits', visits + 1);
        console.log(`Portfolio visits: ${visits + 1}`);
    },
    
    trackProjectClicks() {
        document.querySelectorAll('.project-link, .project-card a').forEach(link => {
            link.addEventListener('click', () => {
                const projectName = link.closest('.project-card')?.querySelector('h3')?.textContent || 'Unknown';
                console.log(`Project clicked: ${projectName}`);
            });
        });
    }
};

// Initialize analytics
portfolioAnalytics.trackVisit();
portfolioAnalytics.trackProjectClicks();

// Performance Optimization: Lazy Load Images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'D' to toggle dark mode
    if (e.key === 'd' || e.key === 'D') {
        darkModeToggle.click();
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('%c🇪🇹 Welcome to Yohannes Portfolio!', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cKeyboard shortcuts: D = Dark Mode | T = Top', 'color: #8b5cf6; font-size: 14px;');


// Visitor Counter with Animation
function initVisitorCounter() {
    const counterElement = document.createElement('div');
    counterElement.className = 'visitor-counter';
    counterElement.innerHTML = `
        <i class="fas fa-eye"></i>
        <span class="counter-value">0</span>
        <span class="counter-label">Visitors</span>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .visitor-counter {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: rgba(139, 92, 246, 0.9);
            backdrop-filter: blur(10px);
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
            animation: slideInLeft 0.5s ease;
        }
        
        .visitor-counter i {
            font-size: 1.1rem;
        }
        
        .counter-value {
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .counter-label {
            font-size: 0.85rem;
            opacity: 0.9;
        }
        
        @media (max-width: 768px) {
            .visitor-counter {
                bottom: 150px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(counterElement);
    
    // Get and update visitor count
    let visits = parseInt(localStorage.getItem('portfolioVisits') || '0');
    visits++;
    localStorage.setItem('portfolioVisits', visits);
    
    // Animate counter
    const counterValue = counterElement.querySelector('.counter-value');
    let current = 0;
    const increment = visits / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= visits) {
            current = visits;
            clearInterval(timer);
        }
        counterValue.textContent = Math.floor(current);
    }, 20);
}

// Initialize visitor counter
initVisitorCounter();

// Ensure profile image loads properly
function ensureProfileImageLoads() {
    const profileImg = document.querySelector('.hero-image img');
    if (profileImg) {
        // Force reload if image fails to load
        profileImg.addEventListener('error', function() {
            console.log('Profile image failed to load, retrying...');
            setTimeout(() => {
                this.src = this.src + '?t=' + Date.now();
            }, 1000);
        });
        
        // Add loaded class when image loads successfully
        profileImg.addEventListener('load', function() {
            this.classList.add('loaded');
            console.log('Profile image loaded successfully');
        });
        
        // Check if image is already loaded (cached)
        if (profileImg.complete && profileImg.naturalHeight !== 0) {
            profileImg.classList.add('loaded');
        }
    }
}

// Initialize profile image loading
document.addEventListener('DOMContentLoaded', ensureProfileImageLoads);
window.addEventListener('load', ensureProfileImageLoads);

// ===== EXCELLENCE ENHANCEMENTS =====

// Module 1: Performance - Intersection Observer for Scroll Animations
const observeElements = () => {
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated to improve performance
                scrollObserver.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    // Add fade-in-up class to elements that should animate
    document.querySelectorAll('.project-card, .skill-category, .section-title, .metric').forEach(el => {
        el.classList.add('fade-in-up');
        scrollObserver.observe(el);
    });
};

// Module 2: Enhanced Image Loading
const optimizeImageLoading = () => {
    // Native lazy loading fallback
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    } else {
        // Fallback for browsers without native lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// Module 3: Skeleton Screen Implementation
const createSkeletonScreen = (container) => {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton loading-placeholder';
    skeleton.style.height = '200px';
    skeleton.style.width = '100%';
    skeleton.style.marginBottom = '1rem';
    container.appendChild(skeleton);
    
    return skeleton;
};

// Module 4: Accessibility Enhancements
const enhanceAccessibility = () => {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('role', 'main');
    }

    // Enhance keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Escape key closes modals/dropdowns
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal, .dropdown').forEach(el => {
                el.classList.remove('active');
            });
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
};

// Module 5: Performance Monitoring
const performanceMonitoring = () => {
    // Measure and log performance metrics
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('🚀 Performance Metrics:', {
                'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                'First Paint': Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)
            });
        }
    });
};

// Module 6: Smooth Interactions
const enhanceInteractions = () => {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn, button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Enhanced hover effects for cards
    document.querySelectorAll('.project-card, .skill-category').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
};

// Module 7: Dark Mode Enhancement
const enhanceDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Smooth theme transition
        const enableTransitions = () => {
            document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        };

        darkModeToggle.addEventListener('click', enableTransitions);
    }
};

// Initialize all excellence enhancements
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    optimizeImageLoading();
    enhanceAccessibility();
    enhanceInteractions();
    enhanceDarkMode();
    performanceMonitoring();
});

// Page transition effect
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(-20px)';
});

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'assets/images/profile.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

preloadCriticalResources();