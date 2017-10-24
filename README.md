# hapi-format-validation

[![CircleCI](https://circleci.com/gh/trevorblades/hapi-format-validation.svg?style=shield&circle-token=9f50f0c56ba5d9a3097af294415b5603fde2a119)](https://circleci.com/gh/trevorblades/hapi-format-validation)

This [Hapi](https://hapijs.com/) plugin formats validation errors in a way that is consistent, simple, and easy to render in client-side forms. Take your typical [Joi](https://github.com/hapijs/joi) validation error reply for instance...

#### 😿 Before `hapi-format-validation`

```js
{
  statusCode: 400,
  error: 'Bad Request',
  // this message should get formatted before displaying it to a user
  message: 'child "name" fails because ["name" is not allowed to be empty]. child "email" fails because ["email" must be a valid email]',
  validation: {
    source: 'payload',
    // extra work required of the client to link these keys to error messages :(
    keys: [
      'name',
      'email'
    ]
  }
}
```

#### 😍 After `hapi-format-validation`

```js
{
  statusCode: 400,
  error: 'Bad Request',
  // a newline-separated string, ready-to-use if necessary
  message: '"name" is not allowed to be empty↵"email" must be a valid email',
  validation: {
    source: 'payload',
    // a simple key-value mapping of fields and their errors
    errors: {
      name: '"name" is not allowed to be empty',
      email: '"email" must be a valid email'
    }
  }
}
```

## Installation

`npm install --save hapi-format-validation`

## Usage

```js
const FormatValidation = require('hapi-format-validation');

server.register(FormatValidation, err => {
  // server fun times
});
```

## Options

- `stripQuotes`: (optional) if `true`, strips double quotation marks from around the path name in error messages
- `sequelize`: (optional) pass a `Sequelize` instance to format unique key violations (more information below)

## Sequelize integration

`hapi-format-validation` also handles Sequelize unique key violation errors, which would otherwise be a `500 Internal Server Error`. Pass your Sequelize instance ([sold separately](http://docs.sequelizejs.com/)) as an option to the plugin when you register it to enable this feature.

```js
const FormatValidation = require('hapi-format-validation');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(...);

server.register(
  {
    register: FormatValidation,
    options: {sequelize}
  },
  err => {
    // do your server stuff
  }
);
```

#### Before

```js
{
  statusCode: 500,
  error: 'Internal Server Error',
  message: 'An internal server error occurred'
}
```

#### After

```js
{
  'statusCode': 400,
  'error': 'Bad Request',
  'message': '"username" must be unique',
  'validation': {
    'source': 'payload',
    'errors': {
      'username': '"username" must be unique'
    }
  }
}
```

## 👊 Acknowledgements

- [joi-errors-for-forms](https://github.com/eddyystop/joi-errors-for-forms) for the validation payload format inspiration
- [This article](https://medium.com/@andv/hapi-transforming-an-internal-server-error-occured-into-correct-boom-errors-1a2a72e6ffff) by [Andrey Viktorov](https://medium.com/@andv) for the idea around using the `onPreResponse` hook and checking for Sequelize errors
