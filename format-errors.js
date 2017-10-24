const Boom = require('boom');

module.exports = (errors, options, source = 'payload') => {
  const validation = {
    source,
    errors: {}
  };

  const messages = errors.map(error => {
    let {message} = error;
    if (options.stripQuotes) {
      message = message.replace(/"/g, '');
    }

    const path = Array.isArray(error.path) ? error.path[0] : error.path;
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
