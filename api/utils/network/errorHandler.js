const response = require('./response');

function errorHandler(err, req, res) {
  console.error('[error]', err);

  const message = err.message || 'Error interno';
  const status = err.statusCode || 500;

  response.error(req, res, message, status);
}

module.exports = errorHandler;
