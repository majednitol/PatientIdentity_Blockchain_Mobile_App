import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { contractAddress, patientIdentityABI } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');

const contract = new ethers.Contract(contractAddress, patientIdentityABI, provider);

export const isConfirmedbyAdmin = createAsyncThunk('isConfirmedbyAdmin', async ({ userAddress }) => {
  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const isConfirmedUser = await contract?.isConfirmed(saAddress,userAddress);
    // return isConfirmedUser.map(item => item.toString());
    console.log("isConfirmedUser", isConfirmedUser)
    return isConfirmedUser
  } catch (error) {
    console.log("error isConfirmedUser", error)
    throw error;
  }
});
export const getPendingUserAddess = createAsyncThunk('getPendingUserAddess', async () => {
  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const pendingUserAddess = await contract?.getPendingUserAddess();
    return pendingUserAddess.map(item => item.toString());
  } catch (error) {
    console.log("error getSTs", error)
    throw error;
  }
});

export const giveConfirmation = createAsyncThunk('giveConfirmation', async ({ userAddress }) => {
    console.log("transaction",userAddress)

  try {
    // console.log("transaction",transaction)
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.giveConfirmation(userAddress);

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartWallet?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse', userOpResponse);
  } catch (error) {
    console.log("error confirm",error)
    throw error;
  }
});

const transactionConfirmationSlice = createSlice({
  name: 'transactionConfirmation',
  initialState: {
    provideConfirmation: {
      data: null, loading: false,
      error: null,
      success: null
    },
    pendingUserAllAddess: {
      data: null, loading: false,
      error: null,
      success: null
    },
    isConfirmed: {
      data: null, loading: false,
      error: null,
      success: null
    }


  },
  extraReducers: (builder) => {

    builder.addCase(isConfirmedbyAdmin.pending, (state) => {
      state.isConfirmed.loading = true;
      state.isConfirmed.error = null;
    });
    builder.addCase(isConfirmedbyAdmin.fulfilled, (state, action) => {
      state.isConfirmed.loading = false;
      state.isConfirmed.data = action.payload;
    });
    builder.addCase(isConfirmedbyAdmin.rejected, (state, action) => {
      state.isConfirmed.loading = false;
      state.isConfirmed.error = action.error.message;
    });
    builder.addCase(getPendingUserAddess.pending, (state) => {
      state.pendingUserAllAddess.loading = true;
      state.pendingUserAllAddess.error = null;
    });
    builder.addCase(getPendingUserAddess.fulfilled, (state, action) => {
      state.pendingUserAllAddess.loading = false;
      state.pendingUserAllAddess.data = action.payload;
    });
    builder.addCase(getPendingUserAddess.rejected, (state, action) => {
      state.pendingUserAllAddess.loading = false;
      state.pendingUserAllAddess.error = action.error.message;
    });
    builder.addCase(giveConfirmation.pending, (state) => {
      state.provideConfirmation.loading = true;
      state.provideConfirmation.error = null;
      state.provideConfirmation.success = null;
    });
    builder.addCase(giveConfirmation.fulfilled, (state, action) => {
      state.provideConfirmation.loading = false;
      state.provideConfirmation.data = action.payload;
    });
    builder.addCase(giveConfirmation.rejected, (state, action) => {
      state.provideConfirmation.loading = false;
      state.provideConfirmation.error = action.error.message;
    });


  }

});

export default transactionConfirmationSlice.reducer;