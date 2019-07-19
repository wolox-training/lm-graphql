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

const login = loginInput => ({
  mutation: gql`
    mutation login($loginInput: LoginInput!) {
      login(credentials: $loginInput) {
        accessToken
      }
    }
  `,
  variables: { loginInput }
});

module.exports = { getUser, getUsers, createUser, login };
