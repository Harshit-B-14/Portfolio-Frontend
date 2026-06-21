// Mobile nav
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Animated counters
const statNums = document.querySelectorAll('.stat__num');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// Typed code effect
const codeLines = [
  { text: "const Harshit = {" },
  { text: "  role: 'Frontend Developer'," },
  { text: "  stack: ['React', 'JavaScript', 'Node.js']," },
  { text: "  focus: 'responsive UI'," },
  { text: "  problemsSolved: 500," },
  { text: "  available: true" },
  { text: "};" },
];

const typedCodeEl = document.getElementById('typedCode');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function colorizeLine(line) {
  return escapeHTML(line)
    .replace(/(const|true|false)/g, '<span style="color:#9fb3e0">$1</span>')
    .replace(/('[^']*')/g, '<span style="color:#e0c79a">$1</span>')
    .replace(/(\d+)/g, '<span style="color:#e0c79a">$1</span>');
}

async function typeCode() {
  if (!typedCodeEl) return;

  if (prefersReducedMotion) {
    typedCodeEl.innerHTML = codeLines.map(l => colorizeLine(l.text)).join('\n');
    return;
  }

  let fullHTML = '';

  for (const line of codeLines) {
    let current = '';

    for (const char of line.text) {
      current += char;
      typedCodeEl.innerHTML = fullHTML + colorizeLine(current);
      await new Promise(r => setTimeout(r, 14));
    }

    fullHTML += colorizeLine(line.text) + '\n';
    typedCodeEl.innerHTML = fullHTML;
    await new Promise(r => setTimeout(r, 120));
  }
}

// Start typing
const heroVisual = document.querySelector('.hero__visual');

if (heroVisual) {
  const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeCode();
        typeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  typeObserver.observe(heroVisual);
}

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);

    if (!link) return;

    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.opacity = '0.6');
      link.style.opacity = '1';
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav shadow
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.style.boxShadow =
    window.scrollY > 20
      ? '0 4px 20px rgba(17,24,68,0.08)'
      : 'none';
});