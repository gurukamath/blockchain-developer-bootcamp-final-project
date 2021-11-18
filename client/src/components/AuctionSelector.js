import React from "react";

function AuctionSelector(props) {
  return (
    <div>
      <label htmlFor="auction-select">Choose an existing auction:</label>

      <select name="auctions" id="auction-select">
        <option value="">--Please choose an auction--</option>
        {props.deployedAuctionAddresses.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default AuctionSelector;
