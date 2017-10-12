# Sagui - Control Panel

> This control panel was built using Vue.js.
>
> The project is divided in two main funcionalities: Surveys and Alerts.

## Table of contents

- [Installation](#build)
- [Usage](#usage)

# Build

``` bash
# install dependencies
npm install

# build for first development
npm run build:dev

# serve with hot reload at localhost:8080
npm run dev

# build for production
npm run build:prod

# to lint all *.js and *.vue files
npm run lint:all

# run unit tests
npm test
```

# Usage

## Config

To edit:

- Project's name;
- API address;
- CP address.

Edit in _source/app/config.js_

```javascript
const config = {
	url: 'http://dev-sagui-api.eokoe.com',
	name: 'Projeto Sagui',
	devapi: 'http://dev-sagui-api.eokoe.com/v1',
	api: 'https://fakeapi.eokoe.com',
};
```

## Language

Copy the portuguese translation file (_source/app/translations/ptBR.js) and use it as a starter file to translate to a new language.

Edit _source/app/translations/index.js

```javascript
// Import your new file
import enUK from './enUK';

// add your translation
Vue.i18n.add('pt-BR', enUK);

// set the start locale to use it
Vue.i18n.set('en-UK');
```

[MIT](http://opensource.org/licenses/MIT)
