<div align="center">
  <img src="./src/images/logo-repo.svg" width="420" height="auto"/>
</div>

<br/>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Rick and Morty UI

This project implements a user interface for the Rick and Morty [API](https://rickandmortyapi.com/documentation), using Reactjs (Typescript, ReduxToolkit, Hooks), and Axios. See it in action [here!](https://bold-glitter-7607.on.fleek.co/)

It's as an experimental project, that tests the brillian work of [evanw](https://github.com/evanw/esbuild) on [esbuild](https://esbuild.github.io/) (although primarily used as a webpack loader, since opted to use Webpack dev server for [HMR](https://webpack.js.org/guides/hot-module-replacement/), as otherwise it'd require some extra work) and provides a ground to implement some common features.

Also, a test-drive for [Tailwindcss](https://tailwindcss.com/), used in the project as a utility-based CSS framework - it seems to have a lot of traction nowadays, although after years of modern FE devs bashing on older class based and inheritance practices.

Lastly, used the project as a development ground to implement and experiment the creation of a `<Router />`, while we have battle tested libraries for this purpose, as the commonly used [React-router](https://github.com/ReactTraining/react-router), I non-regretly gave it a go: hooks, history pushstate, human readable routes with slugs, regex route support, etc! You'll also find other implementations, that are usually picked from stablished packages, such as a `<Pagination/>`, etc.

## Specs

The goals for the project are simple:
- Responsive UI
- Top bar should present the logo
- Two pages
  - Character list view
    - A filter panel in the left side (search by name, status and gender selectables)
    - Content view
      - Character list paginated (20 items per page)
      - Pagination controller
      - Scroll to top CTA
      - Detail page CTA
  - Character detail view
    - Back button CTA
    - Image
    - Details
    - Episodes panel
      - Selectable episodes (max. of 5 episode tabs)
      - Selected episode details

It **DOES NOT** try to fullfil every use-case *(e.g. server-side middleware to mitigate CORS (it assumes our address is whitelisted by the target endpoint), E2E testing, distribution optimisation, tailwind postcss integration [used the CDN version], etc)*. 

Similarily, while it should work, the project was developed on the grounds of webkit (Chrome, Brave) and Firefox latest, *use as advised*.

## Requirements

You'll need `Nodejs`, as developed over `v12`. Assumed [YARN](https://yarnpkg.com/) as the prefered package manager througout the documentation, feel free to use [NPM](https://www.npmjs.com/) by changing the commands in accordance.

Of course, make sure you are in the `root` directory for the project.

Pull the repository to your local and install the dependencies by:

```zsh
yarn install
```

## Development

To do development work, you  an fire the webpack-dev-server by:

```
yarn start
```

## Tests

Run unit-tests by:

```
yarn test
```

## Build public

Create a public distribution by running:

```
yarn build
```

Obs: You can test the generated static files by running an http-server (optional, you'll need [npx](https://docs.npmjs.com/cli/v7/commands/npx)) e.g:

```
npx http-server ./dist
```

## Public demo

The static site is hosted [@fleek](https://fleek.co/), you can visit the public version of the "hopefully 😅" latest build [here](https://bold-glitter-7607.on.fleek.co/)!

## DockerFile


To build the docker image run the follwing command:

```
docker build -t rickandmortyui .
```

You should find it listed `rickandmortyui`, when:

```
docker ps -a
```

You can check the static build served by mapping the exposed Docker port for the instance of the image `rickandmortyui` to one in your local-machine (as long if available, changed the :8080 in the command to whatever suits you).

```
docker run -p 8080:8080 rickandmortyui
```

Obs: We're assuming that you have Docker installed correctly, if not visit [Docker](https://www.docker.com/get-started) or otherwise, if not interested in Docker feel free to ignore.

## References

[Rick and Morty API](https://rickandmortyapi.com/documentation)

[Esbuild](https://esbuild.github.io/)

## Logo

<div>Repository logo copied from <a href="https://logos.fandom.com/wiki/Rick_and_Morty" title="Freepik">Logopedia</a></div>