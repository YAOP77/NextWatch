
# N-Watch

Plateforme de streaming moderne développée avec React et Tailwind CSS.

## Fonctionnalités principales

- **Authentification** : Inscription et connexion animées, gestion du contexte utilisateur.
- **Abonnements** : Gestion des offres (free, weekly, monthly, yearly) avec affichage dynamique et responsive.
- **Accès Premium** : Sécurisation de l'accès aux films premium selon le type d'abonnement.
- **Navigation Responsive** : Header et sidebar adaptatifs, menu mobile moderne et fluide.
- **Affichage des films** : Liste de films classiques et premium, cards interactives, favoris et "regarder plus tard" sans redirection non désirée.
- **Détails des films** : Pages MovieDetails et MoviePremiumDetails responsives, lecture vidéo sécurisée.
- **Animations** : Apparition animée des composants clés (login/register, cards, etc.) pour une UX moderne.
- **Slider d'affiches** : Carrousel multi-lignes animé, sans débordement sur mobile.
- **FAQ et contenu** : Section FAQ interactive, cards informatives animées.
- **Sécurité** : Vérification côté frontend et backend pour empêcher le contournement des restrictions premium.

## Stack technique
- **React** (hooks, context, router)
- **Vite** (build ultra-rapide)
- **Tailwind CSS** (UI moderne et responsive)
- **Framer Motion** (animations)
- **Axios** (requêtes API)

## Points forts
- UI moderne, fluide et responsive sur tous types d'écrans
- Sécurité renforcée pour les contenus premium
- Expérience utilisateur soignée (animations, navigation, feedback)
- Code structuré et évolutif

## À venir
- Paiement en ligne et gestion des transactions
- Amélioration des notifications et feedback utilisateur
- Plus de personnalisation et de recommandations

---

© 2025 NextWatch — Développé par Pascal Yao
# React + Vite

## Démarrage local

```bash
npm install
npm run dev
```

## Déploiement avec Docker

### Build et lancement du frontend seul

```bash
docker build -t nextwatch-frontend .
docker run -p 80:80 nextwatch-frontend
```

### Orchestration complète avec docker-compose

Un fichier `docker-compose.yml` est disponible à la racine du projet pour lancer le frontend, le backend et la base MongoDB en une seule commande :

```bash
docker-compose up --build
```

Cela démarre :
- Le frontend sur le port 80
- Le backend sur le port 5000
- MongoDB sur le port 27017

Vous pouvez ensuite accéder à l'application via `http://localhost`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
