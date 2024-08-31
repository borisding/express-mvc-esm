## express-mvc-esm

Node.js Express starter for old school Model–view–controller (MVC) pattern, with ESM support.

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

```bash
# build for production ready and start server
npm run build && npm start
```

To run tests:

**Test**

```bash
npm test
```

## Environment variables

Copy `.env.example` template into `.env` file. Please do not commit .env to the git repo.

```bash
cp .env.example .env
```

## Project Structure

```
├── app
| ├── controllers                       # contains controller files
| ├── helpers                           # contains app helpers files
| ├── middleware                        # contains express middleware files
| ├── models                            # contains models
| ├── routers                           # contains routers with mounted controller methods
| ├── views                             # contains eta template files (layouts, pages partials)
| ├── config.js                         # app configuration file
| ├── index.js                          # app entry file
| └── server.js                         # express server
├── assets
| ├── scripts                           # contains frontend script files
| ├── styles                            # contains frontend style files
├── babel.config.cjs                    # babel configuration file
├── index.js                            # main entry file for bootstrapping
├── jest.config.cjs                     # jest configuration file
├── jsconfig.json                       # editor config file, to align with aliases
├── postcss.config.cjs                  # postcss configuration file
├── prettier.config.cjs                 # prettier configuration file
├── static                              # contains static files, include built files
| ├── build                             # contains built script and style files
| └── favicon.ico                       # favicon file
├── storage                             # contains logs and/or other resources
| └── logs
├── stylelint.config.cjs                # stylelint configuration file
├── tests                               # contains tests
| ├── index.js                          # utils index file
└── webpack.config.js                   # webpack configuration file
```

## Import Aliases

This starter utilizes Node.js imports. For existing import aliases, please refer to `imports` field in package.json file.

## License

MIT
