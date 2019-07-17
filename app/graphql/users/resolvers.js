const logger = require('../../logger'),
  { hashPassword } = require('../../helpers/hasher'),
  { validationError } = require('../../errors'),
  { user: User } = require('../../models');

exports.createUser = user =>
  hashPassword(user.password)
    .then(hashedPassword =>
      User.createUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword
      })
    )
    .then(([createdUser, created]) => {
      if (created) {
        logger.info(`User ${createdUser.firstName} created`);
        createdUser.name = `${createdUser.firstName} ${createdUser.lastName}`;
        return createdUser;
      }
      throw validationError('User with that email already exists');
    });

exports.getUser = user =>
  User.getOne(user).then(foundUser => {
    foundUser.name = `${foundUser.firstName} ${foundUser.lastName}`;
    return foundUser;
  });

exports.getUsers = () =>
  User.getAll()
    .then(foundUsers =>
      foundUsers.map(foundUser => ({
        ...foundUser.dataValues,
        name: `${foundUser.firstName} ${foundUser.lastName}`
      }))
    )
    .then(users => users);
