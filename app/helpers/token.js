const jsrasign = require('jsrsasign'),
  config = require('../../config').common.token,
  logger = require('../logger'),
  { tokenError } = require('../errors'),
  { user: User } = require('../models');

exports.createToken = sub => {
  logger.info('Creating token');
  const header = { alg: config.algorithm, typ: config.type };
  const payload = {};
  payload.sub = sub;
  payload.nbf = jsrasign.jws.IntDate.get('now');
  payload.iat = payload.nbf;
  payload.exp = payload.nbf + config.sessionTime;
  return jsrasign.jws.JWS.sign(config.algorithm, header, payload, config.pass);
};

const getEmailFromToken = token =>
  new Promise(resolve => {
    resolve(jsrasign.b64toutf8(token.split('.')[1]));
  })
    .then(jsonString => new Promise(resolve => resolve(JSON.parse(jsonString).sub)))
    .catch(error => tokenError(error));

const validateWithEmail = (token, email) =>
  User.getByEmail(email).then(foundUser => {
    if (foundUser) {
      return jsrasign.jws.JWS.verifyJWT(token, config.pass, {
        alg: [config.algorithm],
        sub: [email]
      });
    }
    return false;
  });

const resolveValidation = validated => validated;

exports.validateToken = token => {
  logger.info('Validating token');
  return getEmailFromToken(token)
    .then(email => validateWithEmail(token, email))
    .then(validated => resolveValidation(validated))
    .catch(() => false);
};

exports.getEmailFromToken = getEmailFromToken;
