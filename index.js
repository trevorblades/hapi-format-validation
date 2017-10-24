const transformError = require('./transform-error');

exports.register = (server, options = {}, next) => {
  server.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      reply(transformError(request.response, options));
      return;
    }
    reply.continue();
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package') // eslint-disable-line global-require
};
