import { PaymasterMode } from '@biconomy/account';
import { contractAddress } from '../../../service/constant';
import Address from '../../../service/wallet connect/Address';
import Contract from '../contract/contractRepo';
export default class Patient {
  static patientContractData = async (address = Address.connectedAccount()) => {
    const contract = await Contract.fetchContract();
   if (contract) {
     const patientData = await contract?.getPatient(address);
     console.log('patientData7', contract);
     return patientData;
   }
   
  };

  static patientPrescription = async () => {
    const contract = await Contract.fetchContract();
    const patientPrescription = await contract?.showSharedPrescription(
      Address.connectedAccount(),
    );

    return patientPrescription;
  };

  static createPatientAccount = async (
    patientID: any,
    name: any,
    gender: any,
    age: number,
    location: any,
    birthday: any,
    emailAddress: any,smartAccount:any
  ) => {
    
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.setPatient(
      BigInt(patientID * 1),
      name,
      gender,
      BigInt(age * 1),
      location,birthday,emailAddress
    );

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse',userOpResponse)
  };

  static updatePatientHealthData = async (
    height: any,
    blood: any,
    previousDiseases: any,
    medicineDrugs: any,
    badHabits: any,
    chronicDiseases: any,
    healthAllergies: any,
    birthDefects: any,smartAccount:any
  ) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.setPatientPersonalData(
    height,
      blood,
      previousDiseases,
      medicineDrugs,
      badHabits,
      chronicDiseases,
      healthAllergies,
      birthDefects,
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
  static shareData = async (receiptAddress: any,smartAccount:any) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.transferDataByPatient(
      receiptAddress,
    );

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    
  };
}
