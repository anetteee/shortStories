import React from "react";
import { gql, useQuery } from '@apollo/client';
import { Query } from "../queries/Query";
  
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
  
const HomePage = () => {
    return (
    <div>
      <h1>Hello World!</h1>
      <Query/>
    </div>
  );
}

export default HomePage;
