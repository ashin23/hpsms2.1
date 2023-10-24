import React, { useState } from "react";
import ModalEmp from "./ModalEmp";
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

  return (
    <div className="flex bg-slate-200  mt-2 " onClick={() => updateNotif()}>
      <div
        onClick={() => setShowModal(true)}
        className={`${
          e.Notifications === "false" && "border-2 border-red-500"
        } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-3 w-[120%] bg-slate-100 `}
      >
        <div className="text-md ">{e.Name}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Email}</div>
        {/* <button className="bg-slate-400  p-2 rounded-md">Restore </button> */}
      </div>
      
      <ModalEmp Info={e} visible={showmodal} Close={handleclosemodalprofile} />
    </div>
  );
};

export default ArchiveConfig;
