const { gql } = require('apollo-server'),
  { getAlbumById, getAlbums } = require('../../services/typicode');

module.exports = {
  queries: {
    album: (_, params) => getAlbumById(params.id),
    albums: (_, params) => getAlbums(params.offset, params.limit, params.orderBy)
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album
      albums(offset: Int!, limit: Int!, orderBy: String!): [Album]
    }
  `
};
