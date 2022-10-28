import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_POST_INVENTORY = gql`
  query getQuoteInventory(
    $tag: String
    $sortBy: String
    $limit: Int
    $offset: Int
  ) {
    getPost(tag: $tag, sortBy: $sortBy, limit: $limit, offset: $offset) {
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

export function Query() {
  const { loading, data } = useQuery(GET_POST_INVENTORY, {
    variables: { tag: null, sortBy: "asc", limit: 10, offset: 0 },
  });

  console.log("DataInventory", GET_POST_INVENTORY);
  return (
    <div>
      <h3>Available Inventory</h3>
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
            {data &&
              data.getPost?.map((inventory: any) => (
                <tr>
                  <td>{inventory._id}</td>
                  <td>{inventory.id}</td>
                  <td>{inventory.title}</td>
                  <td>{inventory.body}</td>
                  <td>{inventory.userId}</td>
                  <td>{inventory.tags}</td>
                  <td>{inventory.reactions}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
