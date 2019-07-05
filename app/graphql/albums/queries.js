const { gql } = require('apollo-server'),
  { getAlbumById } = require('../../services/typicode');

module.exports = {
  queries: {
    album: (_, params) => getAlbumById(params.id)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album
    }
  `
};
