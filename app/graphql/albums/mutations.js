const { gql } = require('apollo-server'),
  { createPurchase, album } = require('./resolvers'),
  { permissionError } = require('../../errors'),
  { getEmailFromToken } = require('../../helpers/token'),
  { user: User } = require('../../models');

module.exports = {
  mutations: {
    buyAlbum: (_, { albumToBuy }, context) => {
      if (context.tokenValidated) {
        return getEmailFromToken(context.token)
          .then(email => User.getByEmail(email))
          .then(user => createPurchase(albumToBuy.albumId, user.id).then(albumId => album(albumId)));
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
