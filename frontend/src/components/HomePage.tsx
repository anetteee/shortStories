import React from "react";
import { gql, useQuery } from '@apollo/client';
import { Post } from "./Post";
import { Query } from "../queries/Query";
 
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

const HomePage = () => {
    return (
    <div>
      <h1>Hello World!</h1>
      <Query/>
    </div>
  );
}

export default HomePage;
