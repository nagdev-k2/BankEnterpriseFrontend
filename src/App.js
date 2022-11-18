import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import store, { persistor } from './state';
import Layout from './components/layout';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3000/graphqli" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ApolloProvider client={client}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin={'true'}></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin={'true'}></script>
        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin={'true'}></script>
        <Layout />
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

export default App;
