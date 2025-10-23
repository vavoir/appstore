# Architecture du Projet

Structure organisée pour une application portable avec Dear PyGui, optimisée pour la compilation multi-plateforme.

## Structure du Projet

```
.
├── main.py                # Point d'entrée de l'application
├── requirements.txt       # Dépendances Python
├── build/                # Configuration et scripts de compilation
│   ├── build/            # Dossier temporaire de compilation
│   ├── export/           # Sortie des exécutables compilés
│   │   ├── linux/        # Version Linux compilée
│   │   └── windows/      # Version Windows compilée
│   ├── windows/          # Fichiers spécifiques Windows
│   │   └── icon.ico      # Icône de l'application
│   ├── build.spec        # Configuration de compilation Linux
│   ├── windows.spec      # Configuration de compilation Windows
│   ├── compile_linux.sh  # Script de compilation pour Linux
│   └── compile_windows.sh # Script de compilation pour Windows
└── docs/                 # Documentation supplémentaire
    └── BUILD.md          # Guide complet de compilation
```

## Fichiers Principaux

### `main.py`
- Point d'entrée unique de l'application
- Interface utilisateur avec Dear PyGui
- Configuration de la fenêtre principale
- Gestion des événements et de la logique métier

### Fichiers de Compilation

#### `build/build.spec`
- Configuration PyInstaller pour Linux
- Définit les ressources à inclure
- Paramètres d'optimisation

#### `build/windows.spec`
- Configuration PyInstaller pour Windows
- Inclut les ressources spécifiques Windows
- Configuration pour création d'exécutable sans console

#### Scripts de Compilation
- `compile_linux.sh` : Compilation automatisée pour Linux
- `compile_windows.sh` : Compilation pour Windows via Wine

## Flux de Travail de Développement

1. **Développement** :
   - Coder dans `main.py`
   - Tester avec `python main.py`

2. **Compilation** :
   - Pour Linux : `cd build && ./compile_linux.sh`
   - Pour Windows : `cd build && ./compile_windows.sh`
   - Les binaires sont générés dans `build/export/`

3. **Distribution** :
   - Les archives ZIP sont créées automatiquement
   - Contiennent tout le nécessaire pour l'exécution

## Bonnes Pratiques

- Toujours tester la compilation après des changements majeurs
- Garder les fichiers de configuration de version (`*.spec`)
- Documenter les dépendances dans `requirements.txt`
- Utiliser les chemins relatifs pour les ressources

## Dépannage

Consultez `docs/BUILD.md` pour :
- Les problèmes courants
- La configuration de l'environnement
- Les dépendances requises

## Règles simples
- Tout le code dans `main.py`
- Configuration de compilation dans `build/build.spec`
- Pas de fichiers inutiles
- Documentation dans `README.md` et `ARCHITECTURE.md`
- Fichiers générés dans `build/` et `dist/`

## Compilation

```bash
# Nettoyer
rm -rf build/ dist/

# Compiler
pyinstaller --clean build/build.spec
```

## Fichiers à ignorer

Assurez-vous que votre `.gitignore` contient au minimum :

```
# Dossiers de build
/build/
/dist/
*.spec
__pycache__/
*.py[cod]
*$py.class

# Fichiers de configuration locaux
.env
.venv
venv/

# Fichiers système
.DS_Store
Thumbs.db
```

## Bonnes pratiques

1. **Ne jamais** commiter de fichiers compilés
2. **Toujours** utiliser des chemins relatifs dans le code
3. **Documenter** toute modification de la structure
4. **Utiliser** des variables d'environnement pour les configurations sensibles
