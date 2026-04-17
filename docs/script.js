const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('main section');
const observedSections = document.querySelectorAll('main section[id]');
const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');

if (menuToggle && siteHeader) {
  siteHeader.classList.add('menu-collapsible');

  menuToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      siteHeader.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}

// Reveal on scroll: prepara secoes com atraso curto para entrada progressiva.
sections.forEach((section, index) => {
  section.classList.add('reveal');
  section.style.transitionDelay = `${Math.min(index * 60, 220)}ms`;
});

// Fallback para navegadores sem suporte ao IntersectionObserver.
if (!('IntersectionObserver' in window)) {
  sections.forEach((section) => section.classList.add('show'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  sections.forEach((section) => revealObserver.observe(section));
}

// Menu ativo: marca o link da secao em destaque durante a rolagem.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      menuLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { rootMargin: '-38% 0px -52% 0px', threshold: 0.01 }
);

observedSections.forEach((section) => sectionObserver.observe(section));
