import React, { useState } from "react";
import ModalEmp from "./ModalEmp";
import supabase from "./supabaseClient";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
function QuelingConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
 


  if(showJobApplicant)document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";
  return (
    <>
      <div>
        <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Profile"
          className={`${
            e.Notifications === "false" && "border-2 border-red-500 h-10"
          } p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 mb-2 rounded-md w-[100%] h-16 md:h-10  grid grid-rows-3 md:grid-cols-3 md:w-[100%] bg-slate-100 `}
          onClick={() => setShowJobApplicant(true)}
        >
          <div className="text-md ">{e.Name}</div>
          <div className="text-md ">{e.Position}</div>
          <div className="text-md  ">{e.Email}</div>
        </div>
        <Tooltip id="my-tooltip" place="bottom" />
        <ModalEmp Info={e} showJobApplicant={showJobApplicant} setShowJobApplicant={setShowJobApplicant} />
        <ToastContainer/>
      </div>
    </>
  );
}

export default QuelingConfig;
