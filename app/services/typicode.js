const request = require('request-promise'),
  logger = require('../logger'),
  typicodePath = 'https://jsonplaceholder.typicode.com',
  { apiError } = require('../errors');

const options = endpoint => ({
  uri: endpoint,
  json: true,
  resolveWithFullResponse: false
});

const mapPhotos = photos =>
  photos.map(photo => ({
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl
  }));

const requestAlbumPhotos = albumId => {
  logger.info(`Requesting album -with id ${albumId}- photos to jsonplaceholder API`);
  return request(options(`${typicodePath}/photos?albumId=${albumId}`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbumById = albumId => {
  logger.info(`Requesting album with id ${albumId}`);
  let album = {};
  return request(options(`${typicodePath}/albums/${albumId}`))
    .then(foundAlbum => {
      album = foundAlbum;
      return requestAlbumPhotos(albumId);
    })
    .then(photos => {
      album.photos = mapPhotos(photos);
      return album;
    })
    .catch(error => {
      throw apiError(error.message);
    });
};

exports.getAlbums = (offset, limit, orderedBy) => {
  logger.info('Requesting albums');

  return request(options(`${typicodePath}/albums`))
    .then(foundAlbums => foundAlbums.slice(offset, offset + limit))
    .then(albumsSliced =>
      Promise.all(
        albumsSliced.map(album =>
          requestAlbumPhotos(album.id).then(photos => {
            album.photos = mapPhotos(photos);
          })
        )
      ).then(() => albumsSliced)
    )
    .then(albums => albums.sort((album1, album2) => (album1[orderedBy] >= album2[orderedBy] ? 1 : -1)))
    .catch(error => {
      throw apiError(error.message);
    });
};
