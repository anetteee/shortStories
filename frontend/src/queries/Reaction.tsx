import { useMutation, gql } from "@apollo/client";
import React from "react"; 

const INCREMENT_REACTION = gql`
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
export function Reaction() {
    const [incrementReaction, { data, loading, error }] = useMutation(INCREMENT_REACTION, {
      // here the id to the post of the corresponsing button should be written
      variables: { /** */}});
  
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            //this should be changed when the method for getting post by id is changed
            incrementReaction({ variables: { id: data.id } });
          }}
        >
          <button type="submit">Like</button>
        </form>
      </div>
    );
  }
