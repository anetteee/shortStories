const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID
    id: Int
    title: String
    body: String
    userId: Int
    tags: [String]
    reactions: Int
  }
  type Query {
    getPost(tag: String): [Post!]
  }
`;

module.exports = typeDefs;
