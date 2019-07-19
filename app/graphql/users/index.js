const { queries, schema: queriesSchema, fieldResolvers } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions');

module.exports = {
  queries,
  fieldResolvers,
  mutations,
  subscriptions,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};
