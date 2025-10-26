# 🚀 Portfolio - W. Ezekiel NACOULMA

Portfolio personnel moderne et interactif développé avec HTML, CSS et JavaScript vanilla.

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Configuration](#configuration)
- [Technologies Utilisées](#technologies-utilisées)
- [Sections](#sections)
- [Personnalisation](#personnalisation)
- [Performance](#performance)
- [Contact](#contact)

## 🎯 Aperçu

Portfolio professionnel présentant mes compétences, projets et expériences en tant qu'étudiant en Technologie du Génie Informatique.

### 🌟 Fonctionnalités Principales

✅ **Design Moderne**
- Interface élégante avec animations fluides
- Background animé avec effets de gradient
- Cartes interactives avec effets hover

✅ **Mode Clair/Sombre**
- Toggle pour basculer entre thèmes
- Sauvegarde de la préférence utilisateur
- Détection automatique du thème système

✅ **Responsive Design**
- Adapté mobile, tablette et desktop
- Menu hamburger pour mobile
- Navigation fluide

✅ **Animations Avancées**
- Barres de progression animées
- Compteurs animés pour les stats
- Fade-in au scroll
- Parallaxe sur le hero

✅ **Formulaire de Contact**
- Validation des champs
- Messages de statut
- Prêt pour EmailJS/FormSpree

✅ **Optimisations**
- Lazy loading des images
- Smooth scrolling
- Performance optimisée

## 📁 Structure du Projet

```
portfolio/
├── public/
│   ├── index.html                 # Page principale
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css         # Styles CSS
│   │   ├── js/
│   │   │   └── main.js           # JavaScript
│   │   ├── images/
│   │   │   ├── logo.png          # Logo
│   │   │   ├── photo.png         # Photo de profil
│   │   │   ├── projet1.png       # Captures projets
│   │   │   ├── projet2.png
│   │   │   └── projet3.png
│   │   └── pdf/
│   │       ├── cv_ezekielncm_fr.pdf    # CV Français
│   │       ├── cv_ezekielncm_en.pdf    # CV Anglais
│   │       └── portfolio.pdf            # Portfolio PDF
├── README.md                 # Documentation
└── .gitignore               # Fichiers ignorés
```

## 🚀 Installation

### 1. Cloner le Repository

```bash
git clone https://github.com/ezekielncm/portfolio.git
cd portfolio
```

### 2. Structure des Dossiers

Créez les dossiers nécessaires :

```bash
mkdir -p assets/css assets/js assets/images assets/pdf
```

### 3. Ajouter les Fichiers

- Placez `style.css` dans `assets/css/`
- Placez `main.js` dans `assets/js/`
- Ajoutez vos images dans `assets/images/`
- Ajoutez vos PDFs dans `assets/pdf/`

### 4. Lancer le Site

Ouvrez `public/index.html` dans votre navigateur ou servez le dossier `public` avec un serveur local :

```bash
# Avec Python (serve `public`)
python -m http.server 8000 --directory public

# Avec Node.js (http-server)
npx http-server public

# Avec PHP
php -S localhost:8000 -t public
```

Accédez à `http://localhost:8000`

## ⚙️ Configuration

### Formulaire de Contact (EmailJS)

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service email
3. Créez un template
4. Dans `main.js`, décommentez et configurez :

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(() => {
        showFormStatus('success', 'Message envoyé avec succès!');
        contactForm.reset();
    })
    .catch(() => {
        showFormStatus('error', 'Erreur lors de l\'envoi.');
    });
```

5. Ajoutez le script EmailJS dans `index.html` :

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

### Alternative: FormSpree

1. Créez un compte sur [FormSpree](https://formspree.io/)
2. Modifiez le form dans `index.html` :

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles et animations
  - Flexbox & Grid
  - Custom Properties (Variables CSS)
  - Animations & Transitions
- **JavaScript (Vanilla)** - Interactivité
  - Intersection Observer API
  - LocalStorage API
  - Event Listeners
- **Font Awesome 6.4** - Icônes
- **Google Fonts** - Typographie (Inter, Space Grotesk)

## 📑 Sections

### 1. **Hero / Accueil**
- Photo de profil
- Nom et titre
- Boutons de téléchargement CV
- Liens sociaux

### 2. **À Propos**
- Biographie
- Passions et intérêts
- Langues parlées avec barres de progression

### 3. **Stats**
- Compteurs animés
- Années d'études
- Projets réalisés
- Technologies maîtrisées

### 4. **Compétences**
- Cartes de compétences avec icônes
- Barres de progression
- Certifications

### 5. **Parcours**
- Timeline interactive
- Formation académique
- Expériences professionnelles

### 6. **Projets**
- Grille de projets
- Technologies utilisées
- Liens GitHub et démo

### 7. **Témoignages**
- Avis de professeurs et superviseurs
- Carte de témoignage stylée

### 8. **Contact**
- Formulaire fonctionnel
- Informations de contact
- Carte de localisation
- Disponibilité

## 🎨 Personnalisation

### Couleurs

Modifiez les variables CSS dans `style.css` :

```css
:root {
    --primary: #6366f1;      /* Couleur principale */
    --primary-dark: #4f46e5; /* Variante sombre */
    --accent: #22d3ee;       /* Couleur d'accent */
    --bg: #0f172a;          /* Fond sombre */
    --text: #f1f5f9;        /* Texte */
}
```

### Polices

Changez les polices dans `index.html` :

```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice&display=swap" rel="stylesheet">
```

Et dans `style.css` :

```css
body {
    font-family: 'VotrePolice', sans-serif;
}
```

### Contenu

Modifiez directement dans `index.html` :
- Textes
- Images (remplacez les placeholders)
- Liens sociaux
- Projets
- Compétences

## ⚡ Performance

### Optimisations Incluses

- ✅ Lazy loading des images
- ✅ Animations CSS performantes (transform, opacity)
- ✅ Intersection Observer pour animations au scroll
- ✅ Fichiers CSS/JS minimisés (en production)
- ✅ Fonts optimisées (display=swap)

### Pour la Production

1. **Minifier CSS/JS** :
```bash
# CSS
npx csso assets/css/style.css -o assets/css/style.min.css

# JS
npx terser assets/js/main.js -o assets/js/main.min.js
```

2. **Optimiser les Images** :
```bash
# Avec ImageOptim, TinyPNG, ou:
npx imagemin assets/images/* --out-dir=assets/images/optimized
```

3. **Générer un sitemap.xml**

4. **Ajouter meta tags SEO**

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (max-width: 1024px) { }
```

## 🌐 Déploiement

### GitHub Pages

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Dans Settings > Pages, sélectionnez la branche `main`.

### Netlify

1. Glissez-déposez le dossier sur [Netlify Drop](https://app.netlify.com/drop)
2. Ou connectez votre repo GitHub

### Vercel

```bash
npx vercel
```

## 🐛 Dépannage

### Le thème ne se sauvegarde pas
- Vérifiez que localStorage est activé dans votre navigateur

### Les animations ne fonctionnent pas
- Assurez-vous que JavaScript est activé
- Vérifiez la console pour les erreurs

### Le formulaire ne s'envoie pas
- Configurez EmailJS ou FormSpree
- Vérifiez votre connexion internet

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et le modifier.

## 👤 Contact

**W. Ezekiel NACOULMA**

- 📧 Email: mnacoulmaezekiel@gmail.com
- 🐙 GitHub: [github.com/ezekielncm](https://github.com/ezekielncm)
- 💼 LinkedIn: [linkedin.com/in/ezekielncm](https://linkedin.com/in/ezekielncm)
- 📍 Localisation: Ouagadougou, Burkina Faso
- 📞 Téléphone: (+226) 62070058 / (+226) 07478318

---

**Fait avec ❤️ à Ouagadougou