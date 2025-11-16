FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Installer un serveur HTTP simple pour servir les fichiers static
RUN npm install -g serve

# Exposer le port
EXPOSE 5173

# Commande de démarrage
CMD ["serve", "-s", "dist", "-l", "5173"]