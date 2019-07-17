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

exports.albumsFilteredListMock = albumTitle => {
  nock('https://jsonplaceholder.typicode.com')
    .get(`/albums?title=${albumTitle.split(' ').join('%20')}`)
    .reply(200, [
      {
        userId: 1,
        id: 1,
        title: albumTitle
      },
      {
        userId: 1,
        id: 2,
        title: albumTitle
      }
    ]);
};

exports.albumsListMock = albumTitle => {
  nock('https://jsonplaceholder.typicode.com')
    .get('/albums')
    .reply(200, [
      {
        userId: 1,
        id: 1,
        title: albumTitle
      },
      {
        userId: 1,
        id: 2,
        title: albumTitle
      }
    ]);
};

exports.albumMockError = albumId => {
  nock('https://jsonplaceholder.typicode.com')
    .get(`/albums/${albumId}`)
    .reply(404, {});
};
