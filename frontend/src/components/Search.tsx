import React, { useState } from "react";
import "./Search.css";
import { useQuery, gql } from "@apollo/client";
import { storeValueIsStoreObject } from "@apollo/client/cache/inmemory/helpers";

const SearchBar: React.FC = () => {
  const GET_POST_INVENTORY = gql`
    query getQuoteInventory {
      getPost {
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

  //dataen det søkes blant:
  const { loading, data } = useQuery(GET_POST_INVENTORY);

  //storyList settes til å være dataen det søkes blant, nemlig stories (som er definert over)
  const [storyList, setStoryList] = React.useState<
    | {
        _id: String;
        id: Number;
        title: String;
        body: String;
        userId: Number;
        tags: Array<String>;
        reactions: Number;
      }[]
    | undefined
  >(data);

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
        <form className="search-form" action="search-form">
          <label className="search-label" htmlFor="">
            Search by title
          </label>
          <input
            className="search-input"
            type="text"
            placeholder=" Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setStoryList(data);
            }}
          />

          <button
            className="search-btn"
            disabled={!searchText}
            onClick={handleOnClick}
            font-style="Gill Sans"
          >
            Search
          </button>
        </form>
      </section>
      <section className="blue-container filter-and-sort">
        <div className="book-img-div">
          <img src={process.env.PUBLIC_URL + "/stories.svg"} alt="Books"></img>
        </div>
        <div className="filter">
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
        <div className="sort">
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
        <div>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <tbody>
              {/* inventory er alle elementene i mappingen */}
              {data &&
                data.getPost?.map((inventory: any) => (
                  <div className="short-story-div">
                    <h2>{inventory.title}</h2>
                    <div>
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
                    </div>
                  </div>
                ))}
            </tbody>
          )}
        </div>

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
};

export default SearchBar;
