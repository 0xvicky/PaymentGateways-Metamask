require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
// require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-chai-matchers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // localhost: {
    //     url: RPC_URL,
    //     chainId: 31337,
    //     accounts: [PRIVATE_KEY],
    // },
    goerli: {
      url: RPC_URL,
      chainId: 5,
      accounts: [PRIVATE_KEY],
    },
  },
};
