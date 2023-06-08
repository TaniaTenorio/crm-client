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

export const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      company
      email
      id
      last_name
      name
      phone
      seller
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      company
      email
      id
      last_name
      name
      phone
      seller
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      company
      email
      id
      last_name
      phone
      name
      seller
    }
  }
`
