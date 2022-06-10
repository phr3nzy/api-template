# Fastify API Template

A template for an API using Fastify. Written in TypeScript.

## Contributions

1. Clone the repo

2. Checkout into a new branch with the proper name (feature/xx, refactor/xx, chore/xx... etc.)

3. Write your code + tests (required) and/or update documentation

4. Push changes to the remote branch

5. Create a PR and notify a maintainer and enjoy your day!

## Important Docs

- [Fastify](https://fastify.io/)
- [Encapsulation](https://www.fastify.io/docs/latest/Encapsulation/)
- [Routes](https://www.fastify.io/docs/latest/Routes/)
- [Plugins](https://www.fastify.io/docs/latest/Plugins/)
- [Logging](https://www.fastify.io/docs/latest/Logging/)
- [Validation & Serialization](https://www.fastify.io/docs/latest/Validation-and-Serialization/)
- [Hooks](https://www.fastify.io/docs/latest/Hooks/)
- [Swagger Specification](https://swagger.io/specification/)
- [JSON Schema Specification](https://json-schema.org/understanding-json-schema/index.html)

## Project Structure

```bash
.
├── .github # Github specific files (dependabot, workflows... etc.)
├── .husky # husky dir (Readonly)
├── data # contains data for seeding the data
├── server # contains the main files for the backend
│   ├── config # stores configurations (server, logger, env vars... etc.)
│   ├── models # Objection.js models
│   ├── plugins # Custom plugins (auth, security, cache, db... etc.)
│   ├── routes # routes must be place here and versioned
│   │   └── v1 # example version
│   │       ├── accounts # exports subroutes under '/accounts/'
│   │       │   ├── index.js # exports routes login, register and token (and others)
│   │       │   ├── login # example route, mapped to '/api/v1/accounts/login'
│   │       │   │   ├── index.js
│   │       │   │   └── spec.json # JSON schema spec of the login route
│   │       │   ├── register # example route, mapped to '/api/v1/accounts/register'
│   │       │   │   ├── index.js
│   │       │   │   └── spec.json # JSON schema spec of the register route
│   │       │   └── token # example route, mapped to '/api/v1/accounts/token'
│   │       │       ├── index.js
│   │       │       └── spec.json # JSON schema spec of the token route
│   │       └── index.js # exports accounts routes (and others)
│   └── static # contains static assets (robots.txt)
└── tests # written tests go here
```

## Requirements

- Node.js
- Optional: `docker` & `docker-compose`

## Development

```bash
$ yarn dev
# run in development

$ yarn start
# run in production

$ yarn lint
# check for errors

$ yarn fix
# fix any errors

$ yarn test
# run tests
```

### Running tests locally

Most tests are ran using our CI (GitHub Actions), but to replicate testing, run the following:

```bash
$ docker-compose -f docker-compose.ci.yml up -d
# should download the images and run them in their respective ports

$ export $(cat .env.testing) && npm run test
# inject the testing env vars and run tests
```

## Environment

See [.env.template](./.env.template)

## License

See [LICENSE.md](./LICENSE.md)
