const { createTestClient } = require('apollo-server-testing'),
  { ApolloServer } = require('apollo-server'),
  schema = require('../app/graphql'),
  { validateToken } = require('../app/helpers/token');

const { query: _query, mutate } = createTestClient(
  new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.token || '';
      return validateToken(token).then(validated => ({ tokenValidated: validated, token }));
    }
  })
);

const query = params => _query({ query: params });

module.exports = { query, mutate };
