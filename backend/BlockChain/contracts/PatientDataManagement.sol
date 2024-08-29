ডি// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract PatientIdentity {
    using EnumerableSet for EnumerableSet.AddressSet;
    struct commonData {
        bytes32 userType;
        address userAddress;
        uint256 userID;
        bytes32 username;
        bytes32 emailAddress;
    }
    struct AdminData {
       uint8 totalNumberOfPatient;
        uint8 totalNumberOfDoctor;
        uint8 totalNumberOfPathologist;
        uint8 totalNumberOfPharmacyCompany;
        uint8 totalNumberOfMedicalResearchLab;
        uint8 totalNumberOfPremiumPatient;
        uint8 totalNumberOfPremiumDoctor;
        uint8 totalNumberOfPremiumPathologist;
        uint8 totalNumberOfPremiumPharmacyCompany;
        uint8 totalNumberOfPremiumMedicalResearchLab;
    } 
    struct Admin {
        address AdminAddress;
        uint256 adminID;
        bytes32 name;
        bytes32 gender;
        string profilePic;
        bool isAdded; 
    }
    AdminData ad;

    function getAdminData() public view returns (AdminData memory) {
        return ad;
    }

    struct Patient {
        address patientAddress;
        uint256 patientID;
        bytes32 name;
        bytes32 gender;
        uint256 age;
        bytes32 location;
        bool isAdded;
        bytes32 userType;
        string[] imgUrl;
        PatientPersonalData patientPersonalData;
        string profilePic;
        bytes32 birthday;
        bytes32 emailAddress;
    }
    
    mapping(address => EnumerableSet.AddressSet) private PatientToAdmin;
    mapping(address => EnumerableSet.AddressSet) private personalDoctor;

    function getPatientToAdmin(address userAddress)
        public
        view
        returns (address[] memory)
    {
        return PatientToAdmin[userAddress].values();
    }

    function getPersonalDoctor() public view returns (address[] memory) {
        return personalDoctor[msg.sender].values();
    }

    // EnumerableSet.AddressSet sharedAllDoctorAndAdminAddress;
    mapping(address => EnumerableSet.AddressSet)
        private sharedAllDoctorAddress;

    function getsharedAllDoctorAddress()
        public
        view
        returns (address[] memory)
    {
        return sharedAllDoctorAddress[msg.sender].values();
    }

    EnumerableSet.AddressSet sharedAllUsersAddress;

    function getsharedAllUsersAddress() public view returns (address[] memory) {
        return sharedAllUsersAddress.values();
    }

    struct PatientPersonalData {
        bytes32 height;
        bytes32 Blood;
        bytes32 PreviousDiseases;
        bytes32 Medicinedrugs;
        bytes32 BadHabits;
        bytes32 ChronicDiseases;
        bytes32 HealthAllergies;
        bytes32 BirthDefects;
    }

    struct SentData {
        string[] imagesUrl;
    }
    struct Doctor {
        address DoctorAddress;
        uint256 doctorID;
        bytes32 name;
        bytes32 specialty;
        uint256 consultationFee;
        uint256 BMDCNumber;
        uint256 yearOfExperience;
        EnumerableSet.AddressSet PatientToDoctor; //data share of all patient
        string[] patientTest;
        // data share of all patient
        bool isAdded;
        EnumerableSet.AddressSet TreatedPatient;
        bytes32 userType;
        string profilePic;
        bytes32 birthday;
        mapping(address => SentData) userData;
        EnumerableSet.AddressSet pathologist;
        bytes32 emailAddress;
    }

    struct Pathologist {
        address pathologistAddress;
        uint256 pathologistID;
        bytes32 name;
        uint256 licenseNumber;
        bytes32 specializationArea;
        uint256 totalExperience;
        bool isAdded;
        EnumerableSet.AddressSet PatientToPathologiest; //allPatientsAddressSharedTopathologist
        string[] pathologistTest;
        bytes32 userType;
        string profilePic;
        bytes32 birthday;
        mapping(address => SentData) userData;
        EnumerableSet.AddressSet doctor;
        bytes32 emailAddress;
    }

    struct MedicalResearchLab {
        address labAddress;
        uint256 labID;
        bytes32 name;
        uint256 licenseID;
        bytes32 researchArea;
        uint256 labRating;
        bool isAdded;
        // allPatientsAddressSharedToMedicalResearchLab
        string[] imgUrl; // MedicalResearchLabReports
        bytes32 userType;
        string profilePic;
        bytes32 emailAddress;
    }
    // EnumerableSet.AddressSet adminToMedRcLab;
    mapping(address => EnumerableSet.AddressSet) private adminToMedRcLab;

    function getadminToMedRcLab() public view returns (address[] memory) {
        return adminToMedRcLab[msg.sender].values();
    }

    struct PharmacyCompany {
        address pharmacyCompanyAddress;
        uint256 companyID;
        bytes32 name;
        uint256 licenseID;
        bytes32 productInformation;
        uint256 pharmacyRating;
        bool isAdded;
        // allPatientAddressSharedToPharmacyCompany
        bytes32 userType;
        string[] TopMedichine;
        string profilePic;
        bytes32 emailAddress;
    }
    // EnumerableSet.AddressSet adminToPharmacy;
    mapping(address => EnumerableSet.AddressSet) private adminToPharmacy;

    function getPatientToPharmacy() public view returns (address[] memory) {
        return adminToPharmacy[msg.sender].values();
    }

    mapping(address => uint256) public dataExpiration; // Mapping to store expiration time for data

    mapping(address => uint256) public subscriptionExpiration;
    mapping(address => uint256) public accounts;
    mapping(address => Patient) patients;
    mapping(address => Doctor) doctors;
    mapping(address => AdminData) adminData;
    mapping(address => Admin) admin;
    mapping(address => Pathologist) pathologists; //pathologistTests
    mapping(address => MedicalResearchLab) medicalResearchLabs;
    mapping(address => PharmacyCompany) pharmacyCompanies;

    // function subscription(address userAddress) external {
    //     subscriptionExpiration[userAddress] = block.timestamp + 31536000;
    // }

    function subscription() external {
        if (accounts[msg.sender] == uint256(EntityType.Pathologist)) {
            ad.totalNumberOfPremiumPathologist++;
        } else if (accounts[msg.sender] == uint256(EntityType.Doctor)) {
            ad.totalNumberOfPremiumDoctor++;
        } else if (accounts[msg.sender] == uint256(EntityType.Patient)) {
            ad.totalNumberOfPremiumPatient++;
        } else if (
            accounts[msg.sender] == uint256(EntityType.MedicalResearchLab)
        ) {
            ad.totalNumberOfPremiumMedicalResearchLab++;
        } else if (
            accounts[msg.sender] == uint256(EntityType.PharmacyCompany)
        ) {
            ad.totalNumberOfPremiumPharmacyCompany++;
        }
        uint256 currentTime = block.timestamp;
        if (subscriptionExpiration[msg.sender] > currentTime) {
           
            subscriptionExpiration[msg.sender] += 31536000;
        } else {
           
            subscriptionExpiration[msg.sender] = currentTime + 31536000;
        }
    }

    function cancelSubscription() external {
        delete subscriptionExpiration[msg.sender];
    }

     function getSubscriptionStatus(address subscriber)
        external
        view
        returns (
            bool isSubscription,
            uint256 expiration,
            uint256 daysLeft
        )
    {
        
        if (subscriptionExpiration[subscriber] > block.timestamp) {
            expiration = subscriptionExpiration[subscriber];
            daysLeft = (expiration - block.timestamp) / 86400;
            return (true, expiration, daysLeft);
        } else {
            return (false, 0, 0);
        }
    }

    // Setters and Getters for Patient struct
    function setPatient(
        uint256 patientID,
        bytes32 name,
        bytes32 gender,
        uint256 age,
        bytes32 location,
        bytes32 birthday,
        bytes32 emailAddress
    ) public {
        address user = msg.sender;
        require(
            patients[user].isAdded == false,
            "You have already created your profile"
        );

        Patient storage patient = patients[user];

        patient.patientAddress = user;
        patient.patientID = patientID;
        patient.name = name;
        patient.gender = gender;
        patient.age = age;
        accounts[user] = 5;
        patient.location = location;
        patient.isAdded = true;
        patient.userType = "Patient";
        patient.birthday = birthday;
        patient.emailAddress = emailAddress;
        
        ad.totalNumberOfPatient++;
    }

    enum EntityType {
        Unknown,
        Doctor,
        Pathologist,
        MedicalResearchLab,
        PharmacyCompany,
        Patient,
        Admin
    }

    function addPrescription(address _user, string[] memory url) external {
        if (accounts[msg.sender] == uint256(EntityType.Doctor)) {
            require(doctors[msg.sender].isAdded, "Doctor doesn't exist");

            if (accounts[_user] == uint256(EntityType.Pathologist)) {
                for (uint256 i = 0; i < url.length; i++) {
                    doctors[msg.sender].userData[_user].imagesUrl.push(url[i]);
                }

                bool doctorAlreadysent = false;

                if (doctors[msg.sender].pathologist.contains(_user)) {
                    doctorAlreadysent = true;
                }

                if (!doctorAlreadysent) {
                    doctors[msg.sender].pathologist.add(_user);
                    pathologists[_user].doctor.add(msg.sender);
                }
            } else if (accounts[_user] == uint256(EntityType.Patient)) {
                for (uint256 i = 0; i < url.length; i++) {
                    // patients[_user].imgUrl.push(url[i]);
                    doctors[msg.sender].userData[_user].imagesUrl.push(url[i]);
                }
                Doctor storage doctor = doctors[msg.sender];
                bool patientAlreadyTreated = false;

                if (doctor.TreatedPatient.contains(_user)) {
                    patientAlreadyTreated = true;
                }

                if (!patientAlreadyTreated) {
                    doctors[msg.sender].TreatedPatient.add(_user);
                    personalDoctor[_user].add(msg.sender);
                }
            } else {
                revert("You can't add prescription for this entity");
            }
        } else if (accounts[msg.sender] == uint256(EntityType.Patient)) {
            require(patients[msg.sender].isAdded, "Patient doesn't exist");
            for (uint256 i = 0; i < url.length; i++) {
                patients[msg.sender].imgUrl.push(url[i]);
            }
        } else if (accounts[msg.sender] == uint256(EntityType.Pathologist)) {
            require(
                pathologists[msg.sender].isAdded,
                "Pathologist doesn't exist"
            );
            if (accounts[_user] == uint256(EntityType.Doctor)) {
                for (uint256 i = 0; i < url.length; i++) {
                    pathologists[msg.sender].userData[_user].imagesUrl.push(
                        url[i]
                    );
                }
                bool pathologistAlreadysent = false;

                if (pathologists[msg.sender].doctor.contains(_user)) {
                    pathologistAlreadysent = true;
                }

                if (!pathologistAlreadysent) {
                    doctors[_user].pathologist.add(msg.sender);
                    pathologists[msg.sender].doctor.add(_user);
                }
            } else {
                revert("You can't add prescription for this entity");
            }
        } else if (accounts[_user] == uint256(EntityType.MedicalResearchLab)) {
            for (uint256 i = 0; i < url.length; i++) {
                medicalResearchLabs[_user].imgUrl.push(url[i]);
            }
        } else {
            revert("You can't add prescription for this entity");
        }
    }

    function addProfilePic(string memory url) external {
        if (accounts[msg.sender] == uint256(EntityType.Doctor)) {
            doctors[msg.sender].profilePic = url;
        } else if (accounts[msg.sender] == uint256(EntityType.Pathologist)) {
            pathologists[msg.sender].profilePic = url;
        } else if (accounts[msg.sender] == uint256(EntityType.Patient)) {
            patients[msg.sender].profilePic = url;
        } else if (
            accounts[msg.sender] == uint256(EntityType.PharmacyCompany)
        ) {
            pharmacyCompanies[msg.sender].profilePic = url;
        } else if (
            accounts[msg.sender] == uint256(EntityType.MedicalResearchLab)
        ) {
            medicalResearchLabs[msg.sender].profilePic = url;
        
