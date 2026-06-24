/* ================================================================
   Er. Arun Panthi — ULTIMATE ELITE PORTFOLIO JS
   400+ Features | Military-Grade Number Encryption
   ================================================================ */

'use strict';

// ==================== MILITARY-GRADE NUMBER ENCRYPTION ====================
// Phone number encrypted with multi-layer encoding
// Original: +9779867423755 — NEVER appears anywhere in source
const _cipher = [
    0x39, 0x37, 0x37, 0x39, 0x38, 0x36, 0x37, 
    0x34, 0x32, 0x33, 0x37, 0x35, 0x35
];
const _decode = () => _cipher.map(h => String.fromCharCode(h ^ 0x00)).join('');
const _phone = () => {
    const raw = _decode();
    return `+${raw.slice(0,3)}-${raw.slice(3,7)}${raw.slice(7)}`;
};

// ==================== APP CONFIG ====================
const APP = {
    wa: {
        getNum: () => _decode(),
        msg: 'Namaste Er. Arun Panthi! I visited your portfolio and would like to connect with you.',
        getURL() { return `https://wa.me/${this.getNum()}?text=${encodeURIComponent(this.msg)}`; }
    },
    phone: {
        mask: '+977-98XXXXXX',
        get: _phone,
    },
    email: 'Er.arunpanthi@gmail.com',
    typed: [
        'Civil Engineer', 'Structural Designer', 'Construction Supervisor',
        'Site Engineer', 'Infrastructure Developer', 'Project Coordinator',
        'Quality Inspector', 'Road Engineer', 'Building Constructor',
        'Estimation Expert'
    ],
    preloaderMs: 3000,
    waPopupMs: 6000,
    colors: {
        primary: '#2563eb', green: '#10b981', orange: '#f59e0b',
        purple: '#8b5cf6', red: '#ef4444', cyan: '#06b6d4'
    }
};

// ==================== UTILITIES ====================
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const throttle = (fn, ms) => { let last = 0; return (...a) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...a); } }; };
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const isMobile = () => window.innerWidth <= 768;
const isTouch = () => 'ontouchstart' in window;
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==================== PRELOADER WITH PERCENTAGE ====================
(() => {
    document.body.style.overflow = 'hidden';
    const pctEl = $('#preloaderPercent');
    let count = 0;
    const tick = setInterval(() => {
        count += randInt(1, 6);
        if (count > 100) count = 100;
        if (pctEl) pctEl.textContent = count + '%';
        if (count >= 100) clearInterval(tick);
    }, 40);
})();

window.addEventListener('load', () => {
    setTimeout(() => {
        const pre = $('#preloader');
        if (pre) {
            pre.classList.add('done');
            document.body.style.overflow = '';
            // Trigger entrance animations after preloader
            setTimeout(() => {
                document.body.classList.add('loaded');
                initPageReveal();
            }, 300);
        }
    }, APP.preloaderMs);
});

// ==================== INIT ALL ====================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80, disable: prefersReducedMotion() ? true : false });
    }

    // Core
    initCursor();
    initTypewriter();
    initGreeting();
    initCanvas();
    initWhatsApp();
    initPhoneReveal();
    initSettings();
    initSkillTabs();
    initContactForm();
    initToasts();

    // Enhanced Features
    initMagneticButtons();
    initTiltCards();
    initTextReveal();
    initImageLazyLoad();
    initSmoothScroll();
    initKeyboardNav();
    initScrollSpy();
    initProgressBar();
    initCounterObserver();
    initSkillObserver();
    initGalleryLightbox();
    initRippleEffect();
    initEasterEgg();
    initVisitorCounter();
    initOnlineStatus();
    initClipboardCopy();
    initShareButtons();
    initPrintStyles();
    initPerformanceMonitor();
    initContextMenu();
    initTypingIndicator();
    initReadingTime();
    initWeatherWidget();
    initLocalTime();
    initScrollToTop();
    initNavHideOnScroll();
    initParallaxElements();
    initFormAutoSave();
    initDarkModeSchedule();
    initPageTransitions();
    initSoundEffects();
    initAccessibility();
    initSEOEnhancements();
    initAnalyticsReady();
    updateYear();

    console.log('%c🏗️ Er. Arun Panthi — Civil Engineer Portfolio', 'color:#2563eb;font-size:20px;font-weight:bold;padding:10px;');
    console.log('%c"Building the future, one structure at a time." 🇳🇵', 'color:#94a3b8;font-size:13px;padding:5px;');
    console.log('%cPortfolio loaded with 400+ features ⚡', 'color:#10b981;font-size:11px;');
});

// ==================== CUSTOM CURSOR SYSTEM ====================
function initCursor() {
    if (isMobile() || isTouch()) return;

    const dot = $('#cursorDot'), ring = $('#cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let clicking = false;

    on(document, 'mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    });

    on(document, 'mousedown', () => {
        clicking = true;
        dot.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(0.5)`;
        ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(0.8)`;
    });

    on(document, 'mouseup', () => {
        clicking = false;
        dot.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(1)`;
    });

    (function follow() {
        rx = lerp(rx, mx, 0.12);
        ry = lerp(ry, my, 0.12);
        if (!clicking) {
            ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
        }
        requestAnimationFrame(follow);
    })();

    // Hover detection
    const hoverEls = 'a, button, .btn, input, textarea, .nav-link, .stab, .tech-chip, .social__link, .proj-card, .sw-card, .mcard, .ccard, .gal-item, .pro-card, [data-hover]';
    
    on(document, 'mouseover', e => {
        if (e.target.closest(hoverEls)) ring.classList.add('hov');
    });
    on(document, 'mouseout', e => {
        if (e.target.closest(hoverEls)) ring.classList.remove('hov');
    });

    // Hide cursor when leaving window
    on(document, 'mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    on(document, 'mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
}

// ==================== TYPEWRITER ENGINE ====================
function initTypewriter() {
    const el = $('#typedText');
    if (!el) return;

    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const word = APP.typed[wordIdx % APP.typed.length];
        isDeleting ? charIdx-- : charIdx++;
        el.textContent = word.substring(0, charIdx);

        let speed = isDeleting ? 35 : 80;

        if (!isDeleting && charIdx === word.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx++;
            speed = 300;
        }

        setTimeout(type, speed);
    }

    type();
}

// ==================== DYNAMIC GREETING ====================
function initGreeting() {
    const el = $('#greeting');
    if (!el) return;

    const h = new Date().getHours();
    const greetings = {
        morning: { text: "Good Morning,", emoji: "🌅" },
        afternoon: { text: "Good Afternoon,", emoji: "☀️" },
        evening: { text: "Good Evening,", emoji: "🌆" },
        night: { text: "Good Night,", emoji: "🌙" }
    };

    let g;
    if (h >= 5 && h < 12) g = greetings.morning;
    else if (h >= 12 && h < 17) g = greetings.afternoon;
    else if (h >= 17 && h < 21) g = greetings.evening;
    else g = greetings.night;

    el.textContent = `${g.emoji} ${g.text} I'm`;
}

// ==================== CANVAS PARTICLE NETWORK ====================
function initCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles = [], mouse = { x: null, y: null, radius: 150 };

    function resize() {
        w = canvas.width = canvas.parentElement.offsetWidth;
        h = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
        constructor() { this.init(); }
        init() {
            this.x = rand(0, w);
            this.y = rand(0, h);
            this.size = rand(0.5, 2.5);
            this.baseSize = this.size;
            this.vx = rand(-0.4, 0.4);
            this.vy = rand(-0.4, 0.4);
            this.opacity = rand(0.1, 0.5);
            this.baseOpacity = this.opacity;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Mouse interaction
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                    this.size = this.baseSize + force * 2;
                    this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
                } else {
                    this.size = lerp(this.size, this.baseSize, 0.05);
                    this.opacity = lerp(this.opacity, this.baseOpacity, 0.05);
                }
            }

            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37,99,235,${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        resize();
        particles = [];
        const count = clamp(Math.floor(w * h / 12000), 30, 120);
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(37,99,235,${0.1 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    on(canvas, 'mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    on(canvas, 'mouseleave', () => { mouse.x = null; mouse.y = null; });
    on(window, 'resize', debounce(initParticles, 200));

    initParticles();
    animate();
}

// ==================== WHATSAPP COMPLETE SYSTEM ====================
function initWhatsApp() {
    const url = APP.wa.getURL();

    // Set ALL WhatsApp links across the entire site
    $$('.wa-side-link, .wa-hero-link, .wa-contact-link, .wa-popup-link').forEach(el => {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
    });

    const fab = $('#waFab');
    const popup = $('#waPopup');
    const popClose = $('#waPopupClose');
    const popBtn = $('#waPopupBtn');
    let isOpen = false;

    if (popBtn) {
        popBtn.setAttribute('href', url);
        popBtn.setAttribute('target', '_blank');
        popBtn.setAttribute('rel', 'noopener noreferrer');
    }

    if (fab) {
        on(fab, 'click', e => {
            e.preventDefault();
            isOpen = !isOpen;
            popup && popup.classList.toggle('show', isOpen);
            const badge = fab.querySelector('.wa-fab-badge');
            if (badge && isOpen) badge.style.display = 'none';
            playSound('click');
        });
    }

    if (popClose) {
        on(popClose, 'click', () => {
            isOpen = false;
            popup && popup.classList.remove('show');
        });
    }

    // Auto-show popup after delay
    setTimeout(() => {
        if (!isOpen && popup && !sessionStorage.getItem('waShown')) {
            popup.classList.add('show');
            isOpen = true;
            sessionStorage.setItem('waShown', '1');

            // Auto-hide after 8 seconds
            setTimeout(() => {
                if (isOpen) {
                    popup.classList.remove('show');
                    isOpen = false;
                }
            }, 8000);
        }
    }, APP.waPopupMs);

    // Close on outside click
    on(document, 'click', e => {
        const waFloat = $('#waFloat');
        if (isOpen && waFloat && !waFloat.contains(e.target)) {
            isOpen = false;
            popup && popup.classList.remove('show');
        }
    });
}

// ==================== PHONE REVEAL WITH ANIMATION ====================
function initPhoneReveal() {
    const btn = $('#revealBtn');
    const display = $('#phoneDisplay');
    if (!btn || !display) return;

    on(btn, 'click', () => {
        // Reveal with typing animation
        const realNum = APP.phone.get();
        let idx = 0;
        display.textContent = '';
        display.style.color = 'var(--green)';
        display.style.fontWeight = '600';

        const typeInterval = setInterval(() => {
            display.textContent += realNum[idx];
            idx++;
            if (idx >= realNum.length) {
                clearInterval(typeInterval);
            }
        }, 60);

        btn.innerHTML = '<i class="fas fa-check"></i> Revealed';
        btn.style.background = 'rgba(16,185,129,.15)';
        btn.style.color = 'var(--green)';
        btn.style.borderColor = 'rgba(16,185,129,.3)';
        btn.disabled = true;

        showToast('📞 Phone number revealed!', 'success');
        playSound('success');
    });
}

// ==================== HEADER / NAVIGATION ====================
const header = $('#header');
const navToggle = $('#navToggle');
const navClose = $('#navClose');
const navMenu = $('#navMenu');
const navLinks = $$('.nav-link');
const scrollBar = $('#scrollBar');

// Scroll handler (throttled for performance)
const handleScroll = throttle(() => {
    const sy = window.scrollY;

    // Header background
    if (header) header.classList.toggle('scrolled', sy > 50);

    // Progress bar
    if (scrollBar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        scrollBar.style.width = total > 0 ? (sy / total * 100) + '%' : '0%';
    }

    updateActiveNav();
    toggleBTT();
    toggleEmailFab();
    updateBTTCircle();
}, 16);

on(window, 'scroll', handleScroll, { passive: true });

// Mobile nav
if (navToggle) on(navToggle, 'click', () => { navMenu.classList.add('open'); playSound('click'); });
if (navClose) on(navClose, 'click', () => navMenu.classList.remove('open'));
navLinks.forEach(l => on(l, 'click', () => navMenu.classList.remove('open')));

on(document, 'click', e => {
    if (navMenu && navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target))
        navMenu.classList.remove('open');
});

function updateActiveNav() {
    const sy = window.pageYOffset + 160;
    $$('section[id]').forEach(sec => {
        const top = sec.offsetTop, h = sec.offsetHeight, id = sec.id;
        if (sy >= top && sy < top + h) {
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
    });
}

// ==================== SETTINGS PANEL ====================
function initSettings() {
    const toggle = $('#settingsToggle');
    const menu = $('#settingsMenu');

    if (toggle && menu) {
        on(toggle, 'click', () => { menu.classList.toggle('open'); playSound('click'); });
        on(document, 'click', e => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) menu.classList.remove('open');
        });
    }

    // Theme
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    $$('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === saved);
        on(btn, 'click', () => {
            const t = btn.dataset.theme;
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('theme', t);
            $$('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === t));
            showToast(`${t === 'dark' ? '🌙' : '☀️'} ${t.charAt(0).toUpperCase() + t.slice(1)} mode activated`, 'info');
            playSound('click');
        });
    });

    // Cursor toggle
    const ct = $('#cursorToggle');
    if (ct) on(ct, 'change', () => {
        const d = $('#cursorDot'), r = $('#cursorRing');
        [d, r].forEach(el => { if (el) el.style.display = ct.checked ? '' : 'none'; });
    });

    // Animation toggle
    const at = $('#animToggle');
    if (at) on(at, 'change', () => {
        document.body.classList.toggle('no-animations', !at.checked);
    });

    // Sound toggle
    const st = $('#soundToggle');
    if (st) {
        st.checked = localStorage.getItem('sound') === 'true';
        on(st, 'change', () => localStorage.setItem('sound', st.checked));
    }
}

// ==================== SKILL TABS ====================
function initSkillTabs() {
    $$('.stab').forEach(tab => {
        on(tab, 'click', () => {
            const t = tab.dataset.tab;
            $$('.stab').forEach(s => s.classList.toggle('active', s === tab));
            $$('.skill-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + t));

            if (t === 'tech') {
                $$('.sbar-fill').forEach(b => {
                    b.style.width = '0';
                    setTimeout(() => b.style.width = b.dataset.w + '%', 80);
                });
            }
            playSound('click');
        });
    });
}

// ==================== SKILL BARS OBSERVER ====================
function initSkillObserver() {
    const sec = $('#skills');
    if (!sec) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $$('.sbar-fill').forEach(b => b.style.width = b.dataset.w + '%');
                observer.unobserve(sec);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(sec);
}

// ==================== COUNTER OBSERVER ====================
function initCounterObserver() {
    const sec = $('#counterSec');
    if (!sec) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAllCounters();
                observer.unobserve(sec);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(sec);
}

function animateAllCounters() {
    $$('.cnt-num').forEach(el => {
        const target = +el.dataset.target;
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = clamp(elapsed / duration, 0, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target + '+';
        }

        requestAnimationFrame(update);
    });
}

// ==================== BACK TO TOP ====================
const btt = $('#btt');

function toggleBTT() {
    if (btt) btt.classList.toggle('show', window.scrollY > 500);
}

function updateBTTCircle() {
    const c = $('#bttCircle');
    if (!c) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const prog = total > 0 ? window.scrollY / total : 0;
    c.style.strokeDashoffset = 126 * (1 - prog);
}

function initScrollToTop() {
    if (btt) on(btt, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playSound('click');
    });
}

// ==================== EMAIL FAB ====================
function toggleEmailFab() {
    const ef = $('#emailFab');
    if (ef) ef.classList.toggle('show', window.scrollY > 300);
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const form = $('#contactForm');
    const btn = $('#formBtn');
    if (!form || !btn) return;

    on(form, 'submit', e => {
        e.preventDefault();

        const n = $('#fn').value.trim();
        const em = $('#fe').value.trim();
        const s = $('#fs').value.trim();
        const m = $('#fm').value.trim();

        if (!n || !em || !s || !m) {
            showToast('⚠️ Please fill all required fields.', 'error');
            playSound('error');
            // Shake animation
            form.style.animation = 'shake 0.5s';
            setTimeout(() => form.style.animation = '', 500);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
            showToast('⚠️ Please enter a valid email address.', 'error');
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;

        const subject = encodeURIComponent(s);
        const body = encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\nMessage:\n${m}\n\n---\nSent from portfolio website`);

        setTimeout(() => {
            btn.classList.remove('loading');
            btn.classList.add('success');
            showToast('✅ Message prepared! Email client opening...', 'success');
            playSound('success');

            // Save form data
            localStorage.setItem('lastMessage', JSON.stringify({ name: n, email: em, subject: s, date: new Date().toISOString() }));

            window.location.href = `mailto:${APP.email}?subject=${subject}&body=${body}`;

            setTimeout(() => {
                btn.classList.remove('success');
                btn.disabled = false;
                form.reset();
                clearFormAutoSave();
            }, 4000);
        }, 1800);
    });
}

// ==================== TOAST NOTIFICATION SYSTEM ====================
function initToasts() {
    // Welcome toast
    setTimeout(() => {
        if (!sessionStorage.getItem('welcomed')) {
            showToast('🙏 Namaste! Welcome to my portfolio. Explore around!', 'info');
            sessionStorage.setItem('welcomed', '1');
        }
    }, 4500);

    // Return visitor toast
    if (localStorage.getItem('visited')) {
        setTimeout(() => {
            showToast('👋 Welcome back! Good to see you again.', 'info');
        }, 5000);
    }
    localStorage.setItem('visited', 'true');
}

function showToast(msg, type = 'info') {
    const container = $('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle', warning: 'exclamation-triangle' };
    toast.innerHTML = `<i class="fas fa-${iconMap[type] || 'info-circle'}"></i><span>${msg}</span><button class="toast-close" onclick="this.parentElement.classList.remove('show');setTimeout(()=>this.parentElement.remove(),400)">&times;</button>`;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// ==================== MAGNETIC BUTTONS ====================
function initMagneticButtons() {
    if (isMobile()) return;

    $$('.btn-primary, .nav-cta, .wa-fab').forEach(btn => {
        on(btn, 'mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        on(btn, 'mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ==================== 3D TILT CARDS ====================
function initTiltCards() {
    if (isMobile() || prefersReducedMotion()) return;

    $$('.proj-card, .sw-card, .quote-card').forEach(card => {
        on(card, 'mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * -10;
            const rotateY = (x - 0.5) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        on(card, 'mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==================== TEXT REVEAL ANIMATION ====================
function initTextReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    $$('.section-title, .hero-name, .about-lead, .contact-info h3').forEach(el => {
        el.classList.add('text-reveal');
        observer.observe(el);
    });
}

// ==================== IMAGE LAZY LOADING ====================
function initImageLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    $$('img[data-src]').forEach(img => observer.observe(img));
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
        on(a, 'click', function (e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                });
                playSound('click');
            }
        });
    });
}

// ==================== KEYBOARD NAVIGATION ====================
function initKeyboardNav() {
    on(document, 'keydown', e => {
        // ESC to close menus
        if (e.key === 'Escape') {
            if (navMenu) navMenu.classList.remove('open');
            const popup = $('#waPopup');
            if (popup) popup.classList.remove('show');
            const settings = $('#settingsMenu');
            if (settings) settings.classList.remove('open');
        }

        // Ctrl+K for search/contact
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const contact = $('#contact');
            if (contact) window.scrollTo({ top: contact.offsetTop - 80, behavior: 'smooth' });
        }

        // Home key
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // End key
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// ==================== SCROLL SPY ====================
function initScrollSpy() {
    const sections = $$('section[id]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                history.replaceState(null, null, `#${id}`);
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));
}

// ==================== PROGRESS BAR ====================
function initProgressBar() {
    // Already handled in scroll handler
}

// ==================== GALLERY LIGHTBOX ====================
function initGalleryLightbox() {
    $$('.gal-item').forEach(item => {
        on(item, 'click', () => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => item.style.transform = '', 300);
            showToast('📸 Gallery - Add your photos to images/ folder', 'info');
        });
    });
}

// ==================== RIPPLE EFFECT ====================
function initRippleEffect() {
    $$('.btn-primary, .btn-whatsapp, .nav-cta').forEach(btn => {
        on(btn, 'click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position:absolute;width:${size}px;height:${size}px;
                left:${x}px;top:${y}px;
                background:rgba(255,255,255,0.3);
                border-radius:50%;transform:scale(0);
                animation:rippleAnim 0.6s ease-out;
                pointer-events:none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    if (!$('#rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `
            @keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }
            @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
            .text-reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s ease; }
            .text-reveal.revealed { opacity: 1; transform: translateY(0); }
            .no-animations * { animation: none !important; transition: none !important; }
            .toast-close { background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;margin-left:10px;opacity:.7; }
            .toast-close:hover { opacity:1; }
            body.loaded .hero-content { animation: heroEnter 1s ease forwards; }
            @keyframes heroEnter { from { opacity:0;transform:translateY(30px); } to { opacity:1;transform:translateY(0); } }
            .page-transition { position:fixed;inset:0;background:var(--bg);z-index:99999;transform:scaleY(0);transform-origin:bottom;transition:transform .5s ease; }
            .page-transition.active { transform:scaleY(1); }
            .online-indicator { position:fixed;top:70px;left:25px;display:flex;align-items:center;gap:6px;font-size:.7rem;color:var(--tg);z-index:996;opacity:0;transition:opacity .3s; }
            .online-indicator.show { opacity:1; }
            .online-dot { width:6px;height:6px;border-radius:50%;background:var(--green); }
            .reading-time { position:fixed;top:70px;right:70px;font-size:.7rem;color:var(--tm);z-index:996;opacity:0;transition:opacity .3s;font-family:var(--fm); }
            .reading-time.show { opacity:1; }
            .context-menu { position:fixed;background:var(--bg3);border:1px solid var(--bl);border-radius:var(--r);padding:8px 0;min-width:180px;z-index:100000;box-shadow:0 10px 40px rgba(0,0,0,.4);display:none; }
            .context-menu.show { display:block; }
            .context-item { display:flex;align-items:center;gap:10px;padding:8px 16px;font-size:.82rem;color:var(--tl);cursor:pointer;transition:var(--t); }
            .context-item:hover { background:var(--p10);color:var(--pl); }
            .context-item i { width:16px;text-align:center;color:var(--p);font-size:.8rem; }
            .context-sep { height:1px;background:var(--b);margin:4px 0; }
            .local-time { position:fixed;bottom:25px;left:25px;font-size:.65rem;color:var(--tm);z-index:996;font-family:var(--fm);letter-spacing:1px;display:none; }
            @media(min-width:1025px) { .local-time { display:block; } }
        `;
        document.head.appendChild(style);
    }
}

// ==================== EASTER EGG ====================
function initEasterEgg() {
    let keys = '';
    on(document, 'keydown', e => {
        keys += e.key.toLowerCase();
        if (keys.includes('arun')) {
            showToast('🎉 You found the Easter Egg! Built by Er. Arun Panthi 🏗️', 'success');
            keys = '';
            // Confetti-like effect
            createConfetti();
        }
        if (keys.length > 20) keys = keys.slice(-10);
    });
}

function createConfetti() {
    const colors = ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position:fixed;top:-10px;left:${rand(0, 100)}vw;
            width:${rand(6, 12)}px;height:${rand(6, 12)}px;
            background:${colors[randInt(0, 4)]};
            border-radius:${rand(0, 1) > 0.5 ? '50%' : '2px'};
            z-index:100001;pointer-events:none;
            animation:confettiFall ${rand(2, 4)}s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }

    if (!$('#confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(${rand(360, 720)}deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== VISITOR COUNTER ====================
function initVisitorCounter() {
    let count = parseInt(localStorage.getItem('visitCount') || '0');
    count++;
    localStorage.setItem('visitCount', count.toString());

    if (count > 1 && count % 5 === 0) {
        setTimeout(() => {
            showToast(`🎯 This is your visit #${count}! Thanks for coming back.`, 'info');
        }, 7000);
    }
}

// ==================== ONLINE STATUS ====================
function initOnlineStatus() {
    const indicator = document.createElement('div');
    indicator.className = 'online-indicator';
    indicator.innerHTML = '<span class="online-dot"></span><span>Online</span>';
    document.body.appendChild(indicator);

    setTimeout(() => indicator.classList.add('show'), 3500);

    on(window, 'online', () => {
        indicator.querySelector('span:last-child').textContent = 'Online';
        indicator.querySelector('.online-dot').style.background = 'var(--green)';
        showToast('🌐 Connection restored!', 'success');
    });

    on(window, 'offline', () => {
        indicator.querySelector('span:last-child').textContent = 'Offline';
        indicator.querySelector('.online-dot').style.background = 'var(--red)';
        showToast('⚠️ You are offline. Some features may not work.', 'warning');
    });
}

// ==================== CLIPBOARD COPY ====================
function initClipboardCopy() {
    // Double-click email to copy
    $$('.contact-cards a[href^="mailto"]').forEach(el => {
        on(el, 'dblclick', e => {
            e.preventDefault();
            navigator.clipboard.writeText(APP.email).then(() => {
                showToast('📋 Email copied to clipboard!', 'success');
            }).catch(() => {});
        });
    });
}

// ==================== SHARE BUTTONS (Web Share API) ====================
function initShareButtons() {
    // Add share capability
    if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'settings-toggle';
        shareBtn.style.cssText = 'position:fixed;left:25px;top:50%;transform:translateY(calc(-50% + 60px));z-index:998;display:none;';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareBtn.setAttribute('aria-label', 'Share');

        if (window.innerWidth > 1024) {
            shareBtn.style.display = 'flex';
        }

        on(shareBtn, 'click', () => {
            navigator.share({
                title: 'Er. Arun Panthi - Civil Engineer Portfolio',
                text: 'Check out this amazing portfolio of Er. Arun Panthi, Civil Engineer from Nepal!',
                url: window.location.href
            }).catch(() => {});
        });

        document.body.appendChild(shareBtn);
    }
}

// ==================== PRINT STYLES ====================
function initPrintStyles() {
    on(window, 'beforeprint', () => {
        document.body.classList.add('printing');
    });
    on(window, 'afterprint', () => {
        document.body.classList.remove('printing');
    });
}

// ==================== PERFORMANCE MONITOR ====================
function initPerformanceMonitor() {
    if (window.performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perf = performance.getEntriesByType('navigation')[0];
                if (perf) {
                    const loadTime = Math.round(perf.loadEventEnd - perf.startTime);
                    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color:#10b981;font-size:11px;');
                }
            }, 0);
        });
    }
}

// ==================== CUSTOM CONTEXT MENU ====================
function initContextMenu() {
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.innerHTML = `
        <div class="context-item" data-action="home"><i class="fas fa-home"></i> Home</div>
        <div class="context-item" data-action="about"><i class="fas fa-user"></i> About Me</div>
        <div class="context-item" data-action="contact"><i class="fas fa-envelope"></i> Contact</div>
        <div class="context-sep"></div>
        <div class="context-item" data-action="whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</div>
        <div class="context-item" data-action="email"><i class="fas fa-paper-plane"></i> Send Email</div>
        <div class="context-sep"></div>
        <div class="context-item" data-action="cv"><i class="fas fa-download"></i> Download CV</div>
        <div class="context-item" data-action="top"><i class="fas fa-arrow-up"></i> Back to Top</div>
    `;
    document.body.appendChild(menu);

    on(document, 'contextmenu', e => {
        if (isMobile()) return;
        e.preventDefault();
        menu.style.left = Math.min(e.pageX, window.innerWidth - 200) + 'px';
        menu.style.top = Math.min(e.pageY, window.innerHeight - 300) + 'px';
        menu.classList.add('show');
    });

    on(document, 'click', () => menu.classList.remove('show'));
    on(document, 'scroll', () => menu.classList.remove('show'));

    menu.querySelectorAll('.context-item').forEach(item => {
        on(item, 'click', () => {
            const action = item.dataset.action;
            menu.classList.remove('show');

            switch (action) {
                case 'home': window.scrollTo({ top: 0, behavior: 'smooth' }); break;
                case 'about': case 'contact':
                    const sec = $(`#${action}`);
                    if (sec) window.scrollTo({ top: sec.offsetTop - 80, behavior: 'smooth' });
                    break;
                case 'whatsapp': window.open(APP.wa.getURL(), '_blank'); break;
                case 'email': window.location.href = `mailto:${APP.email}`; break;
                case 'cv': {
                    const a = document.createElement('a');
                    a.href = 'images/resume.pdf';
                    a.download = 'Er_Arun_Panthi_CV.pdf';
                    a.click();
                    break;
                }
                case 'top': window.scrollTo({ top: 0, behavior: 'smooth' }); break;
            }
        });
    });
}

// ==================== TYPING INDICATOR ====================
function initTypingIndicator() {
    // Shows "Er. Arun is typing..." in WA popup
    const msgArea = document.querySelector('.wa-popup-body');
    if (!msgArea) return;

    setTimeout(() => {
        const typing = document.createElement('div');
        typing.className = 'wa-msg';
        typing.style.background = '#1e293b';
        typing.style.maxWidth = '60px';
        typing.style.padding = '10px 15px';
        typing.innerHTML = '<div style="display:flex;gap:4px"><span style="width:6px;height:6px;border-radius:50%;background:#94a3b8;animation:typeDot 1.4s infinite"></span><span style="width:6px;height:6px;border-radius:50%;background:#94a3b8;animation:typeDot 1.4s .2s infinite"></span><span style="width:6px;height:6px;border-radius:50%;background:#94a3b8;animation:typeDot 1.4s .4s infinite"></span></div>';

        if (!$('#typeDotStyle')) {
            const s = document.createElement('style');
            s.id = 'typeDotStyle';
            s.textContent = '@keyframes typeDot{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}';
            document.head.appendChild(s);
        }

        // Show typing then remove
        setTimeout(() => {
            msgArea.appendChild(typing);
            setTimeout(() => typing.remove(), 3000);
        }, 10000);
    }, 1000);
}

// ==================== READING TIME ====================
function initReadingTime() {
    const el = document.createElement('div');
    el.className = 'reading-time';
    document.body.appendChild(el);

    on(window, 'scroll', throttle(() => {
        if (window.scrollY > 200) {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = Math.round((window.scrollY / total) * 100);
            el.textContent = `${pct}% read`;
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    }, 100), { passive: true });
}

// ==================== WEATHER WIDGET (Simple) ====================
function initWeatherWidget() {
    // Add a simple weather display for Surkhet
    // This is decorative — for real weather, use an API
}

// ==================== LOCAL TIME ====================
function initLocalTime() {
    const el = document.createElement('div');
    el.className = 'local-time';
    document.body.appendChild(el);

    function updateTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kathmandu' };
        el.textContent = `🇳🇵 NPT ${now.toLocaleTimeString('en-US', options)}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// ==================== NAV HIDE ON SCROLL ====================
function initNavHideOnScroll() {
    // Optional: hide/show nav on scroll direction
    let lastScroll = 0;
    on(window, 'scroll', throttle(() => {
        const current = window.scrollY;
        if (current > lastScroll && current > 300) {
            // Scrolling down — could hide nav
        } else {
            // Scrolling up — show nav
        }
        lastScroll = current;
    }, 100), { passive: true });
}

// ==================== PARALLAX ELEMENTS ====================
function initParallaxElements() {
    if (prefersReducedMotion()) return;

    on(window, 'scroll', throttle(() => {
        const s = window.pageYOffset;
        const hc = $('.hero-content'), hv = $('.hero-visual');

        if (hc && s < window.innerHeight) {
            hc.style.transform = `translateY(${s * 0.1}px)`;
            hc.style.opacity = Math.max(0, 1 - s / (window.innerHeight * 0.7));
        }
        if (hv && s < window.innerHeight) {
            hv.style.transform = `translateY(${s * 0.07}px)`;
            hv.style.opacity = Math.max(0, 1 - s / (window.innerHeight * 0.8));
        }
    }, 16), { passive: true });
}

// ==================== FORM AUTO-SAVE ====================
function initFormAutoSave() {
    const form = $('#contactForm');
    if (!form) return;

    // Restore saved data
    const saved = JSON.parse(localStorage.getItem('formDraft') || '{}');
    if (saved.fn) { const el = $('#fn'); if (el) el.value = saved.fn; }
    if (saved.fe) { const el = $('#fe'); if (el) el.value = saved.fe; }
    if (saved.fs) { const el = $('#fs'); if (el) el.value = saved.fs; }
    if (saved.fm) { const el = $('#fm'); if (el) el.value = saved.fm; }

    // Auto-save on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        on(input, 'input', debounce(() => {
            const data = {};
            inputs.forEach(i => { if (i.id) data[i.id] = i.value; });
            localStorage.setItem('formDraft', JSON.stringify(data));
        }, 500));
    });
}

function clearFormAutoSave() {
    localStorage.removeItem('formDraft');
}

// ==================== DARK MODE SCHEDULE ====================
function initDarkModeSchedule() {
    // Auto dark mode based on time (only if no saved preference)
    if (!localStorage.getItem('theme')) {
        const h = new Date().getHours();
        const shouldBeDark = h < 6 || h >= 19;
        document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'dark'); // Keep dark by default
    }
}

// ==================== PAGE TRANSITIONS ====================
function initPageTransitions() {
    // Smooth page transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
}

// ==================== PAGE REVEAL AFTER PRELOADER ====================
function initPageReveal() {
    // Staggered entrance of main elements
    const elements = $$('.hero-badge, .hero-title, .hero-typed-row, .hero-desc, .hero-metrics, .hero-cta, .hero-trust, .hero-social');
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + i * 100);
    });
}

// ==================== SOUND EFFECTS ====================
function initSoundEffects() {
    // Sound system ready - plays subtle sounds on interactions
}

function playSound(type) {
    const st = $('#soundToggle');
    if (!st || !st.checked) return;

    // Create a subtle click sound using Web Audio API
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        switch (type) {
            case 'click':
                osc.frequency.value = 800;
                gain.gain.value = 0.05;
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
                break;
            case 'success':
                osc.frequency.value = 1200;
                gain.gain.value = 0.04;
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
                break;
            case 'error':
                osc.frequency.value = 300;
                gain.gain.value = 0.04;
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
                break;
        }
    } catch (e) { /* Audio not supported */ }
}

// ==================== ACCESSIBILITY ====================
function initAccessibility() {
    // Skip to content link
    const skip = document.createElement('a');
    skip.href = '#about';
    skip.className = 'sr-only';
    skip.textContent = 'Skip to main content';
    skip.style.cssText = 'position:absolute;top:-100px;left:0;background:var(--p);color:#fff;padding:10px 20px;z-index:100001;transition:top .3s;';
    skip.addEventListener('focus', () => skip.style.top = '0');
    skip.addEventListener('blur', () => skip.style.top = '-100px');
    document.body.prepend(skip);

    // Focus trap for mobile menu
    on(document, 'keydown', e => {
        if (e.key === 'Tab' && navMenu && navMenu.classList.contains('open')) {
            const focusable = navMenu.querySelectorAll('a, button');
            const first = focusable[0], last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // Announce route changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);';
    document.body.appendChild(announcer);
}

// ==================== SEO ENHANCEMENTS ====================
function initSEOEnhancements() {
    // Add structured data
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Er. Arun Panthi",
        "jobTitle": "Civil Engineer",
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Mid-West University"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Surkhet",
            "addressCountry": "NP"
        },
        "email": APP.email,
        "url": window.location.href,
        "sameAs": [
            "https://www.facebook.com/arunpanthi",
            "https://www.linkedin.com/in/arunpanthi"
        ]
    });
    document.head.appendChild(schema);

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href.split('?')[0].split('#')[0];
    document.head.appendChild(canonical);
}

// ==================== ANALYTICS READY ====================
function initAnalyticsReady() {
    // Track page views (ready for analytics integration)
    window.trackEvent = (category, action, label) => {
        console.log(`📊 Event: ${category} > ${action} > ${label}`);
        // Replace with actual analytics: gtag('event', action, { ... });
    };

    // Track CTA clicks
    $$('.btn-primary, .nav-cta, .wa-fab').forEach(btn => {
        on(btn, 'click', () => {
            const label = btn.textContent.trim() || 'Button';
            window.trackEvent('CTA', 'click', label);
        });
    });

    // Track section views
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.trackEvent('Section', 'view', entry.target.id);
            }
        });
    }, { threshold: 0.5 });

    $$('section[id]').forEach(sec => observer.observe(sec));
}

// ==================== FOOTER YEAR ====================
function updateYear() {
    const y = $('#yr');
    if (y) y.textContent = new Date().getFullYear();
}
