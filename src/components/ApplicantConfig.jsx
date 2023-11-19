import React, { useState, useEffect } from "react";
import ModalApplicantInfo from "./ModalApplicantInfo";
import supabase from "./supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";
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
          className={`${
            e.Notifications === "false" && "border-2 border-red-500"
          }p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 mb-2 rounded-md w-[100%]   grid grid-rows-3 md:grid-cols-3 md:w-[100%] bg-slate-100  `}
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
