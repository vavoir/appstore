// Application Vue.js modulaire - App Store de Jeux

// Import Vue.js et composants
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { App, Grille, Chat } from './components.js';

// Créer l'application Vue avec les composants
const app = createApp(App);
app.component('Grille', Grille);
app.component('Chat', Chat);
app.mount('#app');

console.log('✅ Application Vue.js modulaire initialisée');
