// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 85;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number[data-count]');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

// Observe the hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// Web3Forms Contact Form Integration
document.querySelector('.contact-form form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Prepare data for Web3Forms
    const data = {
        access_key: 'b42c7bee-c57c-4a1a-92f1-49019cfed6b4', // Get your key from https://web3forms.com
        name: formData.get('name'),
        organization: formData.get('organization'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        from_name: 'TransOrigin Advisory Contact Form'
    };
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Success!
            showSuccess();
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        showError();
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Success message
function showSuccess() {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.innerHTML = `
        <strong>✓ Message Sent Successfully</strong><br>
        Thank you for reaching out. We will respond within 24 hours.
    `;
    
    const form = document.querySelector('.contact-form form');
    form.insertAdjacentElement('beforebegin', message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Error message
function showError() {
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.innerHTML = `
        <strong>✗ Submission Failed</strong><br>
        Please try again or email us directly at info@transoriginadvisory.com
    `;
    
    const form = document.querySelector('.contact-form form');
    form.insertAdjacentElement('beforebegin', message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Add scroll animation to nav
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 5px 20px rgba(10, 30, 61, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

/* Gallery Lightbox JavaScript - Add this to your script.js file */

// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">×</button>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Add click handlers to all gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption h4').textContent;
            const description = this.querySelector('.gallery-caption p').textContent;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = `<strong>${caption}</strong><br>${description}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});