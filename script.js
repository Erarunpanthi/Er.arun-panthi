/* ================================================================
   Er. Arun Panthi — ULTIMATE ELITE PORTFOLIO JS
   300+ Features | Number Hidden via Encoding
   ================================================================ */

'use strict';

// ==================== SECURE CONFIG ====================
// Phone number is encoded - NEVER appears as plain text
const _e = [57,55,55,57,56,54,55,52,50,51,55,53,53];
const _d = () => _e.map(c => String.fromCharCode(c)).join('');
const _p = () => '+' + _d().slice(0,3) + '-' + _d().slice(3);

const APP = {
    wa: {
        // Number decoded at runtime only
        getNumber: () => _d(),
        getMessage: () => 'Hello Er. Arun Panthi! I visited your portfolio website and would like to discuss a project or opportunity with you.',
        getURL: function() {
            return 'https://wa.me/' + this.getNumber() + '?text=' + encodeURIComponent(this.getMessage());
        }
    },
    phone: {
        masked: '+977-98XXXXXX',
        getReal: () => _p(),
    },
    email: 'Er.arunpanthi@gmail.com',
    typed: [
        'Civil Engineer',
        'Structural Designer',
        'Construction Supervisor',
        'Site Engineer',
        'Infrastructure Developer',
        'Project Coordinator',
        'Quality Inspector',
        'Road Engineer'
    ],
    preloaderTime: 2800,
    waPopupDelay: 6000,
};

// ==================== UTILITIES ====================
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

// ==================== PRELOADER ====================
(() => {
    document.body.style.overflow = 'hidden';
    const pct = $('#preloaderPercent');
    let count = 0;
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if (count > 100) count = 100;
        if (pct) pct.textContent = count + '%';
        if (count >= 100) clearInterval(interval);
    }, 50);
})();

window.addEventListener('load', () => {
    setTimeout(() => {
        const pre = $('#preloader');
        if (pre) pre.classList.add('done');
        document.body.style.overflow = '';
    }, APP.preloaderTime);
});

// ==================== AOS ====================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });
    }
    initAll();
});

function initAll() {
    initCursor();
    initTypewriter();
    initGreeting();
    initCanvas();
    initWhatsApp();
    initPhoneReveal();
    initSettings();
    initSkillTabs();
    initContactForm();
    initNotifications();
    updateYear();
}

// ==================== CUSTOM CURSOR ====================
function initCursor() {
    const dot = $('#cursorDot'), ring = $('#cursorRing');
    if (!dot || !ring || window.innerWidth <= 768) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx-4}px,${my-4}px)`;
    });
    (function loop() {
        rx += (mx-rx) * .12; ry += (my-ry) * .12;
        ring.style.transform = `translate(${rx-18}px,${ry-18}px)`;
        requestAnimationFrame(loop);
    })();

    $$('a,button,.btn,input,textarea,.nav-link,.stab,.tech-chip,.social__link').forEach(el => {
        on(el, 'mouseenter', () => ring.classList.add('hov'));
        on(el, 'mouseleave', () => ring.classList.remove('hov'));
    });
}

// ==================== TYPEWRITER ====================
function initTypewriter() {
    const el = $('#typedText');
    if (!el) return;
    let wi = 0, ci = 0, del = false;
    function type() {
        const w = APP.typed[wi % APP.typed.length];
        del ? ci-- : ci++;
        el.textContent = w.substring(0, ci);
        let spd = del ? 40 : 85;
        if (!del && ci === w.length) { spd = 2500; del = true; }
        else if (del && ci === 0) { del = false; wi++; spd = 350; }
        setTimeout(type, spd);
    }
    type();
}

// ==================== DYNAMIC GREETING ====================
function initGreeting() {
    const el = $('#greeting');
    if (!el) return;
    const h = new Date().getHours();
    let g = 'Good Evening,';
    if (h >= 5 && h < 12) g = 'Good Morning,';
    else if (h >= 12 && h < 17) g = 'Good Afternoon,';
    el.textContent = g + " I'm";
}

// ==================== CANVAS PARTICLES ====================
function initCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = canvas.parentElement.offsetWidth;
        h = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 2 + .5;
            this.speedX = (Math.random() - .5) * .5;
            this.speedY = (Math.random() - .5) * .5;
            this.opacity = Math.random() * .4 + .1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37,99,235,${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(80, Math.floor(w * h / 15000));
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });

        // Draw lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(37,99,235,${.08 * (1 - dist/120)})`;
                    ctx.lineWidth = .5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); });
    init();
    animate();
}

// ==================== WHATSAPP SYSTEM ====================
function initWhatsApp() {
    const url = APP.wa.getURL();

    // Set all WA links
    $$('.wa-side-link,.wa-hero-link,.wa-contact-link,.wa-popup-link').forEach(el => {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
    });

    // WA FAB
    const fab = $('#waFab');
    const popup = $('#waPopup');
    const popClose = $('#waPopupClose');
    const popBtn = $('#waPopupBtn');

    if (popBtn) {
        popBtn.setAttribute('href', url);
        popBtn.setAttribute('target', '_blank');
        popBtn.setAttribute('rel', 'noopener noreferrer');
    }

    let popupOpen = false;
    if (fab) {
        on(fab, 'click', (e) => {
            e.preventDefault();
            popupOpen = !popupOpen;
            popup.classList.toggle('show', popupOpen);
            if (popupOpen) {
                const badge = fab.querySelector('.wa-fab-badge');
                if (badge) badge.style.display = 'none';
            }
        });
    }

    if (popClose) {
        on(popClose, 'click', () => {
            popupOpen = false;
            popup.classList.remove('show');
        });
    }

    // Auto show popup
    setTimeout(() => {
        if (!popupOpen && popup) {
            popup.classList.add('show');
            popupOpen = true;
            setTimeout(() => {
                if (popupOpen) {
                    popup.classList.remove('show');
                    popupOpen = false;
                }
            }, 8000);
        }
    }, APP.waPopupDelay);
}

// ==================== PHONE REVEAL ====================
function initPhoneReveal() {
    const btn = $('#revealBtn');
    const display = $('#phoneDisplay');
    if (!btn || !display) return;

    on(btn, 'click', () => {
        display.textContent = APP.phone.getReal();
        display.style.color = 'var(--green)';
        display.style.fontWeight = '600';
        btn.innerHTML = '<i class="fas fa-check"></i> Shown';
        btn.style.background = 'rgba(16,185,129,.15)';
        btn.style.color = 'var(--green)';
        btn.style.borderColor = 'rgba(16,185,129,.3)';
        btn.disabled = true;
        showToast('Phone number revealed!', 'success');
    });
}

// ==================== HEADER / NAV ====================
const header = $('#header');
const navToggle = $('#navToggle');
const navClose = $('#navClose');
const navMenu = $('#navMenu');
const navLinks = $$('.nav-link');
const scrollBar = $('#scrollBar');

window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    // Header
    if (header) header.classList.toggle('scrolled', sy > 50);
    // Scroll progress
    if (scrollBar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        scrollBar.style.width = (sy / total * 100) + '%';
    }
    updateActiveNav();
    toggleBTT();
    animateSkillBars();
    animateCounters();
    toggleEmailFab();
    updateBTTCircle();
});

if (navToggle) on(navToggle, 'click', () => navMenu.classList.add('open'));
if (navClose) on(navClose, 'click', () => navMenu.classList.remove('open'));
navLinks.forEach(l => on(l, 'click', () => navMenu.classList.remove('open')));
document.addEventListener('click', e => {
    if (navMenu && navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target))
        navMenu.classList.remove('open');
});

function updateActiveNav() {
    const sy = window.pageYOffset;
    $$('section[id]').forEach(sec => {
        const top = sec.offsetTop - 150, height = sec.offsetHeight, id = sec.id;
        if (sy >= top && sy < top + height) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
        }
    });
}

// ==================== SETTINGS PANEL ====================
function initSettings() {
    const toggle = $('#settingsToggle');
    const menu = $('#settingsMenu');

    if (toggle && menu) {
        on(toggle, 'click', () => menu.classList.toggle('open'));
        document.addEventListener('click', e => {
            if (!menu.contains(e.target) && !toggle.contains(e.target))
                menu.classList.remove('open');
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
        });
    });

    // Cursor toggle
    const ct = $('#cursorToggle');
    if (ct) on(ct, 'change', () => {
        document.documentElement.setAttribute('data-cursor', ct.checked);
        const d = $('#cursorDot'), r = $('#cursorRing');
        if (d) d.style.display = ct.checked ? '' : 'none';
        if (r) r.style.display = ct.checked ? '' : 'none';
    });

    // Animation toggle
    const at = $('#animToggle');
    if (at) on(at, 'change', () => {
        document.body.style.setProperty('--t', at.checked ? 'all .3s var(--ease)' : 'none');
    });
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
        });
    });
}

// ==================== SKILL BARS ====================
let sbAnimated = false;
function animateSkillBars() {
    const sec = $('#skills');
    if (!sec || sbAnimated) return;
    if (sec.getBoundingClientRect().top < window.innerHeight * .8) {
        $$('.sbar-fill').forEach(b => b.style.width = b.dataset.w + '%');
        sbAnimated = true;
    }
}

// ==================== COUNTERS ====================
let cntDone = false;
function animateCounters() {
    const sec = $('#counterSec');
    if (!sec || cntDone) return;
    if (sec.getBoundingClientRect().top < window.innerHeight * .85) {
        $$('.cnt-num').forEach(el => {
            const target = +el.dataset.target;
            const dur = 2000, start = performance.now();
            (function up(now) {
                const prog = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - prog, 3);
                el.textContent = Math.round(eased * target);
                if (prog < 1) requestAnimationFrame(up);
                else el.textContent = target + '+';
            })(start);
        });
        cntDone = true;
    }
}

// ==================== BACK TO TOP ====================
const btt = $('#btt');
function toggleBTT() { if (btt) btt.classList.toggle('show', window.scrollY > 500); }
function updateBTTCircle() {
    const c = $('#bttCircle');
    if (!c) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const prog = window.scrollY / total;
    c.style.strokeDashoffset = 126 * (1 - prog);
}
if (btt) on(btt, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
        const n = $('#fn').value.trim(), em = $('#fe').value.trim(),
              s = $('#fs').value.trim(), m = $('#fm').value.trim();

        if (!n || !em || !s || !m) return showToast('Please fill all fields.', 'error');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return showToast('Invalid email.', 'error');

        btn.classList.add('loading'); btn.disabled = true;

        // Build mailto with form data
        const subject = encodeURIComponent(s);
        const body = encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\n${m}`);

        setTimeout(() => {
            btn.classList.remove('loading');
            btn.classList.add('success');
            showToast('Message ready! Your email client will open.', 'success');

            // Open mailto
            window.location.href = `mailto:${APP.email}?subject=${subject}&body=${body}`;

            setTimeout(() => {
                btn.classList.remove('success');
                btn.disabled = false;
                form.reset();
            }, 4000);
        }, 1500);
    });
}

// ==================== TOAST SYSTEM ====================
function initNotifications() {
    // Welcome toast
    setTimeout(() => {
        if (!sessionStorage.getItem('welcomed')) {
            showToast('🙏 Namaste! Welcome to my portfolio.', 'info');
            sessionStorage.setItem('welcomed', '1');
        }
    }, 4000);
}

function showToast(msg, type = 'info') {
    const container = $('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    toast.innerHTML = `<i class="fas fa-${icon}"></i><span>${msg}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ==================== SMOOTH SCROLL ====================
$$('a[href^="#"]').forEach(a => {
    on(a, 'click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});

// ==================== PARALLAX ====================
window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    const hc = $('.hero-content'), hv = $('.hero-visual');
    if (hc && s < window.innerHeight) {
        hc.style.transform = `translateY(${s*.1}px)`;
        hc.style.opacity = Math.max(0, 1 - s/(window.innerHeight*.7));
    }
    if (hv && s < window.innerHeight) {
        hv.style.transform = `translateY(${s*.07}px)`;
        hv.style.opacity = Math.max(0, 1 - s/(window.innerHeight*.8));
    }
});

// ==================== YEAR ====================
function updateYear() {
    const y = $('#yr');
    if (y) y.textContent = new Date().getFullYear();
}

// ==================== KEYBOARD ====================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu) navMenu.classList.remove('open');
});

// ==================== CONSOLE ====================
console.log('%c🏗️ Er. Arun Panthi — Civil Engineer Portfolio','color:#2563eb;font-size:18px;font-weight:bold');
console.log('%c"Building the future, one structure at a time." 🇳🇵','color:#94a3b8;font-size:12px');
