import React from "react";
import { useQuery, gql } from "@apollo/client";

//graphql query
const GET_ONE_QUOTE_INVENTORY = gql`
  query GetOneQuote($getOneQuoteId: Int) {
    getOneQuote(id: $getOneQuoteId) {
      _id
      id
      quote
      author
    }
  }
`;

const QueryOnId = ({ getOneQuoteId = 4 }) => {
  const { loading, data } = useQuery(GET_ONE_QUOTE_INVENTORY, {
    variables: { getOneQuoteId: 4 },
  }); /*Using hooks to do the query and pass variable, here is only one variable, but it could be several. 
  Useful link was: https://www.apollographql.com/docs/react/v2/development-testing/static-typing/ */
  console.log("Ny kjøring");
  console.log("DataInventory", GET_ONE_QUOTE_INVENTORY);
  return (
    <div>
      <h3>Quotes with id: {getOneQuoteId}</h3>
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
            {
              data && (
                <tr>
                  <td>{data.getOneQuote._id}</td>
                  <td>{data.getOneQuote.id}</td>
                  <td>{data.getOneQuote.quote}</td>
                  <td>{data.getOneQuote.author}</td>
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
