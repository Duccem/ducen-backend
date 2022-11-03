# Ducen Backend

- Version: 0.0.7
- Author: José Véliz [(Duccem)](https://github.com/Duccem)

## About

This is the backend of the product Ducen, an software of team and projects management,
this backend is compound by the main rest api that manage the auth, resource life cycle
etc. And have other microllits services that help the system to manage sub task.

## Installation

Ducen is a nodejs project, so you can install it with

```bash
$ npm install --save
```

If you want to run in mode production first at all you have to build the project

```bash
$ npm run build
```

in case you want build other lib or app inside the project you can indicate it

```bash
$ npm run build --project $project-name
```

Once you have been built the project you can start the dist

```bash
$ npm run start:prod
```

### Others commands

Others useful commands are the dev start command, these commands have to modes, the local that correspond to local development and the dev
flag that allow you to connect to databases on cloud dev environment, as same the command above you can pass them the ` --project $project` flag

```bash
$ npm run start:local
$ npm run start:dev
```

On other hand you can use the lint and test and pass them the `--project $project` flag

```bash
$ npm run lint
$ npm run test
$ npm run test:watch
$ npm run test:cov
$ npm run test:debug
$ npm run test:e2e
```

## Architecture

Ducen backend is a monorepo that contain various libs with code useful to run apps as rest api and sockets servers,
this architectures allow to some apps share code important to the domain of Ducen, the architecture have the follow structure.

The structure folder follow the DDD and Hexagonal architecture philosophy (Domain, Services/Application, Infrastructure/Adaptors).

```
/
|
- apps/ -------------> Contains the apps that run on server
|
|  - main-api/  ------> Is the principal REST API service
|
|  - event-handler/ --> Socket and events services that manage the async system
|
|  - cron-scheduler/ -> Cron Jobs schedulers task

- libs/ --------------> Shared code libraries that contain classes and implementations that can be use by all services
|
|  - adaptors/ -------> The implementations of ports and adaptors DDD (database, cache, queue, etc.)
|
|  - core/ -----------> Domain business logic and code, the entities and interfaces
|
|  - share/ ----------> Utils classes that can be shared by the others libs to
```

## Other links

- [Changelog](https://github.com/Duccem/ducen-backend/blob/main/CHANGELOG.md)
- [Main API](https://github.com/Duccem/ducen-backend/tree/main/apps/main-api)

## Contributing

- [José Véliz (Duccem)](https://github.com/Duccem)

## License

MIT
