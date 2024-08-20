import { createSmartAccountClient } from '@biconomy/account';
import {ethers} from 'ethers';

export default class Address {
  static key = '';
  
  static setKey = (key: any) => {
    Address.key = key;
  };

  static connectedAccount = async () => {
    //  console.log('7777777777',Address.key)
   
    // Address.setKey(saAddress)
    // Set smart account address in state
  
    return Address.key;
  };
  
}
