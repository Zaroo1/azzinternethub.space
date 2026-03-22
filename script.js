// script.js - Enhanced with modern JavaScript practices

document.addEventListener('DOMContentLoaded', function() {
    console.log('AZZ Internet Hub - Website loaded successfully');
    
    // Initialize all components
    initModal();
    initForms();
    initWhatsAppButton();
    initBackToTop();
    initUniversityTabs();
    initMobileMenu();
    initSmoothScrolling();
});

// Image Modal Functionality
function initModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll(".gallery-image");
    
    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });
    
    // Close modal when clicking X
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });
    
    // Close modal when clicking outside image
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Form Handling
function initForms() {
    // Rating Form
    const ratingForm = document.querySelector('.rate-us form');
    if (ratingForm) {
        ratingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const rating = document.getElementById('rating').value;
            showToast(`Thank you for your ${rating}-star rating!`);
            this.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.subscribe form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            if (validateEmail(email)) {
                showToast(`Thank you for subscribing with ${email}!`);
                this.reset();
            } else {
                showToast('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            showToast('Your message has been sent successfully!');
            this.reset();
        });
    }
}

// WhatsApp Button Animation
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // You can add tracking here if needed
            console.log('WhatsApp button clicked');
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// University Tabs
function initUniversityTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'(.*?)'/)[1];
            openTab(tabName);
        });
    });
}

function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('open');
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('open');
                }
            }
        });
    });
}

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(reg => console.log("Service Worker registered"))
      .catch(err => console.log("Service Worker not registered", err));
  });
}