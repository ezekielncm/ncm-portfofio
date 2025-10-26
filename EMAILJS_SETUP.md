# 📧 Configuration du Formulaire de Contact avec EmailJS

Ce guide vous explique comment configurer EmailJS pour recevoir les messages du formulaire de contact de votre portfolio.

## 🎯 Pourquoi EmailJS ?

- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Pas besoin de backend
- ✅ Configuration simple
- ✅ Support de plusieurs services (Gmail, Outlook, etc.)

## 📋 Étapes de Configuration

### 1. Créer un Compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up"**
3. Créez votre compte (gratuit)
4. Confirmez votre email

### 2. Ajouter un Service Email

1. Dans le dashboard, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre service email :
   - **Gmail** (recommandé)
   - Outlook
   - Yahoo
   - Ou autre

#### Pour Gmail :

1. Sélectionnez **"Gmail"**
2. Cliquez sur **"Connect Account"**
3. Autorisez EmailJS à accéder à votre Gmail
4. Donnez un nom au service (ex: "portfolio_contact")
5. Notez le **Service ID** (ex: `service_abc123`)

### 3. Créer un Template Email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template :

#### Subject (Sujet) :
```
Nouveau message de {{name}} - Portfolio
```

#### Content (Corps) :
```html
Bonjour Ezekiel,

Vous avez reçu un nouveau message depuis votre portfolio :

Nom: {{name}}
Email: {{email}}
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis votre portfolio
```

#### To Email :
```
mnacoulmaezekiel@gmail.com
```

4. **Testez** le template
5. Sauvegardez et notez le **Template ID** (ex: `template_xyz789`)

### 4. Obtenir votre Public Key

1. Allez dans **"Account" > "General"**
2. Trouvez votre **Public Key** (ex: `YOUR_PUBLIC_KEY_HERE`)
3. Copiez-le

### 5. Intégrer dans le Portfolio

#### A. Ajouter le Script EmailJS

Dans `index.html`, ajoutez avant la fermeture de `</body>` :

```html
<!-- EmailJS SDK -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Remplacez par votre Public Key
    })();
</script>

<script src="assets/js/main.js"></script>
```

#### B. Mettre à Jour main.js

Dans `assets/js/main.js`, trouvez cette section et décommentez-la :

```javascript
// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Afficher un état de chargement
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Envoi avec EmailJS
        emailjs.send('service_abc123', 'template_xyz789', formData)
            .then(() => {
                showFormStatus('success', '✓ Message envoyé avec succès! Je vous répondrai dans les 24-48h.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Erreur EmailJS:', error);
                showFormStatus('error', '✗ Erreur lors de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
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
```

**N'oubliez pas de remplacer :**
- `YOUR_PUBLIC_KEY_HERE` par votre Public Key
- `service_abc123` par votre Service ID
- `template_xyz789` par votre Template ID

### 6. Tester le Formulaire

1. Ouvrez votre portfolio dans le navigateur
2. Allez à la section Contact
3. Remplissez le formulaire
4. Envoyez un message de test
5. Vérifiez votre email

## 🔧 Configuration Avancée

### Ajout d'une Copie Auto-réponse

Créez un second template pour envoyer une confirmation à l'expéditeur :

#### Template "Auto-réponse" :

**To Email :** `{{email}}`

**Subject :** `Confirmation de réception - W. Ezekiel NACOULMA`

**Content :**
```html
Bonjour {{name}},

Merci de m'avoir contacté via mon portfolio !

J'ai bien reçu votre message concernant : "{{subject}}"

Je m'efforce de répondre à tous les messages dans les 24-48 heures.

À très bientôt,

W. Ezekiel NACOULMA
Étudiant en Technologie du Génie Informatique
mnacoulmaezekiel@gmail.com
(+226) 62070058
```

#### Modifier le JavaScript :

```javascript
emailjs.send('service_abc123', 'template_xyz789', formData)
    .then(() => {
        // Envoyer aussi une copie à l'expéditeur
        return emailjs.send('service_abc123', 'template_autoresponse', formData);
    })
    .then(() => {
        showFormStatus('success', '✓ Message envoyé avec succès! Vous recevrez une confirmation par email.');
        contactForm.reset();
    })
    .catch((error) => {
        console.error('Erreur EmailJS:', error);
        showFormStatus('error', '✗ Erreur lors de l\'envoi.');
    });
```

### Protection Anti-Spam

Ajoutez un champ honeypot invisible dans le formulaire :

```html
<!-- Champ invisible pour les bots -->
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
```

Puis dans le JavaScript :

```javascript
// Vérifier le honeypot
const honeypot = contactForm.querySelector('[name="_gotcha"]');
if (honeypot && honeypot.value) {
    console.log('Bot détecté');
    return; // Ne pas envoyer
}
```

## 🚨 Résolution de Problèmes

### Erreur 401 (Unauthorized)
- Vérifiez que votre Public Key est correct
- Assurez-vous que le service est bien connecté

### Erreur 403 (Forbidden)
- Vérifiez les IDs du service et du template
- Assurez-vous que le template est sauvegardé

### Emails non reçus
- Vérifiez vos spams
- Vérifiez que l'email dans le template est correct
- Testez directement depuis EmailJS dashboard

### Message "Service ID not found"
- Vérifiez que le Service ID est correct
- Le service doit être actif

## 💡 Alternatives à EmailJS

Si vous préférez une autre solution :

### 1. FormSpree

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Envoyer</button>
</form>
```

### 2. Netlify Forms

Si hébergé sur Netlify, ajoutez simplement `data-netlify="true"` :

```html
<form data-netlify="true" name="contact">
    <!-- vos champs -->
</form>
```

### 3. Backend PHP Simple

Créez un fichier `send-email.php` :

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "mnacoulmaezekiel@gmail.com";
    $headers = "From: " . $email;
    
    mail($to, $subject, $message, $headers);
    
    echo json_encode(['success' => true]);
}
?>
```

## 📊 Suivi des Messages

EmailJS offre un dashboard pour :
- Voir le nombre d'emails envoyés
- Consulter l'historique
- Vérifier le quota restant (200/mois gratuit)

## ✅ Checklist Finale

- [ ] Compte EmailJS créé
- [ ] Service email connecté (Gmail/Outlook)
- [ ] Template créé et testé
- [ ] Public Key obtenue
- [ ] Code intégré dans index.html
- [ ] JavaScript mis à jour avec les bons IDs
- [ ] Test d'envoi réussi
- [ ] Email de test reçu

## 📞 Support

Si vous avez des problèmes :

1. Documentation EmailJS : [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Support EmailJS : support@emailjs.com
3. Vérifiez la console du navigateur pour les erreurs

---

**Bonne chance avec votre portfolio! 🚀**