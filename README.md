# Striso Studio

See https://strisostudio.web.app

This Github repository contains the code for the Striso Studio web app and the custom web components. This application is build using [Nuxt](https://nuxtjs.org), which uses the [Vue](https://vuejs.org/) framework.

Although Vue is a powerfull, developer-friendly framework that is easy to use, it requires you to use modern webdevelopment tooling which can be overwhelming. Additionaly, the file structure is different that you might be familiar with. If modern web development is too complicated, I recommend you start with using the custom web components or the app directly.

## Prerequisites

- [nodejs](https://nodejs.org/en/)
- [Visual Code Studio](https://code.visualstudio.com/) (recommended)

## Getting Started

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Changelog

### Ideas

- Integrate Web Components with Faust IDE to enable realtime Striso synth editing
    - Nice to have: compile in the cloud and get new firmware back.
- Integrate (refactor) Striso Config editor
- Chord Explorer tool
- Musical Ear Training game (guess the notes of a popular melody)
- DCompose lessons; learning DCompose with interactive elements
- FP30 synth (send Striso to Roland FP30)

### 0.9.0 - 5 july 2022 

Initial release after a few weeks of development. 
