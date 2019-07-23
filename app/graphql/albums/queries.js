const { gql } = require('apollo-server'),
  { album, albums } = require('./resolvers');

module.exports = {
  queries: {
    album: (_, params) => album(params.id),
    albums: (_, params) =>
      new Promise(resolve => setTimeout(resolve, 5000)).then(() =>
        albums(params.offset, params.limit, params.orderBy, params.filterBy)
      )
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album
      albums(offset: Int!, limit: Int!, orderBy: String!, filterBy: String): [Album]
    }
  `
};
