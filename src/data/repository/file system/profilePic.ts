import { PaymasterMode } from '@biconomy/account';
import { contractAddress } from '../../../service/constant';
import Contract from '../contract/contractRepo';

export default class ProfilePic {
  static uploadPic = async (url: any, smartAccount: any) => {
    console.log('ppppppppppp',smartAccount)
    const contract = await Contract.fetchContract();
    const tx = await contract?.addProfilePic(url);

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse',userOpResponse)
  };
}
