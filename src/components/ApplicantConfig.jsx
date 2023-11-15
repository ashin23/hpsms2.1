import React, { useState } from "react";
import ModalApplicantInfo from "./ModalApplicantInfo";
import supabase from "./supabaseClient";
function ApplicantConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);

 
 if(showJobApplicant)document.documentElement.style.overflowY = "hidden";
 else document.documentElement.style.overflowY = "unset";
  return (
    <>
      <div >
        <div
          className={`${
            e.Notifications === "false" && "border-2 border-red-500"
          } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-rows-3 lg:h-10  md:grid-cols-3  w-[100%] bg-slate-100  `}
          onClick={() => setShowJobApplicant(true)}
        >
          <div className="text-md ">{e.Name}</div>
          <div className="text-md ">{e.Position}</div>
          <div className="text-md ml-3 ">{e.Email}</div>
        </div>

        <ModalApplicantInfo
          isOpen={showJobApplicant}
          CloseJobInfo={setShowJobApplicant}
          Info={e}
        />
      </div>
    </>
  );
}

export default ApplicantConfig;
