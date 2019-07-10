const { gql } = require('apollo-server'),
  { getAlbumById, getAlbums } = require('../../services/typicode');

module.exports = {
  queries: {
    album: (_, params) => getAlbumById(params.id),
    albums: (_, params) => getAlbums(params.offset, params.limit, params.orderBy, null),
    albumsFiltered: (_, params) => getAlbums(null, null, null, params.filter)
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album
      albums(offset: Int!, limit: Int!, orderBy: String!): [Album]
      albumsFiltered(filter: String!): [Album]
    }
  `
};
