<div align="center">
  <img src="./src/images/logo.svg" width="420" height="auto"/>
</div>

<br/>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Rick and Morty UI

This project implements a user interface for the Rick and Morty [API](https://rickandmortyapi.com/documentation), using Reactjs (Typescript, ReduxToolkit, Hooks), and Axios.

It's as an experimental project to test the brillian work of [evanw](https://github.com/evanw/esbuild) on [esbuild](https://esbuild.github.io/), although primarily used as a webpack loader, since opted to use Webpack dev server for [HMR](https://webpack.js.org/guides/hot-module-replacement/), as otherwise it'd require some extra work.

Also, a test-drive for Tailwindcss, used in the project by css class composition.

## Requirements

You'll need `Nodejs`, as developed over `v12`. Assumed [YARN](https://yarnpkg.com/) as the prefered package manager througout the documentation, feel free to use [NPM](https://www.npmjs.com/) by changing the commands in accordance.

Pull the repository to your local and install the dependencies by:

```zsh
yarn install
```

## Development

To do development work, you  an fire the webpack-dev-server by:

```
yarn start
```

## Logo

<div>Repository logo copied from <a href="https://logos.fandom.com/wiki/Rick_and_Morty" title="Freepik">Logopedia</a></div>