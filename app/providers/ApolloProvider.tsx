import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, concat } from '@apollo/client'
import React from 'react'

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }))
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

const Provider: React.FC = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>

export default Provider
