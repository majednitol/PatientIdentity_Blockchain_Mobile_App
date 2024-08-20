/* eslint-disable no-undef */
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PatientIdentity contract', function () {
  let patientIdentity;
  let owner;
  let doctor;
  let patient;
  let pathologist;
  let medResearchLab;
  let pharmacyCompany;

  beforeEach(async function () {
    [owner, doctor, patient, pathologist, medResearchLab, pharmacyCompany] =
      await ethers.getSigners();
    const PatientIdentity = await ethers.getContractFactory('PatientIdentity');
    patientIdentity = await PatientIdentity.deploy();
  });

  it('Should set and get patient data and set and get personal data', async function () {
    // Test the setPatient function
    await patientIdentity.setPatient(1, 'Nila', 'Female', 30, 'Dhaka');

    // Test the getPatient function
    console.log(patient.address);
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    const patientData = await patientIdentity.getPatient(owner.address);
    expect(patientData.name).to.equal('Nila');
    expect(patientData.gender).to.equal('Female');
    expect(patientData.age).to.equal(30);
    expect(patientData.location).to.equal('Dhaka');

    // Test the setPatientPersonalData function by a patient
    // await patientIdentity.setPatientPersonalData(
    //   170,
    //   'O+',
    //   'None',
    //   'None',
    //   'None',
    //   'None',
    //   'None',
    //   'None',
    // );

    // // Test that patient personal data was set correctly

    // expect(patientData.patientPersonalData.height).to.equal(170);
    // expect(patientData.patientPersonalData.Blood).to.equal('O+');
    // expect(patientData.patientPersonalData.PreviousDiseases).to.equal('None');
  });

  //   it("Should add prescription", async function () {
  //     // Test the addPrescription function by a doctor
  //     await patientIdentity.addPrescription(patient.address, "URL", { from: doctor.address });

  //     // Test that prescription was added correctly
  //     const patientData = await patientIdentity.getPatient(patient.address);
  //     expect(patientData.imgUrl.length).to.equal(1);
  //     expect(patientData.notification[0]).to.equal("Doctor sent prescription");
  //   });

  //   it("Should transfer patient data", async function () {
  //     // Test the transferDataByPatient function by a patient
  //     await patientIdentity.transferDataByPatient(doctor.address, { from: patient.address });

  //     // Test that data was transferred correctly to a doctor
  //     const doctorData = await patientIdentity.getDoctor(doctor.address);
  //     expect(doctorData.PatientToDoctor.length).to.equal(1);
  //     expect(doctorData.notification[0]).to.equal("Patient  has been shared all personal data");
  //   });

  it('Should set and get doctor data', async function () {
    // Test the setDoctor function
    await patientIdentity.setDoctor(
      1,
      'Dr. Smith',
      'Cardiologist',
      100,
      12345,
      10,
    );

    // Test the getDoctor function
    const doctorData = await patientIdentity.getDoctor(owner.address);
    expect(doctorData.name).to.equal('Dr. Smith');
    expect(doctorData.specialty).to.equal('Cardiologist');
    expect(doctorData.consultationFee).to.equal(100);
    expect(doctorData.BMDCNumber).to.equal(12345);
    expect(doctorData.yearOfExperience).to.equal(10);
  });

  it('Should set and get pathologist data', async function () {
    // Test the setPathologist function
    await patientIdentity.setPathologist(
      1,
      'Pathologist Name',
      54321,
      'Pathology',
      15,
    );

    // Test the getPathologist function
    const pathologistData = await patientIdentity.getPathologist(owner.address);
    expect(pathologistData.name).to.equal('Pathologist Name');
    expect(pathologistData.licenseNumber).to.equal(54321);
    expect(pathologistData.specializationArea).to.equal('Pathology');
    expect(pathologistData.totalExperience).to.equal(15);
  });

  it('Should set and get medical research lab data', async function () {
    // Test the setMedicalResearchLab function
    await patientIdentity.setMedicalResearchLab(
      1,
      'Research Lab',
      98765,
      'Research Area',
      4,
    );

    // Test the getMedicalResearchLab function
    const labData = await patientIdentity.getMedicalResearchLab(owner.address);
    expect(labData.name).to.equal('Research Lab');
    expect(labData.licenseID).to.equal(98765);
    expect(labData.researchArea).to.equal('Research Area');
    expect(labData.labRating).to.equal(4);
  });

  it('Should set and get pharmacy company data', async function () {
    // Test the setPharmacyCompany function
    await patientIdentity.setPharmacyCompany(
      1,
      'Pharmacy Co.',
      87654,
      'Product Info',
      5,
    );

    // Test the getPharmacyCompany function
    const companyData = await patientIdentity.getPharmacyCompany(owner.address);
    expect(companyData.name).to.equal('Pharmacy Co.');
    expect(companyData.licenseID).to.equal(87654);
    expect(companyData.productInformation).to.equal('Product Info');
    expect(companyData.pharmacyRating).to.equal(5);

    await patientIdentity.addTopMedichine('Aspirin', { from: owner.address });

    // Test that medicine was added correctly
    // const companyData = await patientIdentity.getPharmacyCompany(owner.address);
    // expect(companyData.TopMedichine).to.equal('Aspirin');
    console.log(companyData);
  });

  //   it("Should add top medicine by a pharmacy company", async function () {
  //     // Test the addTopMedichine function by a pharmacy company
  //     await patientIdentity.addTopMedichine("Aspirin", { from: owner.address });

  //     // Test that medicine was added correctly
  //     const companyData = await patientIdentity.getPharmacyCompany(owner.address);
  //     expect(companyData.TopMedichine.length).to.equal(1);
  //   });
});