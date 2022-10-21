const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Quote {
    _id: ID
    id: Int
    quote: String
    author: String
  }
  type Query {
    getQuote: [Quote!]
    getOneQuote(id: Int): Quote
  }
`;

module.exports = typeDefs;
