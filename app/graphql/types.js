const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    firstName: String! @deprecated(reason: "Name has been split up into two")
    lastName: String! @deprecated(reason: "Name has been split up into two")
    name: String!
    username: String! @deprecated(reason: "Change on User model.")
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
