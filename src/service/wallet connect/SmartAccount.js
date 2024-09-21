import { createSmartAccountClient } from '@biconomy/account';
import { ethers } from 'ethers';

export default class SmartAccount {
  static privateKey = '';

  static setKey =  (key) => {
    if (key) {
      SmartAccount.privateKey = key;
    }
  };

  static connectedSmartAccount = async () => {
    if (!SmartAccount.privateKey) {
      console.log('Private key is null or empty');
      return null; // or handle the situation appropriately
    }
    const chains =
    {
      chainId: 97,
      name: "Cardona testnet",
      providerUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",

      biconomyPaymasterApiKey:
        "eVribMuLw.6d9e6709-5dd7-45d3-8b24-026b3ff2f339",
      explorerUrl: "https://cardona-zkevm.polygonscan.com",
    }
    const config = {
      biconomyPaymasterApiKey: chains.biconomyPaymasterApiKey,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${chains.chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,

    };
    console.log("SmartAccount.privateKey7889", SmartAccount.privateKey)
    const provider = new ethers.providers.JsonRpcProvider(chains.providerUrl);
    const signer = new ethers.Wallet(SmartAccount.privateKey, provider);
    console.log("Creating55555 smart wallet");

    // Create smart wallet
    try {
      const smartWallet = await createSmartAccountClient({
        signer: signer,
        biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
        bundlerUrl: config.bundlerUrl,
        rpcUrl: chains.providerUrl,
        chainId: chains.chainId,
      });

      console.log("Smart777777 wallet created");

      // Get smart account address
      const saAddress = await smartWallet.getAccountAddress();

      console.log("Smart Account Addres9900090:", saAddress);
      return [smartWallet, saAddress]
    } catch (error) {
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    }
  };

  static Balance = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount()
    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
    const balanceWei = await provider.getBalance(saAddress);
    const balanceEth = ethers.utils.formatEther(balanceWei);
    return balanceEth

  }
}