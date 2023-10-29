import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import Filecoord from "./Filecoord";
const ModalCoordconfig = ({ isOpen, isClose, coordInfo }) => {
  const [fileview, setFileView] = useState();

  useEffect(() => {
    Handlefile();
  }, [coordInfo]);

  function handleclose() {
    isClose();
  }
  const Handlefile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(coordInfo.Email);
    setFileView(file);
  };

  if (!isOpen) return null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center items-center top-50 flex overflow-auto ">
      <button
        onClick={() => handleclose()}
        className="top-[100px] right-[190px] absolute focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Cancel
      </button>
      <div className=" bg-white h-[70%] w-[80%] rounded-3xl  py-6 px-14 shadow-2xl  overflow-scroll overflow-x-hidden">
        <label className="flex pl-9 pr-56 py-3 ml-2 my-4  text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          Employee Information
        </label>
        <div>
          Photo
          {fileview && (
            <div>
              {fileview.map((view) => (
                <Filecoord key={view.id} view={view} Email={coordInfo.Email} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-[110%]  grid grid-cols-4 gap-4 gap-y-9 mb-3 p-2 ">
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
        <div className="mt-10 text-[110%]  grid grid-cols-2 gap-4 gap-y-9 mb-3 p-2 ">
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
        <label className="flex pl-9 pr-56 py-3 ml-2 my-4 mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          EMPLOYMENT HISTORY
        </label>
        <label className="flex ml-10 text-[15px] ">
          (from recent to backwards)
        </label>
        <div className="grid grid-cols-3 gap-4 gap-y-9 mb-3 p-2">
          <label className="flex font-semibold ml-[30%]">Inclusive Dates</label>
          <label className="flex font-semibold ml-[30%]">
            Company/Employer
          </label>
          <label className="flex font-semibold ml-[30%]">Position</label>
          <div className="flex mr-1  font-normal">
            {coordInfo.Inclusive_Dates}
          </div>
          <div className="flex mr-1  font-normal">
            {coordInfo.Company_History}
          </div>
          <div className="flex mr-1  font-normal">
            {coordInfo.Position_History}
          </div>
        </div>
        <label className="flex pl-9 pr-56 py-3 ml-2 my-4 mb-7 text-slate-100 text-[30px] w-fit text-center font-bold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl">
          CHARACTER REFERENCES
        </label>
        <div className="grid grid-cols-3 gap-4 gap-y-9 mb-3 p-2 mt-5">
          <label className="flex font-semibold ml-[30%]">Names</label>
          <label className="flex font-semibold ml-[30%]">
            Company/Employer
          </label>
          <label className="flex font-semibold ml-[30%]">Position</label>
          <div className="flex mr-1  font-normal">
            {coordInfo.Name_References}
          </div>
          <div className="flex mr-1  font-normal">
            {coordInfo.Company_References}
          </div>
          <div className="flex mr-1  font-normal">
            {coordInfo.Position_References}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-9 mb-3 p-2">
          <label className="flex font-bold">SSS No:</label>
          <input
            className=" pl-10 pr-3 py-2 w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2`"
            placeholder="SSS Number"
            value={coordInfo.SSS_Number}
            type="text"
            id="sss_number"
          ></input>
          <label className="flex font-bold">Phil Health No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Phil Heatlh Number"
            value={coordInfo.Phil_Health_No}
            type="text"
            id="phil_health_no"
          ></input>
          <label className="flex font-bold">Pag-IBIG No:</label>
          <input
            className="pl-10 pr-3 py-2 w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            placeholder="Pag-IBIG Number"
            value={coordInfo.Pag_Ibig_No}
            id="pag_ibig_no"
            type="text"
          ></input>
          <label className="flex font-bold">Tin No:</label>
          <input
            className=" pl-10 pr-3 py-2 w-[20%] font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
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
