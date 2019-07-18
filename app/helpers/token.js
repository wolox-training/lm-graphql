const jsrasign = require('jsrsasign'),
  config = require('../../config').common.token,
  logger = require('../logger');

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
