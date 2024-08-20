import React from 'react';
import SetMediResearchLabPersonalData from './SetMediResearchLabPersonalData';
import GetPathologistPersonalData from '../Pathologist/GetPathologistPersonalData';
import GetMediResearchLabPersonalData from './GetMediResearchLabPersonalData';

const MedicalResearchLabComponent = () => {
  return (
    <div>
      {/* <SetMediResearchLabPersonalData />
       */}
      {/* <GetPathologistPersonalData /> */}
      <GetMediResearchLabPersonalData />
    </div>
  );
};

export default MedicalResearchLabComponent;
