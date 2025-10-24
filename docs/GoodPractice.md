# 🎯 Bonnes Pratiques - Cross-Compilation Electron

## 1. Solution Standard : electron-builder et Docker 🐳

Le moyen le plus fiable pour effectuer des cross-builds depuis Linux est d'utiliser **electron-builder** dans un conteneur Docker.

### Configuration Docker
- Utilisez l'image officielle `electronuserland/builder:latest`
- Montez votre projet : `-v ${PWD}:/project`
- Ajoutez les caches : `-v ~/.cache/electron:/root/.cache/electron`

### Commande de Build
```bash
docker run --rm -ti \
  -v ${PWD}:/project \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:latest \
  --linux --win --mac
```

---

## 2. Configuration Multi-Plateforme 📋

### Scripts de Build (package.json)
```json
"scripts": {
  "build:win": "electron-builder --win",
  "build:mac": "electron-builder --mac",
  "build:linux": "electron-builder --linux",
  "build:all": "electron-builder -wml"
}
```

### Cibles de Build (package.json)
```json
"build": {
  "win": {"target": "portable"},
  "mac": {"target": "zip"},
  "linux": {"target": "AppImage"}
}
```

---

## 3. Structure de Projet Requise 🏗️

```
hello-world-electron/
├── package.json    # Config + scripts build
├── main.js        # Processus principal (sécurité)
├── preload.js     # Pont sécurisé renderer/main
├── index.html     # Interface HTML
├── style.css      # Styles CSS séparés
├── renderer.js    # Processus renderer (APIs limitées)
├── icon.ico       # Icône Windows
├── build/         # Organisation tests
└── README.md      # Documentation
```

### Sécurité Obligatoire
- `nodeIntegration: false`
- `contextIsolation: true`
- `preload.js` configuré
- Menu supprimé (`Menu.setApplicationMenu(null)`)

---

## 4. Icônes et Assets 🎨

| Plateforme | Format | Emplacement | Description |
|------------|--------|-------------|-------------|
| Windows | `.ico` | `icon.ico` | Icône barre tâches + .exe |
| macOS | `.icns` | `icon.icns` | Icône dock + .app |
| Linux | `.ico/.png` | `icon.ico` | Icône lanceur |

---

## 5. Tests Après Build 🧪

)/)
| Plateforme | Fichier | Test |
|------------|---------|------|
| Windows | `.exe` | Double-clic direct |
| macOS | `.zip` | Dézipper → double-clic .app |
| Linux | `.AppImage` | `chmod +x` → exécuter |

### Processus de Test
1. **Transfert** : Compresser `dist/` vers machines cibles
2. **Installation/Extraction** : Suivre format spécifique OS
3. **Exécution** : Vérifier fonctionnalités, icônes, raccourcis
4. **Validation** : Confirmer conformité aux attentes

---

## 6. Optimisations Avancées ⚡

### Applications Portables
- **Avantages** : Pas d'installation, taille réduite, déploiement simplifié
- **Cibles** : `portable` (Windows), `zip` (macOS), `AppImage` (Linux)
- **Chemins** : Utiliser `electron-app-path` pour données utilisateur

### Performance
- Exclusion des fichiers inutiles : `\!node_modules/**/*`, `\!*.md`
- Nettoyage automatique des caches
- Taille optimisée vs installateurs traditionnels

---

## 7. Scripts Pratiques 💻

```bash
# Développement
npm start              # Lancement avec sécurité

npm run build:win      # Génère dans build/Windows/
npm run build:mac      # Génère dans build/Mac/
npm run build:linux    # Génère dans build/Linux/
npm run build:all      # Génère dans build/All/

# Nettoyage
npm run clean          # Supprimer dist/ et caches
```

---

## 8. Checklist Déploiement ✅

- [ ] Scripts de build configurés
- [ ] Icônes présentes et référencées
- [ ] Sécurité (preload.js + contextIsolation)
- [ ] Tests sur plateformes cibles
- [ ] Documentation mise à jour
- [ ] Dossiers build/ organisés

---

*Document mis à jour pour clarté et conformité aux standards professionnels.*
