const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          firstName
          lastName
          email
          name
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      firstName
      lastName
      email
      name
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      createUser(user: $userInput) {
        firstName
        lastName
        id
        password
        email
        name
      }
    }
  `,
  variables: { userInput }
});

module.exports = { getUser, getUsers, createUser };
