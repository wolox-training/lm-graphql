const nock = require('nock');

exports.albumMock = (albumId, albumTitle) => {
  nock('https://jsonplaceholder.typicode.com')
    .get(`/albums/${albumId}`)
    .reply(200, { userId: 1, id: albumId, title: albumTitle });
};

exports.albumsPhotosListMock = (albumId, albumTitle) => {
  nock('https://jsonplaceholder.typicode.com')
    .get(`/photos?albumId=${albumId}`)
    .reply(200, [
      {
        albumId,
        id: 1,
        title: albumTitle,
        url: 'url1',
        thumbnailUrl: 'thumbnailUrl1'
      },
      {
        albumId,
        id: 2,
        title: albumTitle,
        url: 'url2',
        thumbnailUrl: 'thumbnailUrl2'
      }
    ]);
};
