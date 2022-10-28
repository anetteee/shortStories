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
    getPost(
      tag: String
      input: String
      sortBy: String
      limit: Int
      offset: Int
    ): [Post!]
  }
`;

module.exports = typeDefs;
