import React, { useState } from "react";
import ModalEmp3 from "./ModalEmp3";
import supabase from "./supabaseClient";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
const ArchiveConfig = ({ e }) => {
  const [showmodal, setShowModal] = useState(false);
  const handleclosemodalprofile = () => setShowModal(false);

  if (showmodal) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";

  async function restored() {
    if (e.oldtable === "applicanttable") {
      const { data: app1 } = await supabase.from("Applicant_List").insert({
        uuid: e.uuid,
        Email: e.Email,
        Password: e.Password,
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
        userlvl: "applicant",
        status: "Undeploy",
        Notifications: "false",
        Hotel: e.Hotel,
        action: "Pending",
      });
      setTimeout(() => {
        delete1();
      }, [1500]);
      toast.success("Restored", {
        autoClose: 1500,
      });
      return;
    }

    if (e.oldtable === "Que") {
      const { data: que } = await supabase.from("Queuing_List").insert({
        uuid: e.uuid,
        Email: e.Email,
        Password: e.Password,
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
        userlvl: "applicant",
        status: "Undeploy",
        Notifications: "false",
        Hotel: e.Hotel,
        action: "Interview, Please check your email",
      });
      setTimeout(() => {
        delete1();
      }, [1500]);
      toast.success("Restored", {
        autoClose: 1500,
      });
      return;
    }

    if (e.oldtable === "Emptable") {
      const { data: emp } = await supabase.from("Employee_List").insert({
        uuid: e.uuid,
        Email: e.Email,
        Password: e.Password,
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
        Notifications: "false",
        Hotel: e.Hotel,
      });
      setTimeout(() => {
        delete1();
      }, [1500]);
      toast.success("Restored", {
        autoClose: 1500,
      });
      return;
    }
  }

  const delete1 = async () => {
    const { data: arch } = await supabase
      .from("Archive_List")
      .delete()
      .eq("uuid", e.uuid);
  };

  return (
    <>
      <div className="flex bg-slate-200  mt-2 ">
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="View Profile"
          onClick={() => setShowModal(true)}
          className={`${
            e.Notifications === "false" && "border-2 border-red-500 h-10"
          } p-1 md:p-3 md:hover:translate-x-2  md:hover:duration-500 md:mt-1 rounded-md w-[100%] h-16 md:h-10  grid grid-rows-4 md:grid-cols-4 md:w-[100%] bg-slate-100 `}
        >
          <div className="text-md ">{e.Name}</div>
          <div className="text-md ">{e.Position}</div>
          <div className="text-md ">{e.Email}</div>
        </div>
        <button onClick={() => restored()}>Restore</button>
        <Tooltip id="my-tooltip" place="bottom" />
        <ModalEmp3
          Info={e}
          visible={showmodal}
          Close={handleclosemodalprofile}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default ArchiveConfig;
