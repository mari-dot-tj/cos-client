# Client for coffee ordering system
This is a client side webapplication built with [vue] using the [cos-server].

## Project setup
_From the top-level repository folder:_
```sh
$ npm install
```
## Setting environment variables:

Create a `.env.development.local` file at the top-level reporitory folder. These do not need to be added to the `.gitignore` as they are `.local`. If you are building for production you need to make a `.env.production.local` witch will then be a part of your build.
`.env.development.local` will only be used during development.

- `VUE_APP_BASE_URL` specifies the url to the server where the client makes axios calls.

Following are the `key:value` pairs to fill in the `.env` file(s) (remember no spaces!):
```sh
VUE_APP_BASE_URL=
```

### Compiles and hot-reloads for development
```sh
$ npm run serve
```
In the console you will be told which port your localhost client is running on.

### Compiles and minifies for production
```sh
$ npm run build
```
This command will build the `dist` folder at the root of the repository. 

#### For more information about the project, see the [WIKI] pages.

## License
[MIT](LICENSE)

[//]: #
[vue]: <https://vuejs.org>
[cos-server]: <https://github.com/mari-dot-tj/cos-server>
[WIKI]: <https://github.com/mari-dot-tj/cos-client/wiki>
