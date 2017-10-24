const Boom = require('boom');
const getErrorParts = require('./get-error-parts');

module.exports = (errors, options, source = 'payload') => {
  const validation = {
    source,
    errors: {}
  };

  const messages = errors.map(error => {
    const {path, message} = getErrorParts(error, options);
    validation.errors[path] = message;
    return message;
  });

  const error = Boom.badRequest(messages.join('\n'));
  error.output.payload = {
    ...error.output.payload,
    validation
  };

  return error;
};
