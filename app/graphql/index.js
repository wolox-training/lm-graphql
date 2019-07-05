const { makeExecutableSchema } = require('graphql-tools'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  healthCheck = require('./healthCheck'),
  albums = require('./albums');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas, ...albums.schemas];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries,
      ...healthCheck.queries,
      ...albums.queries
    },
    Mutation: {
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    }
  }
});
