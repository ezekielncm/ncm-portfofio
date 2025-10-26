// ===================================
// Variables globales
// ===================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const themeToggle = document.getElementById('theme-toggle');

// ===================================
// Mode Clair/Sombre
// ===================================
// Charger le thème sauvegardé
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

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
// Animation des barres de langues
// ===================================
const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const langBars = entry.target.querySelectorAll('.lang-fill');
            langBars.forEach(bar => {
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
            });
            langObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('#apropos');
if (aboutSection) {
    langObserver.observe(aboutSection);
}

// ===================================
// Animation des compteurs (Stats)
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ===================================
// Changement de style de la navbar au scroll
// ===================================
window.addEventListener('scroll', () => {
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = document.body.classList.contains('light-mode') 
                ? 'rgba(248, 250, 252, 0.95)' 
                : 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = document.body.classList.contains('light-mode')
                ? 'rgba(248, 250, 252, 0.9)'
                : 'rgba(15, 23, 42, 0.8)';
            nav.style.boxShadow = 'none';
        }
    }
});

// ===================================
// Animation fade-in au scroll pour les éléments
// ===================================
const fadeElements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .contact-item, .testimonial-card, .cert-card, .stat-card');

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
// Gestion du formulaire de contact
// ===================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simuler l'envoi du formulaire (à remplacer par EmailJS ou FormSpree)
        try {
            // Exemple avec EmailJS (décommenter et configurer)
            /*
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(() => {
                    showFormStatus('success', 'Message envoyé avec succès! Je vous répondrai bientôt.');
                    contactForm.reset();
                })
                .catch(() => {
                    showFormStatus('error', 'Erreur lors de l\'envoi. Veuillez réessayer.');
                });
            */
            
            // Simulation temporaire
            await new Promise(resolve => setTimeout(resolve, 1000));
            showFormStatus('success', '✓ Message envoyé avec succès! Je vous répondrai dans les 24-48h.');
            contactForm.reset();
            
        } catch (error) {
            showFormStatus('error', '✗ Erreur lors de l\'envoi. Veuillez m\'envoyer un email directement.');
        }
    });
}

function showFormStatus(type, message) {
    formStatus.className = type;
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// ===================================
// Gestion du bouton retour en haut
// ===================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Retour en haut');
    
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
}

// Créer le bouton retour en haut
createBackToTopButton();

// ===================================
// Animation des cartes de projet au survol
// ===================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Animation des témoignages
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// ===================================
// Effet de parallaxe léger sur le hero
// ===================================
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// ===================================
// Détection du scroll pour animations
// ===================================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll vers le bas
        if (nav && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        }
    } else {
        // Scroll vers le haut
        if (nav) {
            nav.style.transform = 'translateY(0)';
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

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

// Décommenter pour activer l'effet de typing sur le titre
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero h1');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 80);
//     }
// });

// ===================================
// Copier l'email au clic (optionnel)
// ===================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent.trim();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Créer une notification temporaire
                const notification = document.createElement('div');
                notification.textContent = '✓ Email copié!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--success);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    z-index: 10000;
                    animation: slideUp 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            });
        }
    });
});

// ===================================
// Console message (Easter egg)
// ===================================
console.log('%c👋 Bienvenue sur mon portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Développé par W. Ezekiel NACOULMA', 'color: #22d3ee; font-size: 14px;');
console.log('%c📧 Contact: mnacoulmaezekiel@gmail.com', 'color: #94a3b8; font-size: 12px;');
console.log('%c💡 Astuce: Essayez le mode clair/sombre!', 'color: #10b981; font-size: 12px;');

// ===================================
// Initialisation finale
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio chargé avec succès!');
    
    // Ajouter une classe au body pour indiquer que le JS est chargé
    document.body.classList.add('js-loaded');
    
    // Initialiser les animations au chargement
    highlightNavigation();
});

// ===================================
// Gestion des erreurs globales
// ===================================
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.message);
});

// ===================================
// Performance: Lazy loading des sections
// ===================================
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('section').forEach(section => {
    lazyLoadObserver.observe(section);
});

// ===================================
// Détection du mode sombre du système
// ===================================
if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// ===================================
// Animation CSS pour les notifications
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);