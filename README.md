README – eXgecar
eXgecar – Expert en Courtage, Assurance & Réassurance
Application desktop professionnelle pour la gestion des actes médicaux, des assurés et de leurs bénéficiaires.
Développée avec ❤️ par 3S Consulting.

🚀 Fonctionnalités
🧠 Authentification sécurisée (bcrypt)

📋 Gestion des assurés & bénéficiaires

🧾 Suivi des actes médicaux

📦 Base de données locale (SQLite)

🖥️ Application Desktop multiplateforme (Windows / macOS / Linux)

🔐 Création d’utilisateurs avec rôles (admin, user, viewer)

📊 Statistiques par période, centre ou PEC

🔁 Synchronisation possible (future version)

📤 Export Excel / PDF (à venir)

🏗️ Architecture
Composant	Stack
Frontend	React + Vite
Backend	Node.js (Electron main)
BDD locale	Better-SQLite3
State mgmt	Redux Toolkit
Routing	React Router DOM v7
Packaging	Electron Builder

⚙️ Installation
bash
Copier
Modifier
# 1. Cloner le repo
git clone https://github.com/sogecar/exgecar.git
cd exgecar

# 2. Installer les dépendances
npm install

# 3. Lancer en mode dev (frontend + Electron)
npm run dev
🖥️ Build Application Desktop
bash
Copier
Modifier
# Build pour Windows, macOS ou Linux selon la machine
npm run dist
⚠️ Le fichier .pfx doit être présent dans private/ pour la signature Windows.

📁 Structure des dossiers
csharp
Copier
Modifier
exgecar/
├── electron/           # Backend Electron + IPC
│   ├── main.js
│   ├── preload.js
│   ├── db/
│   └── handlers/
├── src/                # Frontend React
│   ├── components/
│   ├── features/
│   └── app/
├── public/             # HTML de base
├── assets/             # Icônes et ressources
├── dist/               # Build final React
👤 Comptes par défaut
Rôle	Identifiant	Mot de passe
Admin	admin	1234

🧠 Vous pouvez créer d'autres utilisateurs depuis l'application (section "Utilisateurs").

🛡️ Sécurité
Base chiffrée possible via sqlite3 + crypto (à implémenter)

Utilisateurs hashés en bcrypt

Données uniquement locales (offline-first)

📦 Publication GitHub
Déploiement automatique vers GitHub Releases :

bash
Copier
Modifier
npm run deploy
📜 Licence
MIT – 3S Consulting © 2025
Produit exclusif SOGECAR.

💬 Besoin d’aide ?
Contactez-nous sur contact@3sconsulting.com ou ouvrez une issue sur GitHub.