const { contextBridge, ipcRenderer } = require('electron');

// Exposition d'APIs sécurisées au processus renderer
contextBridge.exposeInMainWorld('electronAPI', {
    // API de base pour les tests
    getPlatform: () => ipcRenderer.invoke('get-platform'),
    showNotification: (message) => ipcRenderer.invoke('show-notification', message),

    // API de sélection de fichiers
    selectDirectory: () => ipcRenderer.invoke('select-directory')
});
