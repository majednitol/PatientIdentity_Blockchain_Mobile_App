import { PaymasterMode } from '@biconomy/account';
import { contractAddress } from '../../../service/constant';
import Address from '../../../service/wallet connect/Address';
import Contract from '../contract/contractRepo';

export default class Pathologist {
  static pathologistContractData = async (address = Address.connectedAccount()) => {
    const contract = await Contract.fetchContract();
    const pathologistAllData = await contract?.getPathologist(
      address
    );
      console.log(pathologistAllData);
      return pathologistAllData
  };

  static createPathologistAccount = async (
    pathologistID: any,
    name: any,
    licenseNumber: number,
    specializationArea: any,
    totalExperience: number,
    birthday: any,
    emailAddress: any,smartAccount:any
  ) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.setPathologist(
      pathologistID,
      name,
      BigInt(licenseNumber * 1),
      specializationArea,
      BigInt(totalExperience * 1),
      birthday,emailAddress
    );

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse',userOpResponse)
  };
  };

//   static addPathologistTest = async (
//     allergies: any,
//     cancer: any,
//     hormoneProblem: any,
//     diabetesLevel: any,
//   ) => {
//     const contract = await Contract.fetchContract();
//     const addPathologistTest = await contract.setPathologistTest(
//       allergies,
//       cancer,
//       hormoneProblem,
//       diabetesLevel,
//     );

//     await addPathologistTest.wait();
//   };

