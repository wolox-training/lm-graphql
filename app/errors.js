const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  BAD_REQUEST = 400,
  API_ERROR = 502,
  DB_ERROR = 503,
  VALIDATION_ERROR = 401,
  HASH_ERROR = 500;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.apiError = message => createError(message, API_ERROR);
exports.dbError = message => createError(message, DB_ERROR);
exports.validationError = message => createError(message, VALIDATION_ERROR);
exports.hashError = message => createError(message, HASH_ERROR);
