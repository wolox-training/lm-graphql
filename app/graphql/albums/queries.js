const { gql } = require('apollo-server'),
  { getAlbumById, requestAlbumPhotos, getAlbums } = require('../../services/typicode'),
  logger = require('../../logger');

const mapPhotos = photos =>
  photos.map(photo => ({
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl
  }));

const getAlbum = albumId =>
  getAlbumById(albumId).then(album =>
    requestAlbumPhotos(albumId).then(photos => {
      album.photos = mapPhotos(photos);
      return album;
    })
  );

const getAllAlbums = (offset, limit, orderedBy) => {
  logger.info('Requesting albums');

  return getAlbums()
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
    .then(albums => albums.sort((album1, album2) => (album1[orderedBy] >= album2[orderedBy] ? 1 : -1)));
};

module.exports = {
  queries: {
    album: (_, params) => getAlbum(params.id),
    albums: (_, params) => getAllAlbums(params.offset, params.limit, params.orderBy)
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album
      albums(offset: Int!, limit: Int!, orderBy: String!): [Album]
    }
  `
};
