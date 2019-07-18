const logger = require('../../logger'),
  { hashPassword, comparePasswords } = require('../../helpers/hasher'),
  { validationError } = require('../../errors'),
  { user: User } = require('../../models'),
  { createToken } = require('../../helpers/token');

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

exports.signin = credentials => {
  logger.info(`Signin for user with email ${credentials.email}`);
  return User.getByEmail(credentials.email)
    .then(foundUser => {
      if (foundUser) {
        return foundUser.password;
      }
      throw validationError('User not found');
    })
    .then(pass => comparePasswords(credentials.password, pass))
    .then(result => {
      if (result) {
        return createToken(credentials.email);
      }
      throw validationError('Password does not match with the email');
    });
};
