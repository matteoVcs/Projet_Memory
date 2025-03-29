# Projet Memory 🚀

---

## Table des matières
- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Lancement du projet](#lancement-du-projet)
- [Répartition des tâches](#répartition-des-tâches)
- [Arborescence du projet](#arborescence-du-projet)
- [Détails des dossiers principaux](#détails-des-dossiers-principaux)
- [Auteurs](#auteurs)

---

## Description
Projet Memory est une application web éducative permettant de créer, gérer et réviser des cartes mémoire. Elle utilise des techniques de répétition espacée pour aider les utilisateurs à mémoriser efficacement des informations.

---

## Fonctionnalités
- **Gestion des catégories et thèmes** : Créez, modifiez et supprimez des catégories et des thèmes.
- **Création de cartes mémoire** : Ajoutez des cartes avec des questions, réponses, médias (images, audio, vidéo) et objectifs de répétition.
- **Révision des cartes** : Révisez les cartes selon leur date de révision, avec un suivi des réponses correctes et incorrectes.
- **Répétition espacée** : Les cartes sont planifiées pour révision en fonction de leur niveau de maîtrise.
- **Interface utilisateur intuitive** : Navigation fluide entre les pages `Home`, `Edit` et `Import`.
- **Progression personnalisée** : Suivez vos progrès grâce à des objectifs de niveau de répétition.

---

## Lancement du projet
Pour lancer le projet, suivez les étapes ci-dessous :

### Prérequis
- Node.js (version 16 ou supérieure)
- Angular CLI (installé globalement via `npm install -g @angular/cli`)

### Étapes
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/matteoVcs/Projet_Memory.git
   cd Projet_Memory
   ```
###
2. Installez les dépendances :
   ```bash
    npm install
    ```
###
3. Démarrez l'application :
   ```bash
   ng serve
   ```
###
4. Accédez à l'application sur le port suivant :
[http://localhost:4200](http://localhost:4200)
###

---

## Répartition des tâches
### Fonctionnalités de base
- **Dimitri Brancourt** :
  - Création, édition et suppression des catégories, thèmes et cartes.
  - Fonctionnement hors-ligne avec Service Worker et fichier MANIFEST.
  - Organisation et structuration du code.

- **Mattéo Vocanson** :
  - Implémentation de la révision avec répétition espacée.
  - Gestion des notifications quotidiennes.

### Expérience utilisateur et design
- **Mattéo Vocanson** :
  - Responsiveness de l'application.
  - Interface utilisateur intuitive et design.

### Documentation et tests
- **Mattéo Vocanson** :
  - Rédaction du README et documentation.
  - Fourniture des données de test.

---

## Arborescence du projet
##### Le projet est organisé selon la structure suivante :
``` markdown
.editorconfig
.gitignore
[angular.json]
[ngsw-config.json]
[package.json]
[README.md]
[tailwind.config.js]
[tsconfig.app.json]
[tsconfig.json]
[tsconfig.spec.json]
src/
  [index.html]
  [main.ts]
  [styles.css]
  app/
    components/
      home/
        [home.component.ts]
        [home.component.html]
        [home.component.css]
      edit/
        [edit.component.ts]
        [edit.component.html]
        [edit.component.css]
      import/
        [import.component.ts]
        [import.component.html]
        [import.component.css]
    services/
      [data.service.ts]
    [models.ts]
    [app.component.ts]
    [app.component.html]
    [app.component.css]
    [app.routes.ts]
    [app.config.ts]
```

---
## Détails des dossiers principaux

- src/app/components : Contient les composants Angular pour les pages principales (Home, Edit, Import).
- src/app/services : Contient les services Angular, comme DataService, pour gérer les données de l'application.
- src/app/models.ts : Définit les interfaces pour les entités principales (Category, Theme, Card).
- src/app/app.routes.ts : Configure les routes de l'application.
- src/app/app.config.ts : Configure les paramètres globaux de l'application, y compris le service worker.

---

### Auteurs
``` markdown
BRANCOURT Dimitri
VOCANSON Mattéo
```