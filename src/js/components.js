// Composants Vue.js modulaires - App Store de Jeux

// Composant principal App
export const App = {
    template: `
        <div class="app">
            <Grille
                v-if="currentView === 'grille'"
                @show-chat="showChat"
            />
            <Chat
                v-if="currentView === 'chat'"
                @close-chat="closeChat"
            />
        </div>
    `,

    data() {
        return {
            currentView: 'grille'
        }
    },

    methods: {
        showChat() {
            this.currentView = 'chat';
        },
        closeChat() {
            this.currentView = 'grille';
        }
    },

    mounted() {
        console.log('🚀 App Vue.js initialisée');
    }
};

// Composant Grille
export const Grille = {
    template: `
        <div class="grille">
            <div class="game-container">
                <div class="game-grid">
                    <div
                        v-for="game in currentGames"
                        :key="game.id"
                        class="game-tile"
                        @click="handleTileClick(game.id)"
                    >
                        {{ game.number }}
                    </div>
                </div>

                <div class="pagination">
                    <div
                        v-for="page in totalPages"
                        :key="page"
                        class="page-dot"
                        :class="{ 'active': page === currentPage }"
                        @click="goToPage(page)"
                    ></div>
                </div>
            </div>
        </div>
    `,

    emits: ['show-chat'],

    data() {
        return {
            currentPage: 1,
            totalPages: 3,
            gamesPerPage: 8,
            allGames: []
        }
    },

    computed: {
        currentGames() {
            const startIndex = (this.currentPage - 1) * this.gamesPerPage;
            const endIndex = startIndex + this.gamesPerPage;
            return this.allGames.slice(startIndex, endIndex);
        }
    },

    methods: {
        // ⚠️ IMPORTANT : Garder les transitions de glissement entre les pages
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                const direction = page > this.currentPage ? 'right' : 'left';
                this.createTransitionGrid(page, direction);
                this.currentPage = page;
                console.log('Page changée vers:', page);
            }
        },

        createTransitionGrid(targetPage, direction) {
            const container = document.querySelector('.game-container');
            const currentGrid = document.querySelector('.game-grid');
            const pagination = document.querySelector('.pagination');

            const newGrid = document.createElement('div');
            newGrid.className = 'game-grid';
            newGrid.style.position = 'absolute';
            newGrid.style.top = '0';
            newGrid.style.left = '0';
            newGrid.style.width = '100%';
            newGrid.style.height = '320px';
            newGrid.style.zIndex = '2';

            if (direction === 'right') {
                newGrid.style.transform = 'translateX(100%)';
            } else {
                newGrid.style.transform = 'translateX(-100%)';
            }

            const startIndex = (targetPage - 1) * this.gamesPerPage;
            const endIndex = startIndex + this.gamesPerPage;
            const newGames = this.allGames.slice(startIndex, endIndex);

            newGames.forEach(game => {
                const tile = document.createElement('div');
                tile.className = 'game-tile';
                tile.textContent = game.number;

                tile.addEventListener('click', () => {
                    this.handleTileClick(game.id);
                });

                newGrid.appendChild(tile);
            });

            container.appendChild(newGrid);

            // Remettre la pagination à la fin pour qu'elle soit au-dessus de tout
            container.appendChild(pagination);

            setTimeout(() => {
                currentGrid.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
                currentGrid.style.opacity = '0.7';
                currentGrid.style.zIndex = '1';
                newGrid.style.transform = 'translateX(0)';
                newGrid.style.opacity = '1';
                newGrid.style.zIndex = '1';  // Même niveau que la grille normale
            }, 10);

            setTimeout(() => {
                currentGrid.remove();
                newGrid.style.position = 'relative';
                newGrid.style.zIndex = '1';
                console.log('Transition terminée vers la page', targetPage);
            }, 600);
        },

        handleTileClick(gameId) {
            if (gameId === 1) {
                this.$emit('show-chat');
            } else {
                console.log('Jeu ' + gameId + ' cliqué');
            }
        },

        generateGames() {
            this.allGames = [];
            for (let i = 1; i <= 24; i++) {
                this.allGames.push({
                    id: i,
                    number: i
                });
            }
        }
    },

    mounted() {
        this.generateGames();
    }
};

// Composant Chat
export const Chat = {
    template: `
        <div class="chat">
            <!-- Formulaire de pseudo (affiché en premier) -->
            <div v-if="!username" class="pseudo-form">
                <div class="pseudo-form-content">
                    <h2>🎭 Entrez votre pseudo</h2>
                    <p>Choisissez un nom d'utilisateur pour le chat</p>

                    <div class="pseudo-input-container">
                        <input
                            v-model="tempUsername"
                            type="text"
                            placeholder="Votre pseudo..."
                            class="pseudo-input"
                            @keypress.enter="setUsername"
                            maxlength="20"
                        >
                        <button @click="setUsername" class="pseudo-button" :disabled="!tempUsername.trim()">
                            🚀 Rejoindre le chat
                        </button>
                    </div>

                    <p class="pseudo-hint">Ce pseudo sera visible par tous les participants</p>
                </div>
            </div>

            <!-- Chat principal (affiché après saisie du pseudo) -->
            <div v-else class="chat-main">
                <div class="chat-header">
                    <h2>💬 Chat en Temps Réel</h2>
                    <div class="connection-status">
                        <span :class="connectionClass">{{ connectionText }}</span>
                    </div>
                    <button class="close-chat-btn" @click="closeChat">✕</button>
                </div>

                <div class="chat-messages">
                    <div
                        v-for="message in messages"
                        :key="message.id"
                        class="chat-message"
                        :class="{ 'sent': message.type === 'sent', 'system': message.type === 'system' }"
                    >
                        <strong>{{ message.sender }}:</strong> {{ message.content }}
                        <span class="message-time">{{ message.time }}</span>
                    </div>
                </div>

                <div class="chat-input-container">
                    <input
                        v-model="newMessage"
                        type="text"
                        placeholder="Tapez votre message..."
                        class="chat-input"
                        @keypress.enter="sendMessage"
                        :disabled="!isConnected"
                    >
                    <button @click="sendMessage" class="send-button" :disabled="!isConnected">📤 Envoyer</button>
                </div>
            </div>
        </div>
    `,

    emits: ['close-chat'],

    data() {
        return {
            newMessage: '',
            tempUsername: '',
            username: '',
            messages: [
                {
                    id: 1,
                    sender: 'Système',
                    content: 'Entrez votre pseudo pour commencer à chatter !',
                    time: new Date().toLocaleTimeString(),
                    type: 'system'
                }
            ],
            ws: null,
            isConnected: false,
            reconnectAttempts: 0,
            maxReconnectAttempts: 5
        }
    },

    computed: {
        connectionClass() {
            return {
                'connected': this.isConnected,
                'disconnected': !this.isConnected
            }
        },
        connectionText() {
            return this.isConnected ? '🟢 Connecté' : '🔴 Déconnecté';
        }
    },

    methods: {
        closeChat() {
            this.disconnectWebSocket();
            this.$emit('close-chat');
        },

        setUsername() {
            if (this.tempUsername.trim()) {
                this.username = this.tempUsername.trim();
                this.tempUsername = '';

                // Effacer les messages de bienvenue
                this.messages = [];

                // Se connecter au WebSocket
                this.connectWebSocket();

                console.log('🎭 Pseudo défini:', this.username);
            }
        },

        connectWebSocket() {
            // Configuration flexible pour développement et production
            let wsUrl;

            // Test temporaire avec Railway - remplace par ton URL quand tu l'as
            const RAILWAY_URL = 'wss://appstore.railway.internal';

            if (typeof window !== 'undefined' && window.location) {
                // En production, utiliser Railway
                if (window.location.hostname.includes('railway')) {
                    wsUrl = RAILWAY_URL;
                } else {
                    // En développement local
                    wsUrl = 'ws://localhost:3000';
                }
            } else {
                // En développement local
                wsUrl = 'ws://localhost:3000';
            }

            console.log('🔌 Tentative de connexion à:', wsUrl);

            try {
                this.ws = new WebSocket(wsUrl);

                this.ws.onopen = () => {
                    console.log('🟢 Connecté au serveur de chat');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;

                    // Rejoindre une room avec le pseudo
                    this.ws.send(JSON.stringify({
                        type: 'join',
                        roomId: 'global-chat',
                        username: this.username
                    }));

                    this.addMessage('Système', `Bienvenue ${this.username} ! Connecté au chat.`, 'system');
                };

                this.ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        if (data.type === 'message') {
                            this.addMessage(data.username || 'Anonyme', data.payload, 'received');
                        } else if (data.type === 'user_joined') {
                            this.addMessage('Système', `${data.username} a rejoint le chat`, 'system');
                        } else if (data.type === 'user_left') {
                            this.addMessage('Système', `${data.username} a quitté le chat`, 'system');
                        }
                    } catch (error) {
                        console.error('Erreur parsing message:', error);
                    }
                };

                this.ws.onclose = () => {
                    console.log('🔴 Déconnecté du serveur');
                    this.isConnected = false;
                    this.attemptReconnect();
                };

                this.ws.onerror = (error) => {
                    console.error('❌ Erreur WebSocket:', error);
                    this.isConnected = false;
                };

            } catch (error) {
                console.error('❌ Erreur connexion WebSocket:', error);
                this.isConnected = false;
                this.attemptReconnect();
            }
        },

        disconnectWebSocket() {
            if (this.ws) {
                this.ws.close();
                this.ws = null;
            }
            this.isConnected = false;
        },

        attemptReconnect() {
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++;
                console.log(`🔄 Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts}...`);

                setTimeout(() => {
                    this.connectWebSocket();
                }, 2000 * this.reconnectAttempts); // Backoff exponentiel
            } else {
                this.addMessage('Système', 'Impossible de se reconnecter au serveur.', 'system');
            }
        },

        sendMessage() {
            if (this.newMessage.trim() && this.isConnected && this.ws && this.username) {
                // Envoyer via WebSocket avec le pseudo
                this.ws.send(JSON.stringify({
                    type: 'message',
                    roomId: 'global-chat',
                    username: this.username,
                    payload: this.newMessage.trim()
                }));

                // Ajouter le message localement
                this.addMessage(this.username, this.newMessage.trim(), 'sent');
                this.newMessage = '';
                console.log('📤 Message envoyé par', this.username);
            }
        },

        addMessage(sender, content, type) {
            this.messages.push({
                id: Date.now() + Math.random(),
                sender: sender,
                content: content,
                time: new Date().toLocaleTimeString(),
                type: type
            });

            // Garder seulement les 50 derniers messages
            if (this.messages.length > 50) {
                this.messages = this.messages.slice(-50);
            }
        }
    },

    mounted() {
        this.connectWebSocket();
    },

    beforeUnmount() {
        this.disconnectWebSocket();
    }
};
