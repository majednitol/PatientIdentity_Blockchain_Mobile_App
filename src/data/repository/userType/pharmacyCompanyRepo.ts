import {PaymasterMode} from '@biconomy/account';
import {contractAddress} from '../../../service/constant';
import Address from '../../../service/wallet connect/Address';
import Contract from '../contract/contractRepo';

export default class PharmacyCompany {
  static pharmacyCompanyContractData = async () => {
    const contract = await Contract.fetchContract();

    console.log(contract);
    const PharmacyCompanyData = await contract?.getPharmacyCompany(
      Address.connectedAccount(),
    );

    console.log('PharmacyCompanyData', PharmacyCompanyData);
    return PharmacyCompanyData;
  };

  static createPharmacyCompanyAccount = async (
    companyID: number,
    name: any,
    licenseID: number,
    productInformation: any,
    pharmacyRating: number,
    emailAddress: any,
    smartAccount: any,
  ) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.setPharmacyCompany(
      BigInt(companyID * 1),
      name,
      BigInt(licenseID * 1),
      productInformation,
      BigInt(pharmacyRating * 1),
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

  static addTopMedicine = async (medichine: any, smartAccount: any) => {
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.addTopMedichine(medichine);

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: {mode: PaymasterMode.SPONSORED},
    });
    console.log('userOpResponse', userOpResponse);
  };
}
