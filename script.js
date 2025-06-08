document.addEventListener('DOMContentLoaded', function() {
    // Set real viewport height (to avoid mobile browser UI issues)
    function setRealVh() {
        // First we get the viewport height and multiply it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --real-vh custom property to the root of the document
        document.documentElement.style.setProperty('--real-vh', `${vh * 100}px`);
        
        // For browsers that need the full height minus navbar height
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        document.documentElement.style.setProperty('--real-vh-minus-nav', `${vh * 100 - navbarHeight}px`);
    }
    
    // Set the height initially
    setRealVh();
    
    // Update on orientation change or resize, but use a debounce to avoid constant updates
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setRealVh, 150);
    });
    
    window.addEventListener('orientationchange', setRealVh);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Set the correct top position for the mobile menu based on navbar height
    function setMobileMenuPosition() {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        navMenu.style.top = `${navbarHeight}px`;
    }
    
    // Set initial position
    setMobileMenuPosition();
    
    // Update on resize
    window.addEventListener('resize', setMobileMenuPosition);
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    for (let anchor of anchorLinks) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust the offset based on the target
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offset = targetId === '#pickup-form' ? navbarHeight + 100 : navbarHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Pickup form submission
    const pickupForm = document.getElementById('pickup-form');
    if (pickupForm) {
        pickupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const formData = new FormData(pickupForm);
            let isValid = true;
            
            // Check required fields (everything except message)
            const requiredFields = ['name', 'phone', 'address', 'date', 'time'];
            for (let field of requiredFields) {
                if (!formData.get(field)) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // In a real application, you would send this data to a server
                alert('Thank you! Your pickup request has been submitted. We will contact you shortly to confirm.');
                pickupForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Add current year to footer copyright
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Simple animation for service items on scroll
    const animateOnScroll = function() {
        const serviceItems = document.querySelectorAll('.service-item');
        const contactItems = document.querySelectorAll('.contact-item');
        const elements = [...serviceItems, ...contactItems];
        
        elements.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.service-item, .contact-item');
    elementsToAnimate.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on page load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}); 