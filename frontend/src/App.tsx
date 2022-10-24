import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./components/apolloClient";
import "./App.css";
import HomePage from "./components/HomePage";
import Search from "./components/Search";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      {/* <HomePage /> */}
      <Search />
    </ApolloProvider>
  );
}

// export const App = () => (
//   <ApolloProvider client={apolloClient}>
//     {/* <HomePage /> */}
//     <SearchBar placeholder={undefined} data={undefined} />
//   </ApolloProvider>
// );

export default App;
