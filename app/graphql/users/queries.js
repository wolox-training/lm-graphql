const { gql } = require('apollo-server'),
  { getUser, getUsers, getName } = require('./resolvers');

module.exports = {
  queries: {
    user: (_, params) => getUser(params),
    users: (_, params) => getUsers(params)
  },
  fieldResolvers: {
    name: params => getName(params)
  },
  schema: gql`
    extend type Query {
      user(id: ID, firstName: String, email: String): User!
      users: [User]
    }
  `
};
