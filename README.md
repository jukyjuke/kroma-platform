<p align="center">
  <img src="https://img.shields.io/badge/KROMA-Platform-blueviolet?style=for-the-badge&logoColor=white" alt="KROMA" />
</p>

<h1 align="center">KROMA Platform</h1>

<p align="center">
  <strong>L'apprentissage gamifié, sécurisé et performant.</strong><br/>
  Architecture Monorepo - Sécurité AppSec - Expérience Temps Réel
</p>

<p align="center">
  <a href="https://skill-forge-pi-ten.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_DÉMO_LIVE-CLIQUEZ_ICI-success?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white" />
</p>

---

## 💡 Le Projet

**KROMA** est une plateforme web de quiz en ligne, conçue pour rendre l'apprentissage ludique et compétitif. Les utilisateurs peuvent relever des défis, accumuler de l'XP et des pièces, grimper dans le classement mondial et interagir socialement, le tout dans une interface moderne au design immersif.

---

## ✨ Fonctionnalités

| Catégorie                | Détails                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Quiz & Challenges** | Système de quiz avec questions à choix multiples, 3 niveaux de difficulté (Facile, Moyen, Difficile), tags thématiques  |
| ⚔️ **Gamification**      | XP, pièces, cœurs, streaks quotidiens, badges à débloquer                                                               |
| 🏆 **Classement**        | Leaderboard en temps réel basé sur l'XP                                                                                 |
| 👥 **Social**            | Système de follow/unfollow, profils publics, communauté                                                                 |
| 🛒 **Boutique**          | Échange de pièces contre des récompenses                                                                                |
| 🔐 **Authentification**  | Inscription, connexion, mot de passe oublié via [better-auth](https://www.better-auth.com/)                             |
| 🛡️ **Administration**   | Dashboard admin avec création de quiz                                                                                   |
| 📱 **Responsive**        | Interface adaptée à tous les écrans                                                                                     |

---

## 🏛️ Architecture

Le projet suit une architecture **monorepo** avec séparation front-end / back-end :

```
kroma-platform/
├── client/          -> Application React (SPA)
└── server/          -> API REST Express
```

```mermaid

graph LR

    A[Client React] -->|API REST| B[Serveur Express]

    B -->|Prisma ORM| C[(PostgreSQL)]
    
    C -->|Déployé sur| G[(Neon)]

    B -->|Auth| D[better-auth]

    A -->|Déployé sur| E[Vercel]

    B -->|Déployé sur| F[Render]

```

---

## 🛠️ Tech Stack

### Front-end (`/client`)

| Technologie                                        | Rôle                      |
| -------------------------------------------------- | ------------------------- |
| [React 19](https://react.dev/)                     | Bibliothèque UI           |
| [Vite 7](https://vite.dev/)                        | Bundler & dev server      |
| [TypeScript 5.9](https://www.typescriptlang.org/)  | Typage statique           |
| [TailwindCSS 4](https://tailwindcss.com/)          | Framework CSS utilitaire  |
| [React Router 7](https://reactrouter.com/)         | Routing SPA               |
| [Framer Motion](https://motion.dev/)               | Animations                |
| [Lucide React](https://lucide.dev/)                | Icônes                    |
| [Sonner](https://sonner.emilkowal.dev/)            | Notifications toast       |

### Back-end (`/server`)

| Technologie                                                                    | Rôle                           |
| ------------------------------------------------------------------------------ | ------------------------------ |
| [Express 5](https://expressjs.com/)                                            | Framework HTTP                 |
| [Prisma 7](https://www.prisma.io/)                                             | ORM & migrations               |
| [PostgreSQL 16](https://www.postgresql.org/)                                   | Base de données                |
| [Docker Compose](https://docs.docker.com/compose/)                             | Containerisation DB            |
| [better-auth](https://www.better-auth.com/)                                    | Authentification               |
| [Helmet](https://helmetjs.github.io/)                                          | Sécurité HTTP headers          |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Protection rate-limiting       |
| [Zod](https://zod.dev/)                                                        | Validation des variables d'env |

---

## ⚡ Installation

**1. Cloner le dépôt**

```bash
git clone https://github.com/jukyjuke/kroma-platform.git
cd kroma-platform
```

**2. Installer les dépendances**

```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

**3. Lancer la base de données**

```bash
cd server
docker compose up -d
```

**4. Configurer les variables d'environnement**

Créez un fichier `.env` dans chaque dossier (`client/` et `server/`) en suivant la section ci-dessous.

**5. Initialiser la base de données**

```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

---

## 🔑 Variables d'environnement

### `server/.env`
```env
DATABASE_URL="postgresql://admin:password123@localhost:5432/mon_projet_db"
PORT=5000
NODE_ENV=development
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Lancer le projet

Ouvrez **deux terminaux** :

```bash
# Terminal 1 - Serveur
cd server
npm run dev          # -> http://localhost:5000
```

```bash
# Terminal 2 - Client
cd client
npm run dev          # -> http://localhost:5173
```

| Service          | URL                          |
| ---------------- | ---------------------------- |
| 🌐 Client (Vite) | `http://localhost:5173`      |
| ⚙️ API Server    | `http://localhost:5000`      |
| 🔍 Health Check  | `http://localhost:5000/ping` |

---

<p align="center">
  Fait avec ❤️ par Truchon Burin Julien
</p>
