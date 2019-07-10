const { gql } = require('apollo-server'),
  { getAlbumById, getAlbums } = require('../../services/typicode');

module.exports = {
  queries: {
    album: (_, params) => getAlbumById(params.id),
    albums: () => getAlbums()
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album
      albums: [Album]
    }
  `
};
