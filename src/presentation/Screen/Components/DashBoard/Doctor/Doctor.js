import React from "react";
import SetDoctorPersonalData from "./SetDoctorPersonalData";
import GetDoctorPersonalData from "./GetDoctorPersonalData";
import FileUpload from "../../File/FileUpload";

const DoctorComponent = () => {
  return (
    <div>
      <SetDoctorPersonalData />
      <GetDoctorPersonalData />
      <FileUpload />
    </div>
  );
};

export default DoctorComponent;
