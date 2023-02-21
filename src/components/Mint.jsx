import React from "react";

function Mint(props) {
  return (
    <>
      <div className="mint-container">
        <h2>Mint(For user)</h2>
        <img
          className="nft-img"
          src="https://static.designboom.com/wp-content/dbsub/452370/2022-12-16/ai-images-promises-much-more-than-hadidian-images-10-639c34a193ea2.jpg"
          alt=""
        />
        <button className="header-conn-btn" onClick={props.onMint}>
          Mint with USDT
        </button>
        <button className="header-conn-btn" onClick={props.onMintBUSD}>
          Mint with BUSD
        </button>
      </div>
    </>
  );
}

export default Mint;
