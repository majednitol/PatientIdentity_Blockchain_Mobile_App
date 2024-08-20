


require("@nomicfoundation/hardhat-toolbox");
const API_URL = `https://data-seed-prebsc-1-s1.bnbchain.org:8545`
const PRIVATE_KEY = "e3804017109d1c513f95c87a5c29a7b6d56b2b8325d8754c9116fdc2356d1611"

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs:200
      }
    }
  },
  networks: {
    bnb: {
      url: API_URL,
      accounts: [`${PRIVATE_KEY}`]
    },
    coston2: {
      url: "https://coston2-api.flare.network/ext/bc/C/rpc",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 114,
    },
  }
  
};
