import React, { useState } from "react";

function AuctionSelector(props) {
  const [selectedAuction, setSelectedAuction] = useState("");

  async function handleChange(e) {
    // console.log(e.target.value);
    setSelectedAuction(e.target.value);
  }
  return (
    <div>
      <label htmlFor="auction-select">Choose an existing auction:</label>

      <select
        name="auctions"
        id="auction-select"
        onChange={(e) => handleChange(e)}
      >
        <option value="">--Please choose an auction--</option>
        {props.deployedAuctionAddresses.map((v, i) => {
          return (
            <option key={i} value={v.newAddress}>
              {v._name}
            </option>
          );
        })}
      </select>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => props.selectAuction(selectedAuction)}
      >
        Select Auction
      </button>
    </div>
  );
}

export default AuctionSelector;
