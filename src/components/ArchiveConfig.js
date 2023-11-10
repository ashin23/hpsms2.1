import React, { useState } from "react";
import ModalEmp3 from "./ModalEmp3";
import supabase from "./supabaseClient";
const ArchiveConfig = ({ e }) => {
  const [showmodal, setShowModal] = useState(false);
  const handleclosemodalprofile = () => setShowModal(false);

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Archive_List")
      .update({ Notifications: "true" })
      .eq("id", e.id);
  };


  const handleshowApplicant =  (e) => {
    e.stopPropagation()
    setShowModal(true)
  }

  return (
    <div className="flex bg-slate-200  mt-2 " onClick={() => updateNotif()}>
      <div
        onClick={handleshowApplicant}
        className={`${
          e.Notifications === "false" && "border-2 border-red-500"
        } p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 rounded-md w-[100%] lg:h-10 overflow-x-hidden grid grid-rows-3 md:grid-cols-3 md:w-[100%] bg-slate-100 `}
      >
        <div className="text-md ">{e.Name}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Email}</div>
        {/* <button className="bg-slate-400  p-2 rounded-md">Restore </button> */}
      </div>
      
      <ModalEmp3 Info={e} visible={showmodal} Close={handleclosemodalprofile} />
    </div>
  );
};

export default ArchiveConfig;
