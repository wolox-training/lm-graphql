const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }
  type Album {
    id: ID!
    title: String!
    photos: [Photo!]!
  }
  type Photo {
    url: String!
    thumbnailUrl: String!
  }
`;
