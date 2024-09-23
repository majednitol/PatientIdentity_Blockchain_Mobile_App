import PersonalInfo from "./src/presentation/Screen/Components/DashBoard/Admin/PersonalInfo";
import AdminPrescription from "./src/presentation/Screen/Components/DashBoard/Admin/Prescription";
import ShareData from "./src/presentation/Screen/Components/DashBoard/Admin/ShareData";
import SharedDataAllUserInfo from "./src/presentation/Screen/Components/DashBoard/Admin/SharedDataAllUserInfo";
import Useranalytics from "./src/presentation/Screen/Components/DashBoard/Admin/UserAnalytics";
import DoctorPersonalPatientList from "./src/presentation/Screen/Components/DashBoard/Doctor/DoctorPersonalPatientList";
import GetDoctorPersonalData from "./src/presentation/Screen/Components/DashBoard/Doctor/GetDoctorPersonalData";
import PatientPrescription from "./src/presentation/Screen/Components/DashBoard/Doctor/PatientPrescription";
import SentPrescription from "./src/presentation/Screen/Components/DashBoard/Doctor/SentPrescription";
import GetPersonalDetails from "./src/presentation/Screen/Components/DashBoard/Patient/GetPersonalDetails";
import PatientPersonalDoctors from "./src/presentation/Screen/Components/DashBoard/Patient/PatientPersonalDoctors";
import Prescription from "./src/presentation/Screen/Components/DashBoard/Patient/Prescription";
import SetPersonalHealthData from "./src/presentation/Screen/Components/DashBoard/Patient/SetPersonalHealthData";
import SharedDataAllDoctorsInfo from "./src/presentation/Screen/Components/DashBoard/Patient/SharedDataAllDoctorInfo";
import TransferData from "./src/presentation/Screen/Components/DashBoard/Patient/TransferData";
import Upload_File from "./src/presentation/Screen/Components/DashBoard/Patient/Upload_File";
import Notification from "./src/presentation/Screen/Components/Notification";


import GetPathologistPersonalData from "./src/presentation/Screen/Components/DashBoard/Pathologist/GetPathologistPersonalData";
import SentTestReportToDoctor from "./src/presentation/Screen/Components/DashBoard/Pathologist/SentTestReportToDoctor";
import PathologistFromDoctor from "./src/presentation/Screen/Components/DashBoard/Pathologist/PathologistFromDoctor";
import PathologistToDoctor from "./src/presentation/Screen/Components/DashBoard/Pathologist/PathologistToDoctor";
import GetPharmacyCompanyPersonalData from "./src/presentation/Screen/Components/DashBoard/PharmacyCompany/GetPharmacyCompanyPersonalData";
import AddingTopMedichine from "./src/presentation/Screen/Components/DashBoard/PharmacyCompany/AddingTopMedicine";
import ViewTopMedicine from "./src/presentation/Screen/Components/DashBoard/PharmacyCompany/ViewTopMedicine";
import PatientAllPrescription from "./src/presentation/Screen/Components/DashBoard/PharmacyCompany/PatientAllPrescription";
import GetMediResearchLabPersonalData from "./src/presentation/Screen/Components/DashBoard/MedicalResearchLab/GetMediResearchLabPersonalData";
import AddResearchLabReport from "./src/presentation/Screen/Components/DashBoard/MedicalResearchLab/AddResearchLabResport";
import PatientAllprescription from "./src/presentation/Screen/Components/DashBoard/MedicalResearchLab/PatientAllprescription";
import ViewPrescriptionOrLabReport from "./src/presentation/Screen/Components/DashBoard/MedicalResearchLab/ViewPrescriptionOrLabReport";
import ImageScanner from "./src/scanner/image scanner/ImageScanner";
import SubscriptionInfo from "./src/presentation/Screen/payment geteway/SubscriptionInfo";
import DisplayFile from "./src/presentation/Screen/Components/File/DisplayFile";
import ScannerScreen from "./src/scanner/qrcode scanner/ScannerScreen";
import DoctorToPathologist from "./src/presentation/Screen/Components/DashBoard/Doctor/DoctorToPathologist";
import DoctorFromPathologist from "./src/presentation/Screen/Components/DashBoard/Doctor/DoctorFromPathologist";
import OwnQRCode from "./src/presentation/Screen/Components/File/OwnQRCode";
import PaymentScreen from "./src/presentation/Screen/payment geteway/PaymentScreen";


export const screensConfig = {
    "Notifications": Notification,
    'Your Information': GetPersonalDetails,
    'Update Health Data': SetPersonalHealthData,
    "Your Prescriptions": Prescription,
    "Upload File": Upload_File,
    "Share Data": TransferData,
    "Your Doctors": PatientPersonalDoctors,
    "Shared User": SharedDataAllDoctorsInfo,
    "Personal Info": PersonalInfo,
    "User Analytics": Useranalytics,
    "Shared User List": SharedDataAllUserInfo,
    "Prescriptions": AdminPrescription,
    "Share Prescription": ShareData,
    "Personal Info": GetDoctorPersonalData,
    "Sent Prescription": SentPrescription,
    "Your Patients": DoctorPersonalPatientList,
    "Patient Prescription": PatientPrescription,
    "DoctorFromPathologist": DoctorFromPathologist,
    "DoctorToPathologist": DoctorToPathologist,
    "Personal Info": GetPathologistPersonalData,
    "Share Report To Doctor": SentTestReportToDoctor, "PathologistFromDoctor": PathologistFromDoctor,
    "PathologistToDoctor": PathologistToDoctor,
    'Personal Information': GetPharmacyCompanyPersonalData,
    "Add Top Medicine": AddingTopMedichine,
    "View Medicine": ViewTopMedicine,
    "Patient Prescription": PatientAllPrescription,
    'Personal Info': GetMediResearchLabPersonalData,
    "Add Report": AddResearchLabReport,
    "Patient Prescription": PatientAllprescription,
    "Prescription or Report": ViewPrescriptionOrLabReport,
    "Your Qr Code": OwnQRCode,
    "ImageScanner": ImageScanner,
    "Subscription Status": SubscriptionInfo,
    "DisplayFile": DisplayFile,
    "Sent Prescription": SentPrescription,
    // "Share Prescription": TransferData,
    "Sent Test Report": SentTestReportToDoctor,
    "Payment": PaymentScreen,
    "AddressScanner": ScannerScreen



}

