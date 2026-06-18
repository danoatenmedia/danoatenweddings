// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize navbar state
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('scrolled');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const targetElement = document.querySelector(href);
        
        // Only prevent default and smooth scroll if the target element exists on the current page
        if (targetElement) {
        e.preventDefault();
            targetElement.scrollIntoView({
            behavior: 'smooth'
        });
        }
    });
});

// Portfolio grid items
const portfolioItems = [
    {
        image: '1-853.jpg',
        title: 'Elegant Wedding Ceremony',
        category: 'Photography'
    },
    {
        image: '1-852.jpg',
        title: 'First Dance',
        category: 'Photography'
    },
    {
        image: '1-593.jpg',
        title: 'Bride Preparation',
        category: 'Photography'
    },
    {
        image: '1-588.jpg',
        title: 'Wedding Details',
        category: 'Photography'
    },
    {
        image: '1-575.jpg',
        title: 'Couple Portraits',
        category: 'Photography'
    },
    {
        image: '1-576.jpg',
        title: 'Wedding Reception',
        category: 'Photography'
    },
    {
        image: '2-851.jpg',
        title: 'Intimate Moments',
        category: 'Photography'
    },
    {
        image: '2-830.jpg',
        title: 'Wedding Rings',
        category: 'Photography'
    },
    {
        image: '2-833.jpg',
        title: 'Bride & Groom',
        category: 'Photography'
    }
];

// Load portfolio items (home page only)
const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
        <div class="portfolio-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        </div>
    `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Add hover effect to portfolio items
const portfolioImages = document.querySelectorAll('.portfolio-image');
if (portfolioImages.length) {
    portfolioImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.querySelector('.portfolio-overlay').style.opacity = '1';
        });
        image.addEventListener('mouseleave', () => {
            image.querySelector('.portfolio-overlay').style.opacity = '0';
        });
    });
}

// Contact Form Handling (Web3Forms)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const submitButton = contactForm.querySelector('.submit-button');
        const submitButtonText = contactForm.querySelector('.submit-button-text');
        const formStatus = document.getElementById('formStatus');

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const weddingDate = document.getElementById('weddingDate').value;
            const venue = document.getElementById('venue').value.trim();
            const message = document.getElementById('message').value.trim();

            if (submitButton) submitButton.disabled = true;
            if (submitButtonText) submitButtonText.textContent = 'Sending...';
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: '32ddc994-ccfb-449d-b4ee-030cc0a2051e',
                        subject: `Wedding Enquiry — ${firstName} ${lastName}`,
                        from_name: 'Dan Oaten Weddings Website',
                        name: `${firstName} ${lastName}`,
                        email,
                        phone,
                        wedding_date: weddingDate,
                        venue,
                        message,
                        botcheck: ''
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    if (formStatus) {
                        formStatus.textContent = 'Thank you! Your message has been sent. I\'ll get back to you within 24 hours.';
                        formStatus.className = 'form-status form-status-success';
                    }
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                if (formStatus) {
                    const detail = error.message ? ` (${error.message})` : '';
                    formStatus.textContent = `Sorry, something went wrong${detail}. Please email danoatenmedia@gmail.com directly.`;
                    formStatus.className = 'form-status form-status-error';
                }
            } finally {
                if (submitButton) submitButton.disabled = false;
                if (submitButtonText) submitButtonText.textContent = 'Send Message';
            }
        });
    }
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const showImage = () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        };

        img.style.opacity = '0';

        if (img.complete) {
            showImage();
        } else {
            img.addEventListener('load', showImage);
            img.addEventListener('error', showImage);
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Mobile menu
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

function setMobileMenuOpen(isOpen) {
    if (!navLinks || !navbar) return;
    navLinks.classList.toggle('active', isOpen);
    navbar.classList.toggle('menu-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileMenuButton.textContent = isOpen ? '✕' : '☰';
    }
}

if (mobileMenuButton && navLinks) {
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');

    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        setMobileMenuOpen(!navLinks.classList.contains('active'));
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        if (!e.target.closest('.nav-content') && !e.target.closest('.nav-links')) {
            setMobileMenuOpen(false);
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            setMobileMenuOpen(false);
        });
    });
} 

// Simple loading screen handler
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});

// Email submission
function sendEmail(event) {
    event.preventDefault();
    const email = document.getElementById('subscriberEmail').value;
    const subject = 'New Website Subscriber';
    const body = `A new subscriber has signed up with the email: ${email}`;
    const mailtoLink = `mailto:danoatenmedia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    document.getElementById('subscriberEmail').value = '';
} 