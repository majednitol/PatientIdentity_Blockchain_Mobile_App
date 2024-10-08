// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';

contract PatientIdentity {
    using EnumerableSet for EnumerableSet.AddressSet;
    address public ownerAddress;

    constructor() {
        // ownerAddress = msg.sender;
        ownerAddress = 0x4B189DBB3a45663F1c218B2E271cE8b174E11137;
    }

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
        string[] allPrescription;
        bool isAdded;
        bytes32 userType;
        bytes32 birthday;
        bytes32 emailAddress;
        uint256 age;
        bytes32 location;
        EnumerableSet.AddressSet PatientToAdmin; //zzz
    }
    struct AdminView {
        address AdminAddress;
        uint256 adminID;
        bytes32 name;
        bytes32 gender;
        string profilePic;
        string[] allPrescription;
        bool isAdded;
        bytes32 userType;
        bytes32 birthday;
        bytes32 emailAddress;
        uint256 age;
        bytes32 location;
    }
    AdminData ad;
    struct ShareData {
        EnumerableSet.AddressSet sharedAllUsersAddress;
    }
    ShareData sd;

    function getAdminData() public view returns (AdminData memory) {
        return ad;
    }

    uint256 public transactionCount;
    EnumerableSet.AddressSet private allAdmins;
    uint256 public numberOfConfirmations;
    mapping(address => mapping(address => bool)) public isConfirmed;
    modifier onlyAdmin() {
        require(admin[msg.sender].isAdded, 'You must be an admin');
        _;
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
        EnumerableSet.AddressSet sharedAllDoctorAddress;
        EnumerableSet.AddressSet personalDoctor; //zzz
    }
    struct Transaction {
        address from;
        address to;
        bool executed;
        uint256 confirmations;
    }
    mapping(address => EnumerableSet.AddressSet) pendingTx;

    function getPendingUserAddess() public view returns (address[] memory) {
        return pendingTx[ownerAddress].values();
    }

    mapping(address => Transaction) public transactions;
    struct PatientView {
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

    function getPatientToAdmin(
        address userAddress
    ) public view returns (address[] memory) {
        return admin[userAddress].PatientToAdmin.values();
    }

    function getPersonalDoctor(
        address userAddress
    ) public view returns (address[] memory) {
        return patients[userAddress].personalDoctor.values();
    }

    // EnumerableSet.AddressSet sharedAllDoctorAndAdminAddress;

    function getsharedAllDoctorAddress(
        address userAddress
    ) public view returns (address[] memory) {
        return patients[userAddress].sharedAllDoctorAddress.values();
    }

    function getsharedAllUsersAddress() public view returns (address[] memory) {
        return sd.sharedAllUsersAddress.values();
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
        EnumerableSet.AddressSet senderPathologist;
        EnumerableSet.AddressSet receiverPathologist;
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
        // string[] pathologistTest;
        bytes32 userType;
        string profilePic;
        bytes32 birthday;
        mapping(address => SentData) userData;
        EnumerableSet.AddressSet senderDoctor;
        EnumerableSet.AddressSet receiverDoctor;
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
        EnumerableSet.AddressSet adminToMedRcLab; //vvv
    }
    struct MedicalResearchLabView {
        address labAddress;
        uint256 labID;
        bytes32 name;
        uint256 licenseID;
        bytes32 researchArea;
        uint256 labRating;
        bool isAdded;
        string[] imgUrl;
        bytes32 userType;
        string profilePic;
        bytes32 emailAddress;
    }

    // EnumerableSet.AddressSet adminToMedRcLab;

    function getadminToMedRcLab(
        address userAddress
    ) public view returns (address[] memory) {
        return medicalResearchLabs[userAddress].adminToMedRcLab.values();
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
        EnumerableSet.AddressSet adminToPharmacy;
    }
    struct PharmacyCompanyView {
        address pharmacyCompanyAddress;
        uint256 companyID;
        bytes32 name;
        uint256 licenseID;
        bytes32 productInformation;
        uint256 pharmacyRating;
        bool isAdded;
        bytes32 userType;
        string[] TopMedichine;
        string profilePic;
        bytes32 emailAddress;
    }

    // EnumerableSet.AddressSet adminToPharmacy;

    function getAdminToPharmacy(
        address userAddress
    ) public view returns (address[] memory) {
        return pharmacyCompanies[userAddress].adminToPharmacy.values();
    }

    struct subscriptionTX {
        string[] transactions; // Stores a list of subscription transactions
    }

    // Mapping to store expiration time for data

    mapping(address => uint256) public subscriptionExpiration;
    mapping(address => uint256) public totalSubscription;

    mapping(address => uint256) public accounts;
    mapping(address => Patient) private patients;
    mapping(address => Doctor) private doctors;
    mapping(address => AdminData) private adminData;
    mapping(address => Admin) private admin;
    mapping(address => Pathologist) private pathologists; //pathologistTests
    mapping(address => MedicalResearchLab) private medicalResearchLabs;
    mapping(address => PharmacyCompany) private pharmacyCompanies;
    mapping(address => subscriptionTX) private subscriptionTXlist;

    // function subscription(address userAddress) external {
    //     subscriptionExpiration[userAddress] = block.timestamp + 31536000;
    // }

    function subscription(string memory TX) external {
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
        subscriptionTXlist[msg.sender].transactions.push(TX);
        if (subscriptionExpiration[msg.sender] > currentTime) {
            totalSubscription[msg.sender] += 31536000;
            subscriptionExpiration[msg.sender] += 31536000;
        } else {
            subscriptionExpiration[msg.sender] = currentTime + 31536000;
            totalSubscription[msg.sender] += 31536000;
        }
    }

    function getSubscriptionTransactions(
        address user
    ) external view returns (string[] memory) {
        return subscriptionTXlist[user].transactions;
    }

    function cancelSubscription() external {
        delete subscriptionExpiration[msg.sender];
    }

    function getSubscriptionStatus(
        address subscriber
    )
        external
        view
        returns (bool isSubscription, uint256 total, uint256 daysLeft)
    {
        if (subscriptionExpiration[subscriber] > block.timestamp) {
            uint256 expiration = subscriptionExpiration[subscriber];
            daysLeft = (expiration - block.timestamp) / 86400;
            total = totalSubscription[subscriber] / 31536000;
            return (true, total, daysLeft);
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
            'You have already created your profile'
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
        patient.userType = 'Patient';
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

                if (doctors[msg.sender].receiverPathologist.contains(_user)) {
                    doctorAlreadysent = true;
                }

                if (!doctorAlreadysent) {
                    doctors[msg.sender].receiverPathologist.add(_user);
                    pathologists[_user].senderDoctor.add(msg.sender);
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
                    patients[_user].personalDoctor.add(msg.sender);
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

                if (pathologists[msg.sender].receiverDoctor.contains(_user)) {
                    pathologistAlreadysent = true;
                }

                if (!pathologistAlreadysent) {
                    doctors[_user].senderPathologist.add(msg.sender);
                    pathologists[msg.sender].receiverDoctor.add(_user);
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
        } else if (accounts[msg.sender] == uint256(EntityType.Admin)) {
            admin[msg.sender].profilePic = url;
        } else {
            revert("You don't add profile pic in this  entity ");
        }
    }

    function getDoctor(
        address _doctorAddress
    )
        public
        view
        returns (
            address doctorAddress,
            uint256 doctorID,
            bytes32 name,
            bytes32 specialty,
            uint256 consultationFee,
            uint256 BMDCNumber,
            uint256 yearOfExperience,
            bytes32 userType,
            string memory profilePic,
            bytes32 birthday,
            bytes32 emailAddress
        )
    {
        Doctor storage doctor = doctors[_doctorAddress];
        require(doctor.isAdded, 'Doctor not found');

        return (
            doctor.DoctorAddress,
            doctor.doctorID,
            doctor.name,
            doctor.specialty,
            doctor.consultationFee,
            doctor.BMDCNumber,
            doctor.yearOfExperience,
            doctor.userType,
            doctor.profilePic,
            doctor.birthday,
            doctor.emailAddress
        );
    }

    function getDoctorAnotherData(
        address _doctorAddress
    )
        public
        view
        returns (
            address[] memory PatientToDoctor,
            string[] memory patientTest,
            address[] memory TreatedPatient,
            address[] memory senderPathologist,
            address[] memory receiverPathologist
        )
    {
        Doctor storage doctor = doctors[_doctorAddress];
        require(doctor.isAdded, 'Doctor not found');

        return (
            doctor.PatientToDoctor.values(),
            doctor.patientTest,
            doctor.TreatedPatient.values(),
            doctor.senderPathologist.values(),
            doctor.receiverPathologist.values()
        );
    }

    function getPathologistDataFromDoctor(
        address _doctorAddress,
        address pathoAddress
    ) external view returns (string[] memory) {
        return doctors[_doctorAddress].userData[pathoAddress].imagesUrl;
    }

    function getDoctorDataFromPathologist(
        address _pathoAddress,
        address _doctorAddress
    ) external view returns (string[] memory) {
        return pathologists[_pathoAddress].userData[_doctorAddress].imagesUrl;
    }

    function getPatientDataFromDoctor(
        address _doctorAddress,
        address _patientAddress
    ) external view returns (string[] memory) {
        return doctors[_doctorAddress].userData[_patientAddress].imagesUrl;
    }

    function getPatient(
        address _patientAddress
    ) public view returns (PatientView memory) {
        assert(patients[_patientAddress].isAdded);
        Patient storage patient = patients[_patientAddress];
        return
            PatientView(
                patient.patientAddress,
                patient.patientID,
                patient.name,
                patient.gender,
                patient.age,
                patient.location,
                patient.isAdded,
                patient.userType,
                patient.imgUrl,
                patient.patientPersonalData,
                patient.profilePic,
                patient.birthday,
                patient.emailAddress
            );
    }

    function getAdmin(
        address _adminAddress
    ) public view returns (AdminView memory) {
        assert(admin[_adminAddress].isAdded);
        Admin storage admind = admin[_adminAddress];

        // Return the struct without mappings
        return
            AdminView(
                admind.AdminAddress,
                admind.adminID,
                admind.name,
                admind.gender,
                admind.profilePic,
                admind.allPrescription,
                admind.isAdded,
                admind.userType,
                admind.birthday,
                admind.emailAddress,
                admind.age,
                admind.location
            );
    }

    function setAdmin(
        uint256 adminID,
        bytes32 name,
        bytes32 gender,
        bytes32 birthday,
        bytes32 emailAddress,
        uint256 age,
        bytes32 location
    ) public {
        address user = msg.sender;
        require(
            admin[user].isAdded == false,
            'You already create your profile'
        );

        // Admin storage adminData = admin[user];
        admin[user].AdminAddress = user;
        admin[user].adminID = adminID;
        admin[user].name = name;
        admin[user].gender = gender;
        admin[user].isAdded = true;
        accounts[user] = 6;
        admin[user].userType = 'Admin';
        admin[user].birthday = birthday;
        admin[user].emailAddress = emailAddress;
        admin[user].age = age;
        admin[user].location = location;
        allAdmins.add(user);
    }

    function giveConfirmation(address user) public onlyAdmin {
        require(isAdmin(msg.sender), 'Address is not an admin');
        require(
            isAddressInAllAdmins(msg.sender),
            'Address is not in allAdmins'
        );
        require(!isConfirmed[msg.sender][user], 'Address is already confirmed');
        require(
            pendingTx[ownerAddress].contains(user),
            'This user not have any transaction'
        );
        require(
            !transactions[user].executed,
            'transaction is already confirmed'
        );
        uint256 totalAdmin = allAdmins.length();
        if (transactions[user].confirmations == (totalAdmin - 1)) {
            address useraddress = transactions[user].to;
            if (
                accounts[useraddress] == uint256(EntityType.MedicalResearchLab)
            ) {
                medicalResearchLabs[useraddress].adminToMedRcLab.add(
                    ownerAddress
                );
                sd.sharedAllUsersAddress.add(useraddress);

                transactions[useraddress].executed = true;
                pendingTx[ownerAddress].remove(useraddress);
                isConfirmed[msg.sender][user] = false;
            } else if (
                accounts[useraddress] == uint256(EntityType.PharmacyCompany)
            ) {
                pharmacyCompanies[useraddress].adminToPharmacy.add(
                    ownerAddress
                );
                sd.sharedAllUsersAddress.add(useraddress);

                transactions[useraddress].executed = true;
                pendingTx[ownerAddress].remove(useraddress);
                isConfirmed[msg.sender][user] = false;
            } else {
                revert('only transaction execute for pharma and medi');
            }
        } else {
            transactions[user].confirmations++;
            isConfirmed[msg.sender][user] = true;
        }
    }

    function isAdmin(address _address) public view returns (bool) {
        return admin[_address].isAdded;
    }

    function isAddressInAllAdmins(address _address) public view returns (bool) {
        return allAdmins.contains(_address);
    }

    // Setters and Getters for Doctor struct
    function setDoctor(
        uint256 doctorID,
        bytes32 name,
        bytes32 specialty,
        uint256 consultationFee,
        uint256 BMDCNumber,
        uint256 yearOfExperience,
        bytes32 birthday
    ) public {
        address user = msg.sender;
        require(
            doctors[user].isAdded == false,
            'You already create your profile'
        );

        Doctor storage doctor = doctors[user];

        doctor.DoctorAddress = user;
        doctor.doctorID = doctorID;
        doctor.name = name;
        doctor.specialty = specialty;
        doctor.consultationFee = consultationFee;
        doctor.BMDCNumber = BMDCNumber;
        doctor.yearOfExperience = yearOfExperience;
        doctor.userType = 'Doctor';
        doctor.isAdded = true;
        accounts[user] = 1;
        doctor.birthday = birthday;

        doctor.emailAddress;
        ad.totalNumberOfDoctor++;
    }

    function setPathologist(
        uint256 pathologistID,
        bytes32 name,
        uint256 licenseNumber,
        bytes32 specializationArea,
        uint256 totalExperience,
        bytes32 birthday,
        bytes32 emailAddress
    ) public {
        address user = msg.sender;
        require(
            pathologists[user].isAdded == false,
            'You already create your profile'
        );

        Pathologist storage pathologist = pathologists[user];
        pathologist.pathologistAddress = user;
        pathologist.pathologistID = pathologistID;
        pathologist.name = name;
        pathologist.licenseNumber = licenseNumber;
        pathologist.specializationArea = specializationArea;
        pathologist.totalExperience = totalExperience;
        accounts[user] = 2;
        pathologist.isAdded = true;
        pathologist.userType = 'Pathologist';
        pathologist.birthday = birthday;

        pathologist.emailAddress = emailAddress;
        ad.totalNumberOfPathologist++;
    }

    // Setters and Getters for MedicalResearchLab struct
    function setMedicalResearchLab(
        uint256 labID,
        bytes32 name,
        uint256 licenseID,
        bytes32 researchArea,
        uint256 labRating
    ) public {
        address user = msg.sender;
        require(
            medicalResearchLabs[user].isAdded == false,
            'You already create your profile'
        );

        MedicalResearchLab storage lab = medicalResearchLabs[user];

        lab.labAddress = user;
        lab.labID = labID;
        lab.name = name;
        lab.licenseID = licenseID;
        lab.researchArea = researchArea;
        lab.labRating = labRating;
        lab.isAdded = true;
        accounts[user] = 3;
        lab.userType = 'Medical Research Lab';

        ad.totalNumberOfMedicalResearchLab++;
    }

    // Setters and Getters for PharmacyCompany struct
    function setPharmacyCompany(
        uint256 companyID,
        bytes32 name,
        uint256 licenseID,
        bytes32 productInformation,
        uint256 pharmacyRating
    ) public {
        address user = msg.sender;
        require(
            pharmacyCompanies[user].isAdded == false,
            'You already create your profile'
        );

        PharmacyCompany storage company = pharmacyCompanies[user];

        company.pharmacyCompanyAddress = user;
        company.companyID = companyID;
        company.name = name;
        company.licenseID = licenseID;
        company.productInformation = productInformation;
        company.pharmacyRating = pharmacyRating;
        company.isAdded = true;
        accounts[user] = 4;
        company.userType = 'Pharmacy Company';

        company.emailAddress;
        ad.totalNumberOfPharmacyCompany++;
    }

    function shareData(address useraddress) public {
        if (accounts[msg.sender] == uint256(EntityType.Patient)) {
            if (accounts[useraddress] == uint256(EntityType.Doctor)) {
                Doctor storage doctor = doctors[useraddress];
                bool alreadyShared = false;

                if (doctor.PatientToDoctor.contains(msg.sender)) {
                    alreadyShared = true;
                }

                if (alreadyShared) {
                    revert('Data already shared  with this doctor');
                } else {
                    doctor.PatientToDoctor.add(msg.sender);
                    patients[msg.sender].sharedAllDoctorAddress.add(
                        useraddress
                    );
                }
            } else if (accounts[ownerAddress] == uint256(EntityType.Admin)) {
                bool alreadyShared = false;

                if (admin[ownerAddress].PatientToAdmin.contains(msg.sender)) {
                    alreadyShared = true;
                }

                if (alreadyShared) {
                    revert('Data already shared with this admin');
                } else {
                    admin[ownerAddress].PatientToAdmin.add(msg.sender);
                    string[] storage url = patients[msg.sender].imgUrl;
                    // if (admin[ownerAddress].allPrescription.length == 0) {
                    //     admin[ownerAddress].allPrescription = new string[](
                    //         url.length
                    //     );
                    // }
                    for (uint256 i = 0; i < url.length; i++) {
                        admin[ownerAddress].allPrescription.push(url[i]);
                    }
                }
            } else {
                revert('Invalid entity or transfer not allowed');
            }
        } else if (accounts[msg.sender] == uint256(EntityType.Admin)) {
            require(
                ownerAddress == msg.sender,
                'Only owner can share this data'
            );

            require(
                !pendingTx[ownerAddress].contains(useraddress),
                'transacaction already submitted'
            );

            if (
                accounts[useraddress] == uint256(EntityType.MedicalResearchLab)
            ) {
                bool alreadyShared = false;

                if (
                    medicalResearchLabs[useraddress].adminToMedRcLab.contains(
                        msg.sender
                    )
                ) {
                    alreadyShared = true;
                }

                if (alreadyShared) {
                    revert(
                        'Data already shared with this medical research lab'
                    );
                } else {
                    transactions[useraddress] = Transaction({
                        from: msg.sender,
                        to: useraddress,
                        executed: false,
                        confirmations: 0
                    });

                    pendingTx[ownerAddress].add(useraddress);
                    // medicalResearchLabs[useraddress].adminToMedRcLab.add(msg.sender);
                    // sd.sharedAllUsersAddress.add(useraddress);
                }
            } else if (
                accounts[useraddress] == uint256(EntityType.PharmacyCompany)
            ) {
                bool alreadyShared = false;

                if (
                    pharmacyCompanies[useraddress].adminToPharmacy.contains(
                        msg.sender
                    )
                ) {
                    alreadyShared = true;
                }

                if (alreadyShared) {
                    revert('Data already shared with this pharmacy company');
                } else {
                    transactions[useraddress] = Transaction({
                        from: msg.sender,
                        to: useraddress,
                        executed: false,
                        confirmations: 0
                    });
                    pendingTx[ownerAddress].add(useraddress);
                    // pharmacyCompanies[useraddress].adminToPharmacy.add(msg.sender);
                    // sd.sharedAllUsersAddress.add(useraddress);
                }
            } else {
                revert('Invalid entity or transfer not allowed');
            }
        }
    }

    function showSharedPrescription(
        address patientAddress
    ) public view returns (string[] memory imageUrl) {
        return patients[patientAddress].imgUrl;
    }

    function ConnectedAccountType(
        address useraddress
    ) public view returns (uint256) {
        uint256 user0 = accounts[useraddress];
        if (user0 == uint256(EntityType.Unknown)) {
            return user0;
        } else if (user0 == uint256(EntityType.Doctor)) {
            return user0;
        } else if (user0 == uint256(EntityType.Patient)) {
            return user0;
        } else if (user0 == uint256(EntityType.Pathologist)) {
            return user0;
        } else if (user0 == uint256(EntityType.MedicalResearchLab)) {
            return user0;
        } else if (user0 == uint256(EntityType.PharmacyCompany)) {
            return user0;
        } else if (user0 == uint256(EntityType.Admin)) {
            return user0;
        } else {
            revert('Invaild Stakeholder');
        }
    }

    function getAlluserTypeData(
        address userAddress
    ) public view returns (commonData memory userData) {
        uint256 user0 = accounts[userAddress];
        if (user0 == uint256(EntityType.Doctor)) {
            Doctor storage doctor = doctors[userAddress];
            userData = commonData({
                userType: doctor.userType,
                userAddress: doctor.DoctorAddress,
                userID: doctor.doctorID,
                username: doctor.name,
                emailAddress: doctor.emailAddress
            });
        } else if (user0 == uint256(EntityType.MedicalResearchLab)) {
            MedicalResearchLab storage lab = medicalResearchLabs[userAddress];

            userData = commonData({
                userType: lab.userType,
                userAddress: lab.labAddress,
                userID: lab.labID,
                username: lab.name,
                emailAddress: lab.emailAddress
            });
        } else if (user0 == uint256(EntityType.PharmacyCompany)) {
            PharmacyCompany storage company = pharmacyCompanies[userAddress];
            userData = commonData({
                userType: company.userType,
                userAddress: company.pharmacyCompanyAddress,
                userID: company.companyID,
                username: company.name,
                emailAddress: company.emailAddress
            });
        }
        return userData;
    }

    function getPathologist(
        address _pathologistAddress
    )
        public
        view
        returns (
            address pathologistAddress,
            uint256 pathologistID,
            bytes32 name,
            uint256 licenseNumber,
            bytes32 specializationArea,
            uint256 totalExperience,
            address[] memory patientToPathologist,
            // string[] memory pathologistTest,
            address[] memory receiverDoctor,
            bytes32 userType,
            string memory profilePic,
            bytes32 birthday,
            address[] memory senderDoctor
        )
    {
        Pathologist storage pathologist = pathologists[_pathologistAddress];
        require(pathologist.isAdded, 'Pathologist not found');

        return (
            pathologist.pathologistAddress,
            pathologist.pathologistID,
            pathologist.name,
            pathologist.licenseNumber,
            pathologist.specializationArea,
            pathologist.totalExperience,
            pathologist.PatientToPathologiest.values(),
            // pathologist.pathologistTest,
            pathologist.receiverDoctor.values(),
            pathologist.userType,
            pathologist.profilePic,
            pathologist.birthday,
            pathologist.senderDoctor.values()
        );
    }

    function getPharmacyCompany(
        address _pharmacyCompanyAddress
    ) public view returns (PharmacyCompanyView memory) {
        assert(pharmacyCompanies[_pharmacyCompanyAddress].isAdded);

        PharmacyCompany storage pharmacy = pharmacyCompanies[
            _pharmacyCompanyAddress
        ];

        // Return the struct without the EnumerableSet
        return
            PharmacyCompanyView(
                pharmacy.pharmacyCompanyAddress,
                pharmacy.companyID,
                pharmacy.name,
                pharmacy.licenseID,
                pharmacy.productInformation,
                pharmacy.pharmacyRating,
                pharmacy.isAdded,
                pharmacy.userType,
                pharmacy.TopMedichine,
                pharmacy.profilePic,
                pharmacy.emailAddress
            );
    }

    function getMedicalResearchLab(
        address _labAddress
    ) public view returns (MedicalResearchLabView memory) {
        assert(medicalResearchLabs[_labAddress].isAdded);

        MedicalResearchLab storage lab = medicalResearchLabs[_labAddress];

        // Return a struct without the EnumerableSet
        return
            MedicalResearchLabView(
                lab.labAddress,
                lab.labID,
                lab.name,
                lab.licenseID,
                lab.researchArea,
                lab.labRating,
                lab.isAdded,
                lab.imgUrl,
                lab.userType,
                lab.profilePic,
                lab.emailAddress
            );
    }

    function setPatientPersonalData(
        bytes32 height,
        bytes32 blood,
        bytes32 previousDiseases,
        bytes32 medicineDrugs,
        bytes32 badHabits,
        bytes32 chronicDiseases,
        bytes32 healthAllergies,
        bytes32 birthDefects
    ) external {
        Patient storage patient = patients[msg.sender];
        patient.patientPersonalData.height = height;
        patient.patientPersonalData.Blood = blood;
        patient.patientPersonalData.PreviousDiseases = previousDiseases;
        patient.patientPersonalData.Medicinedrugs = medicineDrugs;
        patient.patientPersonalData.BadHabits = badHabits;
        patient.patientPersonalData.ChronicDiseases = chronicDiseases;
        patient.patientPersonalData.HealthAllergies = healthAllergies;
        patient.patientPersonalData.BirthDefects = birthDefects;
    }

    function addTopMedichine(string memory medichine) public {
        pharmacyCompanies[msg.sender].TopMedichine.push(medichine);
    }

    function deletePrecription(uint256 index, address _user) external {
        if (accounts[msg.sender] == uint256(EntityType.Patient)) {
            patients[msg.sender].imgUrl[index] = patients[msg.sender].imgUrl[
                patients[msg.sender].imgUrl.length - 1
            ];

            // Remove the last element
            patients[msg.sender].imgUrl.pop();
        } else if (accounts[msg.sender] == uint256(EntityType.Doctor)) {
            doctors[msg.sender].userData[_user].imagesUrl[index] = doctors[
                msg.sender
            ].userData[_user].imagesUrl[
                    doctors[msg.sender].userData[_user].imagesUrl.length - 1
                ];
            // Remove the last element
            doctors[msg.sender].userData[_user].imagesUrl.pop();
        } else if (accounts[msg.sender] == uint256(EntityType.Pathologist)) {
            pathologists[msg.sender].userData[_user].imagesUrl[index] = doctors[
                msg.sender
            ].userData[_user].imagesUrl[
                    doctors[msg.sender].userData[_user].imagesUrl.length - 1
                ];
            // Remove the last element
            pathologists[msg.sender].userData[_user].imagesUrl.pop();
        }
    }

    // function removeExpiredDoctors(address patientAddress) public  {
    //     if (accounts[patientAddress] == uint256(EntityType.Patient)) {
    //         for (
    //             uint256 i = 0;
    //             i < sharedAllDoctorAddress[patientAddress].length();
    //             i++
    //         ) {
    //             if (
    //                 dataExpiration[sharedAllDoctorAddress[patientAddress].at(i)] <=
    //                 block.timestamp
    //             ) {
    //                 sharedAllDoctorAddress[patientAddress].remove(
    //                     sharedAllDoctorAddress[msg.sender].at(i)
    //                 );
    //                 if (
    //                     accounts[sharedAllDoctorAddress[patientAddress].at(i)] ==
    //                     uint256(EntityType.Doctor)
    //                 ) {
    //                     doctors[sharedAllDoctorAddress[patientAddress].at(i)]
    //                         .PatientToDoctor
    //                         .remove(msg.sender);
    //                 }
    //             }
    //         }
    //     }
    // }
    function revokeAccessData(address userAddress) external {
        if (accounts[msg.sender] == uint256(EntityType.Patient)) {
            patients[msg.sender].sharedAllDoctorAddress.remove(userAddress);
            if (accounts[userAddress] == uint256(EntityType.Doctor)) {
                doctors[userAddress].PatientToDoctor.remove(msg.sender);
            }
        } else if (accounts[msg.sender] == uint256(EntityType.Admin)) {
            sd.sharedAllUsersAddress.remove(userAddress);
            if (
                accounts[userAddress] == uint256(EntityType.MedicalResearchLab)
            ) {
                medicalResearchLabs[userAddress].adminToMedRcLab.remove(
                    msg.sender
                );
            } else if (
                accounts[userAddress] == uint256(EntityType.PharmacyCompany)
            ) {
                pharmacyCompanies[userAddress].adminToPharmacy.remove(
                    msg.sender
                );
            }
        }
    }

    // function allUserData() public view returns (commonData[] memory) {
    //     commonData[] memory userDataArray = new commonData[](
    //         allUserTypeAddress.length()
    //     );

    //     for (uint256 i = 0; i < allUserTypeAddress.length(); i++) {
    //         address userAddress = allUserTypeAddress.at(i);
    //         uint256 userType = accounts[userAddress];

    //         if (userType == uint256(EntityType.Doctor)) {
    //             Doctor storage doctor = doctors[userAddress];
    //             userDataArray[i] = commonData({
    //                 userType: doctor.userType,
    //                 userAddress: doctor.DoctorAddress,
    //                 userID: doctor.doctorID,
    //                 username: doctor.name,
    //                 emailAddress: doctor.emailAddress
    //             });
    //         } else if (userType == uint256(EntityType.MedicalResearchLab)) {
    //             MedicalResearchLab storage lab = medicalResearchLabs[
    //                 userAddress
    //             ];
    //             userDataArray[i] = commonData({
    //                 userType: lab.userType,
    //                 userAddress: lab.labAddress,
    //                 userID: lab.labID,
    //                 username: lab.name,
    //                 emailAddress: lab.emailAddress
    //             });
    //         } else if (userType == uint256(EntityType.PharmacyCompany)) {
    //             PharmacyCompany storage company = pharmacyCompanies[
    //                 userAddress
    //             ];
    //             userDataArray[i] = commonData({
    //                 userType: company.userType,
    //                 userAddress: company.pharmacyCompanyAddress,
    //                 userID: company.companyID,
    //                 username: company.name,
    //                 emailAddress: company.emailAddress
    //             });
    //         } else if (userType == uint256(EntityType.Patient)) {
    //             Patient storage patient = patients[userAddress];
    //             userDataArray[i] = commonData({
    //                 userType: patient.userType,
    //                 userAddress: patient.patientAddress,
    //                 userID: patient.patientID,
    //                 username: patient.name,
    //                 emailAddress: patient.emailAddress
    //             });
    //         } else if (userType == uint256(EntityType.Pathologist)) {
    //             Pathologist storage pathologist = pathologists[userAddress];
    //             userDataArray[i] = commonData({
    //                 userType: pathologist.userType,
    //                 userAddress: pathologist.pathologistAddress,
    //                 userID: pathologist.pathologistID,
    //                 username: pathologist.name,
    //                 emailAddress: pathologist.emailAddress
    //             });
    //         }
    //     }

    //     return userDataArray;
    // }
}
