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

**Environment variables**

Copy `.env.example` template into `.env` file. Please do not commit .env to the git repo.

```bash
cp .env.example .env
```

Please note that only env variables that are prefixed with `APP_` will be stringified.

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

## Project Structure

```
├── app
| ├── controllers                       # contains controller files
| ├── helpers                           # contains app helpers files
| ├── middleware                        # contains express middleware files
| ├── models                            # contains models
| ├── routers                           # contains routers with mounted controller methods
| ├── app.js                            # express app file
| └── bootstrap.js                      # bootstrap file to start app
| └── config.js                         # app configuration file
|── assets                              # contains asset files (scripts, styles, views)
├── internal                            # internal stuff such as tooling related
├── public                              # contains static files, include built files
| ├── build                             # contains built script and style files
| └── favicon.ico                       # favicon file
├── storage                             # contains logs and/or other resources
| └── logs                              # logs folder
├── tests                               # contains tests
├── .env.example                        # .env template file
├── .gitignore                          # git ignore file
├── .prettierignore                     # prettier ignore file
├── .stylelintignore                    # stylelint ignore file
├── eslint.config.cjs                   # eslint configuration file
├── babel.config.cjs                    # babel configuration file
├── jest.config.cjs                     # jest configuration file
├── jsconfig.json                       # editor config file, to align with aliases
├── main.js                             # main entry file for bootstrapping
├── postcss.config.cjs                  # postcss configuration file
├── prettier.config.cjs                 # prettier configuration file
├── stylelint.config.cjs                # stylelint configuration file
├── tailwind.config.js                  # tailwindcss configuration file
└── webpack.config.js                   # webpack configuration file
```

## Misc

**Import Aliases**

This starter utilizes Node.js imports. For existing import aliases, please refer to `imports` field in package.json file.

**Sessions**

By default, `cookie-session` is used in this starter. It means session data will be stored in cookie on client side with limited size. To store session data on server side, please use `express-session` with [compatible session stores](https://github.com/expressjs/session?tab=readme-ov-file#compatible-session-stores), such as Redis.

**CSRF Token**

`_csrfToken` needs to be part of the `req.body` in oder to making the request sent successfully.

**Styling**

[Tailwindcss](https://tailwindcss.com/) is used as default CSS framework in this starter.

**VS Code Plugins**

Some plugins for better DX and productivity:

1. Eta syntax highlighting: https://marketplace.visualstudio.com/items?itemName=shadowtime2000.eta-vscode
2. Tailwind CSS IntelliSense: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
3. Prettier Formatter: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
4. ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
5. Stylelint: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint

## License

MIT
