import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contractAddress } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';

export const fetchMedicalResearchLabData = createAsyncThunk('fetchMedicalResearchLabData', async () => {
    try {
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const medicalResearchLabData = await contract?.getMedicalResearchLab(saAddress);
        console.log(medicalResearchLabData)
        return medicalResearchLabData.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});
export const createMedicalResearchLabAccount = createAsyncThunk('createMedicalResearchLabAccount', async ({ labID, name, licenseID, researchArea, labRating, emailAddress }) => {

    try {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const contract = await Contract.fetchContract();
        const namePadded = ethers.utils.formatBytes32String(name);
        const researchAreaPadded = ethers.utils.formatBytes32String(researchArea);

        const tx = await contract?.populateTransaction.setMedicalResearchLab(
            BigInt(labID * 1),
            namePadded,
            BigInt(licenseID * 1),
            researchAreaPadded,
            BigInt(labRating * 1),
        );

        const tx1 = {
            to: contractAddress,
            data: tx?.data,
        };
        const userOpResponse = await smartWallet?.sendTransaction(tx1, {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        console.log('userOpResponse', userOpResponse)
    } catch (error) {
        throw error;
    }
});
const medicalResearchLabSlice = createSlice({
    name: 'medicalResearchLab',
    initialState: {
        medicalResearchLabData: null,
        loading: false,
        error: null,
        success: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMedicalResearchLabData.pending, (state) => {
            state.loading = true;
            state.error = null;

        });
        builder.addCase(fetchMedicalResearchLabData.fulfilled, (state, action) => {
            state.loading = false;
            state.medicalResearchLabData = action.payload;
        });
        builder.addCase(fetchMedicalResearchLabData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // personal doctor
        builder.addCase(createMedicalResearchLabAccount.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        });
        builder.addCase(createMedicalResearchLabAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        });
        builder.addCase(createMedicalResearchLabAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });



    }

});

export default medicalResearchLabSlice.reducer;