import React, { useState } from "react";

function AuctionCreator(props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescChange(e) {
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
        onClick={() => props.createNewAuction(name, desc)}
      >
        Create Auction
      </button>
    </form>
  );
}

export default AuctionCreator;
