import React, { useState } from "react";
import TileInputs from "./TileInputs.js";
import { handleErrorMessage } from "./utils.js";
import { Spinner } from "react-bootstrap";

function Tile(props) {
  const _method = props.contractMethod;
  const inputsList = _method.inputNames;

  const [inputs, setInputs] = useState(Array(inputsList.length).fill(""));
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("READY");

  const changeFunctions = function (i, v) {
    setInputs(Object.assign([...inputs], { [i]: v }));
  };

  const clickFunctions = async function () {
    setStatus("LOADING");
    let t;
    let err;

    if (_method.name === "CommitNewBid") {
      const encoded = props.web3.eth.abi.encodeParameters(
        ["uint256", "string"],
        inputs
      );
      const hash = [props.web3.utils.sha3(encoded, { encoding: "hex" })];

      t = await _method
        .functionDef(hash, props.contract, props.accounts)
        .catch((e) => {
          err = handleErrorMessage(e.message);
        });
    } else {
      t = await _method
        .functionDef(inputs, props.contract, props.accounts)
        .catch((e) => {
          err = handleErrorMessage(e.message);
        });
    }

    if (t) {
      props.activateSuccess();
    } else {
      t = err;
    }

    setInputs(Array(inputsList.length).fill(""));
    setOutput(t);

    setStatus("READY");

    // setTimeout(() => { setOutput(''); props.handleClick() }, 6000);
  };

  const tileInputList = inputs.map((v, i) => {
    return (
      <div key={i}>
        <TileInputs
          input={inputsList[i]}
          setValue={v}
          inputChange={(e) => changeFunctions(i, e.target.value)}
        />
      </div>
    );
  });

  return (
    <div>
      {status === "LOADING" && (
        <div>
          <Spinner animation="border" size="sm" style={{ marginTop: "20px" }} />
          <p>Loading...</p>
        </div>
      )}
      <div className="mb-3 tile">
        <span className="input-group-text" id="basic-addon2">
          {_method.name}
        </span>
        <p>{_method.description}</p>
        {tileInputList}
      </div>
      {output && (
        <input type="text" className="output-display" readOnly value={output} />
      )}
      {
        <span className="input-group-text" id="button-addon">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => clickFunctions()}
          >
            Call Function
          </button>
        </span>
      }
    </div>
  );
}

export default Tile;
