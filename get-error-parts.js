const upperFirst = require('lodash.upperfirst');

module.exports = (error, options = {}) => {
  const path = Array.isArray(error.path) ? error.path[0] : error.path;
  let message = error.message.replace(/"/g, '');
  if (options.capitalize) {
    message = upperFirst(message);
  }

  if (!options.stripQuotes) {
    // if stripQuotes is falsey, put the quotes back
    const pathPattern = new RegExp(`^(${path})\\b`, 'i');
    message = message.replace(pathPattern, `"$1"`);
  }

  return {
    path,
    message
  };
};
