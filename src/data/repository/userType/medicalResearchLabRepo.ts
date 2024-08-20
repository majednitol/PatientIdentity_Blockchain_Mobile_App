import { PaymasterMode } from '@biconomy/account';
import { contractAddress } from '../../../service/constant';
import Address from '../../../service/wallet connect/Address';
import Contract from '../contract/contractRepo';

export default class MedicalResearchlab {
  static medicalResearchLabContractData = async () => {
    const contract = await Contract.fetchContract();
    const MedicalResearchLabAData = await contract?.getMedicalResearchLab(
      Address.connectedAccount(),
    );
      console.log(MedicalResearchLabAData);
      return MedicalResearchLabAData
  };

  static addingMedicalResearchLabReport = async (report: any,smartAccount:any) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.addLabReport(report);

    
    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse',userOpResponse)
  };

  static createMedicationResearchAccount = async (
    labID: any,
    name: any,
    licenseID: number,
    researchArea: any,
    labRating: any,emailAddress: any,smartAccount:any
  ) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.setMedicalResearchLab(
      labID,
      name,
      BigInt(licenseID * 1),
      researchArea,
      labRating,
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
}
