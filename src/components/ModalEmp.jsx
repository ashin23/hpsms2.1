import React, { useEffect, useState } from "react";
import Fileviewer from "./Fileviewer";
import supabase from "./supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { IoIosInformationCircle } from "react-icons/io";
import { RiParentFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import { VscReferences } from "react-icons/vsc";
import { AiOutlineFileSearch } from "react-icons/ai";
function ModalEmp({ showJobApplicant, setShowJobApplicant, Info, srcIMG ,avatarComponent}) {
  const [file1, setFile] = useState();

  useEffect(() => {
    Handlefetchfile();
  }, [Info]);

  useEffect(() => {
    AOS.init({ duration: 200, easing: "linear" });
  }, []);

  const Handlefetchfile = async () => {
    const { data: file } = await supabase.storage
      .from("Files")
      .list(Info.Email);
    setFile(await file);
  };

  const HandleDelete = async () => {
    const { data: arch } = await supabase.from("Archive_List").select();
    for (let index = 0; index < arch.length; index++) {
      if (arch[index].uuid === Info.uuid) {
        const { data: arch } = await supabase
          .from("Archive_List")
          .update({
            uuid: Info.uuid,
            Email: Info.Email,
            Password: Info.Password,
            Name: Info.Name,
            Mobile_No: Info.Mobile_No,
            Age: Info.Age,
            City_Address: Info.City_Address,
            Religion: Info.Religion,
            Sex: Info.Sex,
            Provincial_Address: Info.Provincial_Address,
            Date_of_Birth: Info.Date_of_Birth,
            CivilStatus: Info.CivilStatus,
            Name_of_Mother: Info.Name_of_Mother,
            Occupation_Mother: Info.Occupation_Mother,
            Name_of_Father: Info.Name_of_Father,
            Occupation_Father: Info.Occupation_Father,
            Notify_Emergency: Info.Notify_Emergency,
            Relationship: Info.Relationship,
            Emergency_Address: Info.Emergency_Address,
            Contact_Number: Info.Contact_Number,
            College: Info.College,
            College_Graduated: Info.College_Graduated,
            Course: Info.Course,
            Special_Course: Info.Special_Course,
            Vocational: Info.Vocational,
            Vocational_Graduated: Info.Vocational_Graduated,
            HighSchool: Info.HighSchool,
            HighSchool_Graduated: Info.HighSchool_Graduated,
            Elementary: Info.Elementary,
            Elementary_Graduated: Info.Elementary_Graduated,
            Inclusive_Dates: Info.Inclusive_Dates,
            Company_History: Info.Company_History,
            Position_History: Info.Position_History,
            Name_References: Info.Name_References,
            Company_References: Info.Company_References,
            Position_References: Info.Position_References,
            SSS_Number: Info.SSS_Number,
            Phil_Health_No: Info.Phil_Health_No,
            Pag_Ibig_No: Info.Pag_Ibig_No,
            Tin_Number: Info.Tin_Number,
            Position: Info.Position,
            userlvl: "applicant",
            status: "Undeploy",
            Notifications: "false",
            Hotel: Info.Hotel,
            action: "Rejected",
            oldtable: "Que"
          })
          .eq("uuid", Info.uuid);
        setTimeout(() => {
          delete1();
        }, [1500]);
        toast.success("Moved to Archive", {
          autoClose: 1500,
        });
        return;
      }
    }
    const { data: employee } = await supabase.from("Archive_List").insert({
      //  id:Info.id,
      uuid: Info.uuid,
      Email: Info.Email,
      Password: Info.Password,
      Name: Info.Name,
      Mobile_No: Info.Mobile_No,
      Age: Info.Age,
      City_Address: Info.City_Address,
      Religion: Info.Religion,
      Sex: Info.Sex,
      Provincial_Address: Info.Provincial_Address,
      Date_of_Birth: Info.Date_of_Birth,
      CivilStatus: Info.CivilStatus,
      Name_of_Mother: Info.Name_of_Mother,
      Occupation_Mother: Info.Occupation_Mother,
      Name_of_Father: Info.Name_of_Father,
      Occupation_Father: Info.Occupation_Father,
      Notify_Emergency: Info.Notify_Emergency,
      Relationship: Info.Relationship,
      Emergency_Address: Info.Emergency_Address,
      Contact_Number: Info.Contact_Number,
      College: Info.College,
      College_Graduated: Info.College_Graduated,
      Course: Info.Course,
      Special_Course: Info.Special_Course,
      Vocational: Info.Vocational,
      Vocational_Graduated: Info.Vocational_Graduated,
      HighSchool: Info.HighSchool,
      HighSchool_Graduated: Info.HighSchool_Graduated,
      Elementary: Info.Elementary,
      Elementary_Graduated: Info.Elementary_Graduated,
      Inclusive_Dates: Info.Inclusive_Dates,
      Company_History: Info.Company_History,
      Position_History: Info.Position_History,
      Name_References: Info.Name_References,
      Company_References: Info.Company_References,
      Position_References: Info.Position_References,
      SSS_Number: Info.SSS_Number,
      Phil_Health_No: Info.Phil_Health_No,
      Pag_Ibig_No: Info.Pag_Ibig_No,
      Tin_Number: Info.Tin_Number,
      Position: Info.Position,
      userlvl: "applicant",
      status: "Undeploy",
      Notifications: "false",
      Hotel: Info.Hotel,
      action: "Rejected",
      oldtable: "Que"
    });
    setTimeout(() => {
      delete1();
    }, [1500]);
    toast.success("Moved to Archive", {
      autoClose: 1500,
    });
  };

  const delete1 = async () => {
    const { error } = await supabase
      .from("Queuing_List")
      .delete()
      .eq("id", Info.id);
  };

  const HandleAccept = async () => {
    const { data: emp } = await supabase.from("Employee_List").select();
    for (let index = 0; index < emp.length; index++) {
      if (emp[index].uuid === Info.uuid) {
        const { data: employee } = await supabase
          .from("Employee_List")
          .insert({
            // id:Info.id,
            uuid: Info.uuid,
            Email: Info.Email,
            Password: Info.Password,
            Name: Info.Name,
            Mobile_No: Info.Mobile_No,
            Age: Info.Age,
            City_Address: Info.City_Address,
            Religion: Info.Religion,
            Sex: Info.Sex,
            Provincial_Address: Info.Provincial_Address,
            Date_of_Birth: Info.Date_of_Birth,
            CivilStatus: Info.CivilStatus,
            Name_of_Mother: Info.Name_of_Mother,
            Occupation_Mother: Info.Occupation_Mother,
            Name_of_Father: Info.Name_of_Father,
            Occupation_Father: Info.Occupation_Father,
            Notify_Emergency: Info.Notify_Emergency,
            Relationship: Info.Relationship,
            Emergency_Address: Info.Emergency_Address,
            Contact_Number: Info.Contact_Number,
            College: Info.College,
            College_Graduated: Info.College_Graduated,
            Course: Info.Course,
            Special_Course: Info.Special_Course,
            Vocational: Info.Vocational,
            Vocational_Graduated: Info.Vocational_Graduated,
            HighSchool: Info.HighSchool,
            HighSchool_Graduated: Info.HighSchool_Graduated,
            Elementary: Info.Elementary,
            Elementary_Graduated: Info.Elementary_Graduated,
            Inclusive_Dates: Info.Inclusive_Dates,
            Company_History: Info.Company_History,
            Position_History: Info.Position_History,
            Name_References: Info.Name_References,
            Company_References: Info.Company_References,
            Position_References: Info.Position_References,
            SSS_Number: Info.SSS_Number,
            Phil_Health_No: Info.Phil_Health_No,
            Pag_Ibig_No: Info.Pag_Ibig_No,
            Tin_Number: Info.Tin_Number,
            Position: Info.Position,
            userlvl: "Employee",
            status: "Undeploy",
            Notifications: "false",
          })
          .eq("uuid", Info.uuid);
          setTimeout(() => {
            delete2();
          }, [1500]);
          toast.success("Moved to Employee List", {
            autoClose: 1500,
          });
          return;
        }
    }
    const { data: employee } = await supabase.from("Employee_List").insert({
      // id:Info.id,
      uuid: Info.uuid,
      Email: Info.Email,
      Password: Info.Password,
      Name: Info.Name,
      Mobile_No: Info.Mobile_No,
      Age: Info.Age,
      City_Address: Info.City_Address,
      Religion: Info.Religion,
      Sex: Info.Sex,
      Provincial_Address: Info.Provincial_Address,
      Date_of_Birth: Info.Date_of_Birth,
      CivilStatus: Info.CivilStatus,
      Name_of_Mother: Info.Name_of_Mother,
      Occupation_Mother: Info.Occupation_Mother,
      Name_of_Father: Info.Name_of_Father,
      Occupation_Father: Info.Occupation_Father,
      Notify_Emergency: Info.Notify_Emergency,
      Relationship: Info.Relationship,
      Emergency_Address: Info.Emergency_Address,
      Contact_Number: Info.Contact_Number,
      College: Info.College,
      College_Graduated: Info.College_Graduated,
      Course: Info.Course,
      Special_Course: Info.Special_Course,
      Vocational: Info.Vocational,
      Vocational_Graduated: Info.Vocational_Graduated,
      HighSchool: Info.HighSchool,
      HighSchool_Graduated: Info.HighSchool_Graduated,
      Elementary: Info.Elementary,
      Elementary_Graduated: Info.Elementary_Graduated,
      Inclusive_Dates: Info.Inclusive_Dates,
      Company_History: Info.Company_History,
      Position_History: Info.Position_History,
      Name_References: Info.Name_References,
      Company_References: Info.Company_References,
      Position_References: Info.Position_References,
      SSS_Number: Info.SSS_Number,
      Phil_Health_No: Info.Phil_Health_No,
      Pag_Ibig_No: Info.Pag_Ibig_No,
      Tin_Number: Info.Tin_Number,
      Position: Info.Position,
      userlvl: "Employee",
      status: "Undeploy",
      Notifications: "false",
    });

    setTimeout(() => {
      delete2();
    }, [1500]);
    toast.success("Moved to Employee List", {
      autoClose: 1500,
    });
  };

  const delete2 = async () => {
    const { error } = await supabase
      .from("Queuing_List")
      .delete()
      .eq("uuid", Info.uuid);
    const { data } = await supabase
      .from("NewUser")
      .delete()
      .eq("uuid", Info.uuid);
  };

  const close = () => {
    updateNotif();
    setShowJobApplicant(!showJobApplicant);
  };

  const updateNotif = async () => {
    const { data: update } = await supabase
      .from("Queuing_List")
      .update({ Notifications: "true" })
      .eq("id", Info.id);
  };

  if (!showJobApplicant) return null;
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
            onClick={close}
            className="text-sm font-medium p-2  px-4 text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
        <div className="grid p-3 h-[100%] md:h-[90%]">
          {/* MAIN INFORMATION */}
          <div className="md:flex  grid-cols-1   w-[100%] h-fit">
            <img
              src={srcIMG}
              
              className="md:h-[200px] md:w-[200px] w-[100px] h-[100px] md:ml-0 ml-[100px] -mt-8 md:-mt-0  shadow-md shadow-black rounded-full "
            ></img>
            <div className="grid  w-[100%] h-fit ">
              <div className="grid md:flex w-[100%] h-fit gap-y-2">
                <label
                  className="p-2 md:p-4  flex whitespace-nowrap  text-slate-100 md:text-[30px] text-lg md:w-[70%]
              text-start font-semibold rounded-2xl bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] "
                >
                  Applicant Information
                </label>
                <div className="gap-1 flex">
                  <button
                    className="text-white text-sm font-medium bg-green-700 rounded-lg md:p-4 p-2
                focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => HandleAccept()}
                  >
                    ACCEPT
                  </button>
                  <button
                    onClick={() => HandleDelete()}
                    className="text-white text-sm font-medium bg-red-700 rounded-lg md:p-4 p-2
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
          <div className="h-[75%] md:h-[100%]  overflow-y-auto overflow-x-hidden mt-2">
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <IoIosInformationCircle className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              OTHER INFORMATION:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 font-semibold ">
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
            <div className="grid grid-cols-1 md:grid-cols-2 font-semibold">
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
            <div className="grid grid-cols-1 md:grid-cols-2 font-semibold">
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
            <div className="grid grid-cols-1 md:grid-cols-2 font-semibold gap-2">
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

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <FaBriefcase className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              EMPLOYMENT HISTORY:<em>(from recent to backwards)</em>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                Inclusive Dates:{" "}
                <p className="font-thin pl-1">{Info.Inclusive_Dates}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Company/Employer:{" "}
                <p className="font-thin pl-1"> {Info.Company_History}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Position:{" "}
                <p className="font-thin pl-1"> {Info.Position_History}</p>
              </div>
            </div>

            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <VscReferences className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              CHARACTER REFERENCES:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                Names: <p className="font-thin pl-1">{Info.Name_References}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Company/Employer:{" "}
                <p className="font-thin pl-1"> {Info.Company_References}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Position:{" "}
                <p className="font-thin pl-1"> {Info.Position_References}</p>
              </div>
            </div>
            <h1 className="font-semibold text-lg mt-7 flex gap-1 items-center">
              <AiOutlineFileSearch className="h-fit w-fit text-[20px] text-blue-600" />{" "}
              REQUIREMENTS:
            </h1>
            <div className="grid grid-cols-1 font-semibold gap-2">
              <div className="flex mr-1  font-semibold">
                SSS No: <p className="font-thin pl-1">{Info.SSS_Number}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Phil Health No: <p className="font-thin pl-1">{Info.Phil_Health_No}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Pag Ibig No: <p className="font-thin pl-1">{Info.Pag_Ibig_No}</p>
              </div>
              <div className="flex mr-1  font-semibold">
                Tin No: <p className="font-thin pl-1">{Info.Tin_Number}</p>
              </div>
            </div>
          </div>
        </div>
         
        <div className=""></div>
      </div>
    
    </div>
  );
}

export default ModalEmp;
{/* <div
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm
  justify-center items-center z-50 top-50 flex overflow-auto "
    >
      {" "}
      <div
        data-aos="zoom-in"
        className=" bg-white h-[70%] w-[80%] rounded-3xl px-4 py-2 md:pb-4 md:px-14 shadow-2xl  overflow-scroll overflow-x-hidden"
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
          md:pl-9 md:pr-56 md:py-3 md:ml-2 md:my-4 md:mb-7  text-slate-100 text-[30px] w-fit text-center font-semibold  bg-gradient-to-r from-[#2a3695e7] via-[#2a3695e7] to-white rounded-2xl"
        >
          Applicant Information
        </label>
        <div className="grid grid-cols-1 w-[50%] md:grid-cols-2 md:w-[30%]">
          <button
            onClick={() => HandleAccept()}
            className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Accept{" "}
          </button>
          <button
            onClick={() => HandleDelete()}
            className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  "
          >
            Reject{" "}
          </button>
        </div>
        <div className="">
          Photo
          {file1 && (
            <div className="">
              {file1.map((file1) => (
                <Fileviewer key={file1.id} file1={file1} Email={Info} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-10 text-[110%]  grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-9 mb-3 p-2 ">
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
        <div className="mt-10 text-[110%]  grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-9 mb-3 p-2 ">
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
            <div className="flex mr-1 ml-[30%] font-normal">
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
        <label className="flex ml-10 text-[15px] ">
          (from recent to backwards)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-9 mb-3 p-2 mt-5">
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Names
            </label>
            <div className="flex mr-1 ml-[30%] font-normal">
              {Info.Name_References}
            </div>
          </div>
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Company/Employer
            </label>
            <div className="flex mr-1 ml-[30%] font-normal">
              {Info.Company_References}
            </div>
          </div>
          <div>
            <label className="flex font-semibold justify-center md:ml-[30%]">
              Position
            </label>
            <div className="flex mr-1 ml-[30%] font-normal">
              {Info.Position_References}
            </div>
          </div>
        </div>
        <div className="grid mt-10 gap-2">
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
    </div> */}