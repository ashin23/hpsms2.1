import supabase from "./supabaseClient";
import React, { useEffect, useState } from "react";
import ModalEmp from "./ModalEmp";

const EmployeeConfig = ({
  empData,
  handleChange,
  selectedData,
  setempdetailed,
}) => {
  const [showmodal, setShowModal] = useState(false);
  const handleclosemodalprofile = () => setShowModal(false);

  useEffect(() => {
   
  }, [selectedData, empData]);

  const HandleArchive = async () => {
    const { data: employee } = await supabase.from("Archive_List").insert({
      Email: empData.Email,
      Name: empData.Name,
      Mobile_No: empData.Mobile_No,
      Age: empData.Age,
      City_Address: empData.City_Address,
      Religion: empData.Religion,
      Sex: empData.Sex,
      Provincial_Address: empData.Provincial_Address,
      Date_of_Birth: empData.Date_of_Birth,
      CivilStatus: empData.CivilStatus,
      Name_of_Mother: empData.Name_of_Mother,
      Occupation_Mother: empData.Occupation_Mother,
      Name_of_Father: empData.Name_of_Father,
      Occupation_Father: empData.Occupation_Father,
      Notify_Emergency: empData.Notify_Emergency,
      Relationship: empData.Relationship,
      Emergency_Address: empData.Emergency_Address,
      Contact_Number: empData.Contact_Number,
      College: empData.College,
      College_Graduated: empData.College_Graduated,
      Course: empData.Course,
      Special_Course: empData.Special_Course,
      Vocational: empData.Vocational,
      Vocational_Graduated: empData.Vocational_Graduated,
      HighSchool: empData.HighSchool,
      HighSchool_Graduated: empData.HighSchool_Graduated,
      Elementary: empData.Elementary,
      Elementary_Graduated: empData.Elementary_Graduated,
      Inclusive_Dates: empData.Inclusive_Dates,
      Company_History: empData.Company_History,
      Position_History: empData.Position_History,
      Name_References: empData.Name_References,
      Company_References: empData.Company_References,
      Position_References: empData.Position_References,
      SSS_Number: empData.SSS_Number,
      Phil_Health_No: empData.Phil_Health_No,
      Pag_Ibig_No: empData.Pag_Ibig_No,
      Tin_Number: empData.Tin_Number,
      Position: empData.Position,
      userlvl: "Employee",
      status: "Undeploy",
      Notification: "false",
    });
    const { error } = await supabase
      .from("Employee_List")
      .delete()
      .eq("id", empData.id);
  };

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Employee_List")
      .update({ Notifications: "true" })
      .eq("id", empData.id);
  };

 

    
  
  return (
    <div className="flex bg-slate-200  mt-2" onClick={() => updateNotif()}>
      <div className="grid grid-cols-4 w-[100%] bg-slate-100 gap-5">
        <div className=" flex text-md ">
          <input
            type="checkbox"
            // id={empData.Name}
            onChange={handleChange}
            value={empData.Name}
            className="mr-1 mb-7 flex"
          />
          {/* <button onClick={() => click()}>asd</button> */}
          <div>{empData.Name}</div>
        </div>
        <div className="text-md  ml-[20%]">{empData.Position}</div>
        <div
          onClick={() => setShowModal(true)}
          className={`${
            empData.Notifications === "false" && "border-2 border-red-500"
          } p-3 hover:translate-x-2  hover:p-4 duration-500 mt-1 rounded-md  `}
        >
          {empData.Email}
        </div>
        <button
          onClick={() => HandleArchive()}
          className="text-white  w-[50%] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Archive
        </button>
      </div>

      <ModalEmp
        Info={empData}
        visible={showmodal}
        Close={handleclosemodalprofile}
      />
    </div>
  );
};

export default EmployeeConfig;
