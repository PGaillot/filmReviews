# Film Reviews

Film Reviews est un projet qui vise à proposer un jeu quotidien où les joueurs doivent trouver le maximum de mots pouvant se trouver dans un synopsis de film et de partager leurs résultats avec leurs amis. Ce référentiel contient le code source du site web qui héberge le jeu.

## Comment jouer

1. ~~Visitez le site web Film Reviews pour accéder au jeu.~~
2. Chaque jour, un nouveau film sera présenté sur le site web.
3. Trouvez autant de mots que possible présents dans le synopsis.
4. Saisissez vos réponses dans le champ d'entrée prévu à cet effet.
5. Cliquez sur le bouton "Soumettre" pour voir votre score.
6. Partagez vos résultats avec vos amis en copiant le lien fourni.


### Prérequis

- Node.js et npm installés sur votre machine.
- Angular CLI installé. Si ce n'est pas le cas, vous pouvez l'installer en exécutant la commande suivante :
`npm install -g @angular/cli`

### Installation

1. Clonez le dépôt :
`git clone https://github.com/PGaillot/filmReviews.git`
2. Accédez au répertoire du projet :
`cd filmReviews`
3. Installez les dépendances :
`npm i`

### Exécution de l'application

1. Lancez le serveur de développement :
`ng serve -o`
2. Ouvrez votre navigateur et visitez `http://localhost:4200` pour accéder à une instance locale du site web.

## Utilisation de l'API TMDB

Film Reviews utilise l'API TMDB (The Movie Database) pour obtenir les données des films. Si vous souhaitez exécuter le projet localement, vous devrez obtenir une clé d'API TMDB et la configurer.

### Obtenir une clé d'API TMDB

1. Rendez-vous sur le site de [TMDB](https://www.themoviedb.org/) et créez un compte si vous n'en avez pas déjà un.
2. Connectez-vous à votre compte TMDB.
3. Accédez à votre tableau de bord de compte et cliquez sur "API" dans le menu de navigation.
4. Cliquez sur "Créer" pour créer une nouvelle clé d'API.
5. Copiez la clé d'API générée et le jeton d'accès en lecture à l'API.

### Configuration de la clé d'API TMDB

1. Depuis le répertoire du projet allez dans le dossier 'src/environments, ouvrez le fichier `config.ts`.
2. collez votre clef d'API à la place de `YOUR_API_KEY`
2. collez votre jeton d'accès en lecture à la place de `YOUR_BEARER`

## Licence

~~Film Reviews est sous licence. Vous êtes libre de modifier et de distribuer le code selon les termes de la licence.~~

## Remerciements

- Les données de films utilisées dans ce projet sont obtenues à partir [TMDB](https://www.themoviedb.org/). Nous tenons à les remercier pour leur contribution.
- Merci à tous les contributeurs qui ont contribué à améliorer Film Reviews.


