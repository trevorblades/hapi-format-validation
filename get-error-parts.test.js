const getErrorParts = require('./get-error-parts');

describe('getErrorParts', () => {
  test("doesn't transform if unnecessary", () => {
    const error = {
      path: 'name',
      message: '"name" is required'
    };

    expect(getErrorParts(error)).toEqual(error);
  });

  test('handles array paths', () => {
    const error = {
      path: ['email'],
      message: '"email" must be an email'
    };

    expect(getErrorParts(error)).toEqual({
      path: 'email',
      message: error.message
    });
  });

  test('strips quotes', () => {
    const error = {
      path: 'username',
      message: '"username" must be unique'
    };

    expect(getErrorParts(error, {stripQuotes: true})).toEqual({
      path: error.path,
      message: 'username must be unique'
    });
  });

  test("doesn't pass along other properties", () => {
    const error = {
      path: 'password',
      message: '"password" is too short',
      foo: 'bar'
    };

    expect(getErrorParts(error)).toEqual({
      path: error.path,
      message: error.message
    });
  });
});
