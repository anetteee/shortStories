import React, { useState } from "react";
import "./Search.css";
import { useQuery, gql } from "@apollo/client";
import Story from "./Story";
import { FetchResult, Post } from "./Types";

const GET_POST_INVENTORY = gql`
  query getQuoteInventory($tag: String, $input: String) {
    getPost(tag: $tag, input: $input) {
      _id
      id
      title
      body
      userId
      tags
      reactions
    }
  }
`;

export function Search() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [selects, setSelects] = React.useState<string>("");
  const [input, setInput] = React.useState<string>("");
  const { loading, data } = useQuery<FetchResult>(GET_POST_INVENTORY, {
    variables: { tag: selects, input: input },
  });

  console.log("DataInventory", GET_POST_INVENTORY);

  //handel click on search-button
  const handleOnClick = (ev: any) => {
    //prevent refreash caused by form
    ev.preventDefault();
    setInput(searchText);
    console.log(searchText);
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
            }}
          />
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
      <section className="select-section blue-container ">
        <div className="grid-container-select-section yellow-wrapper">
          <div className="gris-element-picture purple-border">
            <img
              src={process.env.PUBLIC_URL + "/stories.svg"}
              alt="Books"
            ></img>
          </div>
          <div className="grid-element-one column purple-border">
            <label className="filter-label red-border" htmlFor="filter">
              Filter stories on tag{" "}
            </label>
            <select
              className="filter-select red-border"
              name="filter"
              id="filter-drop-down"
              value={selects}
              onChange={(e) => {
                setSelects(e.target.value);
              }}
            >
              <option value="">Choose filter</option>
              <option value="history">History</option>
              <option value="crime">Crime</option>
              <option value="english">English</option>
              <option value="love">Love</option>
              <option value="fiction">Fiction</option>
              <option value="french">French</option>
              <option value="classic">Classic</option>
              <option value="magical">Magical</option>
              <option value="mystery">Mystery</option>
              <option value="american">American</option>
            </select>
          </div>
          <div className="grid-element-two column purple-border">
            <label className="sort-label red-border" htmlFor="sort">
              Sort stories by{" "}
            </label>
            <select name="sort-select red-border" id="sort-drop-down">
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
              data.getPost.map((inventory) => (
                <Story key={inventory.id} inventory={inventory} />
              ))}
          </div>
        )}
      </section>
      {/* ha med eller droppe footer ?  */}
      <footer></footer>
    </div>
  );
}
export default Search;
