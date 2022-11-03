import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DECREASE_REACTION, INCREMENT_REACTION } from "../queries/Queries";
import { StoryProps } from "./Types";
import { useRecoilState } from "recoil";
import { expandedStoriesListState } from "./storyListState";

const Story: React.FC<StoryProps> = ({ inventory }) => {
  //const listOfExpandedStories = useRecoilValue(expandedStoriesListState); //["id1", "id2"]           //getExpandedStateFromRecoil() -> ["id1", "id2", "id3"...]
  const [expandedList, setExpandedList] = useRecoilState(
    expandedStoriesListState
  );
  const index = expandedList.findIndex(
    (listItem) => listItem === inventory._id
  );
  //const [readMore, setReadMore] = useState(false);
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

  const updateRecoilList = () => {
    // console.log("Updating the list :))");
    if (expandedList.includes(inventory._id)) {
      //Finn  funksjonen som kan kan fjerne fra en array i recoil staten. F.eks.:
      setExpandedList((oldExpandedList) => {
        return oldExpandedList.filter((value, i) => {
          return i !== index;
        });
      });
    } else {
      //Finn  funksjonen som kan oppdatere staten i recoil f.eks.:

      setExpandedList((oldExpandedList) => [...oldExpandedList, inventory._id]);
    }
  };

  const readMore = expandedList.includes(inventory._id);
  // console.log(readMore);
  // console.log(expandedList);

  return (
    <div className="story-div  light-gray-border" data-testid="stories-list">
      <h2>{inventory.title}</h2>
      {readMore ? (
        <>
          <div data-testid="tags">
            <p className={readMore ? "p-extra-margin" : "p-no-margin"}>
              {inventory.body}
            </p>

            <p data-testid="tags" className="p-no-margin">
              Tags: {inventory.tags[0]}, {inventory.tags[1]}
            </p>
            {inventory.tags[2] ? (
              <p data-testid="tags" className="p-no-margin">
                , {inventory.tags[2]}
              </p>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <p className={readMore ? "p-extra-margin" : "p-no-margin"}>
          {inventory.body.substring(0, 100)}...
        </p>
      )}

      <div className="flex-container-bottom-row yellow-border">
        <div className="flex-element-read-more purple-border">
          <button
            data-testid="read-more-button"
            className="read-more-btn"
            onClick={() => updateRecoilList()}
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
            <label data-testid="reactions-label"> {inventory.reactions}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
