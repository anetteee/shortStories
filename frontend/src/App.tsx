import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./components/apolloClient";
import { gql, useQuery } from '@apollo/client';
import { Post } from "./components/Post";
import "./App.css"; 
import HomePage from './components/HomePage';

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <HomePage/>
  </ApolloProvider>
)

interface PostQueryResponse {
  posts: Post[];
}

const GET_POSTS = gql`
  query {
    posts {
      _id: ID, 
      id: Int,
      quote: String, 
      author: String,
    }
  }
`;

export function usePostsQuery() {
  return useQuery<PostQueryResponse>(GET_POSTS);
  
}

export default App;


