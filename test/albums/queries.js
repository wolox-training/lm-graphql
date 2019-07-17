const { query } = require('../server.spec'),
  { album, albums } = require('./graphql'),
  mocks = require('./mocking'),
  albumTitle = 'albumTitle',
  albumId1 = 1,
  albumId2 = 2,
  albumsAmount = 2,
  albumPhotosAmount = 2,
  apiErrorStatusCode = 502;

const testAlbumProperties = (albumToTest, title, id) => {
  expect(albumToTest.title).toBe(title);
  expect(albumToTest.id).toBe(id.toString());
  expect(albumToTest.photos.length).toBe(albumPhotosAmount);
  expect(albumToTest.photos[0].url).toBe('url1');
  expect(albumToTest.photos[0].thumbnailUrl).toBe('thumbnailUrl1');
  expect(albumToTest.photos[1].url).toBe('url2');
  expect(albumToTest.photos[1].thumbnailUrl).toBe('thumbnailUrl2');
};

const testErrorResponse = (response, expectedErrorCode) => {
  expect(typeof response.errors).toBe('object');
  expect(response.errors).toHaveLength(1);
  expect(response.errors[0].extensions.code).toBe(expectedErrorCode);
};

describe('albums', () => {
  describe('queries', () => {
    describe('single-album', () => {
      beforeEach(() => {
        mocks.albumMock(albumId1, albumTitle);
        mocks.albumsPhotosListMock(albumId1, albumTitle);
      });

      it('should get album schema properly', () =>
        query(album(1)).then(res => {
          expect(res.data.album).toHaveProperty('title');
          expect(res.data.album).toHaveProperty('id');
          expect(res.data.album).toHaveProperty('photos');
          expect(res.data.album.photos[0]).toHaveProperty('url');
          expect(res.data.album.photos[0]).toHaveProperty('thumbnailUrl');
          expect(res.data.album.photos[1]).toHaveProperty('url');
          expect(res.data.album.photos[1]).toHaveProperty('thumbnailUrl');
        }));

      it('should get album with photos properly', () =>
        query(album(albumId1)).then(res => testAlbumProperties(res.data.album, albumTitle, albumId1)));
    });

    describe('multi-album', () => {
      beforeEach(() => {
        mocks.albumsPhotosListMock(albumId1, albumTitle);
        mocks.albumsPhotosListMock(albumId2, albumTitle);
      });

      it('should get albums with photos properly', () => {
        mocks.albumsListMock(albumTitle);
        return query(albums(0, 3, 'id')).then(res => {
          expect(res.data.albums.length).toBe(albumsAmount);
          for (let i = 0; i < 2; i++) {
            testAlbumProperties(res.data.albums[i], albumTitle, i + 1);
          }
        });
      });

      it('should get albums ordered', () => {
        mocks.albumsListMock(albumTitle);
        return query(albums(0, 3, 'title')).then(res => {
          expect(res.data.albums.length).toBe(albumsAmount);
          expect(res.data.albums[0].title > res.data.albums[1].title);
        });
      });

      it('should get albums filtered', () => {
        mocks.albumsFilteredListMock(albumTitle);
        return query(albums(0, 3, 'title', albumTitle)).then(res => {
          expect(res.data.albums.length).toBe(albumsAmount);
          expect(res.data.albums[0].title).toBe(albumTitle);
          expect(res.data.albums[1].title).toBe(albumTitle);
        });
      });
    });

    describe('Requests with missing or non-existent parameters', () => {
      beforeEach(() => {
        mocks.albumsListMock('albumTitle');
        mocks.albumsPhotosListMock(1, 'albumTitle');
        mocks.albumsPhotosListMock(2, 'albumTitle');
      });

      it('request album without id', () =>
        query(album()).then(res => testErrorResponse(res, 'GRAPHQL_VALIDATION_FAILED')));

      it('request albums without offset', () =>
        query(albums(null, 3, 'id', 'title')).then(res =>
          testErrorResponse(res, 'GRAPHQL_VALIDATION_FAILED')
        ));

      it('request albums without limit', () =>
        query(albums(0, null, 'id', 'title')).then(res =>
          testErrorResponse(res, 'GRAPHQL_VALIDATION_FAILED')
        ));

      it('request albums without orderBy', () =>
        query(albums(0, 3)).then(res => {
          expect(res.data.albums.length).toBe(2);
          for (let i = 0; i < 2; i++) {
            testAlbumProperties(res.data.albums[i], albumTitle, i + 1);
          }
        }));

      it('request non-existent album', () => {
        mocks.albumMockError(60000);
        return query(album(60000)).then(res => testErrorResponse(res, apiErrorStatusCode));
      });

      it('request albums without filterBy', () =>
        query(albums(0, 3, 'id')).then(res => {
          expect(res.data.albums.length).toBe(2);
          for (let i = 0; i < 2; i++) {
            testAlbumProperties(res.data.albums[i], albumTitle, i + 1);
          }
        }));
    });
  });
});