import React, { useState } from "react";
import "./Search.css";
import { useQuery} from "@apollo/client";
import Story from "./Story";
import { GET_POST_INVENTORY } from "../queries/Queries";
import { FetchResult, Post } from "./Types";

const Search: React.FC = () => {

  //dataen det søkes blant:
  const { loading, data } = useQuery<FetchResult>(GET_POST_INVENTORY);

  //storyList settes til å være dataen det søkes blant, nemlig stories (som er definert over)
  const [storyList, setStoryList] = React.useState<
    | Post[]
    | undefined
  >(data?.getPost);

  console.log("DataInventory", GET_POST_INVENTORY);

  const [searchText, setSearchText] = React.useState<string>("");

  //funksjon som kalles på når det Search-button trykkes på.
  const handleOnClick = () => {
    //finner story (eller storyene) som har tittelen som det søkes på. dersom storyList ikke er satt eller lengden på storyList ikke er større enn null, så settes findStories til å være undefined.
    const findStories =
      storyList && storyList?.length > 0
        ? storyList?.filter((u) => u?.title === searchText)
        : undefined;

    console.log(findStories);

    //storyList som skal vises settes til å være søkeresultatet fra findStories
    setStoryList(findStories);
  };

  return (
    <div className="parent-div light-pink-border">
      <header className="header blue-border">
        <h1>Fantastic short stories</h1>
        <p>Search among hundreds of titles</p>
      </header>

      <section className="search-section blue-border">
        <form
          className="search-form grid-container-search-form yellow-border"
          action="search-form"
        >
          <label
            className="search-label grid-element-one purple-border"
            htmlFor=""
          >
            Search by title
          </label>
          <input
            className="search-input grid-element-two purple-border"
            type="text"
            placeholder=" Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setStoryList(data?.getPost);
            }}
          />
          {/* bruker divs utenpå knapper for å plassere de enklere */}
          <div className="grid-element-three purple-border">
            <button
              className="search-btn"
              disabled={!searchText}
              onClick={handleOnClick}
              font-style="Gill Sans"
            >
              Search
            </button>
          </div>
        </form>
      </section>
      <section className="select-section blue-border">
        <div className="grid-container-select-section yellow-border">
          <div className="grid-element-picture purple-border">
            <img
              src={process.env.PUBLIC_URL + "/stories.svg"}
              alt="Books"
            ></img>
          </div>
          <div className="grid-element-one column purple-border">
            <label className="filter-label red-border" htmlFor="filter">
              Filter stories on tag{" "}
            </label>
            <select className="filter-select red-border" id="filter-drop-down">
              <option value="choose">Choose filter</option>
              <option value="romance">Romance</option>
              <option value="horror">Horror</option>
              <option value="funny">Funny</option>
            </select>
          </div>
          <div className="grid-element-two column purple-border">
            <label className="sort-label red-border" htmlFor="sort">
              Sort stories by{" "}
            </label>
            <select className="sort-select red-border" id="sort-drop-down">
              <option value="default">Default</option>
              <option value="length">Length</option>
              <option value="likes">Likes</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </section>
      <section className="result-section blue-border">
        {/* denne labelen bør legges til slik at den dukker opp når man trykker søk */}
        {/* <label>Results from search</label> */}
        {}
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="all-stories-div">
            {data &&
              data.getPost.map((inventory) => <Story key={inventory.id} inventory={inventory} />)}
          </div>
        )}
      </section>
      {/* ha med eller droppe footer ?  */}
      <footer></footer>
    </div>
  );
};

export default Search;
