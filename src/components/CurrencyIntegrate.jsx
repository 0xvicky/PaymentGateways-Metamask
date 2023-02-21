import React, { useState } from "react";
// import Input from "./Input";
// import { ethers } from "ethers";
import {
  ercContractAddress,
  ercAbi,
  bepContractAddress,
  bepAbi,
} from "../common";
import Mint from "./Mint";
const { ethers } = require("ethers");

function CurrencyIntegrate() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // await provider.request("eth_requestAccounts");
  const signer = provider.getSigner();

  const ercContract = new ethers.Contract(ercContractAddress, ercAbi, signer);
  const bepContract = new ethers.Contract(bepContractAddress, bepAbi, signer);

  const changeUSDT = async () => {
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0x5" }]);
    // Add a longer delay here
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const network = provider.network;
    console.log(network);
  };
  const mintUSDT = async () => {
    // await changeUSDT();

    try {
      console.log("Payment in processing for USDT..");
      const balErc = await ercContract.balanceOf(
        "0xbE1984950b7EaA09d30a87Ff370D0d474A582e26"
      );
      const balance = balErc.toString() / 10 ** 18;
      // const cost = "{COST OF CERTIFICATE}";
      const cost = "10000000000000000000";

      const pay = await ercContract.transfer(
        "0xCb2006BFFef96d9EaD1C81163BB64bCf5209a383",
        cost
      );
      await pay.wait(1);
      console.log("Payment successful");
      console.log(pay.data);
    } catch (error) {
      console.log(`Error Occured ${error}`);
    }
  };

  const changeBUSD = async () => {
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0x61" }]);
    // Add a longer delay here
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const network = provider.network;
    console.log(network);
  };

  const mintBUSD = async () => {
    // await changeBUSD();

    try {
      console.log("Payment in processing for BEP20...");
      // const balBEP = await bepContract.balanceOf(
      //   "0xbE1984950b7EaA09d30a87Ff370D0d474A582e26"
      // );
      // const balance = balBEP.toString() / 10 ** 18;
      // const cost = "10000000000000000000";
      // if (balance < cost) {
      //   console.log("Insufficient balance in wallet");
      // }

      const pay = await bepContract.transfer(
        "0xCb2006BFFef96d9EaD1C81163BB64bCf5209a383",
        "10000000000000000000"
      );
      await pay.wait(1);
      console.log("Payment successful");
      console.log(pay.data);
    } catch (error) {
      console.log(`Error Occured ${error}`);
    }
    //
  };

  return (
    <>
      <div className="currency-container">
        <Mint onMint={mintUSDT} onMintBUSD={mintBUSD} />
      </div>
    </>
  );
}

export default CurrencyIntegrate;
