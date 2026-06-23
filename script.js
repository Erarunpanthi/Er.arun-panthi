/* ============================================================
   PORTFOLIO JS - Er. Arun Panthi
   ============================================================ */

'use strict';

// ===================== PRELOADER =====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Prevent scroll during preload
document.body.style.overflow = 'hidden';

// ===================== AOS INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 0,
    });
});

// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate(${followerX - 17.5}px, ${followerY - 17.5}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav__link, .social-link, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '50px';
            follower.style.height = '50px';
            follower.style.borderColor = 'var(--primary)';
            follower.style.background = 'rgba(37, 99, 235, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '35px';
            follower.style.height = '35px';
            follower.style.borderColor = 'var(--primary-light)';
            follower.style.background = 'transparent';
        });
    });
}

// ===================== TYPEWRITER EFFECT =====================
class TypeWriter {
    constructor(element, words, waitTime = 2500) {
        this.element = element;
        this.words = words;
        this.waitTime = waitTime;
        this.currentWord = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const word = this.words[this.currentWord % this.words.length];

        if (this.isDeleting) {
            this.currentChar--;
        } else {
            this.currentChar++;
        }

        this.element.textContent = word.substring(0, this.currentChar);

        let speed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentChar === word.length) {
            speed = this.waitTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentWord++;
            speed = 400;
        }

        setTimeout(() => this.type(), speed);
    }
}

// Init Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        new TypeWriter(typewriterEl, [
            'Civil Engineer',
            'Structural Designer',
            'Construction Supervisor',
            'Site Engineer',
            'Infrastructure Developer',
            'Project Coordinator'
        ], 2500);
    }
});

// ===================== HEADER / NAVBAR =====================
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Update active nav link
    updateActiveNavLink();

    // Back to top visibility
    toggleBackToTop();

    // Animate skill bars
    animateSkillBars();

    // Animate counter
    animateCounter();
});

// Mobile nav toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close nav on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
    }
});

// ===================== ACTIVE NAV LINK =====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active-link');
                }
            });
        }
    });
}

// ===================== SKILL BARS ANIMATION =====================
let skillsAnimated = false;

function animateSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || skillsAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        const bars = document.querySelectorAll('.skill__progress');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
        skillsAnimated = true;
    }
}

// ===================== COUNTER ANIMATION =====================
let counterAnimated = false;

function animateCounter() {
    const counterSection = document.getElementById('counter');
    if (!counterSection || counterAnimated) return;

    const rect = counterSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
        const counters = document.querySelectorAll('.counter__number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + '+';
                }
            }

            requestAnimationFrame(update);
        });

        counterAnimated = true;
    }
}

// ===================== BACK TO TOP =====================
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show loading
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        btnText.style.display = 'none';
        btnIcon.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Reset after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
                contactForm.reset();
                btnText.style.display = 'inline';
                btnIcon.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 5000);
        }, 2000);
    });
}

// ===================== PARALLAX EFFECT ON HERO =====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero__content');
    const heroImage = document.querySelector('.hero__image');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }

    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroImage.style.opacity = 1 - (scrolled / (window.innerHeight * 0.9));
    }
});

// ===================== INTERSECTION OBSERVER FOR REVEAL =====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.exp__card, .project__card, .software__card, .soft-skill__card, .timeline__item, .contact__card').forEach(el => {
    revealObserver.observe(el);
});

// ===================== DYNAMIC YEAR IN FOOTER =====================
const yearSpan = document.querySelector('.footer__bottom p');
if (yearSpan) {
    const year = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', year);
}

// ===================== KEYBOARD NAVIGATION =====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
});

// ===================== CONSOLE GREETING =====================
console.log(
    '%c🏗️ Er. Arun Panthi - Civil Engineer Portfolio',
    'color: #2563eb; font-size: 18px; font-weight: bold; padding: 10px;'
);
console.log(
    '%cBuilding the future, one structure at a time.',
    'color: #94a3b8; font-size: 12px; padding: 5px;'
);
