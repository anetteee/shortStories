import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./components/apolloClient";
import "./App.css"; 
import HomePage from './components/HomePage';

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <HomePage/>
  </ApolloProvider>
)

export default App;


