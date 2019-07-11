const { getAlbumById, requestAlbumPhotos, getAlbums } = require('../../services/typicode'),
  logger = require('../../logger');

exports.album = albumId =>
  getAlbumById(albumId).then(album => ({
    ...album
  }));

exports.albums = (offset, limit, orderBy) => {
  logger.info('Requesting albums');

  return getAlbums()
    .then(foundAlbums => foundAlbums.slice(offset, offset + limit))
    .then(albumsSliced =>
      albumsSliced.map(album => ({
        ...album
      }))
    )
    .then(albums => albums.sort((album1, album2) => (album1[orderBy] >= album2[orderBy] ? 1 : -1)));
};

exports.photos = album => {
  logger.info(`Requesting photos of album with id ${album.id}`);
  return requestAlbumPhotos(album.id);
};

exports.typeResolvers = {
  photos: exports.photos
};
