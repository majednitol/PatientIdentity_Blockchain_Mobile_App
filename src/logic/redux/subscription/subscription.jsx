import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { contractAddress, patientIdentityABI } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');

const contract = new ethers.Contract(contractAddress, patientIdentityABI, provider);

export const getSubscriptionTransactions = createAsyncThunk('getSubscriptionTransactions', async () => {
  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const getSTs = await contract?.getSubscriptionTransactions(saAddress);
    return getSTs.map(item => item.toString());
  } catch (error) {
    console.log("error getSTs", error)
    throw error;
  }
});
export const getSubscriptionStatus = createAsyncThunk('getSubscriptionStatus', async () => {
  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const SubscriptionStatus = await contract?.getSubscriptionStatus(saAddress);
    return SubscriptionStatus.map(item => item.toString());
  } catch (error) {
    console.log("error getSTs", error)
    throw error;
  }
});

export const addSubscription = createAsyncThunk('addSubscription', async ({ transaction }) => {

  try {
    console.log("transaction",transaction)
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.subscription(transaction);

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartWallet?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse', userOpResponse);
  } catch (error) {
    console.log(error)
    throw error;
  }
});
export const cancelSubscription = createAsyncThunk('cancelSubscription', async () => {

  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const contract = await Contract.fetchContract();
    const tx = await contract?.populateTransaction.cancelSubscription();

    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartWallet?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse', userOpResponse);
  } catch (error) {
    throw error;
  }
});
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    subscriptionTransactions: {
      data: null, loading: false,
      error: null,
      success: null
    },
    subscriptionStatus: {
      data: null, loading: false,
      error: null,
      success: null
    },
    addsubscription: {
      data: null, loading: false,
      error: null,
      success: null
    },
    cancelSubscription: {
      data: null, loading: false,
      error: null,
      success: null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscriptionTransactions.pending, (state) => {
      state.subscriptionTransactions.loading = true;
      state.subscriptionTransactions.error = null;
    });
    builder.addCase(getSubscriptionTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriptionTransactions.data = action.payload;
    });
    builder.addCase(getSubscriptionTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSubscriptionStatus.pending, (state) => {
      state.subscriptionStatus.loading = true;
      state.subscriptionStatus.error = null;
    });
    builder.addCase(getSubscriptionStatus.fulfilled, (state, action) => {
      state.subscriptionStatus.loading = false;
      state.subscriptionStatus.data = action.payload;
    });
    builder.addCase(getSubscriptionStatus.rejected, (state, action) => {
      state.subscriptionStatus.loading = false;
      state.subscriptionStatus.error = action.error.message;
    });
    builder.addCase(addSubscription.pending, (state) => {
      state.addsubscription.loading = true;
      state.addsubscription.error = null;
      state.addsubscription.success = null;
    });
    builder.addCase(addSubscription.fulfilled, (state, action) => {
      state.addsubscription.loading = false;
      state.addsubscription.data = action.payload;
    });
    builder.addCase(addSubscription.rejected, (state, action) => {
      state.addsubscription.loading = false;
      state.addsubscription.error = action.error.message;
    });
    // add top medicine
    builder.addCase(cancelSubscription.pending, (state) => {
      state.cancelSubscription.loading = true;
      state.cancelSubscription.error = null;
      state.cancelSubscription.success = null;
    });
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.cancelSubscription.loading = false;
      state.cancelSubscription.data = action.payload;
    });
    builder.addCase(cancelSubscription.rejected, (state, action) => {
      state.cancelSubscription.loading = false;
      state.cancelSubscription.error = action.error.message;
    });
  }

});

export default subscriptionSlice.reducer;