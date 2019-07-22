const { queries, schema: queriesSchema } = require('./queries'),
  { typeResolvers } = require('./resolvers'),
  { mutations, schema: mutationsSchema } = require('./mutations');

module.exports = {
  queries,
  mutations,
  typeResolvers,
  schemas: [queriesSchema, mutationsSchema]
};
