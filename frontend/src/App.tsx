import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./components/apolloClient";
import "./App.css";
import Search from "./components/Search";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <Search />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
