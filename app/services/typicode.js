const request = require('request-promise'),
  logger = require('../logger'),
  typicodePath = 'https://jsonplaceholder.typicode.com',
  { apiError } = require('../errors');

const options = endpoint => ({
  uri: endpoint,
  json: true,
  resolveWithFullResponse: false
});

exports.requestAlbumPhotos = albumId => {
  logger.info(`Requesting album -with id ${albumId}- photos to jsonplaceholder API`);
  return request(options(`${typicodePath}/photos?albumId=${albumId}`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbumById = albumId => {
  logger.info(`Requesting album with id ${albumId}`);
  return request(options(`${typicodePath}/albums/${albumId}`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbums = () => {
  logger.info('Requesting albums');

  return request(options(`${typicodePath}/albums`)).catch(error => {
    throw apiError(error.message);
  });
};

exports.getAlbumsWithTitle = title => {
  logger.info(`Requesting albums with title = ${title}`);
  return request(options(`${typicodePath}/albums`)).catch(error => {
    throw apiError(error.message);
  });
};
