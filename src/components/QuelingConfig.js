import React, { useState } from "react";
import ModalEmp from "./ModalEmp";
import supabase from "./supabaseClient";
function QuelingConfig({ e }) {
  const [showJobApplicant, setShowJobApplicant] = useState(false);
  const handleClose = () => setShowJobApplicant(false);

  const HandleDelete = async () => {
    const { error } = await supabase
      .from("Queuing_List")
      .delete()
      .eq("id", e.id);
  };

  const HandleAccept = async () => {
    const { data: employee } = await supabase.from("Employee_List").insert({
      Email: e.Email,
      Name: e.Name,
      Mobile_No: e.Mobile_No,
      Age: e.Age,
      City_Address: e.City_Address,
      Religion: e.Religion,
      Sex: e.Sex,
      Provincial_Address: e.Provincial_Address,
      Date_of_Birth: e.Date_of_Birth,
      CivilStatus: e.CivilStatus,
      Name_of_Mother: e.Name_of_Mother,
      Occupation_Mother: e.Occupation_Mother,
      Name_of_Father: e.Name_of_Father,
      Occupation_Father: e.Occupation_Father,
      Notify_Emergency: e.Notify_Emergency,
      Relationship: e.Relationship,
      Emergency_Address: e.Emergency_Address,
      Contact_Number: e.Contact_Number,
      College: e.College,
      College_Graduated: e.College_Graduated,
      Course: e.Course,
      Special_Course: e.Special_Course,
      Vocational: e.Vocational,
      Vocational_Graduated: e.Vocational_Graduated,
      HighSchool: e.HighSchool,
      HighSchool_Graduated: e.HighSchool_Graduated,
      Elementary: e.Elementary,
      Elementary_Graduated: e.Elementary_Graduated,
      Inclusive_Dates: e.Inclusive_Dates,
      Company_History: e.Company_History,
      Position_History: e.Position_History,
      Name_References: e.Name_References,
      Company_References: e.Company_References,
      Position_References: e.Position_References,
      SSS_Number: e.SSS_Number,
      Phil_Health_No: e.Phil_Health_No,
      Pag_Ibig_No: e.Pag_Ibig_No,
      Tin_Number: e.Tin_Number,
      Position: e.Position,
      userlvl: "Employee",
      status: "Undeploy",
      Notifications: "false"
    });
    const { error } = await supabase
      .from("Queuing_List")
      .delete()
      .eq("id", e.id);
  };

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
        } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md grid grid-cols-5 w-[100%] bg-slate-100 `}
        onClick={() => setShowJobApplicant(true)}
      >
        <div className="text-md ">{e.Name}</div>
        <div className="text-md ">{e.Position}</div>
        <div className="text-md ">{e.Email}</div>

        <button
          onClick={() => HandleAccept()}
          className="w-[70%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Accept{" "}
        </button>
        <button
          onClick={() => HandleDelete()}
          className="w-[70%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
        >
          Reject{" "}
        </button>
      </div>

      <ModalEmp Info={e} visible={showJobApplicant} Close={handleClose} />
    </div>
  );
}

export default QuelingConfig;
