const { query } = require('../server.spec'),
  { album } = require('./graphql'),
  { albumMock, albumsPhotosListMock } = require('./mocking');

describe('albums', () => {
  describe('queries', () => {
    it('should get album schema properly', () => {
      albumMock(1, 'albumTitle');
      albumsPhotosListMock(1, 'albumTitle');
      return query(album(1)).then(res => {
        expect(res.data.album).toHaveProperty('title');
        expect(res.data.album).toHaveProperty('id');
        expect(res.data.album).toHaveProperty('photos');
        expect(res.data.album.photos[0]).toHaveProperty('url');
        expect(res.data.album.photos[0]).toHaveProperty('thumbnailUrl');
        expect(res.data.album.title).toBe('albumTitle');
      });
    });

    it('should get album properly', () => {
      albumMock(1, 'albumTitle');
      albumsPhotosListMock(1, 'albumTitle');
      return query(album(1)).then(res => {
        expect(res.data.album.title).toBe('albumTitle');
        // expect(res.data.album.id).toBe(1);
        expect(res.data.album.photos.length).toBe(2);
        expect(res.data.album.photos[0].url).toBe('url1');
        expect(res.data.album.photos[0].thumbnailUrl).toBe('thumbnailUrl1');
      });
    });

    it('should get album with photos properly', () => {
      albumMock(1, 'albumTitle');
      albumsPhotosListMock(1, 'albumTitle');
      return query(album(1)).then(res => {
        expect(res.data.album.title).toBe('albumTitle');
        // expect(res.data.album.id).toBe(1);
        expect(res.data.album.photos.length).toBe(2);
        expect(res.data.album.photos[0].url).toBe('url1');
        expect(res.data.album.photos[0].thumbnailUrl).toBe('thumbnailUrl1');
        expect(res.data.album.photos[1].url).toBe('url2');
        expect(res.data.album.photos[1].thumbnailUrl).toBe('thumbnailUrl2');
      });
    });
  });
});
