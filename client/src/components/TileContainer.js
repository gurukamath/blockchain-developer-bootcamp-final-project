import React, { useState } from "react";
import Tile from "./Tile.js";
import { FullMethodList } from "./FullMethodList.js";
import { RoleDefinitions, stageDescriptions } from "./Roles.js";
import GoToOtherAuctions from "./GoToOtherAuctions";

function TileContainer(props) {
  const [success, setSuccess] = useState(0);

  const contractMethodList = FullMethodList.filter((el) => {
    const roleList = RoleDefinitions[props.role + props.stage];
    return roleList.includes(el.name);
  });

  function activateSuccess() {
    setSuccess(1);
  }

  const tileList = contractMethodList.map((v, i) => (
    <div key={i}>
      <Tile
        contractMethod={v}
        web3={props.web3}
        contract={props.contract.contractDetails}
        accounts={props.accounts}
        activateSuccess={activateSuccess}
        setStatus={props.setStatus}
      />
    </div>
  ));

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <p>
            <span>
              <b>Auction Name: </b>
            </span>
            {props.contract.name}
          </p>
          <p>
            <span>
              <b>Auction Description: </b>
            </span>
            {props.contract.desc}
          </p>
          <p>
            <span>
              <b>Your Role: </b>
            </span>
            {props.role}
          </p>
          <p>
            <span>
              <b>Tip: </b>
            </span>
            {stageDescriptions[props.role + props.stage]}
          </p>
        </div>
      </div>

      {tileList}
      {props.stage === "2" && success === 1 && props.role === "AuctionOwner" && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => props.refreshAuction()}
        >
          Proceed
        </button>
      )}
      <GoToOtherAuctions
        chooseAnotherAuction={props.chooseAnotherAuction}
        showOr={props.showOr}
      />
    </div>
  );
}

export default TileContainer;
