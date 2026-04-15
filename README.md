# E-Commerce Platform & Smart Business Decision Hub (SBDH)


SBDH est une plateforme e-commerce intelligente reposant sur une architecture Big 
Data et Machine Learning, capable de fournir des recommandations personnalisées, des 
analyses avancées et des prévisions financières fiables.

##  Installation
```bash
# Cloner le repo
git clone git@github.com:maaamy/SBDH.git
cd sbdh

# Installer les dépendances
npm install

# Lancer en dev
npm run dev
```

## Variables d’environnement

Le projet nécessite certaines variables d’environnement pour fonctionner correctement.

Créer un fichier .env à la racine du projet :

```bash
VITE_GOOGLE_CLIENT_ID=google_client_id
```


## Tests

Pour exécuter les tests :

```bash

npm run test

# Pour lancer les tests en mode watch :
npm run test:watch
```

Assurez-vous que toutes les dépendances sont bien installées avant de lancer les tests.