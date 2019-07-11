const { queries, schema: queriesSchema } = require('./queries'),
  { typeResolvers } = require('./resolvers');

module.exports = {
  queries,
  typeResolvers,
  schemas: [queriesSchema]
};
