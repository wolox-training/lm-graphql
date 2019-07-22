const { gql } = require('apollo-server');

const album = id => gql`
query {
    album(id: ${id}) {
      id,
      title,
      photos {
          url
          thumbnailUrl
      }
    }
  }`;

const albums = (offset, limit, orderBy = null, filterBy = null) => gql`
  query {
    albums(offset:${offset},limit:${limit}, 
      orderBy: "${orderBy ? orderBy : ''}", filterBy: "${filterBy ? filterBy : ''}") {
      id
      title
      photos {
        url
        thumbnailUrl
      }
    }
  }
`;

const buyAlbum = (albumToBuy, token) => ({
  mutation: gql`
    mutation buyAlbum($albumToBuy: AlbumInput!) {
      buyAlbum(albumToBuy: $albumToBuy) {
        id
        title
      }
    }
  `,
  variables: { albumToBuy },
  options: {
    context: {
      headers: { token }
    }
  }
});

module.exports = { album, albums, buyAlbum };
