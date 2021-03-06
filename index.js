'use strict';

const WebpackDevMiddleware = require('webpack-dev-middleware');

exports.register = (server, {compiler}, next) => {
  const middleware = WebpackDevMiddleware(compiler, {});
  server.app['webpackCompiler'] = compiler;

  server.ext('onRequest', (request, reply) => {
    const { req, res } = request.raw;

    middleware(req, res, (err) => {
      if (err) {
        reply(err);
      }

      reply.continue();
    });
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
