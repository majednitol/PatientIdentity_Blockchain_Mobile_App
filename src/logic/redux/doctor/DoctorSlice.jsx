import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { contractAddress, patientIdentityABI } from '../../../service/constant';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { PaymasterMode } from '@biconomy/account';
import Contract from '../../../data/repository/contract/contractRepo';

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');

const contract = new ethers.Contract(contractAddress, patientIdentityABI, provider);
export const fetchDoctorData = createAsyncThunk('fetchDoctorData', async (saAddress) => {
  try {

    const doctorData = await contract?.getDoctor(saAddress);
    return doctorData.map(item => item.toString());
  } catch (error) {
    throw error;
  }
});
export const getDoctorAnotherData = createAsyncThunk('getDoctorAnotherData', async () => {
  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('098876543234567', saAddress)
    const doctorData = await contract?.getDoctorAnotherData(saAddress);
    return doctorData.map(item => item.toString());
  } catch (error) {
    throw error;
  }
});
export const fetchPatientDataFromDoctor = createAsyncThunk('fetchPatientDataFromDoctor', async (patientAddress) => {
  try {
    const contract = await Contract.fetchContract()
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const prescription = await contract.getPatientDataFromDoctor(saAddress, patientAddress);
    return prescription.map(item => item.toString());
  } catch (error) {
    throw error;
  }
});

export const fetchPathologistDataFromDoctor = createAsyncThunk('fetchPathologistDataFromDoctor', async (pathoAddress) => {
  try {
    const contract = await Contract.fetchContract()
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const prescription = await contract.getPathologistDataFromDoctor(saAddress, pathoAddress);
    return prescription.map(item => item.toString());
  } catch (error) {
    throw error;
  }
});

export const fetchDoctorDataFromPathologist = createAsyncThunk('fetchDoctorDataFromPathologist', async (pathoAddress) => {
  try {
    const contract = await Contract.fetchContract()
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    const report = await contract.getDoctorDataFromPathologist(pathoAddress, saAddress);
    return report.map(item => item.toString());
  } catch (error) {
    throw error;
  }
});
export const createDoctorAccount = createAsyncThunk('createDoctorAccount', async ({ doctorID,
  name,
  specialty,
  consultationFee,
  BMDCNumber,
  yearOfExperience, birthday }) => {

  try {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('098876543234567', saAddress)
    
    const namePadded = ethers.utils.formatBytes32String(name);
    const specialtyPadded = ethers.utils.formatBytes32String(specialty);
    const birthdayPadded = ethers.utils.formatBytes32String(birthday);
    const contract = await Contract.fetchContract();
    
    const tx = await contract?.populateTransaction.setDoctor(
      BigInt(doctorID * 1),
      namePadded,
      specialtyPadded,
      BigInt(consultationFee * 1),
      BigInt(BMDCNumber * 1),
      BigInt(yearOfExperience * 1),
      birthdayPadded,
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
    console.log(error);
  }
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctorData: null,
    doctorAnotherData: null,
    patientDataFromDoctor: null,
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
    builder.addCase(fetchDoctorData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDoctorData.fulfilled, (state, action) => {
      state.loading = false;
      state.doctorData = action.payload;
    });
    builder.addCase(fetchDoctorData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getDoctorAnotherData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDoctorAnotherData.fulfilled, (state, action) => {
      state.loading = false;
      state.doctorAnotherData = action.payload;
    });
    builder.addCase(getDoctorAnotherData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createDoctorAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(createDoctorAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(createDoctorAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  }

});

export default doctorSlice.reducer;