# Eleventy - Quelques tests

## Objectifs

Ce projet a pour objectif de tester les fonctionnalités d'Eleventy (11ty) ainsi que quelques cas d'utilisation simples liés à la création d'un site vitrine ou d'un blog.  
Je cherche à appliquer une approche minimaliste : éviter au maximum l'ajout de dépendances et utiliser le plus possible 11ty y compris pour les éléments de build (minification, compression, styles, JavaScript, etc.).

## Cas d'utilisation

- [x] Compiler & "minifier" des CSS via 11ty ou avec un outil dédié _sans passer par des commandes supplémentaires ou un gestionnaire de pipelines_
    - Tester avec l'API de Postcss directement dans Eleventy via la création de données via fichier JS (CF `./src/css/postcss.11ty.js`)
- [x] Compiler & "minifier" des SASS via 11ty ou avec un outil dédié _sans passer par des commandes supplémentaires ou un gestionnaire de pipelines_
    - Même remarque que le point précédent (CF `./src/scss/sass.11ty.js`)
- [x] Compiler & "minifier" des JS via 11ty ou avec un outil dédié _sans passer par des commandes supplémentaires ou un gestionnaire de pipelines_
    - Même remarque que le point précédent (CF `./src/js/uglify-js.11ty.js`)
- [x] Minification HTML
- [x] Gestion de pages simples
    - Réalisé via l'outil de templating Nunjuck ainsi que des fichiers Markdown pour le contenu
- [x] Gestion d'articles de blog (liste, pagination, visualisation)
    - Même remarque que le point précédent + quelques éléments ajoutés dans .eleventy.js pour récupérer les fichiers Markdown
- [x] Gestion des tags/categories

## Critiques du projet actuel

- Le dossier `include` contient à la fois des partials et des pages (njk) -> il faudrait pouvoir les différencier plus facilement
- Le build JS ne permet pas actuellement d'ajouter des scripts venant de node_modules (ou autres) -> un scan du package.json avec alimentation auto des scripts serait intéressant. Il serait aussi possible de déclarer les fichiers JS à ajouter dans `uglify-js.11ty.js` afin de les récupérer.
- Confusion possible entre la notion de `page` et de `posts` (CF les dossiers du même nom)
- Je n'ai pas réussi à mettre en place une pagination dans pages contenant les articles de chaque tags : une pagination est déjà présente et il est impossible d'en avoir deux

## Quelques éléments de réflexion

- Il n'est pas forcément nécessaire d'utiliser des outils comme [Concurrently](https://www.npmjs.com/package/concurrently), [Gulp](https://gulpjs.com/), [Webpack](https://webpack.js.org/) ou [Parcel](https://parceljs.org/) pour gérer les élements de builds et des pipelines (minification, compression, etc.). L'ensemble des tâches les plus simples peuvent être réalisées directement via 11ty et les différentes API JavaScript des outils.  Pour des traitements plus complexes avec JavaScript (utilisation de framework, etc.), il est propable qu'un outil de pipeline supplémentaire soit nécessaire.
- Beaucoup des articles croisés lors de cette découverte d'11ty utilisent les tags pour lister l'ensemble des articles de blogs. Une telle utilisation implique des règles supplémentaires à appliquer si l'on souhaite les utiliser pour autre chose (catégoriser les articles par exemple). Cela demande peu de travail supplémentaire (côté .eleventy.js ou des fichiers .md), mais il faut quand même y penser.
- Il est aussi possible de rendre les scripts JS et les styles inline directement dans l'ensemble des pages du site généré par 11ty. Quelques éléments de documentation se trouvent [ici](https://jec.fyi/blog/minifying-html-js-css) et [ici](https://www.11ty.dev/docs/quicktips/).
