import React from "react";
import supabase from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import Filecoord from "./Filecoord";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosInformationCircle } from "react-icons/io";
import { RiParentFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import { VscReferences } from "react-icons/vsc";
import { AiOutlineFileSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import Layoutdoc from "./Layoutdoc.jsx";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
const ModalCoordconfig = ({
  isOpen,
  isClose,
  coordInfo,
  CoordEmp,
  coordinator,
}) => {
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

  const [disable, setdisable] = useState(false);

  const HandleArchive = async () => {
    const updatedData = [...CoordEmp];
    for (let index = 0; index < CoordEmp.length; index++) {
      if (CoordEmp[index].uuid === coordInfo.uuid) {
        // Create a copy of the original array

        updatedData[index] = { ...updatedData[index], status: "Undeploy" }; // Update the status at the specified index
      }
    }
    setdisable(true);
    const { data: empcoord } = await supabase
      .from("EmployeeListCoordinator")
      .update({
        Data: updatedData,
      })
      .eq("Email", window.localStorage.getItem("email"))
      .single();

    const { data: emp } = await supabase
      .from("Employee_List")
      .update({ status: "Undeploy" })
      .eq("uuid", coordInfo.uuid);
    toast.success("Inquire for alternative information", {
      autoClose: 1500,
    });
    setdisable(false);
    isClose();
  };
  const componentRef = useRef();
  const [img, setimg] = useState();

  if (!isOpen) return null;
  return (
    <div
      className="z-50  fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
justify-center items-center  top-50 flex overflow-auto "
    >
      <div
        data-aos="zoom-in"
        className=" bg-white h-[79%] w-[90%] md:h-[70%] md:w-[70%] rounded-lg  shadow-2xl  "
      >
        <div className="flex justify-end mt-[10px] md:mt-0 p-1">
          <button
            disabled={disable}
            onClick={handleclose}
            className="text-sm font-medium p-2  px-4 text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
        <div className="grid p-3 h-[100%] md:h-[90%]">
          {/* MAIN INFORMATION */}
          <div className="md:flex  grid-cols-1   w-[100%] h-fit">
            {" "}
            <div className="">
              {fileview && (
                <div className="">
                  {fileview.map((view) => (
                    <Filecoord key={view.id} view={view} Email={coordInfo} />
                  ))}
                </div>
              )}
            </div>
            <div className="grid  w-[100%] h-fit ">
              <div className="grid md:flex w-[100%] h-fit gap-y-2">
                <label
                  className="p-2 md:p-4  flex whitespace-nowrap  text-slate-100 md:text-[30px] text-lg md:w-[70%]
            text-start font-semibold rounded-2xl bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] "
                >
                  Applicant Information
                </label>
              </div>
              <div className="mt-1 ml-2 gap-2 font-base">
                <div className="gap-1 flex">
                  <button
                    disabled={disable}
                    className="text-white  focus:ring-4  font-medium   rounded-lg text-sm px-2 py-2 mr-2 mb-2 bg-red-700   hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 focus:ring-red-300 "
                    onClick={() => HandleArchive()}
                  >
                    DELETE
                  </button>{" "}
                  <ReactToPrint
                    trigger={() => {
                      return (
                        <button
                          disabled={disable}
                          className="text-white  focus:ring-4  font-medium   rounded-lg text-sm px-2 py-2 mr-2 mb-2 bg-blue-700   hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 focus:ring-blue-300"
                        >
                          PRINT
                        </button>
                      );
                    }}
                    content={() => componentRef.current}
                    documentTitle="new document"
                  />
                  <div className="h-[100%] overflow-y-auto hidden">
                    <Layoutdoc
                      componentRef={componentRef}
                      Info={coordInfo}
                      srcIMG={fileview}
                    />
                  </div>
                </div>
                <div className="flex  ">
                  Full Name:{" "}
                  <p className="font-thin pl-1 pr-1">{coordInfo.Name} </p>(
                  <em className="flex font-base">{coordInfo.Sex}</em>)
                </div>
                <div className="flex ">
                  Email: <p className="font-thin pl-1 ">{coordInfo.Email}</p>
                </div>
                <div className="flex ">
                  Age: <p className="font-thin pl-1">{coordInfo.Age}</p>
                </div>
                <div className="flex ">
                  Mobile Number:{" "}
                  <p className="font-thin pl-1">{coordInfo.Mobile_No}</p>
                </div>
                <div className="flex ">
                  City Address:{" "}
                  <p className="font-thin pl-1">{coordInfo.City_Address}</p>
                </div>
              </div>
            </div>
          </div>
          {/* OTHER INFORMATION TABLE */}
          <div className="h-[75%] md:h-[100%]  overflow-y-auto overflow-x-hidden mt-2">
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <IoIosInformationCircle className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              OTHER INFORMATION:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 font-semibold ">
              <div className="flex mr-1  ">
                Provincial Address:{" "}
                <p className="font-thin pl-1">{coordInfo.Provincial_Address}</p>
              </div>
              <div className="flex mr-1  ">
                Date of Birth:{" "}
                <p className="font-thin pl-1">{coordInfo.Date_of_Birth}</p>
              </div>
              <div className="flex mr-1  ">
                Religion: <p className="font-thin pl-1">{coordInfo.Religion}</p>
              </div>

              <div className="flex mr-1  font-semibold">
                Civil Status:{" "}
                <p className="font-thin pl-1">{coordInfo.CivilStatus}</p>
              </div>

              <div className="flex mr-1  font-semibold">
                Position: <p className="font-thin pl-1">{coordInfo.Position}</p>
              </div>
            </div>
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <RiParentFill className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              PARENT INFORMATION:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 font-semibold">
              <div className="flex mr-1  ">
                Name of Mother:{" "}
                <p className="font-thin pl-1">{coordInfo.Name_of_Mother}</p>
              </div>

              <div className="flex mr-1  ">
                Occupation:{" "}
                <p className="font-thin pl-1">{coordInfo.Occupation_Mother}</p>
              </div>

              <div className="flex mr-1 ">
                Name of Father:{" "}
                <p className="font-thin pl-1">{coordInfo.Name_of_Father}</p>
              </div>

              <div className="flex mr-1  ">
                Occupation:{" "}
                <p className="font-thin pl-1">{coordInfo.Occupation_Father}</p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <MdContactPhone className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              EMERGENCY INFORMATION:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 font-semibold">
              <div className="flex mr-1  ">
                Person to Notify Incase of Emergency:{" "}
                <p className="font-thin pl-1">{coordInfo.Notify_Emergency}</p>
              </div>

              <div className="flex mr-1  ">
                Relationship:{" "}
                <p className="font-thin pl-1">{coordInfo.Relationship}</p>
              </div>

              <div className="flex mr-1  ">
                Emergency Address:{" "}
                <p className="font-thin pl-1">{coordInfo.Emergency_Address}</p>
              </div>

              <div className="flex mr-1  ">
                Contact Number:{" "}
                <p className="font-thin pl-1">{coordInfo.Contact_Number}</p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <IoSchool className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              EDUCATIONAL BACKGROUND:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                College: <p className="font-thin pl-1">{coordInfo.College}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">{coordInfo.College_Graduated}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Course: <p className="font-thin pl-1">{coordInfo.Course}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Special Course:{" "}
                <p className="font-thin pl-1">{coordInfo.Special_Course}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Vocational:{" "}
                <p className="font-thin pl-1">{coordInfo.Vocational}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">
                  {coordInfo.Vocational_Graduated}
                </p>
              </div>
              <div className="flex mr-1  font-semibold">
                HighSchool:{" "}
                <p className="font-thin pl-1">{coordInfo.HighSchool}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">
                  {coordInfo.HighSchool_Graduated}
                </p>
              </div>
              <div className="flex mr-1  font-semibold">
                Elementary:{" "}
                <p className="font-thin pl-1">{coordInfo.Elementary}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Graduated:{" "}
                <p className="font-thin pl-1">
                  {coordInfo.Elementary_Graduated}
                </p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <FaBriefcase className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              EMPLOYMENT HISTORY:<em>(from recent to backwards)</em>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                Inclusive Dates:{" "}
                <p className="font-thin pl-1">{coordInfo.Inclusive_Dates}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Company/Employer:{" "}
                <p className="font-thin pl-1"> {coordInfo.Company_History}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Position:{" "}
                <p className="font-thin pl-1"> {coordInfo.Position_History}</p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <VscReferences className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              CHARACTER REFERENCES:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                Names:{" "}
                <p className="font-thin pl-1">{coordInfo.Name_References}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Company/Employer:{" "}
                <p className="font-thin pl-1">
                  {" "}
                  {coordInfo.Company_References}
                </p>
              </div>
              <div className="flex mr-1  font-semibold">
                Position:{" "}
                <p className="font-thin pl-1">
                  {" "}
                  {coordInfo.Position_References}
                </p>
              </div>
            </div>
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <AiOutlineFileSearch className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              REQUIREMENTS:
            </h1>
            <div className="grid grid-cols-1 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                SSS No: <p className="font-thin pl-1">{coordInfo.SSS_Number}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Phil Health No:{" "}
                <p className="font-thin pl-1">{coordInfo.Phil_Health_No}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Pag Ibig No:{" "}
                <p className="font-thin pl-1">{coordInfo.Pag_Ibig_No}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Tin No: <p className="font-thin pl-1">{coordInfo.Tin_Number}</p>
              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default ModalCoordconfig;
