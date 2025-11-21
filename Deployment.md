


Le déploiement de cette application web est relativement simple. Il est notamment décrit dans le fichier README.md, qui se trouve à la racine du projet, la manière la plus fiable pour déployer l'application et de l'utiliser en tant que serveur. Les dépendance sont listées dans les fichier package.json de chaque conteneur et peuvent être installées avec la même commande qui permet de déployer le service. 

Voici un copié-collé de la procédure d'installation et de déploiement : 


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


# Note importante

il est à noter que ce conteneur n'a pas de variable environnante particulier. Il n'a pas été jugé nécessaire de données la permission à l'utilisateur de modifier les variables d'environnement. Puisque ce projet se fait dans le cadre du cours 2025-3-INF1763-01 Techniques et outils professionnels de développement logiciel et qu'il a été nécessaire de diminuer la charge de travail au maximum en vue du nombre limité d'effectifs de l'équipe, certaines options comme la configuration avancée des conteneurs ont été simplifiées.  

Cependant, pour une production plus robuste, il serait recommandé d'intégrer des variables d'environnement et d'explorer des options de déploiement plus complexes.


Ce fichier README fournit une description concise du processus de déploiement de SoftGhost.


Il est aussi à noter que pour une simplification du projet il a été choisi de ne pas surcharger le projet. 



Par exemple, il n'y a pas de test à l'intérieur du code. Puisque les processus ont tous été rédiger par intelligence artificielle, il a été nécessaire de simplifier les processus de traitement. L'ensemble des processus de traitement suivent le schéma suivant.


1. Demande de l'utilisateur via le frontend
2. Réception de la demande de la part du backend sur lequel il contient l'API.
3. L'API demande A la base de données les informations requises (écriture et/ou lecture)
4. La base de données répond à l'API avec les informations demandées.
5. L'API traite ces informations et retourne une réponse au frontend sous forme JSON.
6. Le frontend affiche la réponse à l'utilisateur.


La seule exception dans ces processus est lorsque l'utilisateur s'inscrit a une formation. Dans ce cas, un email de confirmation sera envoyé à l'utilisateur. La page de confirmation ne sera envoyé à l'utilisateur uniquement si le serveur a bel et bien la confirmation que le courriel a été envoyé avec succès. Ce processus implique une interaction supplémentaire avec un service d'envoi d'emails externe. Notamment avec la dépendance emailer qui est installée dans les conteneurs Docker du projet.


Un schéma est présenté dans le dossier Documentation/UML diagramme softghost-Processus.drawio.png . Ce schéma illustre globalement le flux de données et d'interactions entre les différentes parties du système SoftGhost comme mentionné plus tôt. 


Pour un projet plus ambitieux, il serait judicieux d'intégrer des tests unitaires et d'intégration pour garantir la qualité et la fiabilité du code comme mentionné dans le cours. En effet, l'ajout de tests pourrait améliorer significativement le développement en permettant d'identifier rapidement les erreurs et de valider les modifications apportées au code. 












































