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
      rol
    }
  }
`

export const GET_ONE_USER = gql`
  query GetOneUser($id: ID!) {
    getOneUser(id: $id) {
      name
      last_name
      id
      email
      rol
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      last_name
      email
      id
      rol
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      rol
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const GET_CLIENTS_USER = gql`
  query getClientsSeller($limit: Int, $offset: Int) {
    getClientsSeller(limit: $limit, offset: $offset) {
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
      rol
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

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      created_at
      id
      name
      price
      stock
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      created_at
      name
      id
      price
      stock
    }
  }
`;

export const GET_ONE_PRODUCT = gql`
  query GetOneProduct($id: ID!) {
    getOneProduct(id: $id) {
      created_at
      id
      name
      price
      stock
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      created_at
      id
      name
      price
      stock
    }
  }
`

export const NEW_ORDER = gql`
  mutation NewOrder($input: OrderInput) {
    newOrder(input: $input) {
      client {
        name
      }
      date
      id
      order {
        amount
        id
      }
      seller
      status
      total
    }
  }
`

export const GET_ORDERS_SELLER = gql`
  query GetOrderSeller {
    getOrderSeller {
      client {
        id
        name
        last_name
        email
        phone
      }
      date
      id
      order {
        amount
        id
        name
        price
      }
      seller
      status
      total
    }
  }
`

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      date
      id
      order {
        amount
        id
        name
        price
      }
      seller
      status
      total
    }
  }
`

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
` 

export const GET_BEST_SELLERS = gql`
  query GetBestSellers {
    bestSellers {
      seller {
        email
        last_name
        name
      }
      total
    }
  }
`

export const GET_BEST_CLIENTS = gql`
  query GetBestClients {
    bestClients {
      client {
        email
        last_name
        name
      }
      total
    }
  }
`

export const GET_TOTAL_CLIENTS = gql`
    query getTotalClients{
      getTotalClients
    }
`;