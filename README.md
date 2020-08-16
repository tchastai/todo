## Introduction

Todo is a to-do list editor. It stores its data in-memory or in a database, depending on the context. This is possible thanks to the [Dependency Inversion Principle](https://martinfowler.com/articles/dipInTheWild.html).

<img alt="Screenshot" src="https://user-images.githubusercontent.com/18191750/80287762-77ba4780-8733-11ea-9bbf-aa4480e3197d.png" />

## Getting started

Start the "web" client. The client will discover the optional "sync" server if you start it.

To start `web` and `sync` instances for development:

```bash
$ npm run start:web
$ npm run start:sync # optional, if you want synchronization
```

To start the services with Mongo and Redis instances:

```bash
docker-compose up
```

## Technology

Let's look at the technologies used in this project:

- **Typescript**: Typescript is the language used in both the server and the client.
- **MongoDB**: MongoDB is the database used for the users and the lists. We chose it for its simplicity and its strong integration with Node.
- **Redis**: Redis is the in-memory database used to store the sessions.
- **Vue**: Vue is the library used for the web client. We would have preferred to use React but Vue was a requirement of the assignment.

#### Folder structure

```python
/todo
├── sync                     # API server package
│   ├── sync                    # Synchronization domain
│   │   └── lists               # List repositories
│   ├── identity                # Identity domain
│   │   ├── session             # Session repositories
│   │   └── user                # User repositories
│   ├── helpers                 # Shared types and errors
│   └── test                    # Shared test utilities
└── web                      # Web Vue client
    ├── api                     # API SDKs
    ├── assets                  # Static assets
    ├── components              # Vue components
    │   ├── Authentication      # Components related to authentication
    │   ├── Shared              # Base components (buttons, inputs...)
    │   └── TodoList            # Components related to the editor view
    ├── services                # Local services and logic
    └── store                   # Application state management
        └── modules             # Store namespaces
```

#### Architecture

<img width="270" align="right" src="https://user-images.githubusercontent.com/18191750/80292213-258a1e00-8755-11ea-8613-5336846eb69f.png" />

The school assignment requires using the browser's local storage to store data. To meet this requirement, we made the sync server optional. The sync server store its data in memory or in MongoDB. It depends on the eventual discovery of MongoDB instances. A [class diagram](https://mermaid-js.github.io/mermaid-live-editor/#/view/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgICBjbGFzcyBTeW5jU2VydmljZSB7XG4gICAgICAgIDw8IHNlcnZpY2UgPj5cbiAgICAgICAgK3N5bmNocm9uaXplKHVzZXJFbWFpbCwgbGlzdHMpXG4gICAgICAgICtnZXRMaXN0cyh1c2VyRW1haWwpOiBMaXN0W11cbiAgICAgIH1cblxuICAgICAgY2xhc3MgTGlzdE1vZGVsIHtcbiAgICAgICAgPDwgaW50ZXJmYWNlID4-XG4gICAgICAgICt1cHNlcnQodXNlckVtYWlsLCBsaXN0cylcbiAgICAgICAgK2ZpbmQodXNlckVtYWlsKTogTGlzdFtdXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIEluTWVtb3J5TGlzdE1vZGVsIHtcbiAgICAgICAgLXN0b3JhZ2VPYmplY3Q6IG9iamVjdFxuICAgICAgICArdXBzZXJ0KHVzZXJFbWFpbCwgbGlzdHMpXG4gICAgICAgICtmaW5kKHVzZXJFbWFpbCk6IExpc3RbXVxuICAgICAgfVxuXG4gICAgICBjbGFzcyBNb25nb0xpc3RNb2RlbCB7XG4gICAgICAgIC1jbGllbnQ6IE1vbmdvQ2xpZW50XG4gICAgICAgICt1cHNlcnQodXNlckVtYWlsLCBsaXN0cylcbiAgICAgICAgK2ZpbmQodXNlckVtYWlsKTogTGlzdFtdXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIExpc3RNb2RlbEZhY3Rvcnkge1xuICAgICAgICBnZXRMaXN0TW9kZWwoKTogTGlzdE1vZGVsXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIExpc3Qge1xuICAgICAgICB0YXNrczogb2JqZWN0W11cbiAgICAgIH1cblxuICAgICAgTGlzdE1vZGVsIDx8LS0gSW5NZW1vcnlMaXN0TW9kZWwgOiBpbXBsZW1lbnRcbiAgICAgIExpc3RNb2RlbCA8LS1cdE1vbmdvTGlzdE1vZGVsIDogaW1wbGVtZW50XG4gICAgICBMaXN0TW9kZWwgPC0tXHRMaXN0TW9kZWxGYWN0b3J5IDogaW5zdGFudGlhdGVcblxuICAgICAgSW5NZW1vcnlMaXN0TW9kZWwgLi5cdExpc3RcbiAgICAgIE1vbmdvTGlzdE1vZGVsIC4uXHRMaXN0XG5cbiAgICAgIFN5bmNTZXJ2aWNlIC0tPlx0XCIxXCIgTGlzdE1vZGVsIDogdXNlXG4gICAgICBTeW5jU2VydmljZSAtLT5cdFwiMVwiIExpc3RNb2RlbCA6IHVzZVxuXG4gICAgICBjbGFzcyBJZGVudGl0eVNlcnZpY2V7XG4gICAgICAgICAgK2NyZWF0ZVVzZXIodXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICthdXRoZW50aWNhdGUodXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICthdXRob3JpemUodG9rZW4pXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFVzZXJNb2RlbCB7XG4gICAgICAgIDw8SW50ZXJmYWNlPj5cbiAgICAgICAgK2NyZWF0ZShlbWFpbCwgcGFzc3dvcmQpIFVzZXJcbiAgICAgICAgK2ZpbmQoZW1haWwpIFVzZXJcbiAgICAgIH1cblxuICAgICAgY2xhc3MgSW5NZW1vcnlVc2VyTW9kZWwge1xuICAgICAgICAtc3RvcmFnZU9iamVjdDogb2JqZWN0XG4gICAgICAgICtjcmVhdGUoZW1haWwsIHBhc3N3b3JkKSBVc2VyXG4gICAgICAgICtmaW5kKGVtYWlsKTogVXNlclxuICAgICAgfVxuXG4gICAgICBjbGFzcyBNb25nb1VzZXJNb2RlbCB7XG4gICAgICAgIC1jbGllbnQ6IE1vbmdvQ2xpZW50XG4gICAgICAgICtjcmVhdGUoZW1haWwsIHBhc3N3b3JkKSBVc2VyXG4gICAgICAgICtmaW5kKGVtYWlsKTogVXNlclxuICAgICAgfVxuXG4gICAgICBjbGFzcyBVc2VyTW9kZWxGYWN0b3J5IHtcbiAgICAgICAgK2dldFVzZXJNb2RlbCgpIFVzZXJNb2RlbFxuICAgICAgfVxuXG4gICAgICBjbGFzcyBVc2VyIHtcbiAgICAgICAgZW1haWw6IHN0cmluZ1xuICAgICAgICBwYXNzd29yZDogc3RyaW5nXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFNlc3Npb25Nb2RlbCB7XG4gICAgICAgICtyZWFkKGlkKSBTZXNzaW9uXG4gICAgICAgICtjcmVhdGUoc2Vzc2lvbikgU2Vzc2lvblxuICAgICAgfVxuXG4gICAgICBjbGFzcyBJbk1lbW9yeVNlc3Npb25Nb2RlbCB7XG4gICAgICAgIC1zdG9yYWdlT2JqZWN0OiBvYmplY3RcbiAgICAgICAgK3JlYWQoaWQpIFNlc3Npb25cbiAgICAgICAgK2NyZWF0ZShzZXNzaW9uKSBTZXNzaW9uXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFJlZGlzU2Vzc2lvbk1vZGVsIHtcbiAgICAgICAgLWNsaWVudDogUmVkaXNDbGllbnRcbiAgICAgICAgK3JlYWQoaWQpIFNlc3Npb25cbiAgICAgICAgK2NyZWF0ZShzZXNzaW9uKSBTZXNzaW9uXG4gICAgICB9XG5cbiAgICAgIGNsYXNzIFNlc3Npb25Nb2RlbEZhY3Rvcnkge1xuICAgICAgICArZ2V0U2Vzc2lvbk1vZGVsKCk6IFNlc3Npb25Nb2RlbFxuICAgICAgfVxuXG4gICAgICBjbGFzcyBTZXNzaW9uIHtcbiAgICAgICAgaWQ6IHN0cmluZ1xuICAgICAgICBlbWFpbDogc3RyaW5nXG4gICAgICB9XG5cbiAgICAgIFVzZXJNb2RlbCA8fC0tIEluTWVtb3J5VXNlck1vZGVsIDogaW1wbGVtZW50XG4gICAgICBVc2VyTW9kZWwgPC0tXHRNb25nb1VzZXJNb2RlbCA6IGltcGxlbWVudFxuICAgICAgVXNlck1vZGVsIDwtLVx0VXNlck1vZGVsRmFjdG9yeSA6IGluc3RhbnRpYXRlXG5cbiAgICAgIEluTWVtb3J5VXNlck1vZGVsIC4uXHRVc2VyXG4gICAgICBNb25nb1VzZXJNb2RlbCAuLlx0VXNlclxuXG4gICAgICBTZXNzaW9uTW9kZWwgPHwtLSBJbk1lbW9yeVNlc3Npb25Nb2RlbCA6IGltcGxlbWVudFxuICAgICAgU2Vzc2lvbk1vZGVsIDx8LS0gUmVkaXNTZXNzaW9uTW9kZWwgOiBpbXBsZW1lbnRcbiAgICAgIFNlc3Npb25Nb2RlbCA8LS1cdFNlc3Npb25Nb2RlbEZhY3RvcnkgOiBpbnN0YW50aWF0ZVxuXG4gICAgICBJbk1lbW9yeVNlc3Npb25Nb2RlbCAuLlx0U2Vzc2lvblxuICAgICAgUmVkaXNTZXNzaW9uTW9kZWwgLi5cdFNlc3Npb25cblxuICAgICAgXG5cbiAgICAgIElkZW50aXR5U2VydmljZSAtLT5cdFwiMVwiIFVzZXJNb2RlbCA6IHVzZVxuICAgICAgSWRlbnRpdHlTZXJ2aWNlIC0tPlx0XCIxXCIgU2Vzc2lvbk1vZGVsIDogdXNlXG5cbiAgICAgIDw8aW50ZXJmYWNlPj4gU2Vzc2lvbk1vZGVsXG4gICAgICA8PHNlcnZpY2U-PiBJZGVudGl0eVNlcnZpY2UiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCIsImZvbnRGYW1pbHkiOiJTRiBQcm8gRGlzcGxheSIsInN0YXRlIjp7ImZvcmtXaWR0aCI6MC40fX19)
provides an overview of the selection mechanism.

## Terms

- `web` is the web client
- `sync` is a package that exposes a REST API to synchronize to-do lists between multiple clients
- A `to-do list` is a set of tasks
- A `task` is a piece of work that needs to be done
- A `subtask` is a subset of a task
