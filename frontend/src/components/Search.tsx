import React, { useState } from "react";
import "./Search.css";
import { useQuery, gql } from "@apollo/client";
import { storeValueIsStoreObject } from "@apollo/client/cache/inmemory/helpers";

// const SearchBar: React.FC = () => {
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
  const [input, setInput] = React.useState<string>("");
  const { loading, data } = useQuery(GET_POST_INVENTORY, {
    variables: { tag: null, input: input },
  });

  console.log("DataInventory", GET_POST_INVENTORY);

  //funksjon som kalles på når det Search-button trykkes på.
  const handleOnClick = (ev: any) => {
    ev.preventDefault();
    setInput(searchText);
    console.log(searchText);
  };

  const [readMore, setReadMore] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
  };

  // TODO endre div til header, input, button etc. for mer sustainable kode
  return (
    <div className="parent-container">
      <header className="blue-container text-center">
        <h1>Fantastic short stories</h1>
        <p>Search among thousands of titles</p>
      </header>

      <section className="blue-container search">
        <form className="search-form yellow-wrapper" action="search-form">
          <label className="search-label purple-container" htmlFor="">
            Search by title
          </label>
          <input
            className="search-input purple-container"
            type="text"
            placeholder=" Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              // setStoryList(data);
            }}
          />

          <div className="purple-container">
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
      <section className="filter-and-sort-div blue-container ">
        <div className="book-img-div yellow-wrapper">
          <img src={process.env.PUBLIC_URL + "/stories.svg"} alt="Books"></img>
        </div>
        <div className="filter-div yellow-wrapper">
          <label className="filter-label" htmlFor="filter">
            Filter stories on tag{" "}
          </label>
          <select name="filter" id="filter-drop-down">
            <option value="choose">Choose filter</option>
            <option value="romance">Romance</option>
            <option value="horror">Horror</option>
            <option value="funny">Funny</option>
          </select>
        </div>
        <div className="sort-div yellow-wrapper">
          <label htmlFor="sort">Sort stories by </label>
          <select name="sort" id="sort-drop-down">
            <option value="default">Default</option>
            <option value="length">Length</option>
            <option value="likes">Likes</option>
            <option value="title">Title</option>
          </select>
        </div>
      </section>
      <section className="blue-container results">
        {/* denne labelen bør legges til slik at den dukker opp når man trykker søk */}
        {/* <label>Results from search</label> */}

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="orange-div">
            {/* <tbody> */}
            {/* inventory er alle elementene i mappingen */}
            {data &&
              data.getPost?.map((inventory: any) => (
                <div className="grey-div">
                  <h2>{inventory.title}</h2>
                  {/* <div> */}
                  {readMore
                    ? `${inventory.body}`
                    : `${inventory.body.substring(0, 100)}...`}
                  <br />
                  <div className="bottom-row-div">
                    <button
                      className="read-more-btn"
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? "Read less" : "Read more"}
                    </button>

                    <div className="favorite-div">
                      <label className="favorite-label">
                        Mark as favorite{" "}
                      </label>
                      <input
                        type="checkbox"
                        onChange={handleChange}
                        checked={isFavorite}
                      />
                      <span className="checkmark"></span>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              ))}
            {/* </tbody> */}
          </div>
        )}

        {/* <h2>Title</h2>
          <h3>
            {readMore ? `${story}` : `${story.substring(0, 100)}...`}
            <br />
            <div className="bottom-row-div">
              <button
                className="read-more-btn"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read less" : "Read more"}
              </button>

              <div className="favorite-div">
                <label>Mark as favorite </label>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={isFavorite}
                />
                <span className="checkmark"></span>
              </div>
            </div>
          </h3> */}
      </section>

      <footer></footer>
    </div>
  );
}
export default Search;
