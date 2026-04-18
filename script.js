/**
 * Anagha Das M — Portfolio JavaScript
 * Features: scroll reveal, sticky nav, mobile menu, skill bars, contact form
 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Init Lucide Icons ────────────────────────────────
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ─── Navbar: sticky + scroll class ───────────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Scrolled class for shadow
    navbar.classList.toggle('scrolled', scrollY > 40);

    // Active nav link based on current section
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ─── Mobile nav toggle ───────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinksContainer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('open');
      navLinksContainer?.classList.remove('open');
    });
  });

  // ─── Scroll Reveal ───────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve skill cards so bars stay revealed
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── Smooth scroll for anchor links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ─── Contact form ─────────────────────────────────────
  const form = document.getElementById('contact-form');

  form?.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
    btn.disabled = true;
    btn.style.background = '#2a7059';

    showToast('✅ Message received! Anagha will respond soon.');

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 3500);
  });

  // ─── Toast notification ───────────────────────────────
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // ─── Typing effect for hero role ─────────────────────
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    const roles = [
      'Aspiring Python Django Developer',
      'Backend Web Developer',
      'MCA Student @ KTU',
      'Open to Opportunities'
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;
    const originalText = roleEl.textContent;

    function typeRole() {
      const current = roles[roleIdx];
      if (!deleting) {
        roleEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(typeRole, 2000);
          return;
        }
      } else {
        roleEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(typeRole, deleting ? 50 : 80);
    }

    // Start after 1.2s
    setTimeout(typeRole, 1200);
  }

  // ─── Hero parallax on mouse move ─────────────────────
  const heroInner = document.querySelector('.hero-inner');
  document.querySelector('.hero')?.addEventListener('mousemove', e => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;
    const x = (clientX / offsetWidth - 0.5) * 14;
    const y = (clientY / offsetHeight - 0.5) * 10;
    if (heroInner) heroInner.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  document.querySelector('.hero')?.addEventListener('mouseleave', () => {
    if (heroInner) heroInner.style.transform = 'translate(0, 0)';
  });

  // ─── Timeline items: add active dot on reveal ────────
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    const dot = item.querySelector('.timeline-dot');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && i > 0) {
          setTimeout(() => dot?.classList.add('active'), 300);
        }
      });
    }, { threshold: 0.5 });
    if (i > 0) observer.observe(item);
  });

  console.log('%cAnagha Das M — Portfolio', 'color: #3a9e80; font-size: 16px; font-weight: bold;');
  console.log('%c🐍 Python Django Developer', 'color: #5ec49e; font-size: 12px;');
});