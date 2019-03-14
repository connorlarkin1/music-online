import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: 'https://us-central1-universal-music-url.cloudfunctions.net/api/graphql'
  });
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all'
    }
  }

  client.defaultOptions = defaultOptions;
export default client;