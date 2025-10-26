# 🚀 Guide de Déploiement du Portfolio

Ce guide vous explique comment déployer votre portfolio sur différentes plateformes d'hébergement gratuites.

## 📋 Table des Matières

- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Cloudflare Pages](#cloudflare-pages)
- [Comparaison des Plateformes](#comparaison)
- [Configuration DNS](#configuration-dns)

---

## 🐙 GitHub Pages

**Avantages :** Gratuit, Simple, Intégration Git

### Étape 1 : Préparer le Repository

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - Portfolio W. Ezekiel NACOULMA"
```

### Étape 2 : Créer le Repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New Repository"**
3. Nommez-le : `portfolio` ou `ezekielncm.github.io`
4. **NE PAS** initialiser avec README
5. Créez le repository

### Étape 3 : Pousser le Code

```bash
# Ajouter le remote
git remote add origin https://github.com/ezekielncm/portfolio.git

# Renommer la branche en main (si nécessaire)
git branch -M main

# Pousser le code
git push -u origin main
```

### Étape 4 : Activer GitHub Pages

1. Allez dans **Settings** de votre repository
2. Dans le menu latéral, cliquez sur **Pages**
3. Sous **Source**, sélectionnez :
   - Branch : `main`
   - Folder : `/ (root)`
4. Cliquez sur **Save**
5. Attendez 2-3 minutes

> Remarque : si les fichiers de votre site sont dans un dossier `public/`, sélectionnez `Folder : /public` dans la configuration Pages (ou déplacez `index.html` à la racine du dépôt).

### Étape 5 : Accéder au Site

Votre site sera disponible à :
```
https://ezekielncm.github.io/portfolio/
```

Ou si le repo s'appelle `ezekielncm.github.io` :
```
https://ezekielncm.github.io/
```

### Configuration Domaine Personnalisé

1. Achetez un domaine (ex: ezekielnacoulma.com)
2. Dans Settings > Pages > Custom domain
3. Entrez votre domaine
4. Cochez **"Enforce HTTPS"**
5. Configurez les DNS chez votre registrar :

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     ezekielncm.github.io
```

---

## 🌐 Netlify

**Avantages :** CDN Rapide, Déploiement Automatique, Formulaires Intégrés

### Méthode 1 : Drag & Drop (Plus Simple)

1. Allez sur [netlify.com](https://www.netlify.com/)
2. Créez un compte (gratuit)
3. Glissez-déposez votre dossier portfolio sur [app.netlify.com/drop](https://app.netlify.com/drop)
4. Votre site est déployé ! 🎉

### Méthode 2 : Avec Git (Recommandée)

1. Connectez-vous à [Netlify](https://app.netlify.com/)
2. Cliquez sur **"New site from Git"**
3. Choisissez **GitHub**
4. Sélectionnez votre repository `portfolio`
5. Configuration :
   - **Branch:** `main`
   - **Build command:** (laisser vide)
  - **Publish directory:** `public`
6. Cliquez sur **"Deploy site"**

### Configurer le déploiement automatique (GitHub Actions)

Si vous souhaitez déployer automatiquement à chaque push vers `main`, vous pouvez configurer une GitHub Action qui utilise le Netlify CLI. Pour que le workflow fonctionne, ajoutez ces secrets au dépôt (Settings → Secrets & variables → Actions) :

- `NETLIFY_AUTH_TOKEN` : votre token personnel Netlify (Settings -> User -> Applications -> Personal access tokens)
- `NETLIFY_SITE_ID` : l'ID du site Netlify (disponible dans Settings > Site information sur Netlify)

Exemple d'étapes à suivre :

1. Sur Netlify, allez dans votre site > Settings > Site information > Notez la valeur "Site ID".
2. Dans GitHub, ouvrez votre dépôt → Settings → Secrets & variables → Actions → New repository secret.
3. Créez `NETLIFY_AUTH_TOKEN` et `NETLIFY_SITE_ID` avec les valeurs correspondantes.
4. Poussez vos modifications sur `main` — le workflow `.github/workflows/deploy-netlify.yml` (si présent) s'exécutera et déploiera le dossier `public/`.

Le workflow peut également exécuter des étapes de build (minification des assets) et des vérifications rapides (accessibilité HTML) avant déploiement.

### Configuration

#### netlify.toml (optionnel)

Créez un fichier `netlify.toml` à la racine :

```toml
[build]
  publish = "public"
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

#### Domaine Personnalisé sur Netlify

1. Allez dans **Domain settings**
2. Cliquez sur **"Add custom domain"**
3. Entrez votre domaine
4. Configurez les DNS :

```
Type    Name    Value
CNAME   www     YOUR-SITE.netlify.app
A       @       75.2.60.5
```

5. Activez **HTTPS** automatique

### Formulaires Netlify

Si vous voulez utiliser Netlify Forms au lieu d'EmailJS :

Dans `index.html`, modifiez le form :

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact">
    <p style="display:none;">
        <label>Don't fill this: <input name="bot-field" /></label>
    </p>
    
    <!-- Vos champs existants -->
    <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" name="name" id="name" required>
    </div>
    <!-- etc... -->
</form>
```

Les messages arriveront dans votre dashboard Netlify !

---

## ▲ Vercel

**Avantages :** Ultra Rapide, Excellent pour Next.js/React, CDN Global

### Méthode CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Méthode Interface Web

1. Allez sur [vercel.com](https://vercel.com/)
2. **"Import Project"**
3. Sélectionnez GitHub
4. Choisissez votre repository
5. Cliquez sur **"Deploy"**

### Configuration vercel.json

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## ☁️ Cloudflare Pages

**Avantages :** CDN Cloudflare, Rapide, Analytics Inclus

### Déploiement

1. Allez sur [pages.cloudflare.com](https://pages.cloudflare.com/)
2. **"Create a project"**
3. Connectez GitHub
4. Sélectionnez le repository
5. Configuration :
   - **Production branch:** `main`
   - **Build command:** (vide)
  - **Build output:** `public`
6. **"Save and Deploy"**

### Configuration _headers

Créez un fichier `_headers` à la racine :

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: no-referrer-when-downgrade

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable
```

---

## 📊 Comparaison des Plateformes

| Plateforme | Vitesse | Gratuit | Custom Domain | SSL | CDN | Facilité |
|------------|---------|---------|---------------|-----|-----|----------|
| **GitHub Pages** | ⭐⭐⭐ | ✅ | ✅ | ✅ | ❌ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Vercel** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Cloudflare** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ | ✅ | ⭐⭐⭐⭐ |

### Recommandation

Pour un portfolio simple : **Netlify** ou **GitHub Pages**
- Netlify : Si vous voulez des formulaires intégrés
- GitHub Pages : Si vous voulez la simplicité maximale

---

## 🌍 Configuration DNS Personnalisé

### Chez un Registrar (ex: Namecheap, GoDaddy)

#### Pour GitHub Pages :

```
Type    Host    Value                    TTL
A       @       185.199.108.153          Automatic
A       @       185.199.109.153          Automatic
A       @       185.199.110.153          Automatic
A       @       185.199.111.153          Automatic
CNAME   www     ezekielncm.github.io     Automatic
```

#### Pour Netlify :

```
Type    Host    Value                      TTL
CNAME   @       YOUR-SITE.netlify.app      Automatic
CNAME   www     YOUR-SITE.netlify.app      Automatic
```

#### Pour Vercel :

```
Type    Host    Value                      TTL
CNAME   @       cname.vercel-dns.com       Automatic
CNAME   www     cname.vercel-dns.com       Automatic
```

---

## ✅ Checklist Post-Déploiement

- [ ] Site accessible et fonctionnel
- [ ] Tous les liens fonctionnent
- [ ] Images chargées correctement
- [ ] Formulaire de contact testé
- [ ] Version mobile testée
- [ ] SSL/HTTPS activé
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Google Analytics ajouté (optionnel)
- [ ] Sitemap.xml créé (optionnel)
- [ ] robots.txt configuré (optionnel)

---

## 🔧 Optimisations Post-Déploiement

### 1. Google Analytics

Ajoutez avant `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Meta Tags SEO

```html
<meta name="description" content="Portfolio de W. Ezekiel NACOULMA - Étudiant en Technologie du Génie Informatique">
<meta name="keywords" content="Ezekiel NACOULMA, développeur, portfolio, Burkina Faso, informatique">
<meta name="author" content="W. Ezekiel NACOULMA">

<!-- Open Graph -->
<meta property="og:title" content="W. Ezekiel NACOULMA - Portfolio">
<meta property="og:description" content="Portfolio professionnel - Étudiant en IT">
<meta property="og:image" content="https://votresite.com/assets/images/preview.jpg">
<meta property="og:url" content="https://votresite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="W. Ezekiel NACOULMA - Portfolio">
<meta name="twitter:description" content="Portfolio professionnel - Étudiant en IT">
<meta name="twitter:image" content="https://votresite.com/assets/images/preview.jpg">
```

### 3. Favicon

Ajoutez dans `<head>` :

```html
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
```

### 4. robots.txt

Créez `robots.txt` à la racine :

```
User-agent: *
Allow: /

Sitemap: https://votresite.com/sitemap.xml
```

### 5. sitemap.xml

Créez `sitemap.xml` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votresite.com/</loc>
    <lastmod>2025-10-23</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🆘 Dépannage

### Site ne se charge pas
- Vérifiez que tous les fichiers sont bien pushés
- Vérifiez les chemins des fichiers (case sensitive)
- Consultez les logs de déploiement

### CSS/JS ne se chargent pas
- Vérifiez les chemins relatifs dans index.html
- Vérifiez que les fichiers existent dans assets/

### Formulaire ne fonctionne pas
- Vérifiez la configuration EmailJS
- Vérifiez la console du navigateur
- Testez en local d'abord

---

**Bon déploiement! 🚀**