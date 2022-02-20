# React Boilerplate Web

## What's in here

- Buildchain using [Parcel](https://parceljs.org/)
- [SCSS](https://sass-lang.com/) with CSS Modules
- eslint using standardjs config
- minimal [Jest](https://jestjs.io/) config
- minimal Pipelinefile (`.gitlab-ci.yml`)
- i18n using [i18next](https://www.i18next.com/)
- React Router
- Redux, Redux Saga, etc.
- Forms using [React Hook Forms](https://react-hook-form.com/)

### Note on Openapi:
~~The Api Definition `openapi/openapi.yml` lies in the Frontend Repo, because the Backend Repo includes the built Frontend as a dependecy (including the `openapi.yml`).~~

In recent projects we took the following approach:  
The openapi spec file lives in it's own repo. The buildchain for that repo assembles and deploys bindings for the API for the backend and frontend via our internal maven repo or npm registry, respectively.
So to use the bindings for the frontend, you just `yarn add <whatever-the-package-is-called>`.
Make sure you configured `yarn` to be able to use the packages from the internal registry as follows.

#### Configure `yarn` for internal npm registry:

In most cases, the openapi part of your project 
will deploy npm packages into the gitlab npm registry
in the appropriate project scope.
Refer to <https://docs.gitlab.com/ee/user/packages/npm_registry/#project-level-npm-endpoint>
for details of how to authenticate with this registry and use the packages.
Beside using `npm config set ...` or `yarn config set ...`, you can also create an `.npmrc` file in your project directory to store the config.
If this does not help, simply ask someone working on the same project to help you out.

## Requirements

- node dubnium (v10.17.0) (installation via nvm is recommended, newer versions should work as well)
- yarn (v1.19.1)

## Setup

- `yarn` (or `yarn install`)

## Development Build

- `yarn dev` open dev server on `http://localhost:1234`

## Further Scripts

- `yarn build` - production build
- `yarn lint` - run eslint
- `yarn test` - run jest (unit tests)
- `yarn clean` - clear build output

### Note on production build
The production build (`yarn build`) uses `parcel` with `--experimental-scope-hoisting`.
Should you experience strange errors in the production build, try to remove that flag.
