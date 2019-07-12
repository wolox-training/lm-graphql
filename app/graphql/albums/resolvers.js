const { getAlbumById, requestAlbumPhotos, getAlbums } = require('../../services/typicode'),
  logger = require('../../logger');

exports.getAlbum = albumId =>
  getAlbumById(albumId).then(album => ({
    ...album
  }));

exports.getAllAlbums = (offset, limit, orderedBy) => {
  logger.info('Requesting albums');

  return getAlbums()
    .then(foundAlbums => foundAlbums.slice(offset, offset + limit))
    .then(albumsSliced =>
      albumsSliced.map(album => ({
        ...album
      }))
    )
    .then(albums => albums.sort((album1, album2) => (album1[orderedBy] >= album2[orderedBy] ? 1 : -1)));
};

const getPhotos = album => {
  logger.info(`Requesting photos of album with id ${album.id}`);
  return requestAlbumPhotos(album.id);
};

exports.typeResolvers = {
  photos: getPhotos
};
