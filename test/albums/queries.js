const { query } = require('../server.spec'),
  { album, albums } = require('./graphql'),
  { albumMock, albumsPhotosListMock, albumsFilteredListMock } = require('./mocking');

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
        expect(res.data.album.photos[1]).toHaveProperty('url');
        expect(res.data.album.photos[1]).toHaveProperty('thumbnailUrl');
        expect(res.data.album.title).toBe('albumTitle');
      });
    });

    it('should get album properly', () => {
      albumMock(1, 'albumTitle');
      albumsPhotosListMock(1, 'albumTitle');
      return query(album(1)).then(res => {
        expect(res.data.album.title).toBe('albumTitle');
        expect(res.data.album.id).toBe('1');
        expect(res.data.album.photos.length).toBe(2);
        expect(res.data.album.photos[0].url).toBe('url1');
        expect(res.data.album.photos[0].thumbnailUrl).toBe('thumbnailUrl1');
        expect(res.data.album.photos[1].url).toBe('url2');
        expect(res.data.album.photos[1].thumbnailUrl).toBe('thumbnailUrl2');
      });
    });

    it('should get album with photos properly', () => {
      albumsFilteredListMock('albumTitle');
      albumsPhotosListMock(1, 'albumTitle');
      albumsPhotosListMock(2, 'albumTitle');
      return query(albums(0, 3, 'id', 'albumTitle')).then(res => {
        expect(res.data.albums.length).toBe(2);
        for (let i = 0; i < 2; i++) {
          expect(res.data.albums[i].id).toBe((i + 1).toString());
          expect(res.data.albums[i].title).toBe('albumTitle');
          expect(res.data.albums[i].photos[0].url).toBe('url1');
          expect(res.data.albums[i].photos[0].thumbnailUrl).toBe('thumbnailUrl1');
          expect(res.data.albums[i].photos[1].url).toBe('url2');
          expect(res.data.albums[i].photos[1].thumbnailUrl).toBe('thumbnailUrl2');
        }
      });
    });

    describe('Requests with missing parameters', () => {
      it('request album without id', () =>
        query(album()).then(res => {
          expect(typeof res.errors).toBe('object');
          expect(res.errors).toHaveLength(1);
        }));
      it('request albums without offset', () =>
        query(albums(null, 3, 'id', 'albumTitle')).then(res => {
          expect(typeof res.errors).toBe('object');
          expect(res.errors).toHaveLength(1);
        }));
      it('request albums without limit', () =>
        query(albums(0, null, 'id', 'albumTitle')).then(res => {
          expect(typeof res.errors).toBe('object');
          expect(res.errors).toHaveLength(1);
        }));
      it('request albums without orderBy', () =>
        query(albums(0, 3, null, 'albumTitle')).then(res => {
          expect(typeof res.errors).toBe('object');
          expect(res.errors).toHaveLength(1);
        }));

      it.todo('request albums without filterBy');
    });

    it.todo('request non-existent album');
    it.todo('request albums with non-existent filterBy');
  });
});
