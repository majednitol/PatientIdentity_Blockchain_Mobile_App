import Address from '../../../service/wallet connect/Address';
import Contract from '../contract/contractRepo';

export default class ConnectedAccountUserType {
  static connectedUserType = async () => {
  
     const contract = await Contract.fetchContract() 
     //  console.log("contract5",contract)
     
    const connectedAccountUserType = await contract?.ConnectedAccountType(
        Address.connectedAccount()
    );
    
      return connectedAccountUserType
    
   
  };
}
