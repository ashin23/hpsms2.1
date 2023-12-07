import React, { useState, useEffect } from "react";
import ModalApplicantInfo from "./ModalApplicantInfo";
import supabase from "./supabaseClient";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tooltip } from 'react-tooltip'
function ApplicantConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
  }, []);

  if (showJobApplicant) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";


  return (
    <>
      <div>
        <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Profile"
          className={`${
            e.Notifications === "false" && "border-2 border-red-500 h-10"
          }p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 mb-2 rounded-md w-[100%]  md:h-10  grid grid-rows-3 md:grid-cols-3 md:w-[100%] bg-slate-100  `}
          onClick={() => setShowJobApplicant(true)}
        >
          <div className="text-md ">{e.Name}</div>
          <div className="text-md ">{e.Position}</div>
          <div className="text-md md:ml-3 ">{e.Email}</div>
        </div>
        <Tooltip id="my-tooltip" place="bottom" />
        <ModalApplicantInfo
          isOpen={showJobApplicant}
          CloseJobInfo={setShowJobApplicant}
          Info={e}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default ApplicantConfig;
