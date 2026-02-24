# KROMA - Frontend

Le frontend de l'application KROMA, une plateforme d'apprentissage ludique (gamification, quiz, progression).

Développé avec **React**, **Vite** et **Tailwind CSS**.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (Version 18+ recommandée)
- [npm](https://www.npmjs.com/)

## Installation

1.   **Naviguer vers le dossier frontend :**

```bash
 cd skill-forg
```

2.   **Installer les dépendances :**

```bash
    npm install
```

## Configuration

L'application a besoin de connaître l'URL du backend pour fonctionner.

1.   Créer un fichier `.env` à la racine du dossier `skill-forg`.
2.   Ajouter la variable suivante (adapter selon votre configuration locale) :

```env
    VITE_API_URL=http://localhost:3000/api
    VITE_AUTH_URL=http://localhost:3000/api/auth
```

> Note : Par défaut, si aucune variable n'est définie, l'application tentera de se connecter à `http://localhost:3000/api`.

## Démarrage (Développement)

Pour lancer le serveur de développement local :

```bash
npm run dev
```

L'application sera accessible à l'adresse : [http://localhost:5173](http://localhost:5173)

## Build (Production)

Pour compiler l'application pour la production :

```bash
npm run build
```

Les fichiers compilés se trouveront dans le dossier `dist`.

Vous pouvez prévisualiser le build localement avec :

```bash
npm run preview
```

## Structure du Projet

```bash
skill-forg/
├── public/              # Assets statiques
├── src/
│   ├── components/      # Composants React réutilisables (UI, Layout...)
│   ├── context/         # Contextes React (Auth...)
│   ├── hooks/           # Hooks personnalisés (useQuiz, useProfile...)
│   ├── lib/             # Utilitaires et clients API (api-client.ts)
│   ├── pages/           # Pages de l'application (Router)
│   ├── services/        # Services pour appeler l'API
│   ├── App.tsx          # Point d'entrée principal / Routes
│   └── main.tsx         # Montage de l'application
├── .env                 # Variables d'environnement (à créer)
├── index.html           # Fichier HTML principal
├── package.json         # Dépendances et scripts
├── tailwind.config.js   # Configuration CSS
└── vite.config.ts       # Configuration Vite
```

## Technologies Principales

- **Framework** : [React](https://react.dev/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/) (Icônes)
- **Authentification** : [Better Auth](https://better-auth.com/)
- **Router** : [React Router DOM](https://reactrouter.com/)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/) (n'est pas encore utilisé)
- **Notifications** : [Sonner](https://sonner.emilkowal.ski/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
