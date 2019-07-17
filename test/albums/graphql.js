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

module.exports = { album, albums };
