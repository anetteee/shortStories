import React from "react";
import { useQuery, gql } from "@apollo/client";

//graphql query
const GET_ONE_POST_INVENTORY = gql`
  query GetOneQuote($getOnePostId: Int) {
    getOnePost(id: $getOnePostId) {
      _id
      id
      title
      body
      userId
      tags
      reactions
    }
  }
`;

const QueryOnId = ({ getOnePostId = 4 }) => {
  const { loading, data } = useQuery(GET_ONE_POST_INVENTORY, {
    variables: { getOnePostId: 4 },
  }); /*Using hooks to do the query and pass variable, here is only one variable, but it could be several. 
  Useful link was: https://www.apollographql.com/docs/react/v2/development-testing/static-typing/ */
  console.log("Ny kjøring");
  console.log("DataInventory", GET_ONE_POST_INVENTORY);
  return (
    <div>
      <h3>Posts with id: {getOnePostId}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ObjectID</th>
              <th>Id (Number)</th>
              <th>Title</th>
              <th>Body</th>
              <th>UserId</th>
              <th>Tags</th>
              <th>Reactions</th>
            </tr>
          </thead>
          <tbody>
            {
              data && (
                <tr>
                  <td>{data.getOnePost._id}</td>
                  <td>{data.getOnePost.id}</td>
                  <td>{data.getOnePost.title}</td>
                  <td>{data.getOnePost.body}</td>
                  <td>{data.getOnePost.userId}</td>
                  <td>{data.getOnePost.tags}</td>
                  <td>{data.getOnePost.reactions}</td>
                </tr>
              ) /*Since there are only one result map should not be used*/
            }
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QueryOnId;