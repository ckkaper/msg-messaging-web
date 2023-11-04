# Skeleton Service

## Summary

A skeleton microservice part of a bigger microservices platform aiming to seamlesly and easly generate new services focused on business logic.

-   What the project contains
-   How is structured
-   What does it do
-   What features it supports
-   name some of the design patterns used

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
docker build -t skeleton-svc .

docker run -p 127.0.0.1:3000:3000 skeleton-svc
```

## TODO: How to Use

List how to use this specific repo.

-   How to add a new service
-   How to leverage the different design patterns ( repository, strategy )
-   How to use the config files
-   How to run docker
-   How to add the controller

## Add used npm packages and technologies, also explain the benefits of each of them.

[Nodemon](https://www.npmjs.com/package/nodemon) automatically restarts the application after changes inside the tracked files are detected during
development.

[dotenv](https://www.npmjs.com/package/dotenv) Easily read environmental variables from `.env` file.

[mockaroo](https://www.mockaroo.com/) Generate mock data for a specified format.

[chai](https://www.npmjs.com/package/chai) Easy to use and readable assertions for UTs.

[mocha](https://www.npmjs.com/package/mocha) Provides basic test suite javascript functionality.

[nyc](https://www.npmjs.com/package/nyc) Tool to generate coverage reports for Javascript/Typescript..

[mocha](https://www.npmjs.com/package/mocha) Provides basic test suite javascript functionality.

[winston](https://www.npmjs.com/package/winston) famous logging library providing json formated logs
