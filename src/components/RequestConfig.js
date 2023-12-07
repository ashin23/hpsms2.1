import React, { useState } from "react";
import supabase from "./supabaseClient";
import ModalDeploy from "./ModalDeploy";

const RequestConfig = ({ e }) => {
  const [showModalDeploy, setShowModalDeploy] = useState(false);
  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Request")
      .update({ Notifications: "true" })
      .eq("id", e.id);
  };

  return (
    <div className="flex bg-slate-200  mt-2 ">
      <div
        className={`${
          e.Notifications === "false" && "border-2 border-red-500"
        } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-rows-4  lg:h-10  md:grid-cols-7  w-[100%] bg-slate-100  `}
      >
        <div className="text-md md:flex hidden ">{e.Email}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Personel}</div>
        <div className="text-md ">{e.Date}</div>
        <div className="text-md md:flex hidden">{e.Hotel}</div>
        <div className="text-md md:flex hidden">{e.Location}</div>
        <div className="md:items-center ">
          <div className="-mt-2 grid grid-cols-2 gap-2 md:-ml-5">
            <button
              onClick={() => updateNotif()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
            rounded-lg text-sm md:p-2  p-2 w-[80px] md:w-[100px] md:-mt-1  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none 
            dark:focus:ring-blue-800 "
            >
              Complete
            </button>
            <button
              onClick={() => setShowModalDeploy(true)}
              className=" w-[100%]  md:-mt-1 md:ml-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 mr-2  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              {" "}
              Deploy
            </button>
          </div>
        </div>
      </div>
      <ModalDeploy
        isOpenDeploy={showModalDeploy}
        isCloseDeploy={() => setShowModalDeploy(false)}
        Position={e.Position}
        // Deploy={employee}
        // DataSelected={selected}
        // selectednames={selectednames}
      />
    </div>
  );
};

export default RequestConfig;
