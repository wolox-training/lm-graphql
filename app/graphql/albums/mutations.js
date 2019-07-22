const { gql } = require('apollo-server'),
  { createPurchase, album } = require('./resolvers'),
  { permissionError } = require('../../errors');

module.exports = {
  mutations: {
    buyAlbum: (_, { albumToBuy }, context) => {
      if (context.tokenValidated) {
        return createPurchase(albumToBuy.albumId, 1).then(albumId => album(albumId));
      }
      throw permissionError('User does not have permission');
    }
  },

  schema: gql`
    extend type Mutation {
      buyAlbum(albumToBuy: AlbumInput!): Album
    }
  `
};
