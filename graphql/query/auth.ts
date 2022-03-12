import { gql } from "@apollo/client"

export const SIGNUP = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      token
      user {
        id
      }
    }
  }
`

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
      }
    }
  }
`

export const LOGOUT = gql`
  query Query {
    logout
  }
`

export const REFRESH_TOKEN = gql`
  query RefreshToken {
    refreshToken {
      token
    }
  }
`

export const GET_MY_USER = gql`
  query GetMyUser {
    getMyUser {
      email
      id
      name
      role
    }
  }
`
