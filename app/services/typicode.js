const request = require('request-promise'),
  logger = require('../logger'),
  typicodePath = 'https://jsonplaceholder.typicode.com',
  { apiError } = require('../errors');

const options = endpoint => ({
  uri: endpoint,
  json: true,
  resolveWithFullResponse: false
});

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
      album.photos = photos.map(photo => ({
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl
      }));
      return album;
    })
    .catch(error => {
      throw apiError(error.message);
    });
};
