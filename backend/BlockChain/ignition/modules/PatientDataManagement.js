const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("patientModule", (m) => {
  

  const patient = m.contract("PatientIdentity");

  return { patient };
});
// PatientIdentity - 0x470B72F05f54eB38aCe0bb56294E54b0CB235E90