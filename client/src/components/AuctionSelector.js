import React from "react";

function AuctionSelector(props) {
  return (
    <div>
      {props.deployedAuctionAddresses.map((v, i) => {
        return (
          <div className="card" key={i}>
            <div className="card-body">
              <h5 className="card-title">{v._name}</h5>
              <p className="card-text">{v._desc}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  props.selectAuction(props.deployedAuctionAddresses[i])
                }
              >
                Select Auction
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AuctionSelector;
