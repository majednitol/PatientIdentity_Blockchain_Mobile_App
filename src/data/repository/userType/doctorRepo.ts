import {PaymasterMode} from '@biconomy/account';
import {contractAddress} from '../../../service/constant';
import Address from '../../../service/wallet connect/Address';
import Contract from '../contract/contractRepo';

export default class Doctor {
  static doctorContractData = async (address = Address.connectedAccount()) => {
    const contract = await Contract.fetchContract();
    const doctorData = await contract?.getDoctor(address);
    // console.log('doctorData', doctorData);
    return doctorData;
  };

  static createDoctorAccount = async (
    doctorID: number,
    name: any,
    specialty: any,
    consultationFee: number,
    BMDCNumber: number,
    yearOfExperience: number,
    birthday: any,
    emailAddress: any,
    smartAccount: any,
  ) => {

   
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.setDoctor(
      BigInt(doctorID * 1),
      name,
      specialty,
      BigInt(consultationFee * 1),
      BigInt(BMDCNumber * 1),
      BigInt(yearOfExperience * 1),
      birthday,
    );
    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: {mode: PaymasterMode.SPONSORED},
    });
    console.log('userOpResponse', userOpResponse);
  };
  static patientData = async (address: any) => {
    const contract = await Contract.fetchContract();
    if (contract) {
      const patientData = await contract?.getPatient(address);
      console.log('patientData7', contract);
      return patientData;
    }
  };
  static pathologistData = async (address: any) => {
    const contract = await Contract.fetchContract();
    if (contract) {
      const pathologistData = await contract?.getPathologist(address);
      console.log('patientData7', contract);
      return pathologistData;
    }
  };
}
