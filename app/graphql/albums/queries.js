const { gql } = require('apollo-server'),
  { getAlbum, getAllAlbums } = require('./resolvers');

module.exports = {
  queries: {
    album: (_, params) => getAlbum(params.id),
    albums: (_, params) => getAllAlbums(params.offset, params.limit, params.orderBy)
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album
      albums(offset: Int!, limit: Int!, orderBy: String!): [Album]
    }
  `
};
