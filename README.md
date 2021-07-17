## express-mvc-esm

Node.js Express MVC boilerplate with ESM support.

## Requirement

This project starter should be working as expected with the following minimal version of Node/NPM, respectively:

| Dependency |   Version   |
| ---------- | :---------: |
| Node       | >= v14.15.1 |
| NPM        | >= v6.14.8  |

## Quick Start

1. Clone the git repository into your new project folder and install required dependencies by running the command below:

```bash
# cloning git repository into `my-project` folder
git clone --depth=1 https://github.com/borisding/express-mvc-esm.git my-project

# install project dependencies
cd my-project && npm install
```

2. Running application by executing one of the following scripts:

**Development**

```bash
npm run dev
```

**Production**

Copy `.env.development` to `./config` folder as `.env` for production usage:

```bash
cp config/.env.development config/.env
```

Change environment variables in `.env` to serve your app. Avoid using the same port for both development and production.

```bash
# build for production ready and start server
npm run build && npm start
```

To run tests:

**Test**

```bash
npm test
```

## Configuration

- `dotenv` and `dotenv-expand` packages are used in conjunction with `webpack.DefinePlugin` plugin for managing environment variables. The entire logic can be found in `./env.loader.js` file. The .env is environment sepecific and is loaded based on the defined `process.env.NODE_ENV` value:

| File name          | NODE_ENV    |  In Source Control   |
| ------------------ | ----------- | :------------------: |
| `.env.test`        | test        |         Yes          |
| `.env.development` | development |         Yes          |
| `.env`             | production  | No (Need to add new) |

## License

MIT
