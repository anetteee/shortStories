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
  const story =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi labore voluptatibus vero impedit voluptatem id itaque laudantium ex, voluptate consequuntur sunt officiis illo quae exercitationem ut. In, quia quisquam voluptas quas optio ipsam voluptatum at soluta neque quis veniam laboriosam culpa quaerat quam blanditiis doloribus qui veritatis nisi! Beatae laboriosam odit id veniam, sint, dolorum pariatur, voluptatem quos modi nisi vitae voluptatum quidem corrupti necessitatibus officia non repudiandae accusantium quasi eum facere laudantium dolores. Explicabo quisquam ullam ducimus repellendus inventore maxime, sit totam architecto saepe corporis. Dolores a ut doloribus nisi fugit ex, totam at rem sed pariatur est et consectetur odio modi provident accusantium eaque mollitia architecto perspiciatis laboriosam voluptatibus, itaque nihil quaerat deleniti. Vel ullam vero, in, sequi ipsum maxime dolorum magni cupiditate eos quas ratione non veritatis maiores iure est recusandae blanditiis eius molestias minima natus. Odio consequuntur ipsam voluptatem sunt sint minima repellat non magnam inventore ratione, rerum delectus excepturi quae veritatis dolorem cumque labore voluptas optio facilis nisi molestias repudiandae aut. Eaque, numquam totam, unde corrupti quidem eligendi itaque exercitationem inventore ea in eos soluta est illo assumenda obcaecati cupiditate nihil quaerat ducimus fuga, iure perspiciatis adipisci voluptatum? Aut reiciendis non labore? Dicta, delectus placeat!";

  const [isFavorite, setIsFavorite] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavorite(e.target.checked);
  };

  // TODO endre div til header, input, button etc. for mer sustainable kode
  return (
    <div className="parent-container">
      <header className="blue-container text-center">
        <h1>Fantastic short stories</h1>
        <p>Search among thousands of titles!!</p>
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
          />
          <button className="search-btn">Search</button>
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
        <label>Results from search</label>
        <div className="short-story-div">
          <h2>Title</h2>
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
          </h3>
        </div>
      </section>

      <footer></footer>
    </div>
  );
};

export default SearchBar;
