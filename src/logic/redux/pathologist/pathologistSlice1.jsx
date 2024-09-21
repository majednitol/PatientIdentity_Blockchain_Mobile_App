import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contractAddress } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';
import {ethers} from 'ethers'
export const fetchPathologistData = createAsyncThunk('fetchPathologistData', async (saAddress) => {
    try {
        
        const contract = await Contract.fetchContract();
        const pathologistData = await contract?.getPathologist(saAddress);
        console.log("pathologistData", pathologistData)
        return pathologistData.map(item => item.toString());
    } catch (error) {
        console.log(error)
    }
});

export const fetchPathologistDataFromDoctor = createAsyncThunk('fetchPathologistDataFromDoctor', async (doctorAddress) => {
    try {
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const prescription = await contract.getPathologistDataFromDoctor(doctorAddress,saAddress);
        return prescription.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});

export const fetchDoctorDataFromPathologist = createAsyncThunk('fetchDoctorDataFromPathologist', async (doctorAddress) => {
    try {
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const report = await contract.getDoctorDataFromPathologist( saAddress,doctorAddress);
        return report.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});

export const createPathologistAccount = createAsyncThunk('createPathologistAccount', async ({ pathologistID,
    name,
    licenseNumber,
    specializationArea,
    totalExperience, birthday, emailAddress }) => {

    try {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('098876543234567', saAddress)
        const contract = await Contract.fetchContract();
        const namePadded = ethers.utils.formatBytes32String(name);
        const specializationAreaPadded = ethers.utils.formatBytes32String(specializationArea);
        const birthdayPadded = ethers.utils.formatBytes32String(birthday);
        const emailAddressPadded = ethers.utils.formatBytes32String(emailAddress);
        const tx = await contract?.populateTransaction.setPathologist(
            pathologistID,
            namePadded,
            BigInt(licenseNumber * 1),
            specializationAreaPadded,
            BigInt(totalExperience * 1),
            birthdayPadded, emailAddressPadded
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
        console.log("error patholpgist account",error)
        throw error;
    }
});
const pathoSlice = createSlice({
    name: 'pathologist',
    initialState: {
        pathologistData: null,
        pathologistDataFromDoctor: null,
        DoctorDataFromPathologist: null,
        loading: false,
        error: null,
        success: null
    },
    extraReducers: (builder) => {

        builder.addCase(fetchDoctorDataFromPathologist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDoctorDataFromPathologist.fulfilled, (state, action) => {
            state.loading = false;
            state.DoctorDataFromPathologist = action.payload;
        });
        builder.addCase(fetchDoctorDataFromPathologist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchPathologistDataFromDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPathologistDataFromDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.pathologistDataFromDoctor = action.payload;
        });
        builder.addCase(fetchPathologistDataFromDoctor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchPathologistData.pending, (state) => {
            state.loading = true;
            state.error = null;

        });
        builder.addCase(fetchPathologistData.fulfilled, (state, action) => {
            state.loading = false;
            state.pathologistData = action.payload;
        });
        builder.addCase(fetchPathologistData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // personal doctor
        builder.addCase(createPathologistAccount.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        });
        builder.addCase(createPathologistAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        });
        builder.addCase(createPathologistAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });



    }

});

export default pathoSlice.reducer;