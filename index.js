'use strict';

const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');

exports.register = (server, { config }, next) => {
  if (!config) {
    return reply(err);
  } else {
    const compiler = Webpack(config);
    const middleware = WebpackDevMiddleware(compiler, options);
    // server.app['webpackCompiler'] = compiler;

    server.ext('onRequest', (request, reply) => {
      middleware(req, res, (err) => {
        if (err) {
          return reply(err);
        }

        return reply.continue();
      });
    });

    next();
  }
};


exports.register.attributes = {
  pkg: require('./package.json')
};
