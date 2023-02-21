import React, { useState } from "react";
// import { ethers } from "ethers";
function Header() {
  const [walletAddr, setWalletAddr] = useState("Connect");
  const connect = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => setWalletAddr(res));
      }
    } catch (error) {
      console.log("error occure");
    }
  };
  return (
    <>
      <div className="header">
        <div className="header-head">Multi Currency Transaction</div>
        <div className="header-connected">
          <button className="header-conn-btn" onClick={connect}>
            {walletAddr}
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
