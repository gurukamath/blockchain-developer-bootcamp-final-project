import React, { useState } from "react";

function AuctionCreator(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");

  function handleNameChange(e) {
    setNameError("");
    setName(e.target.value);
  }

  function handleDescChange(e) {
    setDescError("");
    setDesc(e.target.value);
  }

  return (
    <form>
      <div id="newAuctionHelp" className="form-text">
        Please create a new auction here
      </div>
      <div className="mb-3">
        <label htmlFor="auctionName" className="form-label">
          Auction Name
        </label>
        {nameError !== "" && <p style={{ color: "red" }}>{nameError}</p>}
        <input
          type="text"
          className="form-control"
          id="auctionName"
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="auctionDescription" className="form-label">
          Auction Description
        </label>
        {descError !== "" && <p style={{ color: "red" }}>{descError}</p>}
        <input
          type="text"
          className="form-control"
          id="auctionDescription"
          onChange={handleDescChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          if (name === "") {
            setNameError("The name field is required");
          }
          if (desc === "") {
            setDescError("The description field is required");
          }
          if (name !== "" && desc !== "") {
            props.createNewAuction(name, desc);
          }
        }}
      >
        Create Auction
      </button>
    </form>
  );
}

export default AuctionCreator;
