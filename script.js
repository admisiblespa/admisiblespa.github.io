// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;

  countersAnimated = true;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '#0D2347';
        link.style.fontWeight = '600';
      } else {
        link.style.color = '';
        link.style.fontWeight = '';
      }
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const position = target.offsetTop - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });
});

// ===== EMAILJS INIT =====
// IMPORTANTE: Reemplaza estos valores con los de tu cuenta EmailJS
// Guía de configuración en: docs/emailjs-setup.md
const EMAILJS_PUBLIC_KEY = 'yQPmuh0FgzM0Yd3ij';
const EMAILJS_SERVICE_ID = 'service_obyas91';
const EMAILJS_TEMPLATE_ID = 'template_xpma2v4';

emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('.btn-submit');
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  const templateParams = {
    from_name: document.getElementById('nombre').value,
    from_email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    servicio: document.getElementById('servicio').value,
    mensaje: document.getElementById('mensaje').value
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      submitBtn.innerHTML = `
        Enviar mensaje
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      `;
      submitBtn.disabled = false;

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    })
    .catch((error) => {
      console.error('Error al enviar:', error);
      submitBtn.textContent = 'Error al enviar. Intenta de nuevo.';
      submitBtn.disabled = false;

      setTimeout(() => {
        submitBtn.innerHTML = `
          Enviar mensaje
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        `;
      }, 3000);
    });
});
