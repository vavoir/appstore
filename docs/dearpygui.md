# Guide de Démarrage avec Dear PyGui

## Table des Matières
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Concepts de Base](#concepts-de-base)
4. [Structure d'une Application](#structure-dune-application)
5. [Widgets Courants](#widgets-courants)
6. [Gestion des Événements](#gestion-des-événements)
7. [Bonnes Pratiques](#bonnes-pratiques)
8. [Ressources Utiles](#ressources-utiles)

## Introduction

Dear PyGui est une bibliothèque graphique rapide et puissante pour Python, conçue pour créer des interfaces utilisateur modernes et réactives. Elle est idéale pour les applications de visualisation de données, les tableaux de bord et les outils internes.

## Installation

```bash
pip install dearpygui
```

## Concepts de Base

### Contexte
Toute application Dear PyGui nécessite un contexte :
```python
import dearpygui.dearpygui as dpg

dpg.create_context()
# Votre code ici
dpg.destroy_context()
```

### Boucle Principale
La boucle principale gère le rendu et les événements :
```python
dpg.create_viewport(title='Mon App', width=800, height=600)
dpg.setup_dearpygui()
dpg.show_viewport()
dpg.start_dearpygui()
dpg.destroy_context()
```

## Structure d'une Application

### Fenêtre Principale
```python
with dpg.window(label="Ma Fenêtre", width=400, height=300):
    dpg.add_text("Bonjour, monde!")
    dpg.add_button(label="Cliquez-moi")
```

### Hiérarchie des Éléments
- `dpg` : Contexte principal
  - Fenêtres (`dpg.window`)
    - Widgets (boutons, textes, etc.)

## Widgets Courants

### Bouton
```python
def bouton_clique():
    print("Bouton cliqué!")

dpg.add_button(label="Cliquer", callback=bouton_clique)
```

### Champs de Saisie
```python
def saisie_modifiee(sender, app_data):
    print(f"Nouvelle valeur: {app_data}")

dpg.add_input_text(label="Entrez du texte", callback=saisie_modifiee)
```

### Slider
```python
def slider_bouge(sender, app_data):
    print(f"Valeur du slider: {app_data}")

dpg.add_slider_float(label="Glissière", default_value=0.5, min_value=0, max_value=1, callback=slider_bouge)
```

## Gestion des Événements

### Callbacks
Les fonctions de rappel sont au cœur de l'interactivité :
```python
def on_click(sender, app_data, user_data):
    print(f"Élément cliqué: {sender}")
    print(f"Données: {app_data}")
    print(f"Données utilisateur: {user_data}")

with dpg.window() as main_window:
    dpg.add_button(
        label="Bouton avec données",
        callback=on_click,
        user_data={"id": 42, "nom": "test"}
    )
```

### Boucle d'Événements Personnalisée
Pour une gestion avancée :
```python
while dpg.is_dearpygui_running():
    # Logique personnalisée ici
    dpg.render_dearpygui_frame()
```

## Bonnes Pratiques

### Organisation du Code
- Utilisez des fonctions pour regrouper la logique
- Séparez l'interface utilisateur de la logique métier
- Utilisez des constantes pour les chaînes de caractères réutilisables

### Performances
- Évitez de recréer les éléments d'interface dans les callbacks
- Utilisez `defer_call` pour les mises à jour coûteuses
- Activez le mode `no_title_bar` pour les fenêtres modales

### Thèmes et Style
```python
with dpg.theme() as theme_id:
    with dpg.theme_component(dpg.mvAll):
        dpg.add_theme_color(dpg.mvThemeCol_Button, (0, 150, 200))
        dpg.add_theme_style(dpg.mvStyleVar_FrameRounding, 5)

dpg.bind_item_theme("Bouton Style", theme_id)
```

## Ressources Utiles

### Documentation Officielle
- [Documentation Dear PyGui](https://dearpygui.readthedocs.io/)
- [Exemples GitHub](https://github.com/hoffstadt/DearPyGui/tree/master/Examples)

### Communauté
- [GitHub Discussions](https://github.com/hoffstadt/DearPyGui/discussions)
- [Discord Officiel](https://discord.gg/tyE7Gu4)

### Extensions
- [DearPyGui-Extensions](https://github.com/hoffstadt/DearPyGui_Ext) - Widgets supplémentaires
- [DearPyGui-Addons](https://github.com/Pcothren/DearPyGui-Addons) - Fonctionnalités avancées

## Exemple Complet

```python
import dearpygui.dearpygui as dpg

def sauvegarder_callback():
    print("Données sauvegardées!")

dpg.create_context()

def creer_fenetre_principale():
    with dpg.window(label="Mon Application", width=600, height=400):
        dpg.add_text("Bienvenue dans mon application")
        dpg.add_separator()
        dpg.add_text("Entrez votre nom:")
        dpg.add_input_text(tag="nom_utilisateur")
        dpg.add_button(label="Sauvegarder", callback=sauvegarder_callback)

dpg.create_viewport(title='Mon App', width=800, height=600)
dpg.setup_dearpygui()
creer_fenetre_principale()
dpg.show_viewport()
dpg.start_dearpygui()
dpg.destroy_context()
```

# Fonctionnalités Avancées

## Gestion des Données

### Stockage de Données
```python
# Stocker des données avec set_value/get_value
dpg.set_value("ma_variable", 42)
valeur = dpg.get_value("ma_variable")

# Utiliser des données utilisateur dans les callbacks
dpg.add_button(label="Action", user_data={"id": 1}, callback=mon_callback)
```

### Système de Cache
```python
# Ajouter au cache
dpg.add_to_container_stack("groupe_cache", dpg.add_text("Élément caché"))

# Afficher/Masquer
container = dpg.get_item_children("groupe_cache")[1][0]
dpg.configure_item(container, show=False)  # Masquer
dpg.configure_item(container, show=True)   # Afficher
```

## Personnalisation Avancée

### Thèmes Personnalisés
```python
with dpg.theme() as theme_id:
    with dpg.theme_component(dpg.mvAll):
        # Couleurs
        dpg.add_theme_color(dpg.mvThemeCol_Button, (0, 150, 200))
        dpg.add_theme_color(dpg.mvThemeCol_ButtonHovered, (0, 170, 220))
        
        # Styles
        dpg.add_theme_style(dpg.mvStyleVar_FrameRounding, 5)
        dpg.add_theme_style(dpg.mvStyleVar_FramePadding, 10, 5)

# Appliquer le thème
dpg.bind_theme(theme_id)
```

### Fenêtres Modales
```python
with dpg.window(label="Fenêtre Modale", modal=True, show=False, id="modal_id") as modal_id:
    dpg.add_text("Ceci est une fenêtre modale")
    dpg.add_button(label="Fermer", callback=lambda: dpg.configure_item(modal_id, show=False))

# Pour afficher la modale
dpg.configure_item("modal_id", show=True)
```

## Performances

### Mise à Jour des Données
```python
# Mise à jour efficace des widgets
dpg.set_value("mon_texte", "Nouvelle valeur")
dpg.set_item_label("mon_bouton", "Nouveau Texte")

# Mise à jour par lot
dpg.push_container_stack(dpg.get_item_parent("groupe"))
try:
    # Mises à jour multiples
    dpg.configure_item("element1", width=100)
    dpg.configure_item("element2", height=200)
finally:
    dpg.pop_container_stack()
```

### Chargement Paresseux
```python
def charger_donnees():
    # Simulation de chargement
    import time
    time.sleep(2)
    return ["Donnée " + str(i) for i in range(1000)]

with dpg.window(label="Chargement Paresseux"):
    dpg.add_loading_indicator(id="chargement")
    dpg.add_listbox(id="liste_donnees", num_items=10, show=False)

    def charger_et_afficher():
        donnees = charger_donnees()
        dpg.configure_item("liste_donnees", items=donnees, show=True)
        dpg.hide_item("chargement")
    
    dpg.add_button(label="Charger les données", callback=charger_et_afficher)
```

## Graphiques et Visualisation

### Graphiques Interactifs
```python
with dpg.window(label="Graphique"):
    # Créer un graphique
    with dpg.plot(label="Graphique Simple", height=300, width=500):
        dpg.add_plot_legend()
        dpg.add_plot_axis(dpg.mvXAxis, label="X")
        y_axis = dpg.add_plot_axis(dpg.mvYAxis, label="Y")
        
        # Ajouter des séries de données
        x_data = [i for i in range(10)]
        y_data = [i**2 for i in x_data]
        dpg.add_line_series(x_data, y_data, label="Courbe", parent=y_axis)
```

## Gestion des Fichiers

### Dialogue de Fichier
```python
def callback_import(sender, app_data):
    print("Fichier sélectionné:", app_data['file_path_name'])
    print("Répertoire courant:", app_data['current_path'])
    print("Nom du fichier:", app_data['file_name'])
    print("Extension:", app_data['file_extension'])

dpg.add_file_dialog(
    directory_selector=False,
    show=False,
    callback=callback_import,
    id="file_dialog_id",
    width=700,
    height=400
)

dpg.add_button(
    label="Ouvrir un fichier",
    callback=lambda: dpg.show_item("file_dialog_id")
)
```

## Internationalisation

### Système de Traduction
```python
TRADUCTIONS = {
    "fr": {
        "welcome": "Bienvenue",
        "save": "Enregistrer",
        "cancel": "Annuler"
    },
    "en": {
        "welcome": "Welcome",
        "save": "Save",
        "cancel": "Cancel"
    }
}

current_lang = "fr"

def set_language(lang):
    global current_lang
    current_lang = lang
    update_ui()

def tr(key):
    return TRADUCTIONS[current_lang].get(key, key)

def update_ui():
    dpg.set_item_label("welcome_text", tr("welcome"))
    dpg.set_item_label("save_btn", tr("save"))
    dpg.set_item_label("cancel_btn", tr("cancel"))

# Interface utilisateur
with dpg.window():
    dpg.add_text("welcome", tag="welcome_text")
    dpg.add_button(label="save", tag="save_btn")
    dpg.add_button(label="cancel", tag="cancel_btn")
    
    # Sélecteur de langue
    dpg.add_combo(["Français", "English"], 
                 default_value="Français",
                 callback=lambda s, a: set_language("fr" if a == 0 else "en"))
```

## Tests et Débogage

### Journalisation
```python
# Configuration du système de logs
with dpg.handler_registry():
    dpg.add_logger()

dpg.log("Message d'information")
dpg.log_warning("Attention !")
dpg.log_error("Erreur critique !")

# Afficher la fenêtre de logs
dpg.show_logger()
```

### Inspection des Widgets
```python
def inspect_widget(sender, app_data, user_data):
    widget_id = user_data
    print(f"Type: {dpg.get_item_type(widget_id)}")
    print(f"Enfants: {dpg.get_item_children(widget_id)}")
    print(f"Configuration: {dpg.get_item_configuration(widget_id)}")

# Ajouter un bouton d'inspection
dpg.add_button("Inspecter", callback=inspect_widget, user_data="widget_a_inspecter")
```

## Bonnes Pratiques Avancées

1. **Architecture Modulaire**
   - Séparez votre interface en composants réutilisables
   - Utilisez des fichiers séparés pour les différentes parties de l'interface

2. **Gestion d'État**
   - Centralisez la gestion de l'état de l'application
   - Utilisez le pattern Observer pour les mises à jour d'interface

3. **Performance**
   - Évitez les mises à jour fréquentes de l'interface
   - Utilisez `defer_call` pour les opérations coûteuses
   - Limitez le nombre de widgets visibles (pagination, chargement paresseux)

4. **Accessibilité**
   - Utilisez des labels clairs et descriptifs
   - Ajoutez des raccourcis clavier pour les actions courantes
   - Assurez-vous que l'interface est utilisable au clavier

## Exemple d'Application Complète

```python
import dearpygui.dearpygui as dpg

class MonApplication:
    def __init__(self):
        self.setup_ui()
        
    def setup_ui(self):
        dpg.create_context()
        
        with dpg.window(label="Application Complète", tag="main_window"):
            # Barre de menu
            with dpg.menu_bar():
                with dpg.menu(label="Fichier"):
                    dpg.add_menu_item(label="Ouvrir", callback=self.ouvrir_fichier)
                    dpg.add_menu_item(label="Enregistrer", callback=self.enregistrer)
                    dpg.add_separator()
                    dpg.add_menu_item(label="Quitter", callback=lambda: dpg.stop_dearpygui())
                
                with dpg.menu(label="Aide"):
                    dpg.add_menu_item(label="À propos", callback=self.afficher_a_propos)
            
            # Contenu principal
            with dpg.tab_bar() as tab_bar:
                with dpg.tab(label="Tableau de Bord"):
                    self.setup_onglet_tableau_bord()
                
                with dpg.tab(label="Paramètres"):
                    self.setup_onglet_parametres()
        
        # Configuration de la fenêtre principale
        dpg.create_viewport(title='Mon Application', width=1024, height=768)
        dpg.setup_dearpygui()
        dpg.show_viewport()
        dpg.set_primary_window("main_window", True)
        
    def setup_onglet_tableau_bord(self):
        # Exemple de contenu pour l'onglet Tableau de Bord
        with dpg.group(horizontal=True):
            dpg.add_text("Bienvenue dans l'application")
            dpg.add_button(label="Actualiser", callback=self.actualiser_donnees)
        
        # Graphique exemple
        with dpg.plot(label="Données en temps réel", height=300):
            dpg.add_plot_legend()
            dpg.add_plot_axis(dpg.mvXAxis, label="Temps")
            y_axis = dpg.add_plot_axis(dpg.mvYAxis, label="Valeurs")
            dpg.add_line_series([], [], label="Données", parent=y_axis, tag="donnees_series")
    
    def setup_onglet_parametres(self):
        # Exemple de contenu pour l'onglet Paramètres
        with dpg.group():
            dpg.add_text("Préférences")
            dpg.add_checkbox(label="Mode sombre", callback=self.basculer_mode_sombre)
            dpg.add_slider_float("Taille de police", min_value=10, max_value=24, default_value=13, 
                               callback=self.changer_taille_police)
    
    # Méthodes de gestion des événements
    def ouvrir_fichier(self):
        dpg.show_item("file_dialog_id")
    
    def enregistrer(self):
        print("Enregistrement des données...")
    
    def afficher_a_propos(self):
        with dpg.window(label="À propos", modal=True, show=True):
            dpg.add_text("Mon Application v1.0")
            dpg.add_text("© 2025 Tous droits réservés")
            dpg.add_button(label="Fermer", callback=lambda: dpg.delete_item(dpg.last_container()))
    
    def actualiser_donnees(self):
        # Simulation de mise à jour des données
        import random
        x_data = list(range(10))
        y_data = [random.randint(0, 100) for _ in x_data]
        dpg.set_value("donnees_series", [x_data, y_data])
    
    def basculer_mode_sombre(self, sender, app_data):
        if app_data:
            dpg.bind_theme(self.theme_sombre)
        else:
            dpg.bind_theme(self.theme_clair)
    
    def changer_taille_police(self, sender, app_data):
        # Implémentation de la modification de la taille de police
        pass

    def run(self):
        dpg.start_dearpygui()
        dpg.destroy_context()

if __name__ == "__main__":
    app = MonApplication()
    app.run()
```

Ce guide couvre désormais les fonctionnalités avancées de Dear PyGui. N'hésitez pas à l'utiliser comme référence pour vos développements !
