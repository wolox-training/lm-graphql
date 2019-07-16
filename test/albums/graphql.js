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

const albums = (offset, limit, orderBy, filterBy = null) => gql`
  query {
    albums(offset:${offset},limit:${limit}, orderBy: "${orderBy}", filterBy:"${filterBy}") {
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
