import { gql } from "@apollo/client";

export const INCREMENT_REACTION = gql`
    mutation IncrementReaction($incrementReactionsId: Int!) {
      incrementReaction(id: $incrementReactionsId) {
        code
        success
        message
        post {
          _id
          id
          title
          body
          userId
          tags
          reactions
        }
      }
    }
  `;

export const DECREASE_REACTION = gql`
  mutation DecreaseReaction($decreaseReactionsId: Int!) {
    decreaseReaction(id: $decreaseReactionsId) {
      code
      success
      message
      post {
        _id
        id
        title
        body
        userId
        tags
        reactions
      }
    }
  }
  `;

export const GET_POST_INVENTORY = gql`
query getQuoteInventory(
  $tag: String
  $sortBy: String
  $limit: Int
  $offset: Int
) {
  getPost(tag: $tag, sortBy: $sortBy, limit: $limit, offset: $offset) {
    posts {
     _id
     id
     title
     body
     userId
     tags
     reactions
   }
   count
 }
}
`;
