import React from "react";

function AuctionSelector(props) {
  return (
    <div>
      <div
        className="form-text fs-2"
        style={{
          width: "100%",
          height: 20 + "px",
          borderBottom: 1 + "px solid black",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "40px",
            backgroundColor: "#fff",
            padding: "0 5px",
          }}
        >
          OR
        </span>
      </div>

      <div style={{ paddingTop: "70px" }}>
        <p className="form-text fs-2">Select An Existing Auction Below</p>
      </div>
      {props.deployedAuctionAddresses.map((v, i) => {
        return (
          <div key={i}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fs-5">{v._name}</h5>
                <p className="card-text fs-6">{v._desc}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    props.selectAuction(props.deployedAuctionAddresses[i])
                  }
                >
                  Select Auction
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AuctionSelector;
