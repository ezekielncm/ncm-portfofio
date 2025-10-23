// ===================================
// Variables globales
// ===================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

// ===================================
// Menu Mobile Toggle
// ===================================
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling pour les ancres
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Animation des barres de progression
// ===================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#competences');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

// ===================================
// Changement de style de la navbar au scroll
// ===================================
window.addEventListener('scroll', () => {
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
            nav.style.boxShadow = 'none';
        }
    }
});

// ===================================
// Animation fade-in au scroll pour les éléments
// ===================================
const fadeElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .contact-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===================================
// Active link dans la navigation
// ===================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Masquer le scroll indicator après scroll
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ===================================
// Effet de typing pour le titre (optionnel)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Décommenter pour activer l'effet de typing
// const heroTitle = document.querySelector('.hero h1');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 80);
// }

// ===================================
// Animation des compteurs (optionnel)
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===================================
// Affichage des statistiques au scroll (optionnel)
// ===================================
// const statsSection = document.querySelector('.stats-section');
// if (statsSection) {
//     const statsObserver = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const counters = entry.target.querySelectorAll('.counter');
//                 counters.forEach(counter => {
//                     const target = parseInt(counter.dataset.target);
//                     animateCounter(counter, target);
//                 });
//                 statsObserver.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.5 });
//     
//     statsObserver.observe(statsSection);
// }

// ===================================
// Gestion du bouton retour en haut
// ===================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.4)';
    });
}

// Créer le bouton retour en haut
createBackToTopButton();

// ===================================
// Préchargement des images (optionnel)
// ===================================
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Appeler le préchargement si nécessaire
// preloadImages();

// ===================================
// Console message (optionnel - Easter egg)
// ===================================
console.log('%c👋 Bienvenue sur mon portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Développé par W. Ezekiel NACOULMA', 'color: #22d3ee; font-size: 14px;');
console.log('%c📧 Contact: mnacoulmaezekiel@gmail.com', 'color: #94a3b8; font-size: 12px;');

// ===================================
// Initialisation finale
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio chargé avec succès!');
    
    // Ajouter une classe au body pour indiquer que le JS est chargé
    document.body.classList.add('js-loaded');
});

// ===================================
// Export pour modules (si nécessaire)
// ===================================
// export { animateCounter, typeWriter, preloadImages };