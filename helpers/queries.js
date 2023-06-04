import { gql } from "@apollo/client"

export const AUTH_USER = gql`
  mutation authUser($input: AuthInput!) {
    authUser(input: $input) {
      token
    }
  }
`

export const CREATE_USER = gql`
  mutation newUser($input: UserInput!) {
    newUser(input: $input) {
      created_at
      email
      id
      last_name
      name
    }
  }
`

export const GET_CLIENTS_USER = gql`
  query getClientsSeller {
    getClientsSeller {
      company
      email
      id
      last_name
      name
      phone
      seller
    }
  }
`

export const GET_USER = gql`
  query getUser {
    getUser {
      created_at
      email
      id
      last_name
      name
    }
  }
`;

