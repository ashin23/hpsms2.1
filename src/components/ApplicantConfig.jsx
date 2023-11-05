import React, { useState } from "react";
import ModalApplicantInfo from "./ModalApplicantInfo";
import supabase from "./supabaseClient";
function ApplicantConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
  const handleClose = () => setShowJobApplicant(false);

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Applicant_List")
      .update({Notifications: "true"})
      .eq("id", e.id);
  };

  return (
    <div onClick={() => updateNotif()}>
      <div
        className={`${
          e.Notifications === "false" && "border-2 border-red-500"
        } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-rows-3 md:grid-cols-3 md:w-[100%] w-[100%]  md:bg-slate-100 `}
        onClick={() => setShowJobApplicant(true)}
      >
        <div className="text-md ">{e.Name}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ml-3 ">{e.Email}</div>
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
