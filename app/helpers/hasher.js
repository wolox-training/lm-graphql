const bcrypt = require('bcryptjs'),
  { hashError } = require('../errors'),
  saltRounds = 10;

exports.hashPassword = pass => bcrypt.hash(pass, saltRounds).catch(error => hashError(error.message));
