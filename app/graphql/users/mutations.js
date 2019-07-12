const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  { user: User } = require('../../models'),
  logger = require('../../logger'),
  { hashPassword } = require('../../helpers/hasher'),
  { dbError, validationError } = require('../../errors');

module.exports = {
  mutations: {
    createUser: (_, { user }) =>
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
        })
        .catch(error => {
          throw dbError(error.message);
        }),

    login: (_, { credentials }) => {
      // IMPORTANT: Not a functional login, its just for illustrative purposes
      userLoggedIn.publish(credentials.username);
      return {
        accessToken: 'example_token',
        refreshToken: 'example_refresh_token',
        expiresIn: 134567899123
      };
    }
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User
      login(credentials: LoginInput!): AccessToken
    }
  `
};
