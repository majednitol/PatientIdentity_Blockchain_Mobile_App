import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contractAddress } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';
import { ethers } from 'ethers';

export const fetchAdminData = createAsyncThunk('fetchAdminData', async (saAddress) => {
    try {
        const contract = await Contract.fetchContract()

        const adminData = await contract?.getAdmin(saAddress);
       
        return adminData.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});
export const fetchUserAnalytics = createAsyncThunk('fetchUserAnalytics', async () => {
    try {
        const contract = await Contract.fetchContract()

        const userAnalyticsData = await contract?.getAdminData();
        console.log("userAnalyticsData", userAnalyticsData)
        return userAnalyticsData.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});

export const createAdminAccount = createAsyncThunk(
    'createAdminAccount',
    async ({ adminID, name, gender }) => {
        try {
            console.log("data", adminID, name, gender);
            const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
            console.log('098876543234567', saAddress);
            const contract = await Contract.fetchContract()
            console.log(contract)
            const namePadded = ethers.utils.formatBytes32String(name);
            const genderPadded = ethers.utils.formatBytes32String(gender);
            // const emailAddressPadded = ethers.utils.formatBytes32String(emailAddress);
            const tx = await contract?.populateTransaction.setAdmin(
                BigInt(adminID * 1),
                namePadded,
                genderPadded
            );

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
    }
);


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminData: {
            data: null, loading: false,
            error: null,
            success: null,
        },
        userAnalytics: {
            data: 'zero', loading: false,
            error: null,
            success: null,
        },
        accountCreation: {
            loading: false,
            error: null,
            success: null,
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminData.pending, (state) => {
            state.adminData.loading = true;
            state.adminData.error = null;
        });
        builder.addCase(fetchAdminData.fulfilled, (state, action) => {
            state.adminData.loading = false;
            state.adminData.data = action.payload;
        });
        builder.addCase(fetchAdminData.rejected, (state, action) => {
            state.adminData.loading = false;
            state.adminData.error = action.error.message;
        });


        // addPatient
        builder.addCase(createAdminAccount.pending, (state) => {
            state.accountCreation.loading = true;
            state.accountCreation.error = null;
            state.accountCreation.success = null;
        });
        builder.addCase(createAdminAccount.fulfilled, (state, action) => {
            state.accountCreation.loading = false;
            state.accountCreation.success = action.payload;
            
        });
        builder.addCase(createAdminAccount.rejected, (state, action) => {
            state.accountCreation.loading = false;
            state.accountCreation.error = action.error.message;
        });


        builder.addCase(fetchUserAnalytics.pending, (state) => {
            state.userAnalytics.loading = true;
            state.userAnalytics.error = null;
           
        });
        builder.addCase(fetchUserAnalytics.fulfilled, (state, action) => {
            state.userAnalytics.loading = false;
            state.userAnalytics.data = action.payload;
            
        });
        builder.addCase(fetchUserAnalytics.rejected, (state, action) => {
            state.userAnalytics.loading = false;
            state.userAnalytics.error = action.error.message;
        });

    }

});

export default adminSlice.reducer;