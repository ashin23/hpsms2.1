import React, { useEffect, useState } from "react";
import ModalAccept from "./ModalAccept";
import ModalReject from "./ModalReject";
import supabase from "./supabaseClient";
import Fileviewer from "./Fileviewer";
import AOS from "aos";
import "aos/dist/aos.css";

import { IoIosInformationCircle } from "react-icons/io";
import { RiParentFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { IoSchool } from "react-icons/io5";

const ModalApplicantInfo = ({ isOpen, CloseJobInfo, Info, srcIMG }) => {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const [file1, setFile] = useState();

  useEffect(() => {
    Handlefetchfile();
  }, [Info]);

  const Handlefetchfile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(Info.Email + "/");
    setFile(await file);
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
      <div
        data-aos="zoom-in"
        className=" bg-white h-[70%] w-[70%] rounded-lg  shadow-2xl  "
      >
        <div className="flex justify-end p-1">
          <button
            onClick={close}
            className="text-sm font-medium p-2  px-4 text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
        <div className="grid p-3  h-[90%]">
          {/* MAIN INFORMATION */}
          <div className="flex w-[100%] h-fit">
            <img
              src={srcIMG}
              className="h-[200px] w-[200px] shadow-md shadow-black rounded-full "
            ></img>
            <div className="grid w-[100%] h-fit ">
              <div className="flex w-[100%] h-fit gap-y-2">
                <label
                  className=" p-4  flex  text-slate-100 md:text-[30px] text-xl w-[70%]
              text-start font-semibold rounded-2xl bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] "
                >
                  Applicant Information
                </label>
                <div className="gap-1 flex">
                  <button
                    className="text-white text-sm font-medium bg-green-700 rounded-lg p-4
                focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => setShowAccept(true)}
                  >
                    ACCEPT
                  </button>
                  <button
                    onClick={() => setShowReject(true)}
                    className="text-white text-sm font-medium bg-red-700 rounded-lg p-4
                focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    REJECT
                  </button>
                </div>
              </div>
              <div className="mt-1 ml-2 gap-2 font-base">
                <div className="flex  ">
                  Full Name: <p className="font-thin pl-1 pr-1">{Info.Name} </p>
                  (<em className="flex font-base">{Info.Sex}</em>)
                </div>
                <div className="flex ">
                  Email: <p className="font-thin pl-1 ">{Info.Email}</p>
                </div>
                <div className="flex ">
                  Age: <p className="font-thin pl-1">{Info.Age}</p>
                </div>
                <div className="flex ">
                  Mobile Number:{" "}
                  <p className="font-thin pl-1">{Info.Mobile_No}</p>
                </div>
                <div className="flex ">
                  City Address:{" "}
                  <p className="font-thin pl-1">{Info.City_Address}</p>
                </div>
              </div>
            </div>
          </div>
          {/* OTHER INFORMATION TABLE */}
          <div className="h-[100%] overflow-y-auto overflow-x-hidden mt-2">
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <IoIosInformationCircle className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              OTHER INFORMATION:
            </h1>
            <div className="grid grid-cols-3 font-semibold ">
              <div className="flex mr-1  ">
                Provincial Address:{" "}
                <p className="font-thin pl-1">{Info.Provincial_Address}</p>
              </div>
              <div className="flex mr-1  ">
                Date of Birth:{" "}
                <p className="font-thin pl-1">{Info.Date_of_Birth}</p>
              </div>
              <div className="flex mr-1  ">
                Religion: <p className="font-thin pl-1">{Info.Religion}</p>
              </div>

              <div className="flex mr-1  font-semibold">
                Civil Status:{" "}
                <p className="font-thin pl-1">{Info.CivilStatus}</p>
              </div>

              <div className="flex mr-1  font-semibold">
                Position: <p className="font-thin pl-1">{Info.Position}</p>
              </div>
            </div>
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <RiParentFill className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              PARENT INFORMATION:
            </h1>
            <div className="grid grid-cols-2 font-semibold">
              <div className="flex mr-1  ">
                Name of Mother:{" "}
                <p className="font-thin pl-1">{Info.Name_of_Mother}</p>
              </div>

              <div className="flex mr-1  ">
                Occupation:{" "}
                <p className="font-thin pl-1">{Info.Occupation_Mother}</p>
              </div>

              <div className="flex mr-1 ">
                Name of Father:{" "}
                <p className="font-thin pl-1">{Info.Name_of_Father}</p>
              </div>

              <div className="flex mr-1  ">
                Occupation:{" "}
                <p className="font-thin pl-1">{Info.Occupation_Father}</p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <MdContactPhone className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              EMERGENCY INFORMATION:
            </h1>
            <div className="grid grid-cols-2 font-semibold">
              <div className="flex mr-1  ">
                Person to Notify Incase of Emergency:{" "}
                <p className="font-thin pl-1">{Info.Notify_Emergency}</p>
              </div>

              <div className="flex mr-1  ">
                Relationship:{" "}
                <p className="font-thin pl-1">{Info.Relationship}</p>
              </div>

              <div className="flex mr-1  ">
                Emergency Address:{" "}
                <p className="font-thin pl-1">{Info.Emergency_Address}</p>
              </div>

              <div className="flex mr-1  ">
                Contact Number:{" "}
                <p className="font-thin pl-1">{Info.Contact_Number}</p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <IoSchool className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              EDUCATIONAL BACKGROUND:
            </h1>
            <div className="grid grid-cols-2 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                College: <p className="font-thin pl-1">{Info.College}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">{Info.College_Graduated}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Course: <p className="font-thin pl-1">{Info.Course}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Special Course:{" "}
                <p className="font-thin pl-1">{Info.Special_Course}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Vocational: <p className="font-thin pl-1">{Info.Vocational}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">{Info.Vocational_Graduated}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                HighSchool: <p className="font-thin pl-1">{Info.HighSchool}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">{Info.HighSchool_Graduated}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Elementary: <p className="font-thin pl-1">{Info.Elementary}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">{Info.Elementary_Graduated}</p>
              </div>
            </div>

          </div>
        </div>

        <div className=""></div>
      </div>
      <ModalAccept
        showAccept={showAccept}
        setShowAccept={setShowAccept}
        info={Info}
      />
      <ModalReject
        infoo={Info}
        showReject={showReject}
        setShowReject={setShowReject}
      />
    </div>
  );
};

export default ModalApplicantInfo;

{
  /* <div className="mt-10 text-[110%] grid-cols-1  grid md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2 ">








</div>
<div className="mt-10 text-[110%] grid-cols-1  grid md:grid-cols-2 gap-4 gap-y-9 mb-3 p-2 ">



<
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
  <div className="flex mr-1 ml-[30%]  font-thin">
    {Info.Inclusive_Dates}
  </div>
</div>
<div>
  <label className="flex font-semibold justify-center md:ml-[30%]">
    Company/Employer
  </label>
  <div className="flex mr-1 ml-[30%] font-thin">
    {Info.Company_History}
  </div>
</div>
<div>
  <label className="flex font-semibold justify-center md:ml-[30%]">
    Position
  </label>
  <div className="flex mr-1 ml-[30%] font-thin">
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
</div> */
}
