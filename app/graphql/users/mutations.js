const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  { createUser, signin } = require('./resolvers'),
  { validateUser } = require('./validation');

module.exports = {
  mutations: {
    createUser: (_, { user }) => validateUser(user).then(() => createUser(user)),

    login: (_, { credentials }) =>
      validateUser(credentials).then(() => {
        userLoggedIn.publish(credentials.email);
        return {
          accessToken: signin(credentials)
        };
      })
  },

  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User
      login(credentials: LoginInput!): AccessToken
    }
  `
};
