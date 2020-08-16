## Bienvenue sur le projet Todo

Todo est un éditeur de todo-lists avec un système de synchronisation en ligne. Sa solution de stockage varie en fonction de l'environnement sur lequel il opère. Cette flexibilité est possible grâce au principe [d'inversion de dépendance](https://martinfowler.com/articles/dipInTheWild.html).

<img alt="Screenshot" src="https://user-images.githubusercontent.com/18191750/80287762-77ba4780-8733-11ea-9bbf-aa4480e3197d.png" />

#### Raccourcis claviers

- `CTRL+D`: Dupliquer la liste sélectionnée
- `DEL` : Supprimer l'élément sélectionné

## Notes au correcteur

_Mathieu Pionnier, Thomas Chastaingt et Aymerick Valette_

Bonjour, voici notre rendu du sujet todo-list.
Il est composé d'un client web Vue dans le répertoire `web` et d'un serveur de synchronisation dans le répertoire `sync`.

Fonctionalités:

- Création, affichage, mise à jour, duplication et suppression de listes.
- Mêmes opérations pour les tâches et les sous-tâches.
- Réarrangement des listes par drag-and-drop.
- Stockage des listes dans le localStorage\*.

Ajouts\*:

- Typage via Typescript.
- Authentification et Authorisation.
- Utilisation de `vuex` pour la gestion de l'état.
- Stockage en base de donnée (Mongo et Redis).

> \*localStorage: Nous avons réunis les opérations sur le localStorage dans une fonction [connect()](web/src/services/helpers/connect.ts). Cette fonction retourne un objet qui se sauvegarde sur le localStorage à chaque opération fondamentale (get, set). Nous avons réalisé cette abstraction en réponse à la redondence des appels au localStorage lors des opérations sur les listes.

Example :

```typescript
const lists = connect();
lists[0] = {name: 'todo', tasks: [{name: 'Nom'}, content: 'Contenu']}

console.log(localStorage.getItem('lists'))

// $ [{name: 'todo', tasks: [{name: 'Nom'}, content: 'Contenu']}]
```

> \*Ajouts: Ces ajouts n'entrant pas dans le cadre de l'exercice, nous les avons rendus facultatifs. Le client peut fonctionner sans le serveur, qui lui-même peut fonctionner sans bases de données. Il se repliera sur une base de donnée en mémoire écrite par nos soins.

Nous sommes disponibles par mail pour répondre à vos questions.

---

## Démarrer

Lancer le client Web. Web va découvrir automatiquement le serveur Sync si vous le démarrez.

Pour démarrer des instances locales de Web et de Sync:

```bash
$ npm run start:web
$ npm run start:sync # optionnel, si vous voulez synchroniser les listes.
```

Pour démarrer tous les services avec une instance de MongoDB et de Redis:

```bash
docker-compose up
```

## Technologie

Voici les technologies utilisées dans ce projet:

- **Typescript**: Typescript est le language avec lequel à été développé Web et Sync.
- **MongoDB**: MongoDB est la base de donnée utilisée pour les collections Users et Lists. Nous l'avons choisi pour sa simplicité d'utilisation et son excellente intégration avec Node.
- **Redis**: Redis est la base de donnée en mémoire utilisée pour les Sessions.
- **Vue**: Vue est la libraire utilisée pour le client Web. Nous aurions préféré utiliser React mais Vue était un critère de la consigne.

#### Folder structure

```python
/todo
├── sync                     # Package de l'API Sync
│   ├── sync                    # Domaine de synchronisation
│   │   └── lists               # Répertoires de Lists
│   ├── identity                # Domaine d'identité
│   │   ├── session             # Répertoires de Sessions
│   │   └── user                # Répertoires de User
│   ├── helpers                 # Types et erreurs partagés.
│   └── test                    # Utilitaires de tests partagés
└── web                      # Package du client Web
    ├── api                     # API SDKs
    ├── assets                  # Ressources statiques
    ├── components              # Composants Vue
    │   ├── Authentication      # Composants liés à l'authentification
    │   ├── Shared              # Composants de base (boutons, inputs...)
    │   └── TodoList            # Composants propres à l'éditeur
    ├── services                # Logique métier locale
    └── store                   # Gestion de l'état
        └── modules             # Modules de gestion d'état
```

#### Architecture

<img width="270" align="right" src="https://user-images.githubusercontent.com/18191750/80292213-258a1e00-8755-11ea-8613-5336846eb69f.png" />

La consigne de l'exercice exige l'utilisation du stockage local du navigateur pour stocker les données. Pour répondre à cette exigence, nous avons rendu le serveur de synchronisation optionnel. Le serveur de synchronisation stocke ses données en mémoire ou dans MongoDB. Cela dépend de la découverte éventuelle d'instances de MongoDB. Un [diagramme de classe](https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgICBjbGFzcyBTeW5jU2VydmljZSB7XG4gICAgICAgIDw8IHNlcnZpY2UgPj5cbiAgICAgICAgK3N5bmNocm9uaXplKHVzZXJFbWFpbCwgbGlzdHMpXG4gICAgICAgICtnZXRMaXN0cyh1c2VyRW1haWwpOiBMaXN0W11cbiAgICAgIH1cblxuICAgICAgY2xhc3MgTGlzdE1vZGVsIHtcbiAgICAgICAgPDwgaW50ZXJmYWNlID4-XG4gICAgICAgICt1cHNlcnQodXNlckVtYWlsLCBsaXN0cylcbiAgICAgICAgK2ZpbmQodXNlckVtYWlsKTogTGlzdFtdXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIEluTWVtb3J5TGlzdE1vZGVsIHtcbiAgICAgICAgLXN0b3JhZ2VPYmplY3Q6IG9iamVjdFxuICAgICAgICArdXBzZXJ0KHVzZXJFbWFpbCwgbGlzdHMpXG4gICAgICAgICtmaW5kKHVzZXJFbWFpbCk6IExpc3RbXVxuICAgICAgfVxuXG4gICAgICBjbGFzcyBNb25nb0xpc3RNb2RlbCB7XG4gICAgICAgIC1jbGllbnQ6IE1vbmdvQ2xpZW50XG4gICAgICAgICt1cHNlcnQodXNlckVtYWlsLCBsaXN0cylcbiAgICAgICAgK2ZpbmQodXNlckVtYWlsKTogTGlzdFtdXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIExpc3RNb2RlbEZhY3Rvcnkge1xuICAgICAgICBnZXRMaXN0TW9kZWwoKTogTGlzdE1vZGVsXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIExpc3Qge1xuICAgICAgICB0YXNrczogb2JqZWN0W11cbiAgICAgIH1cblxuICAgICAgTGlzdE1vZGVsIDx8LS0gSW5NZW1vcnlMaXN0TW9kZWwgOiBpbXBsZW1lbnRcbiAgICAgIExpc3RNb2RlbCA8LS1cdE1vbmdvTGlzdE1vZGVsIDogaW1wbGVtZW50XG4gICAgICBMaXN0TW9kZWwgPC0tXHRMaXN0TW9kZWxGYWN0b3J5IDogaW5zdGFudGlhdGVcblxuICAgICAgSW5NZW1vcnlMaXN0TW9kZWwgLi5cdExpc3RcbiAgICAgIE1vbmdvTGlzdE1vZGVsIC4uXHRMaXN0XG5cbiAgICAgIFN5bmNTZXJ2aWNlIC0tPlx0XCIxXCIgTGlzdE1vZGVsIDogdXNlXG4gICAgICBTeW5jU2VydmljZSAtLT5cdFwiMVwiIExpc3RNb2RlbCA6IHVzZVxuXG4gICAgICBjbGFzcyBJZGVudGl0eVNlcnZpY2V7XG4gICAgICAgICAgK2NyZWF0ZVVzZXIodXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICthdXRoZW50aWNhdGUodXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICthdXRob3JpemUodG9rZW4pXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgICAgIDw8SW50ZXJmYWNlPj5cbiAgICAgICAgK2NyZWF0ZShlbWFpbCwgcGFzc3dvcmQpIFVzZXJcbiAgICAgICAgK2ZpbmQoZW1haWwpIFVzZXJcbiAgICAgIH1cblxuICAgICAgY2xhc3MgSW5NZW1vcnlVc2VyTW9kZWwge1xuICAgICAgICAtc3RvcmFnZU9iamVjdDogb2JqZWN0XG4gICAgICAgICtjcmVhdGUoZW1haWwsIHBhc3N3b3JkKSBVc2VyXG4gICAgICAgICtmaW5kKGVtYWlsKTogVXNlclxuICAgICAgfVxuXG4gICAgICBjbGFzcyBNb25nb1VzZXJNb2RlbCB7XG4gICAgICAgIC1jbGllbnQ6IE1vbmdvQ2xpZW50XG4gICAgICAgICtjcmVhdGUoZW1haWwsIHBhc3N3b3JkKSBVc2VyXG4gICAgICAgICtmaW5kKGVtYWlsKTogVXNlclxuICAgICAgfVxuXG4gICAgICBjbGFzcyBVc2VyTW9kZWxGYWN0b3J5IHtcbiAgICAgICAgK2dldFVzZXJNb2RlbCgpIFVzZXJNb2RlbFxuICAgICAgfVxuXG4gICAgICBjbGFzcyBVc2VyIHtcbiAgICAgICAgZW1haWw6IHN0cmluZ1xuICAgICAgICBwYXNzd29yZDogc3RyaW5nXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFNlc3Npb25Nb2RlbCB7XG4gICAgICAgICtyZWFkKGlkKSBTZXNzaW9uXG4gICAgICAgICtjcmVhdGUoc2Vzc2lvbikgU2Vzc2lvblxuICAgICAgfVxuXG4gICAgICBjbGFzcyBJbk1lbW9yeVNlc3Npb25Nb2RlbCB7XG4gICAgICAgIC1zdG9yYWdlT2JqZWN0OiBvYmplY3RcbiAgICAgICAgK3JlYWQoaWQpIFNlc3Npb25cbiAgICAgICAgK2NyZWF0ZShzZXNzaW9uKSBTZXNzaW9uXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFJlZGlzU2Vzc2lvbk1vZGVsIHtcbiAgICAgICAgLWNsaWVudDogUmVkaXNDbGllbnRcbiAgICAgICAgK3JlYWQoaWQpIFNlc3Npb25cbiAgICAgICAgK2NyZWF0ZShzZXNzaW9uKSBTZXNzaW9uXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFNlc3Npb25Nb2RlbEZhY3Rvcnkge1xuICAgICAgICArZ2V0U2Vzc2lvbk1vZGVsKCk6IFNlc3Npb25Nb2RlbFxuICAgICAgfVxuXG4gICAgICBjbGFzcyBTZXNzaW9uIHtcbiAgICAgICAgaWQ6IHN0cmluZ1xuICAgICAgICBlbWFpbDogc3RyaW5nXG4gICAgICB9XG5cbiAgICAgIFVzZXJNb2RlbCA8fC0tIEluTWVtb3J5VXNlck1vZGVsIDogaW1wbGVtZW50XG4gICAgICBVc2VyTW9kZWwgPC0tXHRNb25nb1VzZXJNb2RlbCA6IGltcGxlbWVudFxuICAgICAgVXNlck1vZGVsIDwtLVx0VXNlck1vZGVsRmFjdG9yeSA6IGluc3RhbnRpYXRlXG5cbiAgICAgIEluTWVtb3J5VXNlck1vZGVsIC4uXHRVc2VyXG4gICAgICBNb25nb1VzZXJNb2RlbCAuLlx0VXNlclxuXG4gICAgICBTZXNzaW9uTW9kZWwgPHwtLSBJbk1lbW9yeVNlc3Npb25Nb2RlbCA6IGltcGxlbWVudFxuICAgICAgU2Vzc2lvbk1vZGVsIDx8LS0gUmVkaXNTZXNzaW9uTW9kZWwgOiBpbXBsZW1lbnRcbiAgICAgIFNlc3Npb25Nb2RlbCA8LS1cdFNlc3Npb25Nb2RlbEZhY3RvcnkgOiBpbnN0YW50aWF0ZVxuXG4gICAgICBJbk1lbW9yeVNlc3Npb25Nb2RlbCAuLlx0U2Vzc2lvblxuICAgICAgUmVkaXNTZXNzaW9uTW9kZWwgLi5cdFNlc3Npb25cblxuICAgICAgXG5cbiAgICAgIElkZW50aXR5U2VydmljZSAtLT5cdFwiMVwiIFVzZXJNb2RlbCA6IHVzZVxuICAgICAgSWRlbnRpdHlTZXJ2aWNlIC0tPlx0XCIxXCIgU2Vzc2lvbk1vZGVsIDogdXNlXG5cbiAgICAgIDw8aW50ZXJmYWNlPj4gU2Vzc2lvbk1vZGVsXG4gICAgICA8PHNlcnZpY2U-PiBJZGVudGl0eVNlcnZpY2UiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCIsImZvbnRGYW1pbHkiOiJTRiBQcm8gRGlzcGxheSIsInN0YXRlIjp7ImZvcmtXaWR0aCI6MC40fX19)
illustre le mécanisme de sélection de base de donnée.

## Termes

- `web` est le client web
- `sync` est un paquet qui expose un API REST pour synchroniser les todo-lists entre plusieurs clients/hôtes
- Une `to-do list` est un ensemble de `tasks`
- Une `task` est un travail à réaliser dans un temps déterminé
- Une `subtask` est la découpe d'une tâche
