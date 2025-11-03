const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'awards', 'contact'];

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }
  });
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('span');
  icon.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('span');
    icon.textContent = '☰';
  });
});

document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('span');
    if (icon) icon.textContent = '☰';
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const staggerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll(
        '.skill-card, .project-card, .award-card, .timeline-item, .contact-item, #education ul li, .about-content p'
      );

      if (items.length > 0) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove('hidden');
            item.classList.add('slide-up');
          }, index * 120);
        });
      } else {
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('hidden');
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const staggerContainers = document.querySelectorAll(
    '.skills-grid, .projects-grid, .awards-grid, .timeline, .contact-info, .about-content'
  );

  const simpleFadeElements = document.querySelectorAll(
    'section h2, .about-image'
  );

  const allAnimatableElements = document.querySelectorAll(
    '.skill-card, .project-card, .award-card, .timeline-item, .contact-item, #education ul li, .about-content p, section h2, .about-image'
  );

  allAnimatableElements.forEach(el => {
    el.classList.add('hidden');
  });

  staggerContainers.forEach(el => {
    staggerObserver.observe(el);
  });

  simpleFadeElements.forEach(el => {
    staggerObserver.observe(el);
  });

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.remove('hidden');
    heroContent.style.animation = 'fade-in 1s ease-out forwards';
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = document.createElement('div');
  message.className = 'form-success';
  message.textContent = 'Message sent successfully! I\'ll get back to you soon.';
  message.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    background: hsla(var(--primary), 0.2);
    border: 1px solid hsl(var(--primary));
    border-radius: 0.5rem;
    color: hsl(var(--primary));
    text-align: center;
  `;

  contactForm.appendChild(message);
  contactForm.reset();

  setTimeout(() => {
    message.remove();
  }, 5000);
});

const heroSection = document.getElementById('home');
const heroOverlay = document.querySelector('.hero-overlay');
const heroBg = document.querySelector('.hero-bg');

if (heroSection && heroOverlay && heroBg) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    heroOverlay.style.background = `
      radial-gradient(circle at ${xPercent}% ${yPercent}%, 
      hsla(var(--background), 0.1) 0%, 
      hsla(var(--background), 0.7) 60%, 
      hsl(var(--background)) 100%)
    `;
  });

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
  });
}