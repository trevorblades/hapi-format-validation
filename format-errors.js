const Boom = require('boom');

module.exports = (errors, options, source = 'payload') => {
  const validation = {
    source,
    errors: {}
  };

  const messages = errors.map(error => {
    const path = Array.isArray(error.path) ? error.path[0] : error.path;
    const pathPattern = new RegExp(`^${path}\\s`);
    let message = error.message.replace(pathPattern, `"${path}"$1`);
    if (options.stripQuotes) {
      message = message.replace(/"/g, '');
    }

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
