## express-mvc-esm

Node.js Express MVC boilerplate with ESM support.

## Requirement

This project starter should be working as expected with the following minimal version of Node/NPM, respectively:

| Dependency |   Version   |
| ---------- | :---------: |
| Node       | >= v20.17.0 |
| NPM        | >= v10.8.2  |

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

## Project Structure

```
├── app
| ├── controllers                       # contains controller files
| ├── index.js                          # app entry file
| ├── middleware                        # contains express middleware files
| ├── models                            # contains models
| ├── routers                           # contains routers with mounted controller methods
| └── server.js                         # express server
├── assets
| ├── jest                              # contains jest testing framework assets
| ├── scripts                           # contains frontend script files
| ├── styles                            # contains frontend style files
| └── views                             # contains eta template files (layouts, pages partials)
├── babel.config.cjs                    # babel configuration file
├── config                              # contains environment variables
├── env.loader.js                       # environment variables loader
├── index.js                            # main entry file for bootstrapping
├── jest.config.cjs                     # jest configuration file
├── postcss.config.cjs                  # postcss configuration file
├── prettier.config.cjs                 # prettier configuration file
├── public                              # contains public assets and built files
| ├── build                             # contains built script and style files
| └── favicon.ico                       # favicon file
├── storage                             # contains logs and/or other resources
| └── logs
├── stylelint.config.cjs                # stylelint configuration file
├── tests                               # contains tests
├── utils                               # contains util files
| ├── env.js                            # util for environment related
| ├── index.js                          # re-exported utils
| ├── logger.js                         # app logger
| └── paths.js                          # pre-defined project paths
└── webpack.config.js                   # webpack configuration file
```

## License

MIT
