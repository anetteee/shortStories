import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DECREASE_REACTION, INCREMENT_REACTION } from "../queries/Queries";
import { StoryProps } from "./Types";

const Story: React.FC<StoryProps> = ({ inventory }) => {
  const [readMore, setReadMore] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [increaseReaction] = useMutation(INCREMENT_REACTION);
  const [decreaseReaction] = useMutation(DECREASE_REACTION);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
    if (e.target.checked === true) {
      increaseReaction({ variables: { incrementReactionsId: inventory.id } });
    } else {
      decreaseReaction({ variables: { decreaseReactionsId: inventory.id } });
    }
  };

  return (
    <div className="story-div light-gray-border">
      <h2>{inventory.title}</h2>
      {readMore ? (
        <>
          <p className={readMore ? "p-extra-margin" : "p-no-margin"}>
            {inventory.body}
          </p>
          <p className="p-no-margin">
            Tags: {inventory.tags[0]}, {inventory.tags[1]}
          </p>
        </>
      ) : (
        <p className={readMore ? "p-extra-margin" : "p-no-margin"}>
          {inventory.body.substring(0, 100)}...
        </p>
      )}

      <div className="flex-container-bottom-row yellow-border">
        <div className="flex-element-read-more purple-border">
          <button
            className="read-more-btn"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Read less" : "Read more"}
          </button>
        </div>
        <div className="flex-element-favorite purple-border">
          <div className="favorite-div red-border">
            <label className="favorite-label">Like </label>
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            <label> {inventory.reactions}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
