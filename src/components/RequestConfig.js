import React from "react";
import supabase from "./supabaseClient";
const RequestConfig = ({ e }) => {
  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Applicant_List")
      .update({ Notifications: "true" })
      .eq("id", e.id);
  };

  return (
    <div className="flex bg-slate-200  mt-2 " onClick={() => updateNotif()}>
      <div className="p-3  hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-rows-3 md:grid-cols-6 w-[105%]  ">
        <div className="text-md md:flex hidden ">{e.Email}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Personel}</div>
        <div className="text-md ">{e.Date}</div>
        <div className="text-md md:flex hidden">{e.Hotel}</div>
        <div className="text-md md:flex hidden">{e.Location}</div>
      </div>
    </div>
  );
};

export default RequestConfig;
