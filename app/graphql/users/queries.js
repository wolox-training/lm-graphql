const { gql } = require('apollo-server'),
  { getUser, getUsers } = require('./resolvers');
// { user: User } = require('../../models');

module.exports = {
  queries: {
    user: (_, params) => getUser(params),
    users: (_, params) => getUsers(params)
  },
  schema: gql`
    extend type Query {
      user(id: ID, firstName: String, email: String): User!
      users: [User]
    }
  `
};
