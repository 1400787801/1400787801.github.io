// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu interaction
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    // Toggle navigation menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
        
        // Prevent background scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
        
        // Add animation effect
        if (navLinks.classList.contains('active')) {
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateY(0)';
            }, 50);
        }
    });
    
    // Close menu when clicking nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    body.style.overflow = 'auto';
                }, 300);
            }
        });
    });
    
    // Close menu when clicking outside the nav area
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && window.innerWidth <= 768) {
            if (navLinks.classList.contains('active')) {
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.add('fa-bars');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    body.style.overflow = 'auto';
                }, 300);
            }
        }
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Subscribe form submission handling
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Actual form submission logic can be added here
                alert('Subscription successful! Thank you for supporting the Minnesota Timberwolves!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Image lazy loading effect - Mobile device adaptation
    const images = document.querySelectorAll('img');
    const imgOptions = {
        threshold: 0.1,
        rootMargin: window.innerWidth <= 768 ? "0px 0px 200px 0px" : "0px 0px 300px 0px"
    };
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const img = entry.target;
                // Optimize animation performance for mobile devices
                const transitionTime = window.innerWidth <= 768 ? 'opacity 0.3s ease' : 'opacity 0.5s ease';
                img.style.opacity = '0';
                img.style.transition = transitionTime;
                
                // Simulate image loading
                setTimeout(() => {
                    img.style.opacity = '1';
                }, window.innerWidth <= 768 ? 150 : 300);
                
                observer.unobserve(img);
            });
        }, imgOptions);
        
        images.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.style.opacity = '1';
        });
    }
    
    // Add animation effects for player cards - Mobile device adaptation
    const playerCards = document.querySelectorAll('.player-card');
    const cardOptions = {
        threshold: 0.1,
        rootMargin: window.innerWidth <= 768 ? "0px 0px 50px 0px" : "0px 0px 100px 0px"
    };
    
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;
                
                const card = entry.target;
                // Optimize animation performance and delay for mobile devices
                const transitionTime = window.innerWidth <= 768 ? 'opacity 0.4s ease, transform 0.4s ease' : 'opacity 0.6s ease, transform 0.6s ease';
                const delay = window.innerWidth <= 768 ? 50 * index : 100 * index;
                
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = transitionTime;
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(card);
            });
        }, cardOptions);
        
        playerCards.forEach(card => {
            cardObserver.observe(card);
        });
    } else {
        // Fallback
        playerCards.forEach(card => {
            card.style.opacity = '1';
        });
    }
    
    // Add responsiveness when window size changes
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
                body.style.overflow = 'auto';
            }
            
            // Update lazy loading configuration
            updateLazyLoadOptions();
        }, 250); // Debounce to avoid frequent triggers
    });
    
    // Update lazy loading options
    function updateLazyLoadOptions() {
        // Logic to update lazy loading configuration based on window size can be implemented here
    }
    
    // Add better interaction experience for touch devices
    if ('ontouchstart' in window) {
        // Add touch feedback for buttons and links
        document.querySelectorAll('a, button').forEach(element => {
            element.style.tapHighlightColor = 'transparent';
            element.style.WebkitTapHighlightColor = 'transparent';
        });
    }
});