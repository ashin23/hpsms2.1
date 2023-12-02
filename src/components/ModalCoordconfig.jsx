import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import Filecoord from "./Filecoord";
import AOS from "aos";
import "aos/dist/aos.css";
const ModalCoordconfig = ({ isOpen, isClose, coordInfo, CoordEmp }) => {
  const [fileview, setFileView] = useState();

  useEffect(() => {
    Handlefile();
  }, [coordInfo, CoordEmp]);

  useEffect(() => {
    AOS.init({ duration: 200, easing: "linear" });
  }, []);

  function handleclose() {
    isClose();
  }
  const Handlefile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(coordInfo.Email + "/");
    setFileView(await file);
  };

  // const HandleArchive = async () => {
  //   const { data: employee } = await supabase.from("Archive_List").insert({
  //     // id:coordInfo.id,
  //     uuid: coordInfo.uuid,
  //     Email: coordInfo.Email,
  //     Password: coordInfo.Password,
  //     Name: coordInfo.Name,
  //     Mobile_No: coordInfo.Mobile_No,
  //     Age: coordInfo.Age,
  //     City_Address: coordInfo.City_Address,
  //     Religion: coordInfo.Religion,
  //     Sex: coordInfo.Sex,
  //     Provincial_Address: coordInfo.Provincial_Address,
  //     Date_of_Birth: coordInfo.Date_of_Birth,
  //     CivilStatus: coordInfo.CivilStatus,
  //     Name_of_Mother: coordInfo.Name_of_Mother,
  //     Occupation_Mother: coordInfo.Occupation_Mother,
  //     Name_of_Father: coordInfo.Name_of_Father,
  //     Occupation_Father: coordInfo.Occupation_Father,
  //     Notify_Emergency: coordInfo.Notify_Emergency,
  //     Relationship: coordInfo.Relationship,
  //     Emergency_Address: coordInfo.Emergency_Address,
  //     Contact_Number: coordInfo.Contact_Number,
  //     College: coordInfo.College,
  //     College_Graduated: coordInfo.College_Graduated,
  //     Course: coordInfo.Course,
  //     Special_Course: coordInfo.Special_Course,
  //     Vocational: coordInfo.Vocational,
  //     Vocational_Graduated: coordInfo.Vocational_Graduated,
  //     HighSchool: coordInfo.HighSchool,
  //     HighSchool_Graduated: coordInfo.HighSchool_Graduated,
  //     Elementary: coordInfo.Elementary,
  //     Elementary_Graduated: coordInfo.Elementary_Graduated,
  //     Inclusive_Dates: coordInfo.Inclusive_Dates,
  //     Company_History: coordInfo.Company_History,
  //     Position_History: coordInfo.Position_History,
  //     Name_References: coordInfo.Name_References,
  //     Company_References: coordInfo.Company_References,
  //     Position_References: coordInfo.Position_References,
  //     SSS_Number: coordInfo.SSS_Number,
  //     Phil_Health_No: coordInfo.Phil_Health_No,
  //     Pag_Ibig_No: coordInfo.Pag_Ibig_No,
  //     Tin_Number: coordInfo.Tin_Number,
  //     Position: coordInfo.Position,
  //     userlvl: "Employee",
  //     status: "Undeploy",
  //     Notifications: "false",
  //   });
  //   const { error } = await supabase
  //     .from("EmployeeListCoordinator")
  //     .delete()
  //     .eq("Data", CoordEmp[0]);
  // };
  // console.log(CoordEmp)

  if (!isOpen) return null;
  return (
    <div className=" fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center top-50 flex overflow-auto ">
      <div 
      data-aos="zoom-in"
      className=" bg-white h-[70%] w-[80%] rounded-3xl px-4 pb-2 md:pb-6 md:px-14 shadow-2xl  overflow-scroll overflow-x-hidden">
         <div className="sticky top-0 bg-white w-full h-[13%] p-5">
          <div className="flex justify-end   ">
            <button
              onClick={handleclose}
              className="-mr-7 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Close
            </button>
           
          </div>
        </div>
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7  text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Employee Information
        </label>
         {/* <button
            onClick={() => HandleArchive()}
            className="text-white   bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Archive
          </button> */}
        <div>
          Photo
          {fileview && (
            <div>
              {fileview.map((view) => (
                <Filecoord key={view.id} view={view} Email={coordInfo} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-[110%]  grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2 ">
          <div className="flex mr-1  font-semibold ">
            Full Name: <p className="font-normal pl-1">{coordInfo.Name}</p>{" "}
          </div>
          <div className="flex mr-1  font-semibold ">
            Email: <p className="font-normal pl-1 ">{coordInfo.Email}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Age: <p className="font-normal pl-1">{coordInfo.Age}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position: <p className="font-normal pl-1">{coordInfo.Position}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Mobile Number:{" "}
            <p className="font-normal pl-1">{coordInfo.Mobile_No}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            City Address:{" "}
            <p className="font-normal pl-1">{coordInfo.City_Address}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Religion: <p className="font-normal pl-1">{coordInfo.Religion}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Sex: <p className="font-normal pl-1">{coordInfo.Sex}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Provincial Address:{" "}
            <p className="font-normal pl-1">{coordInfo.Provincial_Address}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Date of Birth:{" "}
            <p className="font-normal pl-1">{coordInfo.Date_of_Birth}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Civil Status:{" "}
            <p className="font-normal pl-1">{coordInfo.CivilStatus}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Name of Mother:{" "}
            <p className="font-normal pl-1">{coordInfo.Name_of_Mother}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Occupation:{" "}
            <p className="font-normal pl-1">{coordInfo.Occupation_Mother}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Name of Father:{" "}
            <p className="font-normal pl-1">{coordInfo.Name_of_Father}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Occupation:{" "}
            <p className="font-normal pl-1">{coordInfo.Occupation_Father}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position: <p className="font-normal pl-1">{coordInfo.Position}</p>
          </div>
        </div>
        <div className="mt-10 text-[110%]  grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-9 mb-3 p-2 ">
          <div className="flex mr-1  font-semibold">
            Person to Notify Incase of Emergency:{coordInfo.Notify_Emergency}
            <p className="font-normal ml-5"></p>
          </div>
          <div className="flex mr-1  font-semibold">
            Relationship:{" "}
            <p className="font-normal pl-1">{coordInfo.Relationship}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Emergency Address:{" "}
            <p className="font-normal pl-1">{coordInfo.Emergency_Address}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Contact Number:{" "}
            <p className="font-normal pl-1">{coordInfo.Contact_Number}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            College: <p className="font-normal pl-1">{coordInfo.College}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{coordInfo.College_Graduated}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Course: <p className="font-normal pl-1">{coordInfo.Course}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Special Course:{" "}
            <p className="font-normal pl-1">{coordInfo.Special_Course}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Vocational:{" "}
            <p className="font-normal pl-1">{coordInfo.Vocational}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{coordInfo.Vocational_Graduated}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            HighSchool:{" "}
            <p className="font-normal pl-1">{coordInfo.HighSchool}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{coordInfo.HighSchool_Graduated}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Elementary:{" "}
            <p className="font-normal pl-1">{coordInfo.Elementary}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{coordInfo.Elementary_Graduated}</p>
          </div>
        </div>
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          EMPLOYMENT HISTORY
        </label>
        <label className="flex ml-10 text-[15px] ">
          (from recent to backwards)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2">
          <div>
            <label className="flex font-semibold ml-[30%]">
              Inclusive Dates
            </label>
            <div className="flex mr-1  justify-center font-normal">
              {coordInfo.Inclusive_Dates}
            </div>
          </div>
          <div>
            <label className="flex font-semibold ml-[30%]">
              Company/Employer
            </label>
            <div className="flex mr-1  justify-center font-normal">
              {coordInfo.Company_History}
            </div>
          </div>
          <div>
            <label className="flex font-semibold ml-[30%]">Position</label>
            <div className="flex mr-1  justify-center font-normal">
              {coordInfo.Position_History}
            </div>
          </div>
        </div>
        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          CHARACTER REFERENCES
        </label>
        <label className="flex ml-10 text-[15px] ">
          (from recent to backwards)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2 mt-5">
          <div>
            <label className="flex font-semibold ml-[30%]">Names</label>
            <div className="flex mr-1 justify-center font-normal">
              {coordInfo.Name_References}
            </div>
          </div>
          <div>
            <label className="flex font-semibold ml-[30%]">
              Company/Employer
            </label>
            <div className="flex mr-1 justify-center font-normal">
              {coordInfo.Company_References}
            </div>
          </div>
          <div>
            <label className="flex font-semibold ml-[30%]">Position</label>
            <div className="flex mr-1 justify-center font-normal">
              {coordInfo.Position_References}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-9 mb-3 p-2">
          <label className="flex font-bold">SSS No:</label>
          <input
            className=" pl-10 pr-3 py-2  w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`"
            placeholder="SSS Number"
            value={coordInfo.SSS_Number}
            type="text"
            id="sss_number"
          ></input>
          <label className="flex font-bold">Phil Health No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Phil Heatlh Number"
            value={coordInfo.Phil_Health_No}
            type="text"
            id="phil_health_no"
          ></input>
          <label className="flex font-bold">Pag-IBIG No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Pag-IBIG Number"
            value={coordInfo.Pag_Ibig_No}
            id="pag_ibig_no"
            type="text"
          ></input>
          <label className="flex font-bold">Tin No:</label>
          <input
            className=" pl-10 pr-3 py-2 w-[100%] md:w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Tin Number"
            value={coordInfo.Tin_Number}
            id="tin_no"
            type="text"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ModalCoordconfig;
