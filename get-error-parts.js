module.exports = (error, options) => {
  const path = Array.isArray(error.path) ? error.path[0] : error.path;
  const pathPattern = new RegExp(`^${path}\\s`);
  const message = error.message.replace(pathPattern, `"${path}"$1`);
  if (options && options.stripQuotes) {
    return {
      path,
      message: message.replace(/"/g, '')
    };
  }
  return {path, message};
};
