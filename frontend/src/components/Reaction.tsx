import { useMutation, gql } from "@apollo/client";
import React from "react"; 

const INCREMENT_REACTION = gql`
  mutation increment($incrementReactionsId: Int!) {
    incrementReaction(reactions: $incrementReactionsId) {
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

export function Reaction() {
    const [incrementReaction, { data, loading, error }] = useMutation(INCREMENT_REACTION);
  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            incrementReaction({ variables: { id: data.id } });
          }}
        >
          <button type="submit">Like</button>
        </form>
      </div>
    );
  }