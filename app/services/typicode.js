const request = require('request-promise'),
  logger = require('../logger'),
  typicodePath = 'https://jsonplaceholder.typicode.com',
  { apiError } = require('../errors'),
  lodash = require('lodash');

const options = endpoint => ({
  uri: endpoint,
  json: true,
  resolveWithFullResponse: false
});

const mapPhotos = (album, photos) => {
  album.photos = photos.map(photo => ({
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl
  }));
};

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
      mapPhotos(album, photos);
      return album;
    })
    .catch(error => {
      throw apiError(error.message);
    });
};

exports.getAlbums = (offset, limit, orderedBy, filter) => {
  logger.info('Requesting albums and photos');
  let albums = {};
  let photos = {};
  return request(options(`${typicodePath}/photos`))
    .then(foundPhotos => lodash.groupBy(foundPhotos, 'albumId'))
    .then(groupedPhotos => {
      photos = groupedPhotos;
      if (filter) {
        return request(options(`${typicodePath}/albums?title=${filter.split(' ').join('%20')}`));
      }

      return request(options(`${typicodePath}/albums`));
    })
    .then(foundAlbums => {
      albums = foundAlbums;
      return Promise.all(albums.map(album => mapPhotos(album, photos[album.id])));
    })
    .then(() => {
      if (offset && limit && orderedBy) {
        return albums
          .slice(offset, offset + limit)
          .sort((album1, album2) => (album1[orderedBy] >= album2[orderedBy] ? 1 : -1));
      }
      return albums;
    })
    .catch(error => {
      throw apiError(error.message);
    });
};
