# Feuille de Route - App Store de Jeux Python

> **Méthodologie** : Test-Driven Development (TDD)
> **Objectif** : Développement itératif avec validation continue

## Phase 0 - Mise en place de l'environnement

### Structure initiale
- [ ] Initialiser le dépôt Git avec `.gitignore` pour Python
- [ ] Créer la structure de base des dossiers :
  ```
  Appstore/
  ├── app/                # Code source principal
  │   ├── assets/         # Toutes les ressources (UI + jeux)
  │   ├── core/           # Logique métier
  │   ├── ui/             # Interface utilisateur
  │   └── utils/          # Utilitaires
  ├── games/              # Dossiers pour chaque jeu
  ├── logs/               # Fichiers de log
  └── tests/              # Tests unitaires
  ```

### Configuration de base
- [ ] Mettre en place l'environnement virtuel Python 3.9+
- [ ] Installer les dépendances de base :
  - `dearpygui` pour l'interface
  - `pytest` pour les tests
  - `black` et `isort` pour le formatage
  - `gitpython` pour la gestion des dépôts
- [ ] Créer `requirements.txt`

### Configuration minimale
- [ ] Fichier `config.json` de base :
  ```json
  {
    "language": "fr",
    "auto_update": true,
    "repo_url": "URL_DU_DEPOT_DES_JEUX"
  }
  ```

### Documentation initiale
- [ ] Rédiger le README.md de base
- [ ] Documenter la structure du projet

## Phase 1 - Développement du noyau (Core)

### 1.1 Gestion de la configuration
- [ ] Chargement/Écriture de `config.json`
- [ ] Valeurs par défaut pour les paramètres manquants
- [ ] Gestion des chemins multi-plateforme
- [ ] Détection et réinitialisation si corruption du fichier

### 1.2 Système de logging
- [ ] Configuration des niveaux de log (DEBUG, INFO, WARNING, ERROR)
- [ ] Fichiers dans `./logs/` avec format : `%Y-%m-%d_%H-%M-%S.log`
- [ ] Formatage avec horodatage et contexte (module/classe/fonction)
- [ ] Pas de rotation ni de limite de taille
- [ ] Niveau de détail élevé pour le débogage

### 1.3 Gestion des dépôts Git (TDD)
- [ ] Tests : Vérifier le clonage d'un dépôt de test
- [ ] Implémentation : Clonage des dépôts de jeux
- [ ] Tests : Vérifier la mise à jour d'un dépôt existant
- [ ] Implémentation : Mise à jour des dépôts existants
- [ ] Auto-mise à jour de l'App Store via Git
- [ ] Gestion des erreurs :
  - Messages utilisateurs clairs (pop-up) en cas d'échec réseau
  - Détails complets dans les logs

### 1.4 Gestion des dépendances (TDD)
- [ ] Tests : Vérifier la lecture d'un `requirements.txt`
- [ ] Implémentation : Lecture des `requirements.txt` des jeux
- [ ] Tests : Vérifier l'installation des dépendances
- [ ] Implémentation : Installation dans l'environnement virtuel global unique
- [ ] Gestion des conflits : priorité aux versions les plus récentes
- [ ] Vérification des dépendances manquantes

## Propriété Intellectuelle
- [ ] Ajouter un fichier LICENSE précisant que :
  - Le code source est la propriété exclusive de l'auteur
  - Toute modification ou distribution est strictement interdite
  - L'utilisation est limitée à l'exécution du logiciel tel que fourni

## Phase 2 - Interface Utilisateur (UI/UX)

### 2.1 Structure de base
- [ ] Fenêtre principale (min 500x300px)
- [ ] Barre de menu (Fichier, Aide)
- [ ] Zone de contenu principale
- [ ] Version en bas à droite
- [ ] Navigation simple sans onglets

### 2.2 Écran principal
- [ ] Grille 3x2 des jeux
- [ ] Tuiles cliquables avec :
  - Icône
  - Titre
  - Version
  - État (installé/mise à jour)
- [ ] Effet de survol simple

### 2.3 Fiche détaillée
- [ ] Bouton "Retour" en haut à gauche
- [ ] Titre du jeu
- [ ] Bouton principal (Installer/Mettre à jour)
- [ ] Images du jeu
- [ ] Description
- [ ] Boutons secondaires (Désinstaller, Lancer)

## Phase 3 - Gestion des jeux

### 3.1 Installation
- [ ] Téléchargement du dépôt Git
- [ ] Création du dossier du jeu
- [ ] Installation des dépendances
- [ ] Vérification de l'installation

### 3.2 Mise à jour
- [ ] Vérification des mises à jour
- [ ] Téléchargement des mises à jour
- [ ] Mise à jour des dépendances
- [ ] Vérification de la version

### 3.3 Désinstallation
- [ ] Suppression du dossier du jeu
- [ ] Nettoyage des dépendances inutilisées
- [ ] Mise à jour de la liste des jeux

### 3.4 Lancement
- [ ] Vérification des dépendances
- [ ] Exécution du jeu
- [ ] Gestion des erreurs de lancement

## Phase 4 - Module de test

### 4.1 Environnement de test
- [ ] Configuration d'un environnement de test isolé
- [ ] Jeux de test factices
- [ ] Données de test (fichiers de configuration, images, etc.)

### 4.2 Tests unitaires
- [ ] Tests pour le chargement de configuration
- [ ] Tests pour la gestion des dépôts Git
- [ ] Tests pour l'installation/désinstallation
- [ ] Tests pour la détection des mises à jour

### 4.3 Tests d'intégration
- [ ] Test complet du cycle d'installation
- [ ] Test de mise à jour d'un jeu
- [ ] Test de lancement de jeu
- [ ] Test de gestion des erreurs

### 4.4 Outils de débogage
- [ ] Mode verbose pour le logging
- [ ] Affichage des chemins complets
- [ ] État des dépendances
- [ ] Vérification de l'intégrité des fichiers

## Phase 5 - Optimisation et tests

### 5.1 Tests multi-plateformes
- [ ] Tests sur Linux (Ubuntu/Debian)
- [ ] Tests sur Windows 10/11
- [ ] Tests sur macOS
- [ ] Vérification des chemins et séparateurs

### 5.2 Optimisation des performances
- [ ] Analyse du temps de démarrage
- [ ] Optimisation du chargement des images
- [ ] Gestion de la mémoire
- [ ] Cache des métadonnées des jeux

### 5.3 Gestion des erreurs
- [ ] Messages d'erreur clairs et concis
- [ ] Journalisation des erreurs critiques
- [ ] Gestion des échecs réseau avec réessai automatique
- [ ] Affichage des erreurs dans l'interface utilisateur

### 5.4 Tests de charge
- [ ] Nombre élevé de jeux
- [ ] Gestion des gros fichiers
- [ ] Performances réseau
- [ ] Utilisation CPU/mémoire

## Phase 6 - Finalisation

### 6.1 Internationalisation
- [ ] Traduction en français
- [ ] Traduction en anglais
- [ ] Sélecteur de langue
- [ ] Tests linguistiques

### 6.2 Documentation utilisateur
- [ ] Guide d'installation
- [ ] Guide d'utilisation
- [ ] FAQ
- [ ] Captures d'écran

### 6.3 Documentation technique
- [ ] Architecture du projet
- [ ] Guide de développement
- [ ] Procédure de build
- [ ] Dépannage avancé

### 6.4 Préparation du déploiement
> *Note : La configuration des builds sera ajoutée plus tard, lors de la préparation de la version de production*
- [ ] Scripts de build automatisés
- [ ] Vérification des dépendances incluses
- [ ] Notes de version et changelog
- [ ] Documentation d'installation

## Bonnes pratiques TDD
- Écrire d'abord les tests
- Implémenter le code pour faire passer les tests
- Refactoriser si nécessaire
- S'assurer que tous les tests passent après chaque modification

## Métriques de Suivi
- Couverture de code
- Taux de réussite des tests
- Performance de l'application
- Qualité du code (linters, analyse statique)

---
*Dernière mise à jour : 23/10/2025*
