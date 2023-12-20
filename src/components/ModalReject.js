import React from "react";
import supabase from "./supabaseClient";
import { toast } from "react-toastify";
import moment from "moment/moment";
const ModalReject = ({ infoo, showReject, setShowReject, close }) => {
  var date1 = moment(new Date()).format("yyyy-M-D");
  

  const Reject = async () => {
    const { data: user } = await supabase.from("Archive_List").select();
    for (let index = 0; index < user.length; index++) {
      if (user[index].uuid === infoo.uuid) {
        const { data: arch } = await supabase
          .from("Archive_List")
          .update({
            created_at: date1,
            old_date: infoo.created_at,
            uuid: infoo.uuid,
            Email: infoo.Email,
            Password: infoo.Password,
            Name: infoo.Name,
            Mobile_No: infoo.Mobile_No,
            Age: infoo.Age,
            City_Address: infoo.City_Address,
            Religion: infoo.Religion,
            Sex: infoo.Sex,
            Provincial_Address: infoo.Provincial_Address,
            Date_of_Birth: infoo.Date_of_Birth,
            CivilStatus: infoo.CivilStatus,
            Name_of_Mother: infoo.Name_of_Mother,
            Occupation_Mother: infoo.Occupation_Mother,
            Name_of_Father: infoo.Name_of_Father,
            Occupation_Father: infoo.Occupation_Father,
            Notify_Emergency: infoo.Notify_Emergency,
            Relationship: infoo.Relationship,
            Emergency_Address: infoo.Emergency_Address,
            Contact_Number: infoo.Contact_Number,
            College: infoo.College,
            College_Graduated: infoo.College_Graduated,
            Course: infoo.Course,
            Special_Course: infoo.Special_Course,
            Vocational: infoo.Vocational,
            Vocational_Graduated: infoo.Vocational_Graduated,
            HighSchool: infoo.HighSchool,
            HighSchool_Graduated: infoo.HighSchool_Graduated,
            Elementary: infoo.Elementary,
            Elementary_Graduated: infoo.Elementary_Graduated,
            Inclusive_Dates: infoo.Inclusive_Dates,
            Company_History: infoo.Company_History,
            Position_History: infoo.Position_History,
            Name_References: infoo.Name_References,
            Company_References: infoo.Company_References,
            Position_References: infoo.Position_References,
            SSS_Number: infoo.SSS_Number,
            Phil_Health_No: infoo.Phil_Health_No,
            Pag_Ibig_No: infoo.Pag_Ibig_No,
            Tin_Number: infoo.Tin_Number,
            Position: infoo.Position,
            userlvl: "Employee",
            status: "Undeploy",
            Notifications: "false",
            Hotel: infoo.Hotel,
            action: "Rejected",
            oldtable: "applicanttable",
          })
          .eq("uuid", infoo.uuid);
        toast.success("Moved to archived", {
          autoClose: 1500,
        });
        delete1();
        return;
      }
    }
    await supabase.from("Archive_List").insert({
      // id:infoo.id,
      old_date: infoo.created_at,
      created_at: date1,
      uuid: infoo.uuid,
      Email: infoo.Email,
      Password: infoo.Password,
      Name: infoo.Name,
      Mobile_No: infoo.Mobile_No,
      Age: infoo.Age,
      City_Address: infoo.City_Address,
      Religion: infoo.Religion,
      Sex: infoo.Sex,
      Provincial_Address: infoo.Provincial_Address,
      Date_of_Birth: infoo.Date_of_Birth,
      CivilStatus: infoo.CivilStatus,
      Name_of_Mother: infoo.Name_of_Mother,
      Occupation_Mother: infoo.Occupation_Mother,
      Name_of_Father: infoo.Name_of_Father,
      Occupation_Father: infoo.Occupation_Father,
      Notify_Emergency: infoo.Notify_Emergency,
      Relationship: infoo.Relationship,
      Emergency_Address: infoo.Emergency_Address,
      Contact_Number: infoo.Contact_Number,
      College: infoo.College,
      College_Graduated: infoo.College_Graduated,
      Course: infoo.Course,
      Special_Course: infoo.Special_Course,
      Vocational: infoo.Vocational,
      Vocational_Graduated: infoo.Vocational_Graduated,
      HighSchool: infoo.HighSchool,
      HighSchool_Graduated: infoo.HighSchool_Graduated,
      Elementary: infoo.Elementary,
      Elementary_Graduated: infoo.Elementary_Graduated,
      Inclusive_Dates: infoo.Inclusive_Dates,
      Company_History: infoo.Company_History,
      Position_History: infoo.Position_History,
      Name_References: infoo.Name_References,
      Company_References: infoo.Company_References,
      Position_References: infoo.Position_References,
      SSS_Number: infoo.SSS_Number,
      Phil_Health_No: infoo.Phil_Health_No,
      Pag_Ibig_No: infoo.Pag_Ibig_No,
      Tin_Number: infoo.Tin_Number,
      Position: infoo.Position,
      userlvl: "Employee",
      status: "Undeploy",
      Notifications: "false",
      Hotel: infoo.Hotel,
      action: "Rejected",
      oldtable: "applicanttable",
    });
    toast.success("Moved to archived", {
      autoClose: 1500,
    });
    delete1();
  };

  const delete1 = async () => {
    const { error } = await supabase
      .from("Applicant_List")
      .delete()
      .eq("uuid", infoo.uuid);
    close();
  };

  if (!showReject) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center top-50 flex "
    >
      <div className="bg-white p-5 rounded-3xl  py-6 px-5 md:px-14 shadow-2xl ">
        <h1 className="font-bold">Would you like to proceed with rejection?</h1>

        <div
          className="flex
           w-[100%]  justify-center pb-2 gap-2 pt-5"
        >
          <button
            className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={() => setShowReject(false)}
          >
            Cancel
          </button>
          <button
            onClick={() => Reject()}
            className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalReject;
