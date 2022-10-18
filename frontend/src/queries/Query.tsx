import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_QUOTE_INVENTORY = gql`
  query getQuoteInventory {
    getQuote {
      _id
      id
      quote
      author
    }
  }
`;

export function Query() {
  const { loading, data } = useQuery(GET_QUOTE_INVENTORY);

  console.log("DataInventory", GET_QUOTE_INVENTORY);
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
              <th>Quote</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.getQuote?.map((inventory: any) => (
                <tr>
                  <td>{inventory._id}</td>
                  <td>{inventory.id}</td>
                  <td>{inventory.quote}</td>
                  <td>{inventory.author}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
