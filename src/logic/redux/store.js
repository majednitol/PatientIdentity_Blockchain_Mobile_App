import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patient/PatientSlice';
import doctorReducer from './doctor/DoctorSlice';


import pharmacyCompanyReducer from './pharmacy company/pharmacyCompanySlice';
import ScanReducer from './scanner/scanAddressSlice';
import connectedUserReducer from './connectedUserType/connectedUserSlice';
import privateKeyReducer from './privateKey/privateKeySlice';
import web3authReducer from './web3auth/web3authSlice';
import medicalResearchLabReducer from './medical research lab/medicalResearchLabSlice';
import pathologistReducer from './pathologist/pathologistSlice';
// import pathoReducer from './pathologist/pathologistSlice1';
import pathologistReducher from './pathologist/pathologistSlice1';
import AdminReducer from './admin/AdminSlice';
import subscriptionReducer from './subscription/subscription';

export default configureStore({
  reducer: {

    patient: patientReducer,
    doctor: doctorReducer,
    admin: AdminReducer,
    pathologist: pathologistReducher,
    medicalResearchLab: medicalResearchLabReducer,
    // pathologistData: pathologistReducer,
    pharmacyCompany: pharmacyCompanyReducer,
    scanAddress: ScanReducer,
    connectedUser: connectedUserReducer,
    privateKey: privateKeyReducer,
    web3Auth: web3authReducer,
    subscription: subscriptionReducer


  },
});