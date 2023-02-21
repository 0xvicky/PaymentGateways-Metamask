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
      const balErc = await ercContract.balanceOf("{RECEIVER ADDRESS}");
      const balance = balErc.toString() / 10 ** 18;
      const cost = "{COST OF CERTIFICATE}";
      if (balance < cost) {
        console.log("Insufficient balance in wallet");
      } else {
        const pay = await ercContract.transfer("{RECEIVER ADDRESS}", cost);
        await pay.wait(1);
        console.log("Payment successful");
        console.log(pay.data);
      }
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
    await changeBUSD();

    try {
      console.log("Payment in processing for BEP20...");
      const balBEP = await bepContract.balanceOf("{SENDER ADDRESS}");
      const balance = balBEP.toString() / 10 ** 18;
      const cost = "{COST OF CERTIFICATE}";
      if (balance < cost) {
        console.log("Insufficient balance in wallet");
      } else {
        const pay = await bepContract.transfer(
          "{RECEIVER ADDRESS}",
          "{COST OF CERTIFICATE}"
        );
        await pay.wait(1);
        console.log("Payment successful");
        console.log(pay.data);
      }
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
