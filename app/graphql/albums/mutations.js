const { gql } = require('apollo-server'),
  { createPurchase, album } = require('./resolvers');

module.exports = {
  mutations: {
    buyAlbum: (_, { albumToBuy }, context) => {
      console.log(context);
      return createPurchase(albumToBuy.albumId, 1).then(albumId => album(albumId));
    }
  },

  schema: gql`
    extend type Mutation {
      buyAlbum(albumToBuy: AlbumInput!): Album
    }
  `
};
