# App Store de Jeux - Structure de Base

## Structure du Projet

```
src/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
└── js/
    └── main.js         # Script JavaScript principal
```

## Description des Fichiers

### index.html
Page principale avec structure HTML5 sémantique, liens vers CSS et JS.

### css/style.css
Feuille de styles avec :
- Design moderne et responsive
- Animations CSS
- Thème dégradé
- Support mobile

### js/main.js
Script principal avec :
- Détection d'environnement (Electron vs navigateur)
- Système de notifications
- Gestion d'événements
- Module d'initialisation

## Utilisation Future avec Electron

Pour utiliser cette structure avec Electron :

1. Créer un `package.json` dans la racine
2. Ajouter les dépendances Electron
3. Créer un fichier `main.js` Electron (différent de src/js/main.js)
4. Configurer les points d'entrée

## Technologies Utilisées

- **HTML5** : Structure sémantique, API modernes
- **CSS3** : Flexbox, animations, responsive design
- **JavaScript ES6+** : Modules, async/await, classes
- **Architecture modulaire** : Séparation CSS/JS

## Fonctionnalités Prêtes

- ✅ Interface Hello World stylisée
- ✅ Détection d'environnement Electron
- ✅ Système de notifications
- ✅ Design responsive
- ✅ Animations CSS
- ✅ Console de debug

## Prochaines Étapes

1. Configuration Electron (package.json, main process)
2. Intégration des APIs système
3. Développement des fonctionnalités de l'App Store
4. Tests et optimisation
