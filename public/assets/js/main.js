// Initialisation de la bibliothèque AOS (Animate On Scroll)
AOS.init({ duration: 700, once: false });

// Initialisation de Particles.js pour un fond animé interactif
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } }, // Densité et nombre de particules
      color: { value: '#76c7c0' }, // Couleur des particules
      shape: { type: 'circle' }, // Forme des particules
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { // Lignes reliant les particules
        enable: true,
        distance: 150,
        color: '#76c7c0',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' }, // Répulsion au survol
        onclick: { enable: true, mode: 'push' }, // Ajout de particules au clic
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true // Améliore la qualité sur écrans Retina
  });
}

// Activation de VanillaTilt pour les éléments décorés avec l'attribut data-tilt
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 15, // Inclinaison maximale
    speed: 400, // Vitesse de réaction
    glare: true, // Effet de lumière
    'max-glare': 0.2 // Intensité maximale de l'effet de lumière
  });
}

// Gestion du menu burger pour la navigation mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Ouvre/ferme le menu au clic sur l'icône burger
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Scroll fluide lors du clic sur un lien d'ancre interne
// (défilement doux jusqu'à la section ciblée)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // Ajustement pour l’en-tête fixe
        behavior: 'smooth'
      });
      // Ferme le menu mobile après le clic
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    }
  });
});

// Bouton pour activer/désactiver le mode sombre
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Lecture du thème enregistré dans le localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle du thème au clic sur le bouton
// (enregistrement du choix et mise à jour de l’icône)
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeIcon.classList.toggle('fa-moon');
  themeIcon.classList.toggle('fa-sun');
});

// Mise à jour automatique de l’année dans le footer
const footer = document.querySelector('footer');
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/, `© ${year}`);
}
// Animation des barres de progression (reset à chaque scroll)
const fills = document.querySelectorAll('.progress-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const fill = entry.target;
    const percent = fill.getAttribute('data-percent');
    if (entry.isIntersecting) {
      // Animate vers la valeur cible
      fill.style.width = percent + '%';
    } else {
      // Reset dès qu'on quitte la zone
      fill.style.width = '0';
    }
  });
}, { threshold: 0.6 });

fills.forEach(f => barObserver.observe(f));

