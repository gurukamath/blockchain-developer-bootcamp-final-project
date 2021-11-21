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
      <div className="form-text fs-2">Create A New Auction</div>
      <div className="container">
        <div className="row g-3 create-auction-row">
          <div className="col-md-4">
            <label htmlFor="auctionName" className="form-label">
              Auction Name
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="auctionName"
              onChange={handleNameChange}
            />
          </div>
          <div className="col-md-4">
            <span className="form-text">
              {nameError !== "" && (
                <p style={{ color: "red", textAlign: "left" }}>{nameError}</p>
              )}
            </span>
          </div>
        </div>
        <div className="row g-3 create-auction-row">
          <div className="col-md-4">
            <label htmlFor="auctionName" className="form-label">
              Auction Description
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="auctionDescription"
              onChange={handleDescChange}
            />
          </div>
          <div className="col-md-4">
            <span className="form-text">
              {descError !== "" && (
                <p style={{ color: "red", textAlign: "left" }}>{descError}</p>
              )}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-secondary create-auc-btn"
        style={{ marginBottom: "40px" }}
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
