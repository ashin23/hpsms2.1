import React, { useState } from "react";
import ModalEmp from "./ModalEmp";
import supabase from "./supabaseClient";
function QuelingConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
  const handleClose = () => setShowJobApplicant(false);

  const handleshowApplicant =  (e) => {
    e.stopPropagation()
    setShowJobApplicant(true)
  }

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Queuing_List")
      .update({ Notifications: "true" })
      .eq("id", e.id);
  };

  return (
    <div className="flex bg-slate-200  mt-2" onClick={() => updateNotif()}>
      <div
        className={`${
          e.Notifications === "false" && "border-2 border-red-500"
        } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-rows-3 lg:h-10  md:grid-cols-3  w-[100%] bg-slate-100 `}
        onClick={handleshowApplicant}
      >
        <div className="text-md ">{e.Name}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md md:flex hidden ">{e.Email}</div>

        
       
      </div>

      <ModalEmp Info={e} visible={showJobApplicant} Close={handleClose} />
    </div>
  );
}

export default QuelingConfig;
