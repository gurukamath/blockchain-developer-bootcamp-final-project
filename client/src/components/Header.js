import React from "react";

function Header(props) {
  let showAddress;

  if (props.account) {
    showAddress =
      "Address: " +
      props.account.slice(0, 6) +
      "...." +
      props.account.slice(-4);
  } else {
    showAddress = "";
  }
  return (
    <div>
      <header className="App-header">
        <h3>Secret Auction</h3>
        <h5>{showAddress}</h5>
      </header>
    </div>
  );
}

export default Header;
