const { gql } = require('apollo-server');

module.exports = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

  type Query
  type Mutation
  type Subscription
  type User @cacheControl(maxAge: 60, scope: PRIVATE) {
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
  }
  type Album @cacheControl(maxAge: 60) {
    id: ID!
    title: String!
    photos: [Photo!]!
  }
  type Photo @cacheControl(maxAge: 60) {
    url: String!
    thumbnailUrl: String!
  }
`;
