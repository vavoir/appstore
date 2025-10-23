# Guide de Compilation

Ce document décrit les attentes et les procédures pour la compilation de l'application.

## Objectifs de Compilation

1. **Portabilité** : Créer des exécutables autonomes ne nécessitant pas d'installation
2. **Propreté** : Garder le répertoire racine propre
3. **Simplicité** : Processus de compilation simple et reproductible
4. **Multiplateforme** : Support pour au moins Windows et Linux

## Outils Recommandés

### PyInstaller
- **Version** : >= 6.0.0
- **Utilisation** : Pour créer des exécutables autonomes
- **Avantages** :
  - Simple à utiliser
  - Bon support de Dear PyGui
  - Multiplateforme
  - Peut créer des exécables sans console

### Wine (pour compilation croisée)
- **Utilisation** : Pour compiler pour Windows depuis Linux
- **Configuration** : Préfixe dédié `~/.wine-pyinstaller`
- **Version Python** : 3.9.x recommandée pour la meilleure compatibilité

## Structure des Dossiers

```
build/
├── build/              # Dossier temporaire de compilation
├── export/             # Dossier final pour les exécutables compilés
│   ├── linux/          # Version Linux
│   └── windows/        # Version Windows
│   └── MAC/            # Version MAC
├── windows/            # Fichiers spécifiques Windows
│   └── icon.ico        # Icône de l'application
├── build.spec          # Configuration Linux
└── windows.spec        # Configuration Windows
```

## Emplacement des Fichiers Compilés

Tous les fichiers compilés sont exportés dans le dossier `build/export/` :
- `build/export/linux/` : Version Linux
- `build/export/windows/` : Version Windows

## Configuration de l'environnement de compilation Windows (Wine)

### Prérequis
- Wine installé sur votre système Linux
- Connexion Internet pour le téléchargement des paquets

### Configuration de l'environnement Wine

1. **Nettoyer l'environnement existant (si nécessaire)** :
   ```bash
   rm -rf ~/.wine-pyinstaller
   ```

2. **Configurer Wine en 32 bits** :
   ```bash
   export WINEARCH=win32
   export WINEPREFIX=~/.wine-pyinstaller
   winecfg  # Laisser la configuration par défaut
   ```

3. **Installer Python 3.9 pour Windows** :
   ```bash
   wget https://www.python.org/ftp/python/3.9.0/python-3.9.0.exe -O /tmp/python-3.9.0.exe
   wine /tmp/python-3.9.0.exe /quiet InstallAllUsers=1 PrependPath=1
   ```

4. **Installer les dépendances nécessaires** :
   ```bash
   # Mettre à jour pip
   wine python -m pip install --upgrade pip
   
   # Installer PyInstaller
   wine pip install pyinstaller
   
   # Installer Dear PyGui
   wine pip install dearpygui
   ```

5. **Vérifier l'installation** :
   ```bash
   wine python -c "import dearpygui; print('Dear PyGui version:', dearpygui.get_dearpygui_version())"
   ```

## Procédure de Compilation

### Pour Linux
```bash
# Se placer à la racine du projet
cd /chemin/vers/votre/projet

# Nettoyage
rm -rf build/export/linux/ build/build/ build/dist/
mkdir -p build/export/linux/

# Installation des dépendances (si nécessaire)
pip install -r requirements.txt

# Compilation
pyinstaller --clean build/build.spec

# Vérification
if [ -f "dist/MonAppPortable" ]; then
    cp -r dist/* build/export/linux/
    echo "✅ Compilation réussie !"
    echo "📁 Dossier d'export : build/export/linux/"
else
    echo "❌ La compilation a échoué"
    exit 1
fi
```

### Pour Windows (depuis Linux avec Wine)
Le script `compile_windows.sh` gère automatiquement tout le processus :

```bash
# Se placer à la racine du projet
cd /chemin/vers/votre/projet

# Rendre le script exécutable (si nécessaire)
chmod +x build/compile_windows.sh

# Lancer la compilation
./build/compile_windows.sh
```

Le script effectue les étapes suivantes :
1. Vérifie les prérequis (Wine, Python)
2. Nettoie les anciennes compilations
3. Installe les dépendances dans l'environnement Wine
4. Compile l'application avec PyInstaller
5. Copie les fichiers dans `build/export/windows/`
6. Crée une archive ZIP dans le dossier racine

### Structure des dossiers après compilation

```
build/export/
├── linux/
│   └── MonAppPortable     # Exécutable Linux
└── windows/
    ├── MonAppPortable.exe  # Exécutable Windows
    └── ...                # Fichiers de dépendances
```

## Dépannage

### Problèmes courants sous Windows

1. **Erreur de DLL manquante** :
   - Vérifiez que toutes les dépendances sont installées dans Wine
   - Essayez d'installer les redistribuables Visual C++ :
     ```
     WINEPREFIX=~/.wine-pyinstaller winetricks vcrun2019
     ```

2. **L'application ne démarre pas** :
   - Vérifiez les logs dans la console
   - Essayez avec `console=True` dans le fichier `.spec` pour voir les erreurs

3. **Erreur de thème** :
   ```
   WINEPREFIX=~/.wine-pyinstaller winetricks settings fontsmooth=rgb
   ```

## Bonnes Pratiques

1. **Versionnage** :
   - Ne pas versionner les dossiers `build/` et `dist/`
   - Versionner les fichiers `.spec`

2. **Nettoyage** :
   - Toujours nettoyer avant une nouvelle compilation
   - Utiliser `--clean` avec PyInstaller
   - **Vider le dossier d'export** avant chaque compilation pour éviter les fichiers obsolètes :
     ```bash
     rm -rf build/export/linux/* build/export/windows/*
     ```

3. **Dépendances** :
   - Maintenir un fichier `requirements.txt` à jour
   - Tester avec des environnements propres

## Dépannage

### Problèmes Courants
- **Fichiers manquants** : Vérifier les chemins dans les fichiers `.spec`
- **Taille de l'exécutable** : Utiliser UPX pour réduire la taille
- **Erreurs d'import** : Vérifier les `hidden_imports` dans le `.spec`

### Logs
Les logs de compilation sont disponibles dans :
- `build/export/warn-*.txt`
- `build/export/*.toc`

## Personnalisation

### Dossier d'Export
- Tous les fichiers compilés sont automatiquement placés dans `build/export/`
- Les dossiers sont organisés par système d'exploitation
- Les fichiers temporaires restent dans `build/build/`

### Icônes
- Placer les icônes dans `build/windows/`
- Mettre à jour le chemin dans le fichier `.spec`

### Configuration Spécifique
- Modifier les fichiers `.spec` pour des besoins particuliers
- Pour Dear PyGui, assurez-vous d'inclure les hooks nécessaires :
  ```python
  # Dans votre fichier .spec
  hiddenimports=['dearpygui']
  ```
- Si vous rencontrez des erreurs de dépendances manquantes, créez un fichier hook personnalisé dans `build/dearpygui_hook.py`

### Dépannage des erreurs courantes

#### Erreur de dépendances manquantes
Si l'application ne se lance pas avec une erreur concernant des modules manquants :
1. Vérifiez le fichier `warn-AppStore.txt` dans le dossier de build
2. Ajoutez les modules manquants avec `--hidden-import`

#### Problèmes avec les ressources
Si des ressources (icônes, images) ne sont pas trouvées :
- Vérifiez les chemins absolus dans le code
- Utilisez `os.path.join()` pour les chemins multiplateforme
- Ajoutez les fichiers manquants avec `--add-data` dans PyInstaller
- Documenter les modifications dans ce fichier
