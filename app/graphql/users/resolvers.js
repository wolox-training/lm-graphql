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
        return createdUser;
      }
      throw validationError('User with that email already exists');
    });

exports.getUser = user => User.getOne(user).then(foundUser => foundUser);

exports.getUsers = () =>
  User.getAll()
    .then(foundUsers =>
      foundUsers.map(foundUser => ({
        ...foundUser.dataValues
      }))
    )
    .then(users => users);

exports.getName = user => `${user.firstName} ${user.lastName}`;
