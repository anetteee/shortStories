import React, { useState } from "react";
import "./Search.css";
import { useQuery, gql } from "@apollo/client";

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
  const { loading, data } = useQuery(GET_POST_INVENTORY, {
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
          <select
            name="filter"
            id="filter-drop-down"
            value={selects}
            onChange={(e) => {
              setSelects(e.target.value);
            }}
          >
            <option value="choose">Choose filter</option>
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
      </section>

      <footer></footer>
    </div>
  );
}
export default Search;
