import React, { useState } from "react";
import supabase from "./supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ModalApply = ({ isVisible, onClose, Position, Data, Hotel, checker }) => {
  const currentDate = new Date().toDateString();
  const [disable, setdisable] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 100, easing: "linear" });
    if (Data) ;
  }, []);

  const handleSubmit = async () => {
    // setdisable(true);
    const { data: profile12 } = await supabase.from("Applicant_List").insert({
      // id: Data.id,
      created_at: currentDate,
      Email: Data.Email,
      Password: Data.Password,
      Name: Data.Name,
      Mobile_No: Data.Mobile_No,
      Age: Data.Age,
      City_Address: Data.City_Address,
      Religion: Data.Religion,
      Sex: Data.Sex,
      Provincial_Address: Data.Provincial_Address,
      Date_of_Birth: Data.Date_of_Birth,
      CivilStatus: Data.CivilStatus,
      Name_of_Mother: Data.Name_of_Mother,
      Occupation_Mother: Data.Occupation_Mother,
      Name_of_Father: Data.Name_of_Father,
      Occupation_Father: Data.Occupation_Father,
      Notify_Emergency: Data.Notify_Emergency,
      Relationship: Data.Relationship,
      Emergency_Address: Data.Emergency_Address,
      Contact_Number: Data.Contact_Number,
      College: Data.College,
      College_Graduated: Data.College_Graduated,
      Course: Data.Course,
      Special_Course: Data.Special_Course,
      Vocational: Data.Vocational,
      Vocational_Graduated: Data.Vocational_Graduated,
      HighSchool: Data.HighSchool,
      HighSchool_Graduated: Data.HighSchool_Graduated,
      Elementary: Data.Elementary,
      Elementary_Graduated: Data.Elementary_Graduated,
      Inclusive_Dates: Data.Inclusive_Dates,
      Company_History: Data.Company_History,
      Position_History: Data.Position_History,
      Name_References: Data.Name_References,
      Company_References: Data.Company_References,
      Position_References: Data.Position_References,
      SSS_Number: Data.SSS_Number,
      Phil_Health_No: Data.Phil_Health_No,
      Pag_Ibig_No: Data.Pag_Ibig_No,
      Tin_Number: Data.Tin_Number,
      Position: Position,
      status: "applicant",
      Notifications: "false",
      Hotel: Hotel,
    });
    // setdisable(false);
    Notify();
  };

 

  const Notify = () => {
    toast.success("Submitted succesfully!", {
      position: "top-center mt-20",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,

      theme: "light",
    });
    setTimeout(() => {
      onClose();
    }, [1000]);
  };

  if (!isVisible) return null;
  return (
    <div
      className=" fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm
      justify-center items-center flex  "
    >
      <div
        data-aos="zoom-in"
        className="  bg-white  md:h-[25%]  md:w-[25%] lg:w-[20%] lg:h-[25%] rounded-3xl p-3 shadow-2xl"
      >
        <div className="mt-2">
          <label className="text-[20px] font-semibold ">
            {" "}
            Would you like to submit an application?
          </label>
        </div>
        <div className="grid grid-cols-2 mt-10 md:w-[70%] lg:ml-10 gap-5 sm:ml-10 md:ml-14">
          <button
            // disabled={disable}
            onClick={() => handleSubmit()}
            // className={`${
            //   disable
            //     ? "bg-black "
            //     : "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 focus:ring-blue-300"
            // }text-white  focus:ring-4  font-medium 
            // rounded-lg text-sm px-2 py-2 mr-2 mb-2 `}
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default ModalApply;
