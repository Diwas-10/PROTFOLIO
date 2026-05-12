const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');

// Respect system preference on first load
if (!localStorage.getItem('theme')) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  if (prefersDark) { themeIcon.textContent = '☀️'; themeLabel.textContent = 'Light'; }
} else {
  const saved = localStorage.getItem('theme');
  html.setAttribute('data-theme', saved);
  if (saved === 'dark') { themeIcon.textContent = '☀️'; themeLabel.textContent = 'Light'; }
}

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.textContent  = isDark ? '🌙' : '☀️';
  themeLabel.textContent = isDark ? 'Dark' : 'Light';
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('is-open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('is-open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('is-open');
  }
});

// ── TYPEWRITER ──
const roles = ['CEO & Program Manager', 'Web Developer', 'Graphic Designer', 'ECE Student', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedRole');

if (typedEl) {
  (function type() {
    const word = roles[ri];
    typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1300); return; }
    if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; setTimeout(type, 400); return; }
    setTimeout(type, deleting ? 38 : 78);
  })();
}

// ── SCROLL PROGRESS ──
const scrollBar = document.getElementById('scrollProgress');
const backTop   = document.getElementById('backTop');

const sectionIds = ['hero','education','experience','projects','skills','certifications','contact'];

window.addEventListener('scroll', () => {
  // Progress bar
  const max = document.body.scrollHeight - window.innerHeight;
  if (scrollBar) scrollBar.style.width = ((window.scrollY / max) * 100) + '%';

  // Back to top
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 500);

  // Active nav link
  sectionIds.forEach(id => {
    const sec  = document.getElementById(id);
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!sec || !link) return;
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom >= 80) link.classList.add('active');
    else link.classList.remove('active');
  });
}, { passive: true });

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BARS (animate on view) ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.animation = 'barGrow 0.9s ease both';
        bar.style.transformOrigin = 'left';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-group').forEach(g => barObserver.observe(g));

// ── CONTACT FORM ──
function handleSubmit() {
  const name    = document.getElementById('formName').value.trim();
  const email   = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const fb      = document.getElementById('formFeedback');

  if (!name || !email || !message) {
    fb.style.color   = 'var(--rust)';
    fb.textContent   = 'Please fill in all required fields.';
    fb.style.display = 'block';
    return;
  }
  const mailto = `mailto:contactdiwas10@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact: ' + name)}&body=${encodeURIComponent(`Hi, I'm ${name}.\n\n${message}\n\nFrom: ${email}`)}`;
  window.location.href = mailto;
  fb.style.color   = 'var(--teal)';
  fb.textContent   = '✓ Opening your email client…';
  fb.style.display = 'block';
}

window.handleSubmit = handleSubmit; // expose to inline onclick
