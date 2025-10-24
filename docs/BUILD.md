# Guide de Build - App Store de Jeux

Guide complet pour la compilation et la distribution de l'application Electron.

## Prérequis

### Système
- **Linux** : Ubuntu 18.04+ ou distribution équivalente
- **Windows** : Windows 10+ (64-bit)
- **macOS** : macOS 10.13+ (64-bit)

### Outils
- **Node.js** : Version 16+ (LTS recommandée)
- **npm** : Version 7+ (inclus avec Node.js)
- **Git** : Pour le contrôle de version
- **Docker** : Pour la cross-compilation (optionnel)

## Installation

### 1. Clonage du projet
```bash
git clone <repository-url>
cd app-store-jeux
```

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration
```bash
# Vérifier la configuration
npm list --depth=0

# Configuration optionnelle pour le développement
cp config.json.example config.json 2>/dev/null || echo "Configuration déjà présente"
```

## Développement

### Démarrage en mode développement
```bash
npm start
```

**Fonctionnalités du mode développement :**
- Hot reload automatique
- Outils de développement (F12)
- Console de debug
- Rechargement automatique des modifications

### Tests
```bash
# Tests unitaires
npm test

# Tests d'intégration
npm run test:integration

# Tests avec coverage
npm run test:coverage
```

## Build et Distribution

### Build Local

**Prérequis :** Avoir les outils de compilation pour la plateforme cible.

```bash
# Build pour la plateforme courante
npm run build

# Build pour Windows (depuis Windows/Linux)
npm run build:win

# Build pour macOS (depuis macOS)
npm run build:mac

# Build pour Linux (depuis Linux)
npm run build:linux
```

### Cross-Compilation avec Docker (Recommandé)

**Solution la plus fiable pour compiler depuis Linux vers toutes les plateformes.**

```bash
# Build multi-plateforme
npm run build:all

# Ou directement avec Docker
docker run --rm -ti \
  -v ${PWD}:/project \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:latest \
  --linux --win --mac
```

## Fichiers Générés

### Structure des builds
```
dist/
├── latest-linux.yml          # Métadonnées Linux
├── latest-mac.yml           # Métadonnées macOS
├── latest-windows.yml       # Métadonnées Windows
├── App Store de Jeux-1.0.0.AppImage  # Linux portable
├── App Store de Jeux Setup 1.0.0.exe  # Windows installer
└── App Store de Jeux-1.0.0.dmg       # macOS installer
```

### Formats de distribution
- **Windows** : `.exe` (installer NSIS)
- **macOS** : `.dmg` (installer standard macOS)
- **Linux** : `.AppImage` (portable, fonctionne sur la plupart des distributions)

## Tests Post-Build

### 1. Tests Automatisés
```bash
# Validation des packages générés
npm run test:build

# Vérification des signatures
npm run verify:signatures
```

### 2. Tests Manuels

#### Windows
1. Transférer le fichier `.exe` sur une machine Windows
2. Double-cliquer pour installer
3. Vérifier l'icône dans la barre des tâches
4. Tester les fonctionnalités principales
5. Vérifier la désinstallation

#### macOS
1. Transférer le fichier `.dmg` sur un Mac
2. Double-cliquer pour monter l'image
3. Glisser l'application dans Applications
4. Vérifier l'icône dans le dock
5. Tester les fonctionnalités principales

#### Linux
1. Transférer le fichier `.AppImage` sur une machine Linux
2. Rendre exécutable : `chmod +x App\ Store\ de\ Jeux-1.0.0.AppImage`
3. Double-cliquer ou exécuter : `./App\ Store\ de\ Jeux-1.0.0.AppImage`
4. Vérifier l'icône dans le lanceur d'applications

## Déploiement

### Release GitHub
1. **Créer un tag** : `git tag v1.0.0`
2. **Push du tag** : `git push origin v1.0.0`
3. **Upload automatique** : Les fichiers de `dist/` sont uploadés automatiquement

### Distribution manuelle
1. **Compresser les builds** : `zip -r releases.zip dist/`
2. **Transférer** vers les serveurs de distribution
3. **Mettre à jour** la documentation avec les liens de téléchargement

## Optimisation

### Réduction de la taille
```bash
# Exclure les fichiers de développement
npm run build -- --publish=never

# Compression des assets
npm run optimize:assets
```

### Cache des builds
```bash
# Utiliser les caches Docker pour accélérer les builds
mkdir -p ~/.cache/electron ~/.cache/electron-builder

# Les caches sont automatiquement montés dans les conteneurs Docker
```

## Problèmes Courants

### Erreur : "Cannot find module"
**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "SUID sandbox helper binary" (Linux)
**Solution :**
L'option `--no-sandbox` est automatiquement ajoutée aux scripts de développement.
Pour la production, configurez correctement les permissions du sandbox :

```bash
sudo chown root:root /path/to/app/node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 /path/to/app/node_modules/electron/dist/chrome-sandbox
```

**Alternative :**
Pour le développement uniquement, utiliser `--no-sandbox` est acceptable.

### Erreur : "Code signing failed" (macOS)
**Solution :**
- Configurer les certificats de signature dans le Keychain
- Ou utiliser `npm run build:mac -- --publish=never` pour build sans signature

### Erreur : "NSIS installer creation failed" (Windows)
**Solution :**
- Installer NSIS : `choco install nsis`
- Ou utiliser le build Docker depuis Linux

## Variables d'Environnement

### Développement
```bash
NODE_ENV=development    # Mode développement
DEBUG=electron:*       # Debug Electron
```

### Production
```bash
NODE_ENV=production    # Mode production
SIGN=true             # Activer la signature des binaires
```

## Support Multi-Plateforme

### Tests sur Machines Virtuelles
- **Windows** : VirtualBox avec Windows 10
- **macOS** : VirtualBox avec macOS (nécessite configuration spéciale)
- **Linux** : Docker containers pour différentes distributions

### Tests en Ligne
- **BrowserStack** : Tests automatisés sur vraies machines
- **Sauce Labs** : Tests cross-browser et cross-OS

## Maintenance

### Mise à jour des dépendances
```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour les dépendances
npm update

# Mettre à jour les dépendances majeures
npm install electron@latest
```

### Nettoyage
```bash
# Nettoyer les caches
npm run clean

# Supprimer tous les fichiers générés
rm -rf dist/ build/ node_modules/
npm install
```

## Ressources

- [Documentation Electron](https://electronjs.org/docs)
- [Documentation electron-builder](https://www.electron.build/)
- [Guide de sécurité Electron](https://electronjs.org/docs/tutorial/security)
- [Community Discord Electron](https://discord.gg/electron)
