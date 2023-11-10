import React from "react";
import supabase from "./supabaseClient";
const RequestConfig = ({ e }) => {
  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Request")
      .update({ Notifications: "true" })
      .eq("id", e.id);
  };

  return (
    <div className="flex bg-slate-200  mt-2 ">
      <div className={`${
          e.Notifications === "false" && "border-2 border-red-500"
        } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-rows-3 lg:h-10  md:grid-cols-3  w-[100%] bg-slate-100  `}
       >
        <div className="text-md md:flex hidden ">{e.Email}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Personel}</div>
        <div className="text-md ">{e.Date}</div>
        <div className="text-md md:flex hidden">{e.Hotel}</div>
        <div className="text-md md:flex hidden">{e.Location}</div>
        <button onClick={() => updateNotif()}>Complete</button>
      </div>
    </div>
  );
};

export default RequestConfig;
