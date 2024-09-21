import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contractAddress } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';
import { ethers } from 'ethers';

export const fetchPatientData = createAsyncThunk('fetchPatientData', async (saAddress) => {
    try {
        const contract = await Contract.fetchContract()

        const patientData = await contract?.getPatient(saAddress);
        console.log("object", patientData)
        return patientData.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});
export const getsharedAllDoctorAddress = createAsyncThunk('getsharedAllDoctorAddress', async () => {
    try {
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const doctorsAddress = await contract?.getsharedAllDoctorAddress(saAddress);
        console.log("doctorsAddress", doctorsAddress)
        return doctorsAddress.map(item => item.toString());
    } catch (error) {
        console.log("error",error)
        throw error;
    }
});
export const getPersonalDoctor = createAsyncThunk('getPersonalDoctor', async () => {
    try {
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const personalDoctor = await contract.getPersonalDoctor(saAddress);
        console.log("personalDoctor",personalDoctor)
        return personalDoctor.map(item => item.toString());
    } catch (error) {
        console.log(error)
        throw error;
    }
});
export const fetchPatientDataFromDoctor = createAsyncThunk('fetchPatientDataFromDoctor', async (doctorAddress) => {
    try {
        const contract = await Contract.fetchContract()
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const prescription = await contract.getPatientDataFromDoctor(doctorAddress, saAddress);
        return prescription.map(item => item.toString());
    } catch (error) {
        throw error;
    }
});

export const createPatientAccount = createAsyncThunk(
    'createPatientAccount',
    async ({ patientID, name, gender, age, location, birthday, emailAddress }) => {
        try {

            const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();

            const contract = await Contract.fetchContract()
            console.log(contract)
            const namePadded = ethers.utils.formatBytes32String(name);
            const genderPadded = ethers.utils.formatBytes32String(gender);
            const locationPadded = ethers.utils.formatBytes32String(location);
            const birthdayPadded = ethers.utils.formatBytes32String(birthday);
            const emailAddressPadded = ethers.utils.formatBytes32String(emailAddress);
            const tx = await contract?.populateTransaction.setPatient(
                BigInt(patientID * 1),
                namePadded,
                genderPadded,
                BigInt(age * 1),
                locationPadded,
                birthdayPadded,
                emailAddressPadded
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
            console.log("error", error)
            throw error;

        }
    }
);

export const deletePrescription = createAsyncThunk(
    'deletePrescription',
    async (index, userAddress) => {
        try {

            const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
            // console.log('098876543234567', saAddress);

            console.log("userAddress545", userAddress)
            const contract = await Contract.fetchContract()
            const tx = await contract.populateTransaction.deletePrecription(index, saAddress)
            const tx1 = {
                to: contractAddress,
                data: tx?.data,
            };
            const userOpResponse = await smartWallet?.sendTransaction(tx1, {
                paymasterServiceData: { mode: PaymasterMode.SPONSORED },
            });
            console.log('deletesuccess', userOpResponse)
        } catch (error) {
            console.log('delete error', error)
        }
    }
);
export const updatePatientHealthData = createAsyncThunk('updatePatientHealthData', async ({ heigh,
    bloodGroup,
    previousDiseases,
    medicineDrugs,
    badHabits,
    chronicDiseases,
    healthAllergies,
    birthDefects }) => {

    try {

        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('098876543234567', saAddress)
        const contract = await Contract.fetchContract()
        const tx = await contract?.populateTransaction.setPatientPersonalData(
            heigh,
            bloodGroup,
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
        const userOpResponse = await smartWallet?.sendTransaction(tx1, {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        console.log('userOpResponse', userOpResponse)
    } catch (error) {
        console.log(error);
    }
});
export const shareDataByPatient = createAsyncThunk('shareDataByPatient', async ({ scannedAddress }) => {

    try {
        console.log('address', scannedAddress)
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('098876543234567', saAddress)
        const contract = await Contract.fetchContract()
        const tx = await contract?.populateTransaction.shareData(
            scannedAddress
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
        console.log(error);
    }
});

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        patientData: null,
        patientDataFromDoctor: null,
        personalDoctor: null,
        loading: false,
        error: null,
        success: null,
        deleteLoader: false,
        updateloading: false,
        sharedAllDoctorAddress: {
            data: null,
            loading: false,
            error: null,
            success: null,
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPatientData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPatientData.fulfilled, (state, action) => {
            state.loading = false;
            state.patientData = action.payload;
        });
        builder.addCase(fetchPatientData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getsharedAllDoctorAddress.pending, (state) => {
            state.sharedAllDoctorAddress.loading = true;
            state.sharedAllDoctorAddress.error = null;
        });
        builder.addCase(getsharedAllDoctorAddress.fulfilled, (state, action) => {
            state.sharedAllDoctorAddress.loading = false;
            state.sharedAllDoctorAddress.data = action.payload;
        });
        builder.addCase(getsharedAllDoctorAddress.rejected, (state, action) => {
            state.sharedAllDoctorAddress.loading = false;
            state.sharedAllDoctorAddress.error = action.error.message;
        });

        // personal doctor
        builder.addCase(getPersonalDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPersonalDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.personalDoctor = action.payload;
        });
        builder.addCase(getPersonalDoctor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // delete prescription
        builder.addCase(deletePrescription.pending, (state) => {
            state.deleteLoader = true;
            state.error = null;
            state.success = null;
        });
        builder.addCase(deletePrescription.fulfilled, (state, action) => {
            state.deleteLoader = false;
            state.success = action.payload;
        });
        builder.addCase(deletePrescription.rejected, (state, action) => {
            state.deleteLoader = false;
            state.error = action.error.message;
        });
        //patientDataFromDoctor
        builder.addCase(fetchPatientDataFromDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPatientDataFromDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.patientDataFromDoctor = action.payload;
        });
        builder.addCase(fetchPatientDataFromDoctor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(shareDataByPatient.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        });
        builder.addCase(shareDataByPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        });
        builder.addCase(shareDataByPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // addPatient
        builder.addCase(createPatientAccount.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        });
        builder.addCase(createPatientAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        });
        builder.addCase(createPatientAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // updatePatientdata
        builder.addCase(updatePatientHealthData.pending, (state) => {
            state.updateloading = true;
            state.error = null;
            state.success = null;
        });
        builder.addCase(updatePatientHealthData.fulfilled, (state, action) => {
            state.updateloading = false;
            state.success = action.payload;
        });
        builder.addCase(updatePatientHealthData.rejected, (state, action) => {
            state.updateloading = false;
            state.error = action.error.message;
        });

    }

});

export default patientSlice.reducer;