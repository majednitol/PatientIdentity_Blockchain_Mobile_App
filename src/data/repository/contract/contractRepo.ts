import {ethers} from 'ethers';
import {contractAddress, patientIdentityABI} from '../../../service/constant';

export default class Contract {
  static providerUrl = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545';
  static key = '';

  // static setKey = (key: any) => {
  //   Contract.key = key;
  // };

  static fetchContract = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
      );
      // const wallet = new ethers.Wallet(Contract.key, provider);

      if (provider) {
        const contract = new ethers.Contract(
          contractAddress,
          patientIdentityABI,
          provider,
        );
       
        return contract;
      }
    } catch (error) {
      console.error('Error fetching contract:', error);
      return null;
    }
  };
}
