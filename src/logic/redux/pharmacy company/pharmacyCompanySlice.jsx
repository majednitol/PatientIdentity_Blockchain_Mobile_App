import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { contractAddress, patientIdentityABI } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');

const contract = new ethers.Contract(contractAddress, patientIdentityABI, provider);

export const fetchPharmacyCompanyData = createAsyncThunk('fetchPharmacyCompanyData', async () => {
  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const pharmacyCompanyData = await contract?.getPharmacyCompany(saAddress);
    return pharmacyCompanyData.map(item => item.toString());
  } catch (error) {
    console.log("error fetchPharmacyCompanyData",error)
    throw error;
  }
});

export const createPharmacyCompanyAccount = createAsyncThunk('createPharmacyCompanyAccount', async ({ companyID,
  name,
  licenseID,
  productInformation,
  pharmacyRating,emailAddress}) => {

    try {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
      const contract = await Contract.fetchContract();
      const namePadded = ethers.utils.formatBytes32String(name);
      const productInformationPadded = ethers.utils.formatBytes32String(productInformation);
        const tx = await contract?.populateTransaction.setPharmacyCompany(
          BigInt(companyID * 1),
          namePadded,
          BigInt(licenseID * 1),
          productInformationPadded,
          BigInt(pharmacyRating * 1),
        );
    
        const tx1 = {
          to: contractAddress,
          data: tx?.data,
        };
        const userOpResponse = await smartWallet?.sendTransaction(tx1, {
          paymasterServiceData: {mode: PaymasterMode.SPONSORED},
        });
        console.log('userOpResponse', userOpResponse);
  } catch (error) {
    throw error;
  }
});
export const addTopMedicine = createAsyncThunk('addTopMedicine', async ({ topMedicine}) => {

  try {
      console.log(topMedicine)
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const contract = await Contract.fetchContract();
        const tx = await contract?.populateTransaction.addTopMedichine(topMedicine);
    
        const tx1 = {
          to: contractAddress,
          data: tx?.data,
        };
        const userOpResponse = await smartWallet?.sendTransaction(tx1, {
          paymasterServiceData: {mode: PaymasterMode.SPONSORED},
        });
        console.log('userOpResponse', userOpResponse);
  } catch (error) {
    throw error;
  }
});
const pharmacyCompanySlice = createSlice({
    name: 'pharmacyCompany',
    initialState: {
        pharmacyCompanyData: null,
        loading: false,
        error: null,
        success:null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPharmacyCompanyData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
            builder.addCase(fetchPharmacyCompanyData.fulfilled, (state, action) => {
                state.loading = false;
                state.pharmacyCompanyData = action.payload;
            });
            builder.addCase(fetchPharmacyCompanyData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            builder.addCase(createPharmacyCompanyAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            });
            builder.addCase(createPharmacyCompanyAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            });
            builder.addCase(createPharmacyCompanyAccount.rejected, (state, action) => {
                state.loading = false;
               state.error = action.error.message;
            });
      // add top medicine
      builder.addCase(addTopMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
    });
    builder.addCase(addTopMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
    });
    builder.addCase(addTopMedicine.rejected, (state, action) => {
        state.loading = false;
       state.error = action.error.message;
    });
     }
        
});

export default pharmacyCompanySlice.reducer;