// Enhanced script.js with additional responsive and accessibility features

document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero image
    const heroImage = document.querySelector('.hero-image-container');
    const heroSection = document.querySelector('.hero');
    
    if (heroImage && heroSection) {
        // Only apply parallax on non-touch devices (desktop)
        if (!('ontouchstart' in window)) {
            heroSection.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
            
            // Reset transform when mouse leaves
            heroSection.addEventListener('mouseleave', () => {
                heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        }
    }
    
    // Add glowing effect to circuit dots
    const circuitDots = document.querySelectorAll('.circuit-dot');
    circuitDots.forEach(dot => {
        setInterval(() => {
            dot.style.boxShadow = '0 0 15px var(--glow-blue)';
            setTimeout(() => {
                dot.style.boxShadow = '0 0 5px var(--glow-blue)';
            }, 1000);
        }, 2000);
    });
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const headerContainer = document.querySelector('.header-container');
            headerContainer.appendChild(mobileMenuToggle);
            
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            
            // Clone navigation links
            const navLinksClone = document.querySelector('.nav-links').cloneNode(true);
            mobileMenu.appendChild(navLinksClone);
            
            // Add CTA button
            const ctaClone = document.querySelector('.cta-button').cloneNode(true);
            mobileMenu.appendChild(ctaClone);
            
            header.appendChild(mobileMenu);
            
            // Toggle mobile menu
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                
                // Toggle aria-expanded
                const isExpanded = mobileMenuToggle.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
                
                // Toggle body scroll
                if (isExpanded) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close mobile menu when clicking on a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }
    };
    
    // Check if we need mobile navigation
    const checkMobileNav = () => {
        if (window.innerWidth <= 768) {
            createMobileNav();
        }
    };
    
    // Initial check
    checkMobileNav();
    
    // Check on resize
    window.addEventListener('resize', checkMobileNav);
    
    // Form validation and submission
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = form.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    form.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
    
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add accessibility features
    function enhanceAccessibility() {
        // Add appropriate ARIA roles
        document.querySelector('header').setAttribute('role', 'banner');
        document.querySelector('footer').setAttribute('role', 'contentinfo');
        
        // Add skip to content link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add ID to main content
        const mainContent = document.querySelector('.hero');
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
        
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(element => {
            if (!element.getAttribute('tabindex') && element.offsetParent !== null) {
                element.setAttribute('tabindex', '0');
            }
        });
        
        // Add focus styles
        const style = document.createElement('style');
        style.textContent = `
            :focus {
                outline: 2px solid var(--glow-blue) !important;
                outline-offset: 2px !important;
            }
            
            .skip-link {
                position: absolute;
                top: -40px;
                left: 0;
                background: var(--glow-blue);
                color: var(--dark-blue);
                padding: 8px;
                z-index: 1001;
                transition: top 0.3s;
            }
            
            .skip-link:focus {
                top: 0;
            }
            
            .error-message {
                color: #ff6b6b;
                font-size: 0.9rem;
                margin-top: 5px;
            }
            
            .form-control.error {
                border-color: #ff6b6b;
            }
            
            /* Mobile menu styles */
            .mobile-menu-toggle {
                display: none;
                background: transparent;
                border: none;
                color: var(--white);
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .mobile-menu {
                display: none;
                position: fixed;
                top: var(--header-height);
                left: 0;
                width: 100%;
                height: calc(100vh - var(--header-height));
                background: rgba(10, 25, 47, 0.95);
                z-index: 99;
                padding: 2rem;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .mobile-menu.active {
                display: flex;
                transform: translateX(0);
            }
            
            .mobile-menu .nav-links {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .mobile-menu .nav-links a {
                font-size: 1.5rem;
            }
            
            @media (max-width: 768px) {
                .nav-links, header .cta-button {
                    display: none;
                }
                
                .mobile-menu-toggle {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    enhanceAccessibility();
    
    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .expertise-item, .portfolio-card, .methodology, .contact-method');
        
        elements.forEach(element => {
            // Add animation class if not already present
            if (!element.classList.contains('animate-on-scroll')) {
                element.classList.add('animate-on-scroll');
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        });
        
        const handleScroll = () => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Initial check
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add reduced motion preference check
    const checkReducedMotion = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Remove animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    checkReducedMotion();
});
