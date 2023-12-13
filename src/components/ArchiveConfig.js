import React, { useState, useEffect } from "react";
import ModalEmp3 from "./ModalEmp3";
import supabase from "./supabaseClient";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
const ArchiveConfig = ({ e }) => {
  const [showmodal, setShowModal] = useState(false);

  if (showmodal) document.documentElement.style.overflowY = "hidden";
  else document.documentElement.style.overflowY = "unset";

  const [img, setImg] = useState();
  const [broken, isBroken] = useState(false);

  useEffect(() => {
    getAvatar(e.Email);
  }, [e]);

  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
  }, []);

  const getAvatar = async (email1) => {
    const { data: avatar } = await supabase.storage.from("Files").list(email1, {
      limit: 1,
    });
    if (avatar.length > 0) {
      isBroken(true);
      return setImg(avatar[0].name);
    } else {
      isBroken(false);
    }
  };

  var displayColor = "";
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    displayColor = color;

    return color;
  }

  function avatarComponent(name) {
    return (
      <div
        style={{ background: stringToColor(name) }}
        className={`flex text-white items-center justify-center md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full font-thin`}
      >{`${name?.split(" ")[0][0]}`}</div>
    );
  }

  async function handledelete() {
    const { data: arch } = await supabase
      .from("Archive_List")
      .delete()
      .eq("id", e.id);
  }

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

      toast.success("Restored", {
        autoClose: 1500,
      });
      delete1();
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

      toast.success("Restored", {
        autoClose: 1500,
      });
      delete1();
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
      toast.success("Restored", {
        autoClose: 1500,
      });
      delete1();
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
      <div
        className={`${
          e.Notifications === "false" && "border-2 border-red-500 "
        }  md:text-base text-[10px] h-fit grid grid-cols-4 justify-center items-center mb-1 bg-slate-200 p-1 rounded-md font-thin cursor-pointer`}
      >
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="View Profile"
          onClick={() => setShowModal(true)}
          className="text-md flex items-center gap-1 "
        >
          {broken ? (
            <img
              onError={() => isBroken(true)}
              className="md:h-[40px] h-[30px] md:w-[40px] w-[30px] rounded-full shadow-md"
              src={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
            ></img>
          ) : (
            <>{avatarComponent(e?.Name)}</>
          )}

          {e?.Name}
        </div>
        <div className="text-md cursor-pointer flex justify-center">
          {e?.Position}
        </div>
        <div className="text-md md:ml-3 text-blue-600 hover:underline cursor-pointer  justify-center flex truncate">
          {e?.Email}
        </div>
        <div className="flex w-full  justify-center">
        <button
          onClick={() => handledelete()}
          className="text-md md:ml-3  hover:underline cursor-pointer  justify-center flex truncate focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg md:text-sm md:px-3 text-xs px-1 py-1 md:y-2 mb-2 w-[20%] items-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
        >
          DELETE
        </button>
        <button
          className="text-md md:ml-3  hover:underline cursor-pointer  justify-center flex truncate focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg md:text-sm md:px-3 text-xs px-1 py-1 md:y-2 mb-2 w-[20%] items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
          onClick={() => restored()}
        >
          RESTORE
        </button>
        </div>
        
        
      </div>

      <Tooltip id="my-tooltip" place="bottom" />
      <ModalEmp3
        Info={e}
        visible={showmodal}
        Close={setShowModal}
        srcIMG={`https://ibjkqyluohejixyzsewp.supabase.co/storage/v1/object/public/Files/${e.Email}/${img}`}
      />
      <ToastContainer />
    </>
  );
};

export default ArchiveConfig;
