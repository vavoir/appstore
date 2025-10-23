import dearpygui.dearpygui as dpg

# Création du contexte de l'application
dpg.create_context()


def close_application():
    """Ferme l'application"""
    dpg.stop_dearpygui()


# Création de la fenêtre principale
with dpg.window(label="Mon Application", width=400, height=200):
    # Titre centré
    dpg.add_spacer(height=40)  # Espacement du haut

    # Texte Hello World centré
    dpg.add_text("Hello World !", pos=(150, 60))

    # Bouton Fermer centré
    dpg.add_button(
        label="Fermer",
        width=100,
        height=30,
        pos=(150, 100),
        callback=close_application
    )

# Configuration de la fenêtre principale
dpg.create_viewport(
    title='Mon Application',
    width=400,
    height=200,
    resizable=False
)

dpg.setup_dearpygui()
dpg.show_viewport()
dpg.start_dearpygui()
dpg.destroy_context()
