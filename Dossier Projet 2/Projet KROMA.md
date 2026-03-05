# Dossier de Projet - KROMA

**KROMA** est une plateforme d'apprentissage gamifiée qui transforme la validation de connaissances en une expérience ludique et compétitive. Inspirée des mécaniques de jeux mobiles, elle engage l'utilisateur par des systèmes de récompenses, de progression et de compétition sociale.

---

## 1. Contexte & Besoins

###  Objectifs

- **Engagement Utilisateur** : Lutter contre le décrochage dans l'apprentissage en ligne grâce à la gamification.
- **Fidélisation** : Créer une habitude quotidienne via le système de "Série" (Streak) et de Coeurs limités.
- **Compétition Saine** : Stimuler la progression via un leaderboard (Leaderboard) et des profils sociaux.

### Public Cible

- Étudiants souhaitant réviser différentes matières de manière ludique.
- Curieux voulant tester leur culture générale (Tech, Histoire, Sciences...).

### Besoins Fonctionnels

- Système d'authentification complet (Inscription, Connexion, Profil).
- Moteur de Quiz interactif avec feedback immédiat.
- Système économique virtuel (Coins, Coeurs, Boutique).
- Tableau de bord de progression (XP, Badges, Niveaux).
- Classement en temps réel.

---
## 2. Réalisations Front

L'interface a été conçue pour être **immersive**, **réactive** et **visuellement riche**.

### Choix Techniques & UX

- **Stack** : React 19, Vite, Tailwind CSS v4.
- **Design System** : Utilisation d'une palette de couleurs vibrantes (Kroma) et d'un "Dark Mode" profond pour un rendu premium.
- **Feedback Immédiat** : Animations de succès/échec lors des quiz (via `framer-motion`).
- **Optimistic UI** : Mise à jour instantanée des compteurs (Coeurs, Coins) avant même la réponse du serveur pour une fluidité totale.
- **Navigation** : Single Page Application pour zéro rechargement de page.

### Pages Clés

1.  **Header** : Accès rapide aux quiz, état des Coeurs et des coins.
2.  **Interface de Quiz** : Design épuré, barre de progression, animation de timer pour les questions.
3.  **Boutique (Shop)** : Interface type "E-commerce" pour dépenser ses coins.
4.  **Profil Public** : Page sociale affichant les statistiques, badges et historique d'un joueur.

---

## 3. Réalisations Back

Le backend assure la **sécurité**, l'**intégrité des données** de jeu et la **performance**.

### Architecture

- **Stack** : Node.js, Express, TypeScript.
- **ORM** : Prisma (pour la sécurité des types et la gestion des migrations).
- **Base de Données** : PostgreSQL.

### Modèle de Données

Le schéma de base de données a été optimisé pour la performance et la cohérence.

**Points clés du modèle :**

- **User** : Centralise toute la progression (XP, Coins, Badges JSON, Stats).
- **Challenge/UserChallenge** : Relation Many-to-Many pour suivre l'historique précis des quiz complétés.
- **Relations Sociales** : Système de `Follow` auto-référencé sur la table User.

### Logique Métier Complexe

Pour garantir qu'un utilisateur ne perde jamais ses données en cas de bug réseau, j'ai implémenté des **Transactions Atomiques** (ACID).

---

## 4. Sécurité & Veille

### Sécurité Mise en Place

Un audit complet a été réalisé pour sécuriser l'API :

1.  **Rate Limiting** : Protection contre les attaques DDOS via `express-rate-limit`.
2.  **Input Validation** : Validation stricte des données entrantes avec **Zod**. Rejet systématique des données malformées avant même d'atteindre la base de données.
3.  **Protection des Routes** : Middleware d'authentification vérifiant la session à chaque requête sensible.
4.  **HTTP Headers** : Utilisation de `Helmet` pour prévenir les failles XSS et le sniffing.

### Veille Technologique

Le projet s'appuie sur des technologies modernes pour garantir sa pérennité :

- **Better-Auth** : Solution d'authentification émergente, choisie pour sa flexibilité, son support TypeScript natif et sa gestion simplifiée des sessions (vs complexité de NextAuth/Auth.js hors Next.js).

- **Tailwind CSS v4** : Adoption précoce de la version 4 (beta/RC) pour bénéficier du nouveau moteur de compilation ultra-rapide (Rust) et de la détection automatique des fichiers.

- **Prisma ORM** : Choisi pour son "Type Safety" bout-en-bout, réduisant drastiquement les bugs liés aux requêtes SQL mal formulées.