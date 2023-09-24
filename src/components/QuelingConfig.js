import React, { useState } from "react";
import ModalEmp from "./ModalEmp";
import supabase from "./supabaseClient";
function QuelingConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
  const handleClose = () => setShowJobApplicant(false);

  const HandleDelete = async () => {
    const { error } = await supabase
      .from("QueuingList")
      .delete()
      .eq("id", e.id);
  };

  const HandleAccept = async () => {
    const { data: employee } = await supabase.from("EmployeeList").insert({
      FullName: e.FullName,
      Email: e.Email,
      Exp: e.Exp,
      Relocate: e.Relocate,
      Position: e.Position,
      userlvl: "Employee",
      status: false
    });
    const { error } = await supabase
      .from("QueuingList")
      .delete()
      .eq("id", e.id);
  };

  return (
    <div className="flex bg-slate-200  mt-2 ">
      <div
        className=" p-3  hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-3 w-[100%]   "
        onClick={() => setShowJobApplicant(true)}
      >
        <div className="text-md ">{e.FullName}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Email}</div>
        
      </div>
      <div className="flex gap-3 w-[20%] p-2 mr-[10%]">
        <button
          onClick={() => HandleAccept()}
          className="bg-bg-green-600   px-3 py-2 text-sm  bg-green-600 hover:bg-green-400 hover:text-black rounded-lg-600  p-2 rounded-md"
        >
          accept{" "}
        </button>
        <button
          onClick={() => HandleDelete()}
          className="px-3 py-2 text-sm t  hover:bg-red-400 hover:text-black rounded-lg bg-red-600 "
        >
          Reject{" "}
        </button>
      </div>
      <ModalEmp Info={e} visible={showJobApplicant} Close={handleClose} />
    </div>
  );
}

export default QuelingConfig;
