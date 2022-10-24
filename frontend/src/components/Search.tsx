import React, { useState } from "react";
import "./Search.css";

const SearchBar: React.FC = () => {
  //dataen det søkes blant:
  const users = [
    {
      name: "Rebecca",
      age: 20,
      designation: "Bonde",
    },
    {
      name: "Jakobine",
      age: 25,
      designation: "President",
    },
    {
      name: "Jo",
      age: 30,
      designation: "Foreleser",
    },
    {
      name: "Bankimoon",
      age: 20,
      designation: "Kjendis",
    },
    {
      name: "johannes",
      age: 20,
      designation: "Software Engineer",
    },
  ];

  //userList settes til å være dataen det søkes blant, nemlig users (som er definert over)
  const [userList, setUserList] = React.useState<
    { name: string; age: number; designation: string }[] | undefined
  >(users);

  const [text, setText] = React.useState<string>("");

  //funksjon som kalles på når det Search-button trykkes på.
  const handleOnClick = () => {
    //finner brukeren (eller brukerne) som har navnet som det søkes på. dersom userList ikke er satt eller lengden på userList ikke er større enn null, så settes findUsers til å være undefined.
    const findUsers =
      userList && userList?.length > 0
        ? userList?.filter((u) => u?.name === text)
        : undefined;

    console.log(findUsers);

    //userList som skal vises settes til å være søkeresultatet fra findUsers
    setUserList(findUsers);
  };

  // TODO endre div til header, input, button etc. for mer sustainable kode
  return (
    <div className="App">
      <div className="title">
        <h1>Title</h1>
      </div>
      <div className="input_wrapper">
        <input
          type="text"
          placeholder="Search user"
          value={text}
          //når det skrives inn noe i input-feltet så settes teksten til å være det som skrives. userList settes til å være dataen det skal søkes blant.
          onChange={(e) => {
            setText(e.target.value);
            setUserList(users);
          }}
        />
        {/* dersom det ikke er noe innhold i input-feltet, så er knappen disabled (det er ikke mulig å trykke på den). 
        så fort det skrives inn noe i input-feltet, så blir det mulig å trykke på den*/}
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>
      <div className="body">
        {/* dersom userList er satt men lengden er lik 0, så returneres No user found. 
        Jeg tror at "===" betyr at operatoren ikke gjør type-conversions */}
        {userList && userList?.length === 0 && (
          <div className="notFound">No user found</div>
        )}

        {/* dersom userList er satt og lengden er større enn 0, så presenteres userList til å være en liste med body_items; en for hver user.  */}
        {userList &&
          userList?.length > 0 &&
          userList?.map((user) => {
            return (
              <div className="body_item">
                <h2>Name: {user?.name}</h2>
                <p>Age: {user?.age}</p>
                <p>Designation: {user?.designation}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchBar;
