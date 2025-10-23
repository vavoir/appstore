# Cahier des Charges - App Store de Jeux Python

## 1. Présentation du Projet
Application desktop multi-plateforme (Windows, Linux, Mac) permettant de gérer une collection personnelle de jeux Python.

## 2. Objectifs
- Centraliser l'accès aux jeux développés en interne
- Fournir une interface utilisateur simple et élégante
- Gérer l'installation, la mise à jour et le lancement des jeux
- Fonctionner hors ligne avec synchronisation automatique

## 3. Spécifications Techniques

### 3.1 Environnement Technique
- **Langage** : Python 3.9+
- **UI** : dearpygui
- **Gestion de version** : Git
- **Stockage** : Fichiers locaux
- **Internationalisation** : Français (par défaut), Anglais

### 3.2 Architecture
- **Environnement unique** : Un seul environnement virtuel Python pour tous les jeux
- **Dossiers clés** :
  - `/app/[nom_du_jeu]` : Installation des jeux
  - `/assets/[nom_du_jeu]/` : Médias des jeux
  - `/logs/` : Fichiers de log
  - `/config.json` : Configuration utilisateur

## 4. Fonctionnalités

### 4.1 Gestion des Jeux
- Installation depuis dépôt Git
- Désinstallation
- Mise à jour automatique
- Lancement des jeux

### 4.2 Interface Utilisateur
#### Écran Principal
- Grille 3x2 des jeux disponibles (tuiles de 50x50px avec bords arrondis)
- Pagination (indicateurs par points)
- Indicateur de connexion (couleur : gris=sans connexion, orange=problème, vert=OK)

#### Fiche Jeu
- Titre
- Bouton Installation/Désinstallation
- Bouton Lancer (si installé)
- Carrousel d'images (rotation toutes les 6 secondes)
- Description
- Bouton Retour

### 4.3 Gestion des Téléchargements
- Téléchargement en arrière-plan
- Reprise sur erreur
- Indicateur de progression

### 4.4 Gestion des Erreurs
- Logs détaillés dans `/logs/` (fichiers .log)
- Notifications utilisateur claires

## 5. Module de Développement
- Interface séparée pour les tests
- Simulation de dépôt Git local
- Simulation de problèmes réseau
- Mode hors ligne

## 6. Sécurité
- Vérification d'intégrité via Git
- Pas de gestion d'utilisateurs (pour l'instant)

## 7. Performance
- Interface réactive (pas de gel de l'UI)
- Téléchargements non-bloquants
- Gestion efficace de la mémoire

## 8. Livrables
- Exécutables pour Windows, Linux, Mac
- Documentation utilisateur
- Documentation technique
- Scripts d'installation

## 9. Planning
1. Configuration initiale et structure du projet
2. Développement de l'interface utilisateur
3. Implémentation du module Git local
4. Gestion des téléchargements et installations
5. Internationalisation
6. Tests et optimisation
7. Documentation
8. Déploiement

## 10. Évolutions Futures
- Système de comptes utilisateurs
- Chat intégré
- Gestion des sauvegardes de jeux
- Thèmes personnalisables
