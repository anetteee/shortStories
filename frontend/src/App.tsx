import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./components/apolloClient";
import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Search />
    </ApolloProvider>
  );
}

export default App;
