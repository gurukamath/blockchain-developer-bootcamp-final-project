import React from "react";

function GoToOtherAuctions(props) {
  return (
    <div>
      {props.showOr && (
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
      )}

      <div style={{ paddingTop: "70px" }}>
        <button
          type="button"
          className="btn btn-secondary chooseAnotherAuction"
          onClick={() => props.chooseAnotherAuction()}
        >
          Go To Another Auction
        </button>
      </div>
    </div>
  );
}

export default GoToOtherAuctions;
