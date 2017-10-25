# gulp-es6-less-boilerplate

basic template project with gulp , rollup and babel

## Technology stack

- gulp
- npm
- rollup
- babel 6
- less
- jshint

<!-- 
- Jasmine
- Karma
 -->

<!--
## Features

✔ modularize gulp tasks

✔ Example: counter example dependence on flux

✔ rollup + babel

✔ production and development builds
-->

## Useage

Yout need Node.js and npm, You should also have git installed, but it's not mandatory.
Clone the repository (or download the ZIP file)

```shell
git clone git@github.com:y1j2x34/gulp-es6-less-boilerplate.git
```

install repository

```shell
npm install
```

Run a development build

```shell
npm run build
```

production build

```shell
npm run build -- --env=release --version=1.0.0
```

spy on files in /src and run development builds on file change

```shell
npm run watch
```

show help infomation

```shell
npm run help
```

The build task will compile your ES6 code into ES5 , less into css and then concatenate them into a single file separately. 
Development builds will also generate sourcemaps and copy results into dist/.
Production builds will only compile and concatenate source code without generating sourcemap and minify results.

## License

This project is released under MIT License
