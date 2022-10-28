const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "A post is a short story containing the information written under."
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
    getPost(tag: String, input: String): [Post!]
  }
  type Mutation {
    incrementReaction(id: Int): IncrementReactionResponse!
    decreaseReaction(id: Int): DecreaseReactionResponse!
  }
  type IncrementReactionResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated post after a successful mutation"
    post: Post
  }
  type DecreaseReactionResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated post after a successful mutation"
    post: Post
  }
`;

module.exports = typeDefs;
