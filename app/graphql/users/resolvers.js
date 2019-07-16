const logger = require('../../logger'),
  { hashPassword } = require('../../helpers/hasher'),
  { validationError } = require('../../errors'),
  { user: User } = require('../../models');

exports.createNewUser = user =>
  hashPassword(user.password)
    .then(hashedPassword =>
      User.createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword
      })
    )
    .then(([createdUser, created]) => {
      if (created) {
        logger.info(`User ${createdUser.firstName} created`);
        return createdUser;
      }
      throw validationError('User with that email already exists');
    });
