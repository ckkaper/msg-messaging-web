# Skeleton Service

## Summary

A skeleton microservice part of a bigger microservices platform aiming to seamlesly and easly generate new services focused on business logic.

### Repository Logic

Provide tha facing web microservice

### Repository Features

-   [Mockaroo](https://www.mockaroo.com/) in order to generate test data.
-   [Typescript](https://www.typescriptlang.org/).
-   [Nodemon](https://www.npmjs.com/package/nodemon) for interactive development during runtime.
-   [Prettier](https://prettier.io/) combined with [eslint](https://eslint.org/) for static analysis and code format.
-   [Mocha](https://mochajs.org/) [Chai](https://www.chaijs.com/) and [Sinon](https://sinonjs.org/) for UTs.
-   [nyc](https://github.com/istanbuljs/nyc) source mapping for code coverage.
-   [winston](https://github.com/winstonjs/winston) a feature rich customizable logger.
-   [socket.io](https://socket.io/) for web socket communication.
-   utilizes the repository pattern for the data layer.

## Prerequisites

### Running locally

-   NodeJs `v14.16.0`
-   npm `v6.14.17`

### Running on a container

-   Have Docker installed

## Installation

Instructions to get ready for the project installation

### Running locally

`npm i`

`npm run start`

### Running tests

`npm run test`

`npm run test:coverage`

Coverage report output: ./coverage/index.html

### Running inside a container

```
docker build -t messaging-web .

docker run --name messaging-web -p 127.0.0.1:3000:3000 messaging-web
```

or use scripts:

```
./build.ps1
```
