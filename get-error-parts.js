module.exports = (error, options) => {
  const path = Array.isArray(error.path) ? error.path[0] : error.path;
  const pathPattern = new RegExp(`^${path}\\b`);
  const message = error.message.replace(pathPattern, `"${path}"`);
  if (options && options.stripQuotes) {
    return {
      path,
      message: message.replace(/"/g, '')
    };
  }
  return {path, message};
};
