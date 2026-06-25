// ===================== CURSOR GLOW =====================
const cursorGlow = document.createElement('div');
cursorGlow.id = 'cursor-glow';
document.body.appendChild(cursorGlow);
 
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
 
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
 
function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();
 

// ===================== MOBILE NAV =====================
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    // Close nav when a link is clicked
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            navbar.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });
}

// ===================== SCROLL REVEAL =====================
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger the animation for siblings
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// ===================== SKILL BARS =====================
const skillBars = document.querySelectorAll('.bar-fill');

if (skillBars.length > 0) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));
}

// ===================== PROJECT FILTER =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.style.display = 'none';
            if (formSuccess) {
                formSuccess.classList.add('show');
            }
            contactForm.reset();
        }, 1200);
    });
}

// ===================== HEADER SCROLL STYLE =====================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.style.padding = '1.2rem 9%';
    } else {
        header.style.padding = '1.8rem 9%';
    }
});
