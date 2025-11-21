# Installation


Pour installer l'application web softghost, vous aurez bseoin de Docker Desktop, Docker Compose et de téléchager le repo du projet GitHub. 

1. Une fois ces outils installés, aller dans la racine du projet GitHub téléchargé et exécuter la commande npm run dev:build. Cette commande va lancer un processus de build qui va générer une image ainsi qu'un multi-conteneur
2. L'un de ces conteneur est une base de données postgres. Pour aquérir les donnée nécessaire à l'exploitation de la base de données il faut ce connecter à cette base de donnée et exécuter le fichier sql /init-db/init.sql . Ce fichier contient des requêtes SQL nécessaires à la création des tables et à la configuration initiale de la base de données pour l'application softghost. Voici les détail de la connexion à la base de données :



| Caractéristique           | Valeur    |
| ------------------------- | --------- |
| adresse du server         | localhost |
| port                      | 5432      |
| Nom de la Base de données | softghost |
| Nom de l'utilisateur      | postgres  |
| Mots de passe             | password  |



3. Une fois les tables créées et la configuration initiale effectuée, vous pouvez démarrer les conteneurs Docker avec l'application docker Desktop. Allez sur le port 5173 pour accéder à l'interface web de SoftGhost. Vous devriez alors voir la page d'accueil de l'application.



# Utilisation


L'utilisation de l'application web SoftGhost est intuitive et facile à prendre en main.  Une fois connecté à l'interface via le port 5173, vous aurez accès à une panoplie de formation. Ces formations sont structurées en fonction des logiciels utilisés par des militant contre de les GAFAM (les 5 géant du numérique: Google, Amazon, Facebook, Apple et Microsoft).























































































