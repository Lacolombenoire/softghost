





# Architecture général


![[UML diagramme softghost-général.drawio.png]]

Dans l'architecture général de l'application web SoftGhost, on distingue plusieurs composants clés qui interagissent pour fournir une expérience utilisateur complète.

Premièrement il y a le frontend, responsable de l'interface utilisateur et de l'interaction avec l'utilisateur. Il est principalement réalisé en JavaScript utilisant le framework React pour une application interactive et performante. Il contient la composantes Vite en raison de la recommandation de l'intelligence artificielle pour un développement rapide et efficace. Par défaut le frontend écoute sur le port 5173 puisque c'est le port par défaut recommandé par l'intelligence artificielle. En réalité le numéro du port a très peu d'importance en autant qu'il diffère de celui d'un autre service et qu'il soit disponible sur la machine qui héberge le frontend. Le frontend communique avec le backend dans un API.

En parlant de ce dernier, la backend est développé en javascript aussi, utilisant l'framework Node.js pour encore une fois la recommandation de l'intelligence artificielle. Il s'occupe du traitement des requêtes faites par le frontend qu'il redirige ensuite vers le serveur de base de données. Le backend écoute sur le port 3000 par défaut, mais comme pour le frontend, ce n'est qu'une recommandation qui aurait pu être différente si nécessaire.  Le choix du Node.js et aussi une recommandation de l'intelligence artificielle qui a analysé les besoins de l'application et a jugé que ce framework offrait la meilleure combinaison de performance, simplicité d'utilisation et communauté active pour un projet web. Le backend aurait pu par exemple introduire des algorithmes complexes de traitement de données. Certains buisness modèle repose exclusivement sur le backend et sur les algorithmes complexes de leur application mais dans le cas de SoftGhost, l'application s'appuie plutôt sur des interactions simples avec la base de données et un frontend interactif. Ce choix d'utilisation simpliste du backend a été nécessaire en raison de la limitation des cerveaux travaillant sur le projet qui ont préféré se concentrer sur l'expérience utilisateur offerte par le frontend.  

Le serveur de base de données, quant à lui, est responsable du stockage et de la récupération des données. Il sert exclusivement à du stockage et de l'entreposage des données dans un format structuré et facilement accessible aux autres composants. Pour SoftGhost, le choix s'est porté sur une base de données relationnelle SQL comme PostgreSQL. Encore une fois, PostgresSQL a été une recommandations de l'intelligence artificielle qui a pris en compte les besoins du projet en termes de fonctionnalités et d'exigence technique. Cette base de données écoute sur le port 5432 par défaut, mais comme pour les autres composants, ce port hors est pu à être modifié ou alterner. PostgreSQL est une option populaire pour les applications web en raison de sa robustesse, de ses fonctionnalités avancées et de sa communauté active. Le choix d'une base de données SQL permet également de profiter des outils et des langages de requêtes standardisés (SQL), ce qui facilite la gestion des données dans SoftGhost. 



Beaucoup de paramètres ont été configurer par défaut et beaucoup de choix techniques ont été simplifiés en raison de la taille réduite de l'équipe de développement ce limitant à une seule personne. Cette approche a permis de se concentrer sur les aspects essentiels du projet tout en assurant une rapidité de développement. C'est pour cette raison que l'intelligence artificielle a été massivement utilisé pour guider le choix des technologies, optimiser la configuration et proposer des solutions adéquates aux besoins spécifiques de SoftGhost. Dans un effectif limité l'intelligence artificielle est apparue comme étant la meilleure solution pour accélérer le développement et garantir une cohérence technique au sein du projet. L'utilisation de l'intelligence artificielle avait pour but de simuler un développeur ou un autre collègue de travail qui pourrait fournir des conseils, identifier les meilleures pratiques et proposer des solutions techniques adaptées. Cette approche a permis de maximiser l'efficacité du développement en réduisant le temps d'apprentissage et en évitant les erreurs courantes. Mais elle a surtout était très utile pour limiter le temps passé à la rédaction de documentation technique et de codes fonctionnels. L'intelligence artificielle a été intégrée dans toutes les étapes du cycle de développement de SoftGhost, de la conception initiale jusqu'au déploiement final. Elle a joué un rôle crucial dans la prise de décision technique, l'optimisation des performances et la simplification des processus.









# Database

![[UML diagramme softghost-Base de donnée.drawio.png]]

voici le schéma de la base de données. La base de données SoftGhost utilise un modèle relationnel pour organiser et stocker les informations. Il est à noter que chaque table et chaque attribut ne sont pas nommés exactement de cette façon notamment en ce qui entrait des majuscules des espaces et des accents français. Dans la table réelle c'est caractères peuvent être modifiés pour correspondre à la syntaxe acceptée par Postgres. Voici une description de ce à quoi sert chaque table :



## réservation

La table réservation enregistre toutes les réservations effectuées par les utilisateurs. Elle contient des informations relier à ce qui a été inscrit dans le formulaire d'inscription a une formation. Chaque ligne de la table représente une réservation unique et comprend des champs comme l'identifiant du réservation, le nom et le prénom à laquelle a été lié la réservation, le courriel associé à la réservation, etc. 



## formation


cette table est dédié à la liste des logiciel sur laquelle des formations sont proposées. Chaque ligne représente une formation distincts. Il est à noter que pour une simplicité de conception de l'application web chaque formation pour un logiciel spécifique se répète à toutes les semaines. Par exemple, si  un logiciel a une formation le lundi a une certaine heure et ce à toutes les semaines, tandis qu'un autre logiciel a sa formation le jeudi après-midi, il y aura des lignes distinctes pour chaque formation, répétées chaque semaine pour refléter cette programmation. Chaque ligne contient des informations comme le nom du logiciel, le jour de la semaine de la formation représenté par un entier de 0 à 6 (chaque nombre représentant un jour de la semaine différent), l'heure de début et de fin de la formation. Il y a aussi une petite description qui accompagne chaque événement. Il est à noter que cette table est conçue pour être la majorité du temps en read-only. On considère que la table sera modifié très rarement dans le cas réel. Cependant aucune fonctionnalité n'a été implémentée dans le cadre de ce projet pour modifier cette table par souci de simplicité. 


## Fromation instance

cette table est une représentation d'une instanciation d'une ligne de la table précédente. Chaque ligne représente une instance unique d'une formation, définie par un identifiant spécifique. Si dans la table de formation on représente la formation sous forme de schéma à répéter, dans la table formation instance on définit bel et bien une formation à laquelle les utilisateurs peuvent participer à une date précise correspondant au jour de la semaine ou la formation se donne normalement et à l'heure de début et de fin inscrit dans la table formation. Par exemple, si une formation "Introduction à Python" a lieu chaque lundi à 14h, il y aura une ligne dans la table formation instance pour ce lundi spécifique avec les informations de cette formation. De même, il y aura une ligne pour le prochain lundi où la formation aura lieu et ainsi de suite. Elle contient donc des informations supplémentaires concernant la formation à cet instant précis comme la date précise à laquelle elle est donnée ainsi que le nombre de personnes qui ont réservé. On a mis aussi une condition afin que ce nombre de réservations ne dépasse pas 30 participants. Nous supposions que dans le cas réel un formateur ne voudrais pas une classe de plus de 30 participants. 



## Table réservation

cette table n'est qu'une table de liaison entre les tables réservation et formation instance. Elle permet d'associer chaque réservation à une instance spécifique de formation. Chaque ligne dans cette table représente un lien entre une réservation et une formation, indiquant que l'utilisateur associé à la réservation a réservé sa place pour l'instance de formation en question. Pour respecter la condition du nombre maximum de participants par formation, il a été conçu un Trigger afin de refuser des insertions de lignes indiquant un surpassement du nombre de réservations pour une instance donnée. Ce trigger assure que le nombre total de réservations pour une instance spécifique ne dépasse jamais 30.


## Note importante

il est important de comprendre que le schéma de la base de données à évidemment été simplifié par rapport à d'autres projets en raison des contraintes liées au contexte et aux ressources disponibles. Il est notamment question de ne pas intégrer une table comportant des comptes utilisateurs afin de simplifier au maximum le développement initial.  De plus, l'accent a été mis sur les fonctionnalités essentielles du projet, à savoir la gestion des formations et des réservations. Il faut aussi se dire que dans le contexte simuler le client est contre la collecte excessive d'informations de la part des GAFAM. La création d'un compte utilisateur va donc à l'encontre de cette philosophie. Le but de l'organisme à but non lucratif est de proposé des formations sur des logiciels qui évite d'utiliser les outils des gafa am qui collecte trop d'informations sur les utilisateurs. Cette approche permet de garantir la confidentialité des données et de respecter les principes éthiques en matière de protection de la vie privée. Cependant, il serait possible d'étendre ce modèle dans le futur en intégrant une table utilisateurs pour permettre une meilleure gestion des profils et des interactions des utilisateurs avec le système SoftGhost.  Cette extension pourrait inclure des champs supplémentaires comme le nom complet, l'adresse email, le mot de passe (stocké de manière sécurisée bien sûr) et d'autres informations pertinentes pour personnaliser l'expérience utilisateur. 











# Frontend

![[UML diagramme softghost-Frontend.drawio.png]]


le frontend est séparé en plusieurs pages ayant chacun leur rôle dans l'application web. L'ensemble des designs de cette application ont été rédigés conçu par intelligence artificielle sans contrainte spécifique. Voici la description et l'utilité de chaque page web rédiger à l'aide du framework React:



## App

cette page n'a pas réellement de design car elle représente l'élément racine de l'application web et sert principalement d'hôte pour les autres composants. Elle contient des routes qui redirigent l'utilisateur vers les différentes pages du site. Elle fait donc office de main pour le frontend.


## accueilformation

cette page sert principalement à demander à l'utilisateur s'il souhaite s'inscrire à une formation ou s'il souhaite accéder à la page administrateur. Elle ne fait que lister les différents logiciels pour lesquels des formations sont disponibles et permet à l'utilisateur de cliquer sur le nom du logiciel qui l'intéresse. Une fois qu'un logiciel est cliqué, il redirige vers la page descriptionformation. Les logiciels sont listés exactement comme des produits sur un site de e-commerce avec des images et des noms accrocheurs pour inciter l'utilisateur à cliquer. L'utilisateur peut aussi cliquer sur un bouton en haut à droite pour accéder à la page administrateur. Cependant il doit entrer le mot de passe et le nom d'utilisateur afin de pouvoir accéder à cette page. Cependant par souci de simplicité le nom d'utilisateur ainsi que le mot de passe ont été écrits en gris transparent dans l'arrière-plan des zones de texte. Cela permet à l'enseignant de mieux corriger le dit application web. Dans un cas réel il faudrait ajouter 2 choses. Premièrement il faudrait être capable, en tant que administrateur. de créer de nouveaux administrateur. Deuxièmement il faudrait que les mots de passe et les non utilisateurs ne sont pas affichés en gris transparent dans l'arrière-plan des zones de texte. Cela permettrait une meilleure sécurité et un meilleur respect des données personnelles. De plus pour des besoins de cybersécurité il faudrait être capable d'encrypter les mots de passe avec du hachage notamment. Cela permettrait d'avoir une application web beaucoup mieux sécurisée pour ce qui est des comptes administrateurs et des contrôles d'accès. Cette page est donc une introduction simple à l'application web, conçue pour guider les utilisateurs vers leurs besoins spécifiques. 


## descriptionformation


Cette page présente des informations détaillées sur une formation spécifique choisie par l'utilisateur depuis la page accueilformation. Elle fournit des détails tels que le nom de la formation, la description, l'heure à laquelle elle se déroule chaque semaine etc... Il y a aussi un bouton ou l'utilisateur peut choisir la date précise où il souhaite prendre la formation jusqu'à un mois à l'avance. Il a été choisi de limiter la réservation jusqu'à un mois à l'avance afin de ne pas trop charger l'interface graphique et de permettre une meilleure gestion des formations. Il y a aussi plusieurs zone pour insérer du texte afin que l'utilisateur puisse entrer les informations nécessaires pour la réservation, comme son nom, prénom ainsi que son email. Le bouton d'inscription à la formation permet ensuite à l'utilisateur de confirmer sa place dans cette instance spécifique de formation. Une fois que la réservation est confirmée, un message de confirmation s'affiche à l'utilisateur indiquant que sa place est bien réservée pour la formation choisie. C'est le rôle de la page de confirmation de réservation. Cependant ce message ne s'affiche que si le système est sûr et certain qu'un courriel de confirmation a bel et bien été envoyé à l'adresse courriel fournie par l'utilisateur.  Cela permet d'éviter les erreurs de transmission et d'assurer une meilleure expérience utilisateur. Si il y a une erreur au cours du processus cette page retournera la page d'erreur lié à l'application web afin que l'utilisateur puisse identifier le problème rencontré. Cependant la page d'erreur est uniforme et n'indique pas le problème exact qui a causé l'erreur. Encore une fois c'est par souci de simplicité que l'application web a été designée de la sorte. En temps normal le courriel pourrait contenir un lien de vidéoconférence ou l'adresse où se déroulera la formation afin que l'utilisateur puisse se rendre au lieu d'apprentissage virtuel. Cependant, puisque cette application web a été designée dans le cadre d'un cours et qu'il y a en réalité aucune formation qui ne n'est donnée dans le contexte actuel de ce projet pédagogique, il a été décidé de simplifier le processus de réservation et d'éviter l'intégration de fonctionnalités complexes comme les liens de vidéoconférence ou les adresses des lieux de formation. 



## pageadministrateur


cette page ne fait que présenter les formations à l'administrateur un mois à l'avance afin qu'il puisse voir s'il y a des formations où il n'y a aucune inscription et donc qu'il n'a pas besoin d'organiser la formation. Cela lui permet d'optimiser son temps et de se concentrer sur les formations qui ont des inscriptions confirmées. Si il y a une page qui a été implémentée de manière assez paresseuse ce serait bien celle-ci. Ce n'est pas une page d'administrateur très typique puisque tout est minimaliste. L'administrateur ne peut faire que consulter le nombre d'inscrits à chaque formation. Il n'y a aucune fonctionnalité pour modifier ou supprimer des formations, ni pour ajouter de nouvelles formations. C'est une page d'affichage très simple qui permet à l'administrateur de visualiser rapidement les formations à venir et leur taux d'inscription. En temps normal, une page administrateur plus complète offrirait des fonctionnalités pour gérer toutes les formations, y compris la possibilité d'ajouter, modifier ou supprimer des formations, ainsi que de configurer les détails de chaque formation comme l'heure, le lieu et les participants. Ils devraient aussi y avoir la possibilité de consulter la liste des participant avec leur nom, leur email ainsi que leur numéro de téléphone et de contacter les participants individuellement si nécessaire. Il pourrait ainsi ajouter ou supprimer des participants de manière manuelle. Cependant, dans cette implémentation simplifiée, la page de l'administrateur se concentre uniquement sur la visualisation du nombre d'inscriptions pour chaque formation à venir.






# Gestion des processus


![[UML diagramme softghost-Processus.drawio.png]]


Il faut savoir que chaque processus est géré exactement de la même manière. Chaque processus commence par une requête utilisateur, soit via un clic sur un lien depuis le frontend. Le backend recevra cette requête et enverra une requête escuelle à la base de données pour récupérer les informations nécessaires à l'exécution du processus. Une fois les informations récupérées, le backend peut possiblement envoyer un courriel à l'extérieur du système. Puis il renvoie ces informations au frontend qui affiche ensuite ces informations à l'utilisateur sous forme de page web dynamique.



















































