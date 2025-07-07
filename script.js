// DOM Elements
const body = document.body;
const themeSwitches = document.querySelectorAll('.theme-switch');
const loadingScreen = document.querySelector('.loading-screen');
const backToTopBtn = document.getElementById('back-to-top');
const hamburgerIcon = document.getElementById('hamburger-icon');
const menuLinks = document.getElementById('menu-links');
const navLinks = document.querySelectorAll('.nav-link');
const currentYear = document.getElementById('year');
const typewriterText = document.querySelector('.typewriter-text');
const sections = document.querySelectorAll('section');
const scrollDownButtons = document.querySelectorAll('.scroll-down');
const menuOverlay = document.querySelector('.menu-overlay');

// Constants
const typingConfig = {
    speed: 100,
    deleteSpeed: 50,
    endPause: 1000,
    startPause: 500
};

// State Variables
let charIndex = 0;
let isDeleting = false;
let currentTypingSpeed = typingConfig.speed;
const profession = "Cybersecurity Analyst";

// Initialize
function init() {
    setCurrentYear();
    setupTheme();
    setupEventListeners();
    startTypewriterEffect();
    setupScrollAnimations();
    setupPageLoad();
}

// Set current year in footer
function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

// Theme functionality
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    body.setAttribute('data-theme', savedTheme);
    
    themeSwitches.forEach(switchEl => {
        switchEl.checked = savedTheme === 'light';
    });
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeSwitches.forEach(switchEl => {
        switchEl.addEventListener('change', toggleTheme);
    });
    
    // Back to top button
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Mobile menu
    hamburgerIcon.addEventListener('click', toggleMenu);
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', closeMenu);
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Scroll animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Scroll down buttons
    scrollDownButtons.forEach(button => {
        button.addEventListener('click', scrollToNextSection);
    });
}

// Page load handler
function setupPageLoad() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 1000);
}

// Theme toggle handler
function toggleTheme() {
    const isLight = body.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    document.querySelectorAll('.theme-switch').forEach(switchEl => {
        switchEl.checked = newTheme === 'light';
    });
}

// Back to top functionality
function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile menu toggle
function toggleMenu() {
    hamburgerIcon.classList.toggle('open');
    menuLinks.classList.toggle('open');
    body.classList.toggle('menu-active');
    
    if (menuLinks.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
        menuOverlay.style.visibility = 'visible';
        menuOverlay.style.opacity = '1';
    } else {
        document.body.style.overflow = '';
        menuOverlay.style.visibility = 'hidden';
        menuOverlay.style.opacity = '0';
    }
}

// Close mobile menu
function closeMenu() {
    hamburgerIcon.classList.remove('open');
    menuLinks.classList.remove('open');
    body.classList.remove('menu-active');
    document.body.style.overflow = '';
    menuOverlay.style.visibility = 'hidden';
    menuOverlay.style.opacity = '0';
}

// Scroll to next section
function scrollToNextSection() {
    const currentSection = this.closest('section');
    const nextSection = currentSection.nextElementSibling;
    
    if (nextSection) {
        window.scrollTo({
            top: nextSection.offsetTop,
            behavior: 'smooth'
        });
    }
}

// Typewriter effect
function typeWriter() {
    if (isDeleting) {
        typewriterText.textContent = profession.substring(0, charIndex - 1);
        charIndex--;
        currentTypingSpeed = typingConfig.deleteSpeed;
    } else {
        typewriterText.textContent = profession.substring(0, charIndex + 1);
        charIndex++;
        currentTypingSpeed = typingConfig.speed;
    }
    
    if (!isDeleting && charIndex === profession.length) {
        isDeleting = true;
        currentTypingSpeed = typingConfig.endPause;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTypingSpeed = typingConfig.startPause;
    }
    
    setTimeout(typeWriter, currentTypingSpeed);
}

function startTypewriterEffect() {
    setTimeout(typeWriter, 1000);
}

// Smooth scrolling
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (menuLinks.classList.contains('open')) {
            closeMenu();
        }
    }
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const screenPosition = window.innerHeight / 1.3;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
    
    // Update active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function setupScrollAnimations() {
    document.querySelectorAll('.section, .details-container, .project-img').forEach(el => {
        el.classList.add('reveal');
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);
