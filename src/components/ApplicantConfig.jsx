import React, { useState } from "react";
import ModalApplicantInfo from "./ModalApplicantInfo";
function ApplicantConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
  const handleClose = () => setShowJobApplicant(false);

  return (
    <div>
      <div
        className="p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-3 w-[100%] bg-slate-100 "
        onClick={() => setShowJobApplicant(true)}
      >
        <div className="text-md ">{e.FullName}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Email}</div>
        
      </div>

      <ModalApplicantInfo
        isOpen={showJobApplicant}
        CloseJobInfo={handleClose}
        Info={e}
      />
      {console.log(showJobApplicant)}
    </div>
  );
}

export default ApplicantConfig;
