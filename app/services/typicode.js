const request = require('request-promise'),
  logger = require('../logger'),
  { apiUrl } = require('../../config').common.albumsApi,
  { apiError } = require('../errors');

const options = endpoint => ({
  uri: endpoint,
  json: true,
  resolveWithFullResponse: false
});

exports.requestAlbumPhotos = albumId => {
  logger.info(`Requesting album -with id ${albumId}- photos to jsonplaceholder API`);
  return request(options(`${apiUrl}/photos?albumId=${albumId}`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbumById = albumId => {
  logger.info(`Requesting album with id ${albumId}`);
  return request(options(`${apiUrl}/albums/${albumId}`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbums = () => {
  logger.info('Requesting albums');

  return request(options(`${apiUrl}/albums`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbumsFiltered = filterBy => {
  logger.info(`Requesting albums with title = ${filterBy}`);
  return request(options(`${apiUrl}/albums?title=${filterBy.split(' ').join('%20')}`)).catch(error => {
    throw apiError(error.message);
  });
};
