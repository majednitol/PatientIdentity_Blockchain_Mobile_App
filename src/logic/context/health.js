import { ethers } from "ethers";
import React, { useEffect, useReducer, useState } from "react";
import Patient from "../../data/repository/userType/patientRepo";
import Doctor from "../../data/repository/userType/doctorRepo";
import MedicalResearchlab from "../../data/repository/userType/medicalResearchLabRepo";
import Pathologist from "../../data/repository/userType/pathologistRepo";
import PharmacyCompany from "../../data/repository/userType/pharmacyCompanyRepo";
import ConnectedAccountUserType from "../../data/repository/connectedUser/connectedUserType";

import Contract from "../../data/repository/contract/contractRepo";
import Address from "../../service/wallet connect/Address";
import { Alert } from "react-native";
import { BackHandler } from "react-native";
import { BiconomySmartAccountV2, PaymasterMode, createSmartAccountClient } from "@biconomy/account";
import { contractAddress } from "../../service/constant";
import { useNavigation } from "@react-navigation/native";
import Dashboard from './../../presentation/Screen/Components/DashBoard/Dashboard';
import SmartAccount from "../../service/wallet connect/SmartAccount";
const { v4: uuidv4 } = require('uuid');
export const HealthContext = React.createContext();
const HealthProvider = ({ children }) => {

  const [key, setKey] = useState('');
  const [isLoading, setLoading] = useState(false)
  const [ispatientLoading, setPatientLoading] = useState(false)
  const [isShareLoading, setShareLoading] = useState(false)
  const [patientData, setPatientData] = useState("");
  const [doctorData, setDoctorData] = useState("");
  const [MedicalResearchLab, setMedicalResearchLab] = useState("");
  const [privateKey, setPrivateKey] = useState('')
  const [PathologistData, setPathologistData] = useState("");
  const [PathologistTestData, setPathologistTestData] = useState([]);
  const [isContractLoading, setIsContractLoading] = useState(false)
  const [PharmacyCompanyData, setPharmacyCompanyData] = useState("");
  const [contract, setContract] = useState([])
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [TopMedichine, setTopMedichine] = useState([]);
  const [MedicalResearchLabReport, setMedicalResearchLabReport] = useState([]);
  const [ConnectedAccountUser, setConnectedAccountUser] = useState("");
  const [PatientPersonalHealthData, setPatientPersonalHealthData] = useState(
    []
  );
  const [downloadProgress, setDownloadProgress] = useState('download')
  const [smartAccountAddress, setSmartAccountAddress] = useState(
    ''
  );
  const [userAddress,setUserAddress] = useState('')
  const [smartAccount, setSmartAccount] =
    useState('');
  const [anotherUser, setAnotherUser] = useState('')
  const [isDbVisiable, setIsDbVisiable] = useState(false)
  const [doctorAnotherData, setDoctorAnotherData] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [timeStamp, setTimeStamp] = useState('')
  const [allUserTypeData, setAllUserTypeData] = useState(" ")
  const [allUserTypeAddress, setAllUserTypeAddress] = useState(" ")
  const [searchedUsers, setSearchUsers] = useState([]);
  const [deleteloader, setDeleteloader] = useState(false)
  const [screen, setScreen] = useState(' ');
  const [patientPersonalDoctorList, setPatientPersonalDoctorList] = useState(
    []
  );
  const [patientToMedicalRLab, setPatientToMedicalRLab] = useState([])
  const [patientToParmacyCompany, setPatientToParmacyCompany] = useState([]);
  const [accountCreationLoader, setAccountCreationLoader] = useState(false)
  const [DoctorPersonalPatient, setDoctorPersonalPatient] = useState([]);
  const [PatientToDoctorSharedData, setPatientToDoctorSharedData] = useState(
    []
  );
  const [sharedAllUsersAddress, setSharedAllUsersAddress] = useState([]);
  const [sharedAllDoctorsAddress, setSharedAllDoctorsAddress] = useState([]);
  const [personalDoctor, setPersonalDoctor] = useState([]);
  const [doctorReportFromPatho, setDoctorReportFromPatho] = useState()
  const [prescriptionFromDoctor, setPrescriptionFromDoctor] = useState()
  const [doctorPathoList, setDoctorPathoList] = useState("");
  const [pathologistDoctorList, setPathologistDoctorList] = useState("");
  const [scanAddress, setScanAddress] = useState()
  const [pploader, setPploader] = useState(false);
  const [PatientToMedRcLabSharedData, setPatientToMedRcLabSharedData] =
    useState([]);
  const [PatientToPharmacySharedData, setPatientToPharmacySharedData] =
    useState([]);
  const [sharedData, setSharedData] = useState([]);
  const [address, setAddress] = useState('');
  const [connectedAccountBalance, setConnectedAccountBalance] = useState('')
  const [btnclick, setBtnClick] = useState(false)
  const [imagesUrl, setImagesUrl] = useState([])
  const [isUserCardShowTo, setIsUserCardShowTo] = useState(false)
  const [isUserCardShowFrom, setIsUserCardShowFrom] = useState(false)
  const [web3Auth, setWeb3Auth] = useState('')
  const [revokeLoader, setRevokeLoader] = useState(false)
  const chains =
{
    chainId: 97,
    name: "Cardona testnet",
    providerUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",

    biconomyPaymasterApiKey:
      "eVribMuLw.6d9e6709-5dd7-45d3-8b24-026b3ff2f339",
    explorerUrl: "https://cardona-zkevm.polygonscan.com",
  }
  const config = {
    biconomyPaymasterApiKey: chains.biconomyPaymasterApiKey,
    bundlerUrl: `https://paymaster.biconomy.io/api/v1/97/lP2V-CoVx.a52796e8-95a8-437d-8726-f90cfcdad483`,

  };
  useEffect(() => {

    if (btnclick === true) {

      const backAction = () => {
        // Close the app when back button is pressed
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [btnclick]);
  useEffect(() => {
    const initialize = async () => {
      try {
        // setIsContractLoading(true)

        // if (privateKey) {

        //   // setEmailAddress(web3auth.userInfo().email);
        //   //   console.log("Email:", web3auth.userInfo().email);
        //   const provider = new ethers.providers.JsonRpcProvider(chains.providerUrl);
        //   const signer = new ethers.Wallet(privateKey, provider);
        //   console.log("Creating smart wallet");

        //   // Create smart wallet
        //   const smartWallet = await createSmartAccountClient({
        //     signer: signer,
        //     biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
        //     bundlerUrl: config.bundlerUrl,
        //     rpcUrl: chains.providerUrl,
        //     chainId: chains.chainId,
        //   });

        //   console.log("Smart wallet created");

        //   // Get smart account address
        //   const saAddress = await smartWallet.getAccountAddress();

        //   console.log("Smart Account Address9999:", saAddress);
        //   Address.setKey(saAddress)
        //   // Set smart account address in state
        //   setSmartAccountAddress(saAddress);
        //   setSmartAccount(smartWallet);
        //   const contractInstance = await Contract.fetchContract();
        //   setContract(contractInstance);

        //   ConnectedEntityType();
        //   Address.setKey(saAddress)
        //   // console.log("yyyyyyyyyyyyy", Address.connectedAccount())
        //   if (Address !== null) {
        //     const jsonString = Address.connectedAccount();

        //     const hexAddress = jsonString._j;
        //     // console.log("rrrrrrrrrrrrrrrrrrr", hexAddress);
        //     setAddress(hexAddress)

        //     AccountBalance(hexAddress)
        //   }
        //   setIsContractLoading(false)
        // }

      } catch (error) {
        console.error('Error initializing HealthProvider:', error);
        setIsContractLoading(false)
      }
    };

    initialize();

  }, [privateKey]);

  useEffect(() => {
    setLoading(true)
    if (isContractLoading || address == null) {
      console.log('loading address');
    } else {
      if (String(ConnectedAccountUser) === '1') {
        getDoctorAllData() && getDoctorAllOtherData()
      } else if (String(ConnectedAccountUser) === '2') {
        getPathologistAllData();
      } else if (String(ConnectedAccountUser) === '4') {
        getPharmacyCompanyAllData();
      } else if (String(ConnectedAccountUser) === '3') {
        getMedicalResearchLabAData();
      } else if (String(ConnectedAccountUser) === '5') {
        getPatientAllData()
      }
      setLoading(false);
    }
    // getDoctorDataFromPathologist()
  }, [ConnectedAccountUser])

  const AccountBalance = async (hexAddress) => {
    const provider = new ethers.providers.JsonRpcProvider(chains.providerUrl);
    const balanceWei = await provider.getBalance(hexAddress);
    const balanceEth = ethers.utils.formatEther(balanceWei);


    setConnectedAccountBalance(balanceEth);

  };

  const getConnectedAccountType = () => {
    
  }
  const generateUniqueId = () => {
    const uuid = uuidv4();
    const id = parseInt(uuid.substring(0, 7), 16);
    return id.toString().padStart(5, '0');
  };
  const getPatientAllData = async (address) => {
    try {
      const patientData = await Patient.patientContractData(address)
      setPatientData(patientData);
      console.log("patientData4jjjjjjjjjjjjjj", patientData)
      setPatientPersonalHealthData(patientData[9]);
      setPatientPersonalDoctorList(patientData[10]);
      return patientData;

    } catch (error) {

      console.log(" getPatientAllData", error)
    }
    //console.log("patientData ", patientData);
  };
  const getPatientAllPrescription = async () => {

    try {

      const patientPrescription = await Patient.patientPrescription()
      setSharedData(patientPrescription);

      console.log("patientData ", patientPrescription);

    } catch (error) {

    } finally {

    }
  };
  const [isLoggedIn,setIsLoggedIn] =useState(false)
  const login = async () => {
      
      setIsLoggedIn(true)
      
    
}
  const getDoctorAllData = async (address) => {

    try {
      const doctorData = await Doctor.doctorContractData(address)
      // const doctorData2 = await contract.getDoctorAnotherData(address)
      setDoctorData(doctorData);

      // setDoctorPersonalPatient(doctorData2.TreatedPatient);
      setPatientToDoctorSharedData(doctorData.PatientToDoctor);
      // setDoctorPathoList(doctorData2.pathologist)
      // console.log("doctorData2.pathologist",doctorData2)
      // console.log("doctorData2", doctorData2);
      return doctorData;

    } catch (error) {
      console.log(error)
    }
  };

  const getDoctorAllOtherData = async (address) => {

    try {

      const doctorData2 = await contract.getDoctorAnotherData(address)
      // setDoctorData(doctorData);

      setDoctorPersonalPatient(doctorData2.TreatedPatient);
      // setPatientToDoctorSharedData(doctorData.PatientToDoctor);
      setDoctorPathoList(doctorData2.pathologist)
      console.log("doctorData2.pathologist99999", doctorData2.pathologist)
      console.log("doctorData2", doctorData2);
      setDoctorAnotherData(doctorData2)
      return doctorData2;

    } catch (error) {
      console.log(error)
    }
  };
  const getAlluserData = async (address) => {

    try {
      const contract = await Contract.fetchContract()
      console.log(contract)
      const alluserData = await contract.getAlluserTypeData(address)
      setAllUserTypeData(alluserData);
      return alluserData;

    } catch (error) {
      console.log(error)
    }
  };
  const getAllusersData = async () => {

    try {
      const contract = await Contract.fetchContract();
      const alluserAddress = await contract.allUserData()
      setAllUserTypeAddress(alluserAddress);
      console.log("alluserAddress", alluserAddress)
      return alluserAddress;

    } catch (error) {
      console.log("alluserAddress", error)
    }
  };
  const getPatientForDoctor = async (address) => {

    try {

      const patientToDoctor = await Doctor.patientData(address)
      setPatientData(patientToDoctor)
      console.log("patientToDoctor", patientToDoctor);

    } catch (error) {

    } finally {

    }
  };
  const getPathologistForDoctor = async (address) => {

    try {
      setLoading(true);
      const pathologistToDoctor = await Doctor.patientData(address)
      setPathologistData(pathologistToDoctor)
      console.log("pathologistToDoctor", pathologistToDoctor);
      setLoading(false);
    } catch (error) {

    } finally {

    }
  };

  const connectedAccount = async (useraddress) => {
    const user = await contract.ConnectedAccountType(useraddress)
    return user
  }
  const getMedicalResearchLabAData = async () => {

    try {

      const MedicalResearchLabAData = await MedicalResearchlab.medicalResearchLabContractData()

      setMedicalResearchLab(MedicalResearchLabAData);
      setMedicalResearchLabReport(MedicalResearchLabAData[8]);
      setPatientToMedRcLabSharedData(MedicalResearchLabAData[7]);
      console.log(MedicalResearchLabAData);

    } catch (error) {

    } finally {

    }
  };

  const getPathologistAllData = async (address) => {

    try {

      const pathologistAllData = await Pathologist.pathologistContractData(address)
      setPathologistData(pathologistAllData);
      setPathologistDoctorList(pathologistAllData.allDoctor)
      console.log("pathologistAllData", pathologistAllData);
      return pathologistAllData


    } catch (error) {

    } finally {

    }
  };

  const getPharmacyCompanyAllData = async () => {

    try {
      console.log(' getting allcompanies')
      const PharmacyCompanyData = await PharmacyCompany.pharmacyCompanyContractData()
      setPharmacyCompanyData(PharmacyCompanyData);
      setTopMedichine(PharmacyCompanyData[8]);
      setPatientToPharmacySharedData(PharmacyCompanyData[7]);
      console.log("PharmacyCompanyData", PharmacyCompanyData);

    } catch (error) {
      console.log("peoor", error)
    } finally {

    }
  };

  const ConnectedEntityType = async () => {
    try {


      const connectedAccountUser =
        await ConnectedAccountUserType.connectedUserType()

      setConnectedAccountUser(String(connectedAccountUser));
      console.log("ConnectedAccountUser***", String(connectedAccountUser));
      return connectedAccountUser
    } catch (error) {
      console.log("no account have in address", error);

    } finally {

    }
  };

  const AddDoctor = async (
    doctorID,
    name,
    specialty,
    consultationFee,
    BMDCNumber,
    yearOfExperience, birthday, emailAddress, 
  ) => {

    try {
      setAccountCreationLoader(true);
      setBtnClick(true);

      await Doctor.createDoctorAccount(doctorID,
        name,
        specialty,
        consultationFee,
        BMDCNumber,
        yearOfExperience, birthday, emailAddress, smartAccount)
      Alert.alert("Successfully Account created")
      setAccountCreationLoader(false);
      setBtnClick(true);


    } catch (error) {
      Alert.alert(error.message)
      console.log(error)
      setBtnClick(false);
      setAccountCreationLoader(false);

    }
  };

  const AddNewPatient = async (patientID, name, gender, age, location, birthday, emailAddress, smartAccount) => {
    try {
      setAccountCreationLoader(true);
      setBtnClick(true);

      await Patient.createPatientAccount(patientID, name, gender, age, location, birthday, emailAddress, smartAccount)
      Alert.alert("Successfully Account created")
      setAccountCreationLoader(false);
      setBtnClick(true);
    } catch (error) {
      Alert.alert(error.message)
      console.log(error)
      setBtnClick(false);
      setAccountCreationLoader(false);

    } finally {
      setAccountCreationLoader(false);

    }
  };

  const AddNewPharmacyCompany = async (
    companyID,
    name,
    licenseID,
    productInformation,
    pharmacyRating, emailAddress, smartAccount
  ) => {

    try {
      setAccountCreationLoader(true);
      setBtnClick(true);

      await PharmacyCompany.createPharmacyCompanyAccount(companyID,
        name,
        licenseID,
        productInformation,
        pharmacyRating, emailAddress, smartAccount)
      Alert.alert("Successfully Account created")
      setAccountCreationLoader(false);
      setBtnClick(true);
    } catch (error) {
      Alert.alert(error.message)
      console.log(error)
      setAccountCreationLoader(false);
      setBtnClick(false);
    } finally {
      setAccountCreationLoader(false);

    }
  };
  const AddNewpathologist = async (
    pathologistID,
    name,
    licenseNumber,
    specializationArea,
    totalExperience, birthday, emailAddress, smartAccount
  ) => {
    try {
      setAccountCreationLoader(true);
      setBtnClick(true);

      await Pathologist.createPathologistAccount(pathologistID,
        name,
        licenseNumber,
        specializationArea,
        totalExperience, birthday, emailAddress, smartAccount)
      Alert.alert("Successfully Account created")
      setAccountCreationLoader(false);
      setBtnClick(true);
    } catch (error) {
      Alert.alert(error.message)
      setAccountCreationLoader(false);
      setBtnClick(false);
    } finally {
      setAccountCreationLoader(false);

    }
  };

  const addTopMedichine = async (medichine, smartAccount) => {


    try {
      setLoading(true)
      await PharmacyCompany.addTopMedicine(medichine, smartAccount);


      Alert.alert("Successfully added")
      forceUpdate()
    } catch (error) {
      Alert.alert(error.message)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const addPrescription = async (user, url, smartAccount) => {

    //  AddPrescription.addingPrescription(user, url)
    // Alert.alert("Successfully Upload")
    console.log('6666666666', smartAccount)
    try {
      const tx = await contract.populateTransaction.addPrescription(user, url, smartAccount)

      const tx1 = {
        to: contractAddress,
        data: tx?.data,
      };
      const userOpResponse = await smartAccount?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      console.log('userOpResponse', userOpResponse)
    } catch (error) {
      Alert.alert(error.message)
    }


  };


  const deletePrescription = async (index, anotherUser, smartAccount) => {
    console.log("anotherUser", index)
    if (anotherUser == '') {
      anotherUser = address
    }
    try {
      setDeleteloader(true)
      const tx = await contract.populateTransaction.deletePrecription(index, anotherUser, smartAccount)
      const tx1 = {
        to: contractAddress,
        data: tx?.data,
      };
      const userOpResponse = await smartAccount?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      console.log('userOpResponse', userOpResponse)
      Alert.alert("Successfully Deleted", index)
      setDeleteloader(true)

      console.log('success', res)
      forceUpdate()

    } catch (error) {
      console.warn(error.message)
      setDeleteloader(true)

    }


  };

  const searchUser = async () => {


  };
  const getCurrentNotificationCreationTime = async () => {
    try {
      const res = await contract.timeForCreatingNotification()
      setTimeStamp(res)
      console.log('successhhhhhhhhhhhhh', res)

    } catch (error) {
      console.warn(error.message)
    }
  };

  const revokeAccess = async (index, smartAccount) => {
    try {
      setRevokeLoader(true)
      const contract = await Contract.fetchContract()
      const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
      console.log("index",index)
      const tx = await contract.populateTransaction.revokeAccessData(index)
      const tx1 = {
        to: contractAddress,
        data: tx?.data,
      };
      const userOpResponse = await smartWallet?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      console.log('userOpResponse', userOpResponse)
      Alert.alert("Successfully Revoked Access")
      setRevokeLoader(false)

  
      forceUpdate()

    } catch (error) {
      console.warn(error.message)
      setDeleteloader(true)

    }


  };
  const addProfilePic = async (url, smartAccount) => {



    const tx = await contract.populateTransaction.addProfilePic(url);
    const tx1 = {
      to: contractAddress,
      data: tx?.data,
    };
    const userOpResponse = await smartAccount?.sendTransaction(tx1, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    });
    console.log('userOpResponse', userOpResponse)

    forceUpdate()

  };

  const getsharedAllUsersAddress = async () => {
    const contract = await Contract.fetchContract();
    const sharedAllUsersAddress = await contract.getsharedAllUsersAddress();
    console.log('success', sharedAllUsersAddress)
    setSharedAllUsersAddress(sharedAllUsersAddress)
    forceUpdate()

  };
 

  const getPersonalDoctor = async () => {
    const personalDoctor = await contract.getPersonalDoctor();
    console.log('success', personalDoctor)
    setPersonalDoctor(personalDoctor)
    forceUpdate()

  };
  const getPatientToMedRcLab = async () => {
    const patientToMedRcLab = await contract.getPatientToMedRcLab();
    console.log('patientToMedRcLab', patientToMedRcLab)
    setPatientToMedicalRLab(patientToMedRcLab)
    forceUpdate()

  };

  const getPatientToPharmacy = async () => {
    const patientToPharmacy = await contract.getPatientToPharmacy();
    console.log('patientToPharmacy', patientToPharmacy)
    setPatientToParmacyCompany(patientToPharmacy)
    forceUpdate()

  };
  const getPathologistDataFromDoctor = async (_doctorAddress, pathoAddress) => {
    try {
      const prescription = await contract.getPathologistDataFromDoctor(_doctorAddress, pathoAddress);
      console.log('success', prescription)
      setPrescriptionFromDoctor(prescription)
      return prescription
    } catch (error) {

    }

  };

  const getPatientDataFromDoctor = async (_doctorAddress, patientAddress) => {



    try {
      const prescription = await contract.getPatientDataFromDoctor(_doctorAddress, patientAddress);
      console.log('success', prescription)
      setPrescriptionFromDoctor(prescription)
      return prescription
    } catch (error) {

    }

  };

  const getDoctorDataFromPathologist = async (pathoAddress, _doctorAddress) => {
    try {
      const report = await contract.getDoctorDataFromPathologist(pathoAddress, _doctorAddress);
      console.log('successuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', report)
      setDoctorReportFromPatho(report)


      return report
    } catch (error) {

    }

  };

  const addLabReport = async (report, smartAccount) => {
    try {
      setLoading(true);
      await MedicalResearchlab.addingMedicalResearchLabReport(report, smartAccount);
      setLoading(false);
      Alert.alert("Successfully updated")
      forceUpdate()
    } catch (error) {
      Alert.alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  const setPatientPersonalData = async (
    height,
    blood,
    previousDiseases,
    medicineDrugs,
    badHabits,
    chronicDiseases,
    healthAllergies,
    birthDefects, smartAccount
  ) => {


    try {
      setPatientLoading(true)
      await Patient.updatePatientHealthData(
        height,
        blood,
        previousDiseases,
        medicineDrugs,
        badHabits,
        chronicDiseases,
        healthAllergies,
        birthDefects, smartAccount
      );



      Alert.alert("Successfully updated")
      setPatientLoading(false)
      forceUpdate()

    } catch (error) {
      console.log("error account crate time", error);
      Alert.alert(error.message)
      setPatientLoading(false)


    }
  };

  const AddMedicalResearchLab = async (
    labID,
    name,
    licenseID,
    researchArea,
    labRating, emailAddress, smartAccount
  ) => {


    try {
      setAccountCreationLoader(true);
      setBtnClick(true);

      await MedicalResearchlab.createMedicationResearchAccount(labID,
        name,
        licenseID,
        researchArea,
        labRating, emailAddress, smartAccount)
      Alert.alert("Successfully updated")
      setAccountCreationLoader(false);
      setBtnClick(true);
    } catch (error) {
      Alert.alert(error.message)
      setAccountCreationLoader(false);
      setBtnClick(false);
    } finally {
      setAccountCreationLoader(false);

    }
  };


  const transferDataByPatient = async (receiptAddress, smartAccount) => {


    try {

      setShareLoading(true);
      const tx = await contract?.populateTransaction.transferDataByPatient(
        receiptAddress,
      );
      const tx1 = {
        to: contractAddress,
        data: tx?.data,
      };
      const userOpResponse = await smartAccount?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      console.log('userOpResponse', userOpResponse)
      Alert.alert("Successfully Share Prescription")
      setShareLoading(false);
      forceUpdate()
    } catch (error) {
      Alert.alert("you don't have permission or already share data")
      setShareLoading(false);


    }
  };

  const setPathologistTest = async (
    allergies,
    cancer,
    hormoneProblem,
    diabetesLevel, smartAccount
  ) => {


    try {

      await Pathologist.addPathologistTest(allergies,
        cancer,
        hormoneProblem,
        diabetesLevel)
      Alert.alert("Successfully updated")
    } catch (error) {
      console.log("error account crate time", error);
      Alert.alert(error.message)
    } finally {

    }
  };
  return (
    <HealthContext.Provider
      value={{
        key, setKey,
        AddNewPatient,
        transferDataByPatient,
        AddMedicalResearchLab,
        AddNewpathologist,
        AddNewPharmacyCompany,
        AddDoctor,
        getPharmacyCompanyAllData,
        getPathologistAllData,
        getMedicalResearchLabAData,
        getDoctorAllData,
        getPatientAllData,
        PharmacyCompanyData,
        TopMedichine,
        doctorData,
        patientData,
        addProfilePic,
        MedicalResearchLab,

        PathologistData,
        generateUniqueId,

        ConnectedAccountUser,
        MedicalResearchLabReport,
        addPrescription,
        ConnectedEntityType,
        addTopMedichine,
        addLabReport,
        setPatientPersonalData, pploader, setPploader,
        setPathologistTest,
        getAlluserData, allUserTypeData,
        PatientPersonalHealthData,
        patientPersonalDoctorList,
        PathologistTestData,
        DoctorPersonalPatient,
        sharedData,
        PatientToDoctorSharedData,
        PatientToMedRcLabSharedData,
        PatientToPharmacySharedData,
        getPatientAllPrescription, privateKey, setPrivateKey, isContractLoading, setIsContractLoading, isLoading, address, connectedAccountBalance, ispatientLoading, getPatientForDoctor, getPathologistForDoctor, scanAddress, setScanAddress, isShareLoading, screen, setScreen, deletePrescription, deleteloader, revokeAccess, timeStamp, getCurrentNotificationCreationTime, reducerValue, forceUpdate, accountCreationLoader, setAccountCreationLoader,
        btnclick, emailAddress, setEmailAddress, contract, imagesUrl, setImagesUrl, pathologistDoctorList, doctorPathoList, getPathologistDataFromDoctor, getDoctorDataFromPathologist, doctorReportFromPatho, prescriptionFromDoctor, getDoctorAllOtherData, getPatientDataFromDoctor, doctorAnotherData, isDbVisiable, setIsDbVisiable, anotherUser, setAnotherUser, isUserCardShowTo, setIsUserCardShowTo, isUserCardShowFrom, setIsUserCardShowFrom, getAllusersData, allUserTypeAddress, setAllUserTypeAddress, searchUser, searchedUsers, setSearchUsers, sharedAllUsersAddress, getsharedAllUsersAddress, personalDoctor, getPersonalDoctor, patientToParmacyCompany, patientToMedicalRLab, getPatientToMedRcLab, getPatientToPharmacy, connectedAccount, smartAccountAddress, setSmartAccountAddress, setSmartAccount, smartAccount,setConnectedAccountUser,login,isLoggedIn,web3Auth, setWeb3Auth,downloadProgress, setDownloadProgress,userAddress,setUserAddress,
        revokeLoader, setRevokeLoader
      }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthProvider;
