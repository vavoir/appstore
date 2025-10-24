# Architecture du Projet - Version Vue.js Modulaire

Application desktop multi-plateforme développée avec Vue.js 3, Electron et une architecture modulaire pour une maintenabilité et une évolutivité optimales.

## 🚀 Démarrage Rapide

### Installation des dépendances
```bash
npm install
```

### Lancement de l'application
```bash
# Mode développement avec hot reload
npm start

# Ou directement avec Electron
npx electron .
```

### Build et distribution
```bash
# Build multi-plateforme
npm run build:all

# Build spécifique par plateforme
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

## Structure du Projet Modulaire

```
📁 app-store-jeux/
├── 📄 package.json              # Configuration + scripts build
├── 📁 src/                      # Code source modulaire
│   ├── 📄 index.html           # Point d'entrée Vue.js
│   ├── 📄 App.css              # Styles globaux
│   ├── 📁 styles/
│   │   └── 📄 styles.css       # Styles CSS organisés
│   ├── 📁 js/
│   │   ├── 📄 app.js           # Configuration Vue.js
│   │   ├── 📄 components.js    # Composants Vue.js modulaires
│   │   ├── 📄 main.js          # Processus principal Electron
│   │   └── 📄 preload.js       # APIs sécurisées contextBridge
│   └── 📁 views/               # Vues Vue.js séparées
│       ├── 📄 Grille.vue       # Vue de la grille de jeux
│       └── 📄 Chat.vue         # Vue du chat en temps réel
├── 📁 e2ee-relay/              # Serveur Node.js pour la communication
│   └── 📄 server.js            # Serveur de messagerie temps réel
├── 📁 assets/                  # Ressources (icônes, images)
├── 📁 docs/                    # Documentation
│   ├── 📄 ARCHITECTURE.md     # Ce document
│   ├── 📄 BUILD.md            # Guide de compilation
│   └── 📄 cdc.md              # Cahier des charges
└── 📄 README.md               # Documentation projet
```

## Composants Principaux

### Architecture Vue.js Modulaire

#### 1. Point d'Entrée (`src/index.html`)
- Page HTML5 propre avec imports modulaires
- Point de montage Vue.js (`<div id="app">`)
- Imports CSS et JavaScript séparés

#### 2. Configuration Vue.js (`src/js/app.js`)
- Import de Vue.js 3 via CDN
- Import des composants modulaires
- Configuration et montage de l'application
- Gestion des événements inter-composants

#### 3. Composants Vue.js (`src/js/components.js`)
- **App** : Composant principal avec gestion des vues
- **Grille** : Vue de la grille avec transitions de glissement
- **Chat** : Vue du chat avec messages en temps réel
- Exports ES6 pour modularité

#### 4. Vues Vue.js (`src/views/`)
- **Grille.vue** : Interface de navigation des jeux
- **Chat.vue** : Interface de messagerie
- Composants réutilisables et maintenables

#### 5. Styles CSS (`src/styles/styles.css`)
- Organisation hiérarchique des styles
- Z-index pour superposition correcte
- Responsive design optimisé
- Transitions CSS fluides

### Processus Electron

#### 6. Processus Principal (`src/js/main.js`)
- Configuration de sécurité renforcée
- Gestion de la fenêtre (800×600, non-redimensionnable)
- Menu système supprimé (`Menu.setApplicationMenu(null)`)
- Communication IPC avec le renderer

#### 8. Serveur de Communication (`e2ee-relay/server.js`)
- Serveur Node.js pour la messagerie temps réel
- WebSockets pour la communication bidirectionnelle
- Chiffrement end-to-end des messages
- Déploiement sur Railway pour l'hébergement cloud

## Flux de Données Complet

1. **Initialisation**
   - Chargement de `index.html` dans le renderer
   - Import de Vue.js 3 via CDN
   - Configuration des composants modulaires
   - Montage de l'application sur `#app`

2. **Navigation Inter-Vues**
   - **Vue Grille** : Navigation paginée avec transitions
   - **Vue Chat** : Messagerie en temps réel
   - Communication via événements Vue.js (`@show-chat`, `@close-chat`)
   - État réactif géré par le composant App

3. **Communication Serveur**
   - Connexion WebSocket via le serveur e2ee-relay
   - Messages chiffrés end-to-end
   - Synchronisation temps réel entre clients
   - Gestion des erreurs et reconnexions

4. **Transitions Fluides**
   - Animations CSS3 (0.6s) pour les changements de page
   - Glissement gauche/droite selon la direction
   - Pagination fixe avec z-index approprié
   - Nettoyage automatique des éléments DOM

## Flux de Travail de Développement

1. **Configuration**
   - Installation : `npm install`
   - Structure modulaire avec dossiers séparés
   - Configuration Vue.js et Electron

2. **Développement**
   - Vue.js : Éditer `src/views/*.vue`, `src/js/components.js`
   - Styles : Modifier `src/styles/styles.css`
   - Electron : Ajuster `src/js/main.js`, `src/js/preload.js`
   - Hot reload automatique via Vue.js

3. **Tests**
   - Tests des transitions Vue.js
   - Validation des événements inter-composants
   - Tests de sécurité Electron

4. **Build**
   - Configuration electron-builder optimisée
   - Build multi-plateforme avec Docker
   - Applications portables générées

## Technologies Utilisées

- **Vue.js 3** : Framework JavaScript modulaire et réactif
- **Electron** : Framework desktop pour applications web
- **Node.js** : Serveur backend pour la communication temps réel
- **CSS3** : Animations, Grid, Flexbox, transitions
- **JavaScript ES6+** : Modules, classes, arrow functions
- **HTML5** : Structure sémantique et APIs modernes

## Bonnes Pratiques Vue.js

- **Composants modulaires** : Séparation claire des responsabilités
- **Props et Events** : Communication inter-composants typée
- **Computed Properties** : Données réactives optimisées
- **Styles scopés** : CSS organisé par composant
- **Lifecycle hooks** : Gestion du cycle de vie Vue.js

## Sécurité Electron

- **nodeIntegration: false** : Isolation du renderer
- **contextIsolation: true** : Contexte séparé pour la sécurité
- **Preload Script** : Pont sécurisé entre main et renderer
- **Menu supprimé** : Interface épurée sans distractions

## Performance et Optimisation

- **Transitions CSS3** : Animations hardware-accelerated
- **Imports modulaires** : Chargement optimisé des composants
- **Z-index hiérarchique** : Rendu correct des superpositions
- **Responsive design** : Adaptation aux différentes tailles d'écran

## Évolutions Futures

- **Serveur e2ee-relay** : Intégration complète du serveur Node.js
- Système de comptes utilisateurs
- Thèmes personnalisables
- API REST pour la gestion des jeux
- Tests unitaires Vue.js
- Documentation API des composants
