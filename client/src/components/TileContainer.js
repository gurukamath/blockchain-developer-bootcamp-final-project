import React from "react";
import Tile from "./Tile.js";
import { FullMethodList } from "./FullMethodList.js";
import { RoleDefinitions, stageDescriptions } from "./Roles.js";
import GoToOtherAuctions from "./GoToOtherAuctions";

function TileContainer(props) {
  const contractMethodList = FullMethodList.filter((el) => {
    const roleList = RoleDefinitions[props.role + props.stage];
    return roleList.includes(el.name);
  });

  const tileList = contractMethodList.map((v, i) => (
    <div key={i}>
      <Tile
        contractMethod={v}
        web3={props.web3}
        contract={props.contract.contractDetails}
        accounts={props.accounts}
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
      <GoToOtherAuctions
        chooseAnotherAuction={props.chooseAnotherAuction}
        showOr={props.showOr}
      />
    </div>
  );
}

export default TileContainer;
