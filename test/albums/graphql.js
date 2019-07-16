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

module.exports = { album };
