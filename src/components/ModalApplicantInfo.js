import React, { useEffect, useState } from "react";
import ModalAccept from "./ModalAccept";
import ModalReject from "./ModalReject";
import supabase from "./supabaseClient";
import Fileviewer from "./Fileviewer";
import AOS from "aos";
import "aos/dist/aos.css";

const ModalApplicantInfo = ({ isOpen, CloseJobInfo, Info }) => {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const [file1, setFile] = useState();

  const handleReject = () => setShowAccept(false);
  const handle2ndReject = () => setShowReject(false);

  useEffect(() => {
    Handlefetchfile();
  }, [Info]);

  const Handlefetchfile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(Info.Email);
    setFile(file);
  };

  const handleAccept = () => {
    setShowAccept(true);
  };

  const handleReject1 = () => {
    setShowReject(true);
  };

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Applicant_List")
      .update({ Notifications: "true" })
      .eq("id", Info.id);
  };
  const close = () => {
    updateNotif();
    CloseJobInfo(!isOpen);
  };

  useEffect(() => {
    AOS.init({ duration: 200, easing: "linear" });
  }, []);

  if (!isOpen) return null;
  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center z-50 top-50 flex overflow-auto "
    >
      {" "}
      <div
        data-aos="zoom-in"
        className=" bg-white h-[70%] w-[80%] rounded-3xl px-4 py-2 md:pb-7 md:px-14 shadow-2xl  overflow-scroll overflow-x-hidden"
      >
        <div className="sticky top-0 bg-white w-full h-[13%] p-5">
          <div className="flex justify-end   ">
            <button
              onClick={close}
              className="-mr-7 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        <label
          className="flex md:text-[30px] h-fit text-xl
          pl-5 pr-36 py-3 my-4 mb-2
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7 text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Applicant Information
        </label>
        <div className="grid grid-cols-1 w-[50%] md:grid-cols-2 md:w-[30%]">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleAccept}
          >
            ACCEPT
          </button>
          <button
            onClick={handleReject1}
            className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
          >
            REJECT
          </button>
        </div>
        <div className="">
          Photo
          {file1 && (
            <div className="">
              {file1.map((file1) => (
                <Fileviewer key={file1.id} file1={file1} Email={Info.Email} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-[110%] grid-cols-1  grid md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2 ">
          <div className="flex mr-1  font-semibold ">
            Full Name: <p className="font-normal pl-1">{Info.Name}</p>{" "}
          </div>
          <div className="flex mr-1  font-semibold ">
            Email: <p className="font-normal pl-1 ">{Info.Email}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Age: <p className="font-normal pl-1">{Info.Age}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position: <p className="font-normal pl-1">{Info.Position}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Mobile Number: <p className="font-normal pl-1">{Info.Mobile_No}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            City Address:{" "}
            <p className="font-normal pl-1">{Info.City_Address}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Religion: <p className="font-normal pl-1">{Info.Religion}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Sex: <p className="font-normal pl-1">{Info.Sex}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Provincial Address:{" "}
            <p className="font-normal pl-1">{Info.Provincial_Address}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Date of Birth:{" "}
            <p className="font-normal pl-1">{Info.Date_of_Birth}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Civil Status: <p className="font-normal pl-1">{Info.CivilStatus}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Name of Mother:{" "}
            <p className="font-normal pl-1">{Info.Name_of_Mother}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Occupation:{" "}
            <p className="font-normal pl-1">{Info.Occupation_Mother}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Name of Father:{" "}
            <p className="font-normal pl-1">{Info.Name_of_Father}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Occupation:{" "}
            <p className="font-normal pl-1">{Info.Occupation_Father}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Position: <p className="font-normal pl-1">{Info.Position}</p>
          </div>
        </div>
        <div className="mt-10 text-[110%] grid-cols-1  grid md:grid-cols-2 gap-4 gap-y-9 mb-3 p-2 ">
          <div className="flex mr-1  font-semibold">
            Person to Notify Incase of Emergency:{Info.Notify_Emergency}
            <p className="font-normal ml-5"></p>
          </div>
          <div className="flex mr-1  font-semibold">
            Relationship:{" "}
            <p className="font-normal pl-1">{Info.Relationship}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Emergency Address:{" "}
            <p className="font-normal pl-1">{Info.Emergency_Address}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Contact Number:{" "}
            <p className="font-normal pl-1">{Info.Contact_Number}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            College: <p className="font-normal pl-1">{Info.College}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{Info.College_Graduated}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Course: <p className="font-normal pl-1">{Info.Course}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Special Course:{" "}
            <p className="font-normal pl-1">{Info.Special_Course}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Vocational: <p className="font-normal pl-1">{Info.Vocational}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{Info.Vocational_Graduated}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            HighSchool: <p className="font-normal pl-1">{Info.HighSchool}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{Info.HighSchool_Graduated}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Elementary: <p className="font-normal pl-1">{Info.Elementary}</p>
          </div>
          <div className="flex mr-1  font-semibold">
            Graduated:{" "}
            <p className="font-normal pl-1">{Info.Elementary_Graduated}</p>
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
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Inclusive Dates
            </label>
            <div className="flex mr-1 ml-[30%]  font-normal">
              {Info.Inclusive_Dates}
            </div>
          </div>
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Company/Employer
            </label>
            <div className="flex mr-1 ml-[30%] font-normal">
              {Info.Company_History}
            </div>
          </div>
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Position
            </label>
            <div className="flex mr-1 ml-[30%] font-normal">
              {Info.Position_History}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2 mt-5">
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Names
            </label>
            <div className="flex font-semibold justify-center md:ml-[30%]">
              {Info.Name_References}
            </div>
          </div>
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Company/Employer
            </label>
            <div className="flex font-semibold justify-center md:ml-[30%]">
              {Info.Company_References}
            </div>
          </div>
          <div>
            <label className="flex font-semibold ml-[30%]">Position</label>
            <div className="flex font-semibold justify-center md:ml-[30%]">
              {Info.Position_References}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-10 gap-2">
          <label className="flex font-semibold ml-[30%] text-[18px]">
            SSS No: {Info.SSS_Number}
          </label>
          <label className="flex font-semibold ml-[30%] text-[18px]">
            Phil Health No: {Info.Phil_Health_No}
          </label>
          <label className="flex font-semibold ml-[30%] text-[18px]">
            Pag Ibig No: {Info.Pag_Ibig_No}
          </label>
          <label className="flex font-semibold ml-[30%] text-[18px]">
            Tin No: {Info.Tin_Number}
          </label>
        </div>
      </div>
      <ModalAccept
        isAccepted={showAccept}
        isReject={handleReject}
        info={Info}
      />
      <ModalReject
        isOpen42={showReject}
        isReject42={handle2ndReject}
        infoo={Info}
      />
    </div>
  );
};

export default ModalApplicantInfo;
