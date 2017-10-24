const Sequelize = require('sequelize');
const formatErrors = require('./format-errors');

module.exports = (error, options) => {
  if (error.data && error.data.isJoi) {
    return formatErrors(
      error.data.details,
      options,
      error.output.payload.validation.source
    );
  } else if (
    error.isServer &&
    options.sequelize &&
    options.sequelize instanceof Sequelize &&
    error instanceof options.sequelize.UniqueConstraintError
  ) {
    return formatErrors(error.errors, options);
  }

  return error;
};
