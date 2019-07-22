const { getAlbumById, requestAlbumPhotos, getAlbums, getAlbumsFiltered } = require('../../services/typicode'),
  logger = require('../../logger'),
  { purchase: Purchase } = require('../../models'),
  { validationError } = require('../../errors');

exports.album = albumId => {
  logger.info(`Requesting album with id ${albumId}`);
  return getAlbumById(albumId).then(album => ({
    ...album
  }));
};

exports.albums = (offset, limit, orderBy, filterBy) => {
  logger.info('Requesting albums');

  return new Promise(resolve => {
    resolve(filterBy ? getAlbumsFiltered(filterBy) : getAlbums());
  })
    .then(albums => albums.slice(offset, offset + limit))
    .then(albumsSliced =>
      albumsSliced.map(album => ({
        ...album
      }))
    )
    .then(albums => {
      if (orderBy) {
        return albums.sort((album1, album2) => (album1[orderBy] >= album2[orderBy] ? 1 : -1));
      }
      return albums;
    });
};

exports.createPurchase = (albumId, userId) => {
  logger.info(`Purchasing album with id ${albumId} for user with id ${userId}`);
  return Purchase.createPurchase(albumId, userId).then(([purchase, created]) => {
    if (created) {
      return purchase.albumId;
    }
    throw validationError('User already bought that album');
  });
};

const photos = album => {
  logger.info(`Requesting photos of album with id ${album.id}`);
  return requestAlbumPhotos(album.id);
};

exports.typeResolvers = {
  photos
};
