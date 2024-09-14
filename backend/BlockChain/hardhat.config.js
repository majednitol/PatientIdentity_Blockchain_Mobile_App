


require("@nomicfoundation/hardhat-toolbox");
const API_URL = `https://data-seed-prebsc-1-s1.bnbchain.org:8545`
const PRIVATE_KEY = "ffe5997f06ac02c03bd71e431a758c46e30ba655591732b6b33a25de2f5ba0d0"

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
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
    Amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 80002,
      saveDeployments: true,
    }
  }

};
